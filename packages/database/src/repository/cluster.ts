import { useDatabase } from '../database'

export class Cluster {
  static async find(id: string) {
    return useDatabase().query.clusters.findFirst({
      where: (clusters, { eq }) => eq(clusters.id, id),
    })
  }
}
