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
  return new NextRequest('http://localhost/api/wishes', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/wishes', () => {
  it('returns 400 when name is missing', async () => {
    const res = await POST(makeRequest({ message: 'Chúc mừng!' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is missing', async () => {
    const res = await POST(makeRequest({ name: 'Nguyen Van A' }))
    expect(res.status).toBe(400)
  })

  it('returns 201 on valid submission', async () => {
    const res = await POST(makeRequest({ name: 'Nguyen Van A', message: 'Chúc mừng!' }))
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.success).toBe(true)
  })
})
