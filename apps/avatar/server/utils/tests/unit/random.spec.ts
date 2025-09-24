import { describe, expect, it } from 'vitest'
import { getRandInteger } from '../../random'

describe('getRandInteger', () => {
  it('should return correct random number', () => {
    const res = getRandInteger(0, 1)
    expect(res).toBeGreaterThanOrEqual(0)
  })
})
