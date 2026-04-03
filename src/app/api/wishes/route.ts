import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, message } = body

  if (!name?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Tên và lời chúc là bắt buộc' },
      { status: 400 }
    )
  }

  const { error } = await supabaseAdmin.from('wishes').insert({
    name: name.trim(),
    message: message.trim(),
  })

  if (error) {
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
