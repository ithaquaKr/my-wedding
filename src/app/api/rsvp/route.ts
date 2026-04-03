import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, phone, attending, guests, note } = body

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: 'Tên và số điện thoại là bắt buộc' },
      { status: 400 }
    )
  }

  const { error } = await supabaseAdmin.from('rsvp').insert({
    name: name.trim(),
    phone: phone.trim(),
    attending: Boolean(attending),
    guests: attending ? (Number(guests) || 1) : 0,
    note: note?.trim() || null,
  })

  if (error) {
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
