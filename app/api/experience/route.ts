import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  const payload = await getPayload({ config })
  
  const experiences = await payload.find({
    collection: 'experience' as any, // temporary fix
    sort: '-startDate',
  })

  return NextResponse.json(experiences)
}