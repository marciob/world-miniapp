'use client'

import dynamic from 'next/dynamic'

const ErudaProvider = dynamic(() => import('../components/Eruda').then((c) => c.ErudaProvider), {
	ssr: false,
})

export default ErudaProvider
