// app/api/transcribe/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        console.log('Receiving transcription request...');
        
        const formData = await request.formData();
        const audioFile = formData.get('audio') as Blob;
        
        if (!audioFile) {
            console.error('No audio file found in request');
            return NextResponse.json(
                { error: 'No audio file provided' },
                { status: 400 }
            );
        }

        // Log file details
        console.log('Audio file details:', {
            type: audioFile.type,
            size: audioFile.size,
        });

        // Convert Blob to Buffer
        const arrayBuffer = await audioFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Create a temporary file path
        const tempFilePath = `/tmp/audio-${Date.now()}.wav`;
        
        // Use Node's filesystem to write the buffer
        const fs = require('fs');
        fs.writeFileSync(tempFilePath, buffer);

        try {
            console.log('Sending request to OpenAI...');
            const response = await openai.audio.transcriptions.create({
                file: fs.createReadStream(tempFilePath),
                model: "whisper-1",
            });

            // Clean up the temporary file
            fs.unlinkSync(tempFilePath);

            console.log('OpenAI response received:', response);
            return NextResponse.json({ text: response.text });
            
        } catch (openaiError) {
            // Clean up the temporary file in case of error
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
            
            console.error('OpenAI API error:', openaiError);
            return NextResponse.json(
                { error: 'OpenAI API error', details: openaiError.message },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('General error:', error);
        return NextResponse.json(
            { error: 'Error processing transcription', details: error.message },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};