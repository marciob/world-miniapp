"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, Languages, RotateCw, Mic, Volume2, VolumeX } from "lucide-react";

interface Message {
  id: string;
  text: string;
  speaker: "You" | "Emma";
  timestamp: string;
}

export default function ChatComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize audio element and add welcome message
  useEffect(() => {
    // Initialize audio with WebView-friendly settings
    audioRef.current = new Audio();
    audioRef.current.crossOrigin = "anonymous";
    audioRef.current.preload = "auto";

    audioRef.current.onplay = () => setIsSpeaking(true);
    audioRef.current.onended = () => setIsSpeaking(false);
    audioRef.current.onerror = (e) => {
      console.error("Audio error:", e);
      setIsSpeaking(false);
    };

    if (messages.length === 0) {
      const welcomeMessage =
        "Hello! I'm Emma, your AI assistant. How can I help you today?";
      addMessage(welcomeMessage, "Emma");
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.onplay = null;
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
      }
    };
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const playAudio = async (text: string) => {
    if (!isMuted) {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) throw new Error("Failed to generate speech");

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (!audioRef.current) {
          audioRef.current = new Audio();
        }

        // Configure audio for WebView
        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.preload = "auto";
        audioRef.current.src = audioUrl;

        // Enable play in WebView
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsSpeaking(true);
            })
            .catch((error) => {
              console.error("Audio playback failed:", error);
              setIsSpeaking(false);
            });
        }
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsSpeaking(false);
      }
    }
  };

  const addMessage = async (text: string, speaker: "You" | "Emma") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      speaker,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, newMessage]);

    if (speaker === "Emma") {
      await playAudio(text);
    }
  };

  const toggleMute = () => {
    if (isSpeaking && !isMuted && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsMuted(!isMuted);
  };

  const getAIResponse = async (userMessage: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to get AI response");

      const data = await response.json();
      await addMessage(data.text, "Emma");
    } catch (error) {
      console.error("Error getting AI response:", error);
      await addMessage("I'm sorry, I couldn't process that right now.", "Emma");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        },
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingComplete(false);
      setTranscript("");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Error accessing microphone. Please check your device settings.");
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);

      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob);

      try {
        const response = await fetch("/api/stt", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to transcribe audio");

        const { text } = await response.json();
        await handleChatFlow(text);
      } catch (error) {
        console.error("Error in transcription:", error);
        setIsProcessing(false);
      }

      // Clear the audio chunks
      audioChunksRef.current = [];
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");

    try {
      const response = await fetch("/api/stt", {
        method: "POST",
        body: formData,
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setTranscript(data.text);
      await addMessage(data.text, "You");
      await getAIResponse(data.text);
    } catch (error) {
      console.error("Error in transcription:", error);
      setTranscript("Error transcribing audio. Please try again.");
    }
  };

  const handleToggleRecording = () => {
    if (isSpeaking) return; // Prevent recording while AI is speaking

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleChatFlow = async (userMessage: string) => {
    // Add user message to chat
    await addMessage(userMessage, "You");

    setIsProcessing(true);
    try {
      // Get AI response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to get AI response");

      const data = await response.json();
      await addMessage(data.text, "Emma");
    } catch (error) {
      console.error("Error in chat flow:", error);
      addMessage("I'm sorry, I couldn't process that request.", "Emma");
    } finally {
      setIsProcessing(false);
    }
  };

  const initializeAudioContext = () => {
    try {
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();

      // Resume audio context on user interaction
      document.addEventListener(
        "touchstart",
        () => {
          if (audioContext.state === "suspended") {
            audioContext.resume();
          }
        },
        { once: true }
      );

      return audioContext;
    } catch (error) {
      console.error("WebView AudioContext initialization failed:", error);
      return null;
    }
  };

  useEffect(() => {
    const audioContext = initializeAudioContext();
    if (!audioContext) {
      console.warn("Audio might not work in this WebView environment");
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-700 to-gray-900">
      {/* Header */}
      <div className="flex items-center p-4 text-white">
        <div className="text-sm">{getCurrentTime()}</div>
        <div className="flex-grow"></div>
        <div className="flex items-center gap-2"></div>
      </div>

      {/* Navigation */}
      <div className="flex items-center px-4 text-white">
        <button className="p-2">←</button>
        <div className="text-xl ml-2">Call Mode</div>
        <div className="flex-grow"></div>
        <button
          onClick={toggleMute}
          className="p-2 hover:bg-gray-600 rounded-full transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>
        <button className="p-2">⋮</button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center pt-6 text-white">
        {/* Profile Image */}
        <div className="w-20 h-20 rounded-full bg-gray-600 overflow-hidden mb-4 flex items-center justify-center">
          <User className="w-12 h-12 text-gray-300" />
        </div>

        {/* Name and Status */}
        <div className="text-2xl font-medium mb-1">Emma</div>
        <div className="text-gray-400 mb-4 flex items-center gap-2">
          {isSpeaking && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Speaking</span>
            </div>
          )}
          {!isSpeaking && "AI Assistant"}
        </div>

        {/* Messages Section */}
        <div className="w-full flex-grow overflow-y-auto px-4 pb-4">
          <div className="bg-gray-800 rounded-lg p-4 h-full overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.speaker === "You" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{message.speaker}</span>
                    <span>{message.timestamp}</span>
                  </div>
                  <div
                    className={`mt-1 px-4 py-2 rounded-lg max-w-[80%] ${
                      message.speaker === "You" ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Status Indicators */}
            {isRecording && (
              <div className="flex items-center justify-center mt-4 text-gray-400">
                <div className="animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Recording...</span>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex items-center justify-center mt-4 text-gray-400">
                <div className="animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Processing...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-around items-center p-6">
        <button className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
          <User className="text-white w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
          <Languages className="text-white w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
          <RotateCw className="text-white w-6 h-6" />
        </button>
        <button
          onClick={handleToggleRecording}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isRecording ? "bg-red-600" : "bg-blue-600"
          } ${isSpeaking ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSpeaking}
        >
          <Mic className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
