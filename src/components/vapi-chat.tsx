"use client";

import { useState, useEffect, useRef } from "react";
import { VoiceChat } from "@/components/ui/voice-chat";
import { TextTranscript } from "@/components/ui/text-transcript";
import { Phone, PhoneOff } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import Vapi from "@vapi-ai/web";

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_KEY;
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

if (!VAPI_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_VAPI_KEY is not defined in environment variables");
}

if (!ASSISTANT_ID) {
  throw new Error("NEXT_PUBLIC_VAPI_ASSISTANT_ID is not defined in environment variables");
}

export function VapiChat() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [, setVolume] = useState(0);
  
  // Transcript state for timestamped complete responses
  const [aiText, setAiText] = useState("");
  const [userText, setUserText] = useState("");
  const [isAiStreaming, setIsAiStreaming] = useState(false);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vapiRef = useRef<any>(null);
  const currentUserTranscript = useRef<string>("");
  const currentAiTranscript = useRef<string>("");

  // Helper function to format timestamp
  const formatTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Initialize VAPI
  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(VAPI_PUBLIC_KEY!);
      
      // Set up event listeners
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (vapiRef.current as any).on("call-start", () => {
        console.log("Call started");
        setIsCallActive(true);
        setIsListening(false);
        setIsProcessing(false);
        setIsSpeaking(false);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (vapiRef.current as any).on("call-end", () => {
        console.log("Call ended");
        setIsCallActive(false);
        setIsListening(false);
        setIsProcessing(false);
        setIsSpeaking(false);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (vapiRef.current as any).on("speech-start", () => {
        console.log("User started speaking");
        setIsListening(true);
        setIsSpeaking(false);
        setIsProcessing(false);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (vapiRef.current as any).on("speech-end", () => {
        console.log("User stopped speaking");
        setIsListening(false);
        setIsProcessing(true);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (vapiRef.current as any).on("message", (message: unknown) => {
        console.log("Message received:", message);
        
        const msg = message as { 
          type: string; 
          role?: string; 
          status?: string;
          transcript?: string;
          transcriptType?: string;
        };
        
        // Handle transcript events for complete responses only
        if (msg.type === "transcript" && msg.transcriptType === "final") {
          const timestamp = formatTimestamp();
          
          if (msg.role === "user") {
            // Add complete user transcript with timestamp
            const userResponse = `[${timestamp}] You: ${msg.transcript || ''}`;
            setUserText(prev => prev ? `${prev}\n\n${userResponse}` : userResponse);
          } else if (msg.role === "assistant") {
            // Add complete AI transcript with timestamp
            const aiResponse = `[${timestamp}] AI: ${msg.transcript || ''}`;
            setAiText(prev => prev ? `${prev}\n\n${aiResponse}` : aiResponse);
          }
        }
        
        // Handle speech-update for visual feedback
        if (msg.type === "speech-update") {
          if (msg.role === "assistant") {
            if (msg.status === "started") {
              setIsProcessing(false);
              setIsSpeaking(true);
              setIsAiStreaming(true);
            } else if (msg.status === "stopped") {
              setIsSpeaking(false);
              setIsAiStreaming(false);
            }
          }
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (vapiRef.current as any).on("error", (error: unknown) => {
        console.error("VAPI error:", error);
        setIsCallActive(false);
        setIsListening(false);
        setIsProcessing(false);
        setIsSpeaking(false);
      });

      // Handle connection issues
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (vapiRef.current as any).on("call-failed", (error: unknown) => {
        console.error("VAPI call failed:", error);
        setIsCallActive(false);
        setIsListening(false);
        setIsProcessing(false);
        setIsSpeaking(false);
      });
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (vapiRef.current && typeof (vapiRef.current as any).stop === 'function') {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (vapiRef.current as any).stop();
        } catch (error) {
          console.error("Error stopping VAPI:", error);
        }
      }
    };
  }, []);

  const startCall = async () => {
    if (!vapiRef.current) return;
    
    try {
      // Start the call with assistant ID
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (vapiRef.current as any).start(ASSISTANT_ID!);
    } catch (error) {
      console.error("Failed to start call:", error);
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (vapiRef.current as any).stop();
      } catch (error) {
        console.error("Error ending call:", error);
      }
    }
    
    // Reset transcript state
    setAiText("");
    setUserText("");
    setIsAiStreaming(false);
    currentUserTranscript.current = "";
    currentAiTranscript.current = "";
  };

  const toggleCall = () => {
    if (isCallActive) {
      endCall();
    } else {
      startCall();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left side - Voice Interface */}
      <div className="w-1/2 flex flex-col">
        <div className="flex-1">
          <VoiceChat
            isListening={isListening}
            isProcessing={isProcessing}
            isSpeaking={isSpeaking}
            onVolumeChange={setVolume}
            onToggle={toggleCall}
            className="h-full"
          />
        </div>
        
        {/* Control buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={toggleCall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all",
                isCallActive
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              )}
            >
              {isCallActive ? (
                <>
                  <PhoneOff className="w-5 h-5" />
                  <span>End Conversation</span>
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  <span>Start Conversation</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Right side - Timestamped Transcript */}
      <div className="w-1/2 border-l border-gray-200 dark:border-gray-700">
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Conversation Transcript
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Timestamped complete responses from voice conversation
            </p>
          </div>
          
          <div className="flex-1">
            <TextTranscript
              aiText={aiText}
              userText={userText}
              isAiStreaming={isAiStreaming}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}