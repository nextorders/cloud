import { repository } from '@nextorders/database'
import { createId } from '@paralleldrive/cuid2'
import { KubernetesService } from '~~/server/services/kubernetes'
import { notify } from '~~/server/services/telegram/bot'
import { quotaGuard } from '~~/server/utils/guard'
import { spaceCreateSchema } from '~~/shared/services/space'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = spaceCreateSchema.parse(body)

    const { user } = await requireUserSession(event)

    const userInDB = await repository.user.find(user.id)
    if (!userInDB?.quotas) {
      throw createError({
        statusCode: 403,
        statusMessage: 'User quotas not found',
      })
    }

    quotaGuard(userInDB.quotas, 'owned_spaces', 1)

    await repository.user.updateUsedQuota(userInDB.id, 'owned_spaces', 1)

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

    const webAppService = await repository.service.create({
      name: 'NextOrders: Food',
      spaceId: space.id,
      type: 'public',
      image: 'ghcr.io/nextorders/food/web-app',
      version: 'nightly',
    })
    if (!webAppService) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create web app service',
      })
    }

    // Base options
    await repository.service.createOption({
      key: 'primary_website_url',
      value: `https://${space.id}.c1.nextorders.ru`,
      type: 'link',
      status: 'active',
      serviceId: webAppService.id,
    })
    await repository.service.createOption({
      key: 'primary_command_center_url',
      value: `https://${space.id}.c1.nextorders.ru/command-center`,
      type: 'link',
      status: 'active',
      serviceId: webAppService.id,
    })
    await repository.service.createOption({
      key: 'main_website_url',
      value: null,
      type: 'link',
      status: 'can_be_composed',
      serviceId: webAppService.id,
    })
    await repository.service.createOption({
      key: 'main_command_center_url',
      value: null,
      type: 'link',
      status: 'can_be_composed',
      serviceId: webAppService.id,
    })
    await repository.service.createOption({
      key: 'checkout_receiver_email',
      value: null,
      type: 'string',
      status: 'can_be_composed',
      serviceId: webAppService.id,
    })

    await repository.bucket.setAsInUse(bucket.id, webAppService.id)

    await notify(`New space: ${space.name} (${space.id})`)

    return {
      ok: true,
      result: space,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
