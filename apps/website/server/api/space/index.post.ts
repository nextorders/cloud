import { repository } from '@nextorders/database'
import { createId } from '@paralleldrive/cuid2'
import { KubernetesService } from '~~/server/services/kubernetes'
import { quotaGuard } from '~~/server/utils/guard'
import { spaceCreateSchema } from '~~/shared/services/space'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = spaceCreateSchema.parse(body)

    const { user } = await getUserSession(event)
    if (!user?.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }
    const userInDB = await repository.user.find(user.id)
    if (!userInDB?.quotas) {
      throw createError({
        statusCode: 403,
        statusMessage: 'User quotas not found',
      })
    }

    quotaGuard(userInDB.quotas, 'owned_spaces', 1)

    const cluster = await repository.cluster.getReadyForUse()
    if (!cluster) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Cluster not found',
      })
    }

    const bucket = await repository.bucket.getReadyForUse()
    if (!bucket) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Failed to get ready bucket',
      })
    }

    const space = await repository.space.create({
      ...data,
      ownerId: userInDB.id,
      clusterId: cluster.id,
      id: createId(),
    })
    if (!space) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create space',
      })
    }

    const k8s = new KubernetesService(cluster)
    await k8s.createFullSpaceForTariffGlaze(
      {
        id: space.id,
      },
      {
        publicUrl: bucket.publicUrl,
        name: bucket.name,
        region: bucket.region,
        endpoint: bucket.endpoint,
        accessKeyId: bucket.accessKeyId,
        secretAccessKey: bucket.secretAccessKey,
      },
    )

    await repository.bucket.setAsInUse(bucket.id)
    await repository.user.updateUsedQuota(userInDB.id, 'owned_spaces', 1)

    return {
      ok: true,
      result: space,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
