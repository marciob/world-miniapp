import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const uuid = crypto.randomUUID().replace(/-/g, '')
	const cookieStore = await cookies()

	cookieStore.set({
		name: 'payment-nonce',
		value: uuid,
		httpOnly: true,
	})

	return NextResponse.json({ id: uuid })
}
