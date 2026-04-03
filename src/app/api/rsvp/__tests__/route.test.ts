/**
 * @jest-environment node
 */
import { POST } from '../route'
import { NextRequest } from 'next/server'

jest.mock('@/lib/supabase-server', () => ({
  supabaseAdmin: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    })),
  },
}))

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/rsvp', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/rsvp', () => {
  it('returns 400 when name is missing', async () => {
    const res = await POST(makeRequest({ phone: '0901234567', attending: true }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBeTruthy()
  })

  it('returns 400 when phone is missing', async () => {
    const res = await POST(makeRequest({ name: 'Nguyen Van A', attending: true }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBeTruthy()
  })

  it('returns 201 on valid submission', async () => {
    const res = await POST(makeRequest({
      name: 'Nguyen Van A',
      phone: '0901234567',
      attending: true,
      guests: 2,
      note: '',
    }))
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.success).toBe(true)
  })
})
