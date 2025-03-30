import { useDatabase } from '../database'

export class Cluster {
  static async find(id: string) {
    return useDatabase().query.clusters.findFirst({
      where: (clusters, { eq }) => eq(clusters.id, id),
    })
  }

  static async getReadyForUse() {
    const clusterId = 'dou7ckbvx4rtnpg9ynwd7n00' // ru-1
    return Cluster.find(clusterId)
  }
}
