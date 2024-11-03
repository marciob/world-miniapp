'use client'

import { useState } from 'react'
import { PayBlock } from '@/components/Pay'
import { SignIn } from '@/components/SignIn'
import { VerifyBlock } from '@/components/Verify'
import { AIChat } from '@/components/AIChat'
import { motion } from 'framer-motion'
import Interest from '@/components/Interests'
import Languages from '@/components/Languages'

export default function Home() {
	const [activeTab, setActiveTab] = useState('current')

	return (
		<main className="flex min-h-screen flex-col items-center justify-start p-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
			<div className="w-full max-w-md">
				<div className="flex mb-4">
					<TabButton active={activeTab === 'current'} onClick={() => setActiveTab('current')}>
						Current
					</TabButton>
					<TabButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')}>
						AI Chat
					</TabButton>
				</div>
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}
					className="bg-gray-800 rounded-lg shadow-lg p-6"
				>
					{activeTab === 'current' ? (
						<div className="space-y-6">
							<SignIn />
							<VerifyBlock />
							<PayBlock />
						</div>
					) : (
						<AIChat />
					)}
				</motion.div>
				<Interest />
				<Languages />
			</div>
		</main>
	)
}

function TabButton({ active, onClick, children }) {
	return (
		<button
			onClick={onClick}
			className={`flex-1 py-2 px-4 text-sm font-medium rounded-t-lg transition-colors duration-300 ${
				active ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
			}`}
		>
			{children}
		</button>
	)
}
