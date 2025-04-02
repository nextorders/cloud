import type { Cluster, Context, User } from '@kubernetes/client-node'
import type { Cluster as ClusterData } from '@nextorders/database'
import * as k8s from '@kubernetes/client-node'

export class KubernetesService {
  clusterId: string
  client: k8s.CoreV1Api
  appsClient: k8s.AppsV1Api
  networkClient: k8s.NetworkingV1Api
  logger = useLogger('kubernetes-service')

  constructor(cluster: ClusterData) {
    this.clusterId = cluster.id

    const clusterData: Cluster = {
      name: cluster.name,
      server: cluster.server,
      caData: cluster.certificateAuthorityData,
      skipTLSVerify: false,
    }

    const user: User = {
      name: 'main',
      certData: cluster.clientCertificateData ?? undefined,
      keyData: cluster.clientKeyData ?? undefined,
      token: cluster.userToken ?? undefined,
    }

    const context: Context = {
      name: clusterData.name,
      user: user.name,
      cluster: clusterData.name,
    }

    const kc = new k8s.KubeConfig()
    kc.loadFromOptions({
      clusters: [clusterData],
      users: [user],
      contexts: [context],
      currentContext: context.name,
    })

    this.client = kc.makeApiClient(k8s.CoreV1Api)
    this.appsClient = kc.makeApiClient(k8s.AppsV1Api)
    this.networkClient = kc.makeApiClient(k8s.NetworkingV1Api)
  }

  async createNamespace(name: string) {
    const request: k8s.CoreV1ApiCreateNamespaceRequest = {
      body: {
        metadata: {
          name,
        },
      },
    }

    return this.client.createNamespace(request)
  }

  async deleteNamespace(name: string) {
    const request: k8s.CoreV1ApiDeleteNamespaceRequest = {
      name,
    }

    return this.client.deleteNamespace(request)
  }

  async createSecret(namespace: string, data: { name: string, stringData: { [key: string]: string } }) {
    const request: k8s.CoreV1ApiCreateNamespacedSecretRequest = {
      namespace,
      body: {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
          name: data.name,
        },
        type: 'Opaque',
        stringData: data.stringData, // without base64
      },
    }

