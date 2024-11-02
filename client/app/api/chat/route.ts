import { Configuration, OpenAIApi } from 'openai-edge'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
	const { messages } = await req.json()
	const result = await streamText({
		model: openai('gpt-4o'),
		messages: messages,
	})

	return result.toDataStreamResponse()
}
