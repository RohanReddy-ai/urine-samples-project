"use client";

import { useState, useEffect, useRef } from "react";
import { VoiceChat } from "@/components/ui/voice-chat";
import { Phone, PhoneOff } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// @ts-expect-error - VAPI Web SDK doesn't have TypeScript definitions
import Vapi from "@vapi-ai/web";

const VAPI_PUBLIC_KEY = "2ff19bc4-1d8c-451d-a415-81501c77e779";
const ASSISTANT_ID = "95c312b3-1932-4a21-977a-ddcf8cff744e";

export function VapiChat() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [, setVolume] = useState(0);
  
  const vapiRef = useRef<unknown>(null);

  // Initialize VAPI
  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);
      
      // Set up event listeners
      vapiRef.current.on("call-start", () => {
        console.log("Call started");
        setIsCallActive(true);
        setIsListening(false);
        setIsProcessing(false);
        setIsSpeaking(false);
      });

      vapiRef.current.on("call-end", () => {
        console.log("Call ended");
        setIsCallActive(false);
        setIsListening(false);
        setIsProcessing(false);
        setIsSpeaking(false);
      });

      vapiRef.current.on("speech-start", () => {
        console.log("User started speaking");
        setIsListening(true);
        setIsSpeaking(false);
        setIsProcessing(false);
      });

      vapiRef.current.on("speech-end", () => {
        console.log("User stopped speaking");
        setIsListening(false);
        setIsProcessing(true);
      });

      vapiRef.current.on("message", (message: unknown) => {
        console.log("Message received:", message);
        
        const msg = message as { 
          type: string; 
          role?: string; 
          status?: string;
        };
        
        // Only handle speech-update for visual feedback
        if (msg.type === "speech-update") {
          if (msg.role === "assistant") {
            if (msg.status === "started") {
              setIsProcessing(false);
              setIsSpeaking(true);
            } else if (msg.status === "stopped") {
              setIsSpeaking(false);
            }
          }
        }
      });

      vapiRef.current.on("error", (error: unknown) => {
        console.error("VAPI error:", error);
        setIsCallActive(false);
        setIsListening(false);
        setIsProcessing(false);
        setIsSpeaking(false);
      });

      // Handle connection issues
      vapiRef.current.on("call-failed", (error: unknown) => {
        console.error("VAPI call failed:", error);
        setIsCallActive(false);
        setIsListening(false);
        setIsProcessing(false);
        setIsSpeaking(false);
      });
    }

    return () => {
      if (vapiRef.current && typeof vapiRef.current.stop === 'function') {
        try {
          (vapiRef.current as unknown as { stop: () => void }).stop();
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
      await (vapiRef.current as unknown as { start: (assistantId: string) => Promise<void> }).start(ASSISTANT_ID);
    } catch (error) {
      console.error("Failed to start call:", error);
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      try {
        (vapiRef.current as unknown as { stop: () => void }).stop();
      } catch (error) {
        console.error("Error ending call:", error);
      }
    }
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
      {/* Voice Interface - Full Screen */}
      <div className="flex-1 flex flex-col">
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
    </div>
  );
}