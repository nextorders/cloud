import { describe, expect, it } from 'vitest'
import { getToken } from '../token'

describe('getToken', () => {
  it('should return a string', () => {
    const token = getToken()
    expect(typeof token).toBe('string')
  })

  it('should return a string of length 64', () => {
    const token = getToken()
    expect(token.length).toBe(64)
  })
})
