import { describe, expect, it } from 'vitest'
import { getTariffsForSelect } from '../helpers'

describe('getTariffsForSelect', () => {
  it('should work', () => {
    const tariffs = getTariffsForSelect()

    expect(tariffs.length).toBe(2)
  })
})
