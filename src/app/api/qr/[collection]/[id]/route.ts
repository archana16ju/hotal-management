import { NextRequest } from 'next/server'
import QRCode from 'qrcode'

export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  context: { params: { collection: string; id: string } }
) {
  try {
    const { collection, id } = context.params

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const qrUrl = `${baseUrl}/${collection}/${id}`
    
    const buffer = await QRCode.toBuffer(qrUrl, {
      width: 300,
      margin: 2,
    })

    const uint8Array = new Uint8Array(buffer)

    return new Response(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': uint8Array.length.toString(),
      },
    })
  } catch (error) {
    console.error('QR ERROR:', error)

    return new Response('QR generation failed', {
      status: 500,
    })
  }
}