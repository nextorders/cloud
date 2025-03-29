import { repository } from '@nextorders/database'

const logger = useLogger('space:tariffDebit')

export default defineTask({
  meta: {
    name: 'space:tariffDebit',
    description: 'Withdraw from Space balance for next 24 hours',
  },
  async run() {
    try {
      const spaces = await repository.space.findWithExpiredPaidTo()
      const tariffs = await repository.tariff.list()

      for (const s of spaces) {
        const tariff = tariffs.find((t) => t.id === s.tariffId)
        if (!tariff) {
          continue
        }

        await repository.space.addDayToPaidTo(s.id, tariff.dailyCost)
      }
    } catch (error) {
      errorResolver(error)
    }

    logger.success('Done')

    return { result: true }
  },
})
