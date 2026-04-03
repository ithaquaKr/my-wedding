import { calculateCountdown } from '../countdown'

describe('calculateCountdown', () => {
  it('returns correct breakdown for a future date exactly 1 day away', () => {
    const target = '2030-01-02T00:00:00'
    const now = new Date('2030-01-01T00:00:00')
    const result = calculateCountdown(target, now)
    expect(result).toEqual({ days: 1, hours: 0, minutes: 0, seconds: 0, isPast: false })
  })

  it('returns isPast=true and zeros for a past date', () => {
    const target = '2020-01-01T00:00:00'
    const now = new Date('2026-01-01T00:00:00')
    const result = calculateCountdown(target, now)
    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true })
  })

  it('calculates hours and minutes correctly', () => {
    const target = '2030-01-01T10:30:45'
    const now = new Date('2030-01-01T08:00:00')
    const result = calculateCountdown(target, now)
    expect(result.days).toBe(0)
    expect(result.hours).toBe(2)
    expect(result.minutes).toBe(30)
    expect(result.seconds).toBe(45)
    expect(result.isPast).toBe(false)
  })

  it('uses current time when now is not provided', () => {
    const farFuture = '2099-01-01T00:00:00'
    const result = calculateCountdown(farFuture)
    expect(result.isPast).toBe(false)
    expect(result.days).toBeGreaterThan(0)
  })
})
