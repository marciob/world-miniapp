'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { SendHorizontal } from 'lucide-react'

export function AIChat() {
	const { messages, input, handleInputChange, handleSubmit } = useChat()

	return (
		<div className="flex flex-col h-[60vh]">
			<div className="flex-1 overflow-y-auto mb-4 space-y-4">
				{messages.map((m) => (
					<div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
						<div className={`max-w-[80%] p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}>{m.content}</div>
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className="flex items-center">
				<input
					value={input}
					onChange={handleInputChange}
					placeholder="Type your message..."
					className="flex-1 p-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button type="submit" className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-300">
					<SendHorizontal size={24} />
				</button>
			</form>
		</div>
	)
}