    return this.client.createNamespacedSecret(request)
  }

  async removeSecret(namespace: string, { name }: { name: string }) {
    const request: k8s.CoreV1ApiDeleteNamespacedSecretRequest = {
      namespace,
      name,
    }

    await this.client.deleteNamespacedSecret(request)
  }

  async createPersistentVolumeClaim(
    namespace: string,
    data: { name: string, sizeGb: number, storageClassName: string },
  ) {
    const request: k8s.CoreV1ApiCreateNamespacedPersistentVolumeClaimRequest = {
      namespace,
      body: {
        metadata: {
          name: data.name,
        },
        spec: {
          storageClassName: data.storageClassName,
          accessModes: ['ReadWriteOnce'],
          resources: {
            requests: {
              storage: `${data.sizeGb}Gi`,
            },
          },
        },
      },
    }

    return this.client.createNamespacedPersistentVolumeClaim(request)
  }

  async removePersistentVolumeClaim(namespace: string, { name }: { name: string }) {
    const request: k8s.CoreV1ApiDeleteNamespacedPersistentVolumeClaimRequest = {
      namespace,
      name,
    }

    return this.client.deleteNamespacedPersistentVolumeClaim(request)
  }

  async createDeployment(namespace: string, data: { name: string, containers: k8s.V1Container[], volumes?: k8s.V1Volume[] }) {
    const request: k8s.AppsV1ApiCreateNamespacedDeploymentRequest = {
      namespace,
      body: {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
          name: data.name,
        },
        spec: {
          replicas: 1,
          revisionHistoryLimit: 1,
          selector: {
            matchLabels: {
              app: data.name,
            },
          },
          template: {
            metadata: {
              labels: {
                app: data.name,
              },
            },
            spec: {
              securityContext: {
                runAsUser: 1001,
                fsGroup: 1001,
              },
              automountServiceAccountToken: false,
              containers: data.containers,
              volumes: data.volumes,
            },
          },
        },
      },
    }

    return this.appsClient.createNamespacedDeployment(request)
  }

  async removeDeployment(namespace: string, { name }: { name: string }) {
    const request: k8s.AppsV1ApiDeleteNamespacedDeploymentRequest = {
      namespace,
      name,
    }

    return this.appsClient.deleteNamespacedDeployment(request)
  }

  async createService(namespace: string, data: { name: string, selector: string, port: number, targetPort: number }) {
    const request: k8s.CoreV1ApiCreateNamespacedServiceRequest = {
      namespace,
      body: {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: data.name,
        },
        spec: {
          selector: {
            app: data.selector,
          },
          ports: [
            {
              protocol: 'TCP',
              port: data.port,
              targetPort: data.targetPort,
            },
          ],
        },
      },
    }

    return this.client.createNamespacedService(request)
  }

  async removeService(namespace: string, { name }: { name: string }) {
    const request: k8s.CoreV1ApiDeleteNamespacedServiceRequest = {
      namespace,
      name,
    }

    return this.client.deleteNamespacedService(request)
  }

  async createIngress(
    namespace: string,
    data: { name: string, hostname: string, service: { name: string, path: string, port: number } },
  ) {
    const request: k8s.NetworkingV1ApiCreateNamespacedIngressRequest = {
      namespace,
      body: {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'Ingress',
        metadata: {
          name: data.name,
          annotations: {
            'cert-manager.io/cluster-issuer': 'letsencrypt-prod',
            'nginx.ingress.kubernetes.io/limit-rps': '25',
            'nginx.ingress.kubernetes.io/proxy-body-size': '25m',
            'nginx.ingress.kubernetes.io/proxy-send-timeout': '3600',
            'nginx.ingress.kubernetes.io/proxy-read-timeout': '3600',
          },
        },
        spec: {
          ingressClassName: 'nginx',
          tls: [
            {
              hosts: [data.hostname],
              secretName: data.hostname,
            },
          ],
          rules: [
            {
              host: data.hostname,
              http: {
                paths: [
                  {
                    pathType: 'Prefix',
                    path: data.service.path,
                    backend: {
                      service: {
                        name: data.service.name,
                        port: {
                          number: data.service.port,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    }

    return this.networkClient.createNamespacedIngress(request)
  }

  async removeIngress(namespace: string, { name }: { name: string }) {
    const request: k8s.NetworkingV1ApiDeleteNamespacedIngressRequest = {
      namespace,
      name,
    }

    return this.networkClient.deleteNamespacedIngress(request)
  }

  async createFullSpaceForTariffGlaze(space: { id: string }, bucket: { publicUrl: string, name: string, region: string, endpoint: string, accessKeyId: string, secretAccessKey: string }) {
    try {
      // Create namespace for all future resources
      const namespace = await this.createNamespace(space.id)
      if (!namespace) {
        throw new Error('Failed to create namespace')
      }

      // Create persistent volume claim for db
      await this.createPersistentVolumeClaim(space.id, {
        name: 'db',
        sizeGb: 1,
        storageClassName: 'csi-s3',
      })

      // Create deployment for db
      const dbVolumes: k8s.V1Volume[] = [
        {
          name: 'db',
          persistentVolumeClaim: {
            claimName: 'db',
          },
        },
      ]
      const dbContainers: k8s.V1Container[] = [
        {
          name: 'redis',
          image: 'redis:7',
          imagePullPolicy: 'Always',
          ports: [
            {
              containerPort: 6379,
            },
          ],
          volumeMounts: [
            {
              name: 'db',
              mountPath: '/data',
            },
          ],
          args: [
            '--protected-mode',
            'no',
            '--appendonly',
            'no',
            '--save',
            '300',
            '1',
          ],
          resources: {
            requests: {
              'cpu': '25m',
              'memory': '32Mi',
              'ephemeral-storage': '512Mi',
            },
            limits: {
              'cpu': '50m',
              'memory': '64Mi',
              'ephemeral-storage': '1024Mi',
            },
          },
        },
      ]

      await this.createDeployment(space.id, {
        name: 'db',
        containers: dbContainers,
        volumes: dbVolumes,
      })

      // Create service for db
      await this.createService(space.id, {
        name: 'db',
        selector: 'db',
        port: 6379,
        targetPort: 6379,
      })

      // Create secret for web-app
      await this.createSecret(space.id, {
        name: 'web-app',
        stringData: {
          NUXT_REDIS_URL: `redis://db.${space.id}.svc.cluster.local:6379`,
          NUXT_CHANNEL_ID: 'web-app',
          NUXT_SESSION_PASSWORD: crypto.randomUUID(),
          NUXT_PUBLIC_MEDIA_URL: bucket.publicUrl,
          NUXT_S3_BUCKET: bucket.name,
          NUXT_S3_REGION: bucket.region,
          NUXT_S3_ENDPOINT: bucket.endpoint,
          NUXT_S3_ACCESS_KEY_ID: bucket.accessKeyId,
          NUXT_S3_SECRET_ACCESS_KEY: bucket.secretAccessKey,
        },
      })

      // Create deployment for web-app
      const webAppContainers: k8s.V1Container[] = [
        {
          name: 'web-app',
          image: 'ghcr.io/nextorders/food/web-app:nightly',
          imagePullPolicy: 'Always',
          ports: [
            {
              containerPort: 3000,
            },
          ],
          envFrom: [
            {
              secretRef: {
                name: 'web-app',
              },
            },
          ],
          livenessProbe: {
            httpGet: {
              port: 3000,
              path: '/api/health',
            },
            initialDelaySeconds: 30,
            periodSeconds: 60,
            timeoutSeconds: 15,
          },
          resources: {
            requests: {
              'cpu': '50m',
              'memory': '128Mi',
              'ephemeral-storage': '512Mi',
            },
            limits: {
              'cpu': '150m',
              'memory': '512Mi',
              'ephemeral-storage': '1024Mi',
            },
          },
          securityContext: {
            capabilities: {
              drop: ['ALL'],
            },
            runAsNonRoot: true,
            readOnlyRootFilesystem: false,
            allowPrivilegeEscalation: false,
          },
        },
      ]

      await this.createDeployment(space.id, {
        name: 'web-app',
        containers: webAppContainers,
      })

      // Create service for web-app
      await this.createService(space.id, {
        name: 'web-app',
        selector: 'web-app',
        port: 3000,
        targetPort: 3000,
      })

      // Create ingress for web-app
      await this.createIngress(space.id, {
        name: 'web-app',
        hostname: `${space.id}.c1.nextorders.ru`,
        service: {
          name: 'web-app',
          path: '/',
          port: 3000,
        },
      })
    } catch (error) {
      this.logger.error(error)
    }
  }
}
