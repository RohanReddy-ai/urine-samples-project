"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TextTranscriptProps {
  aiText: string;
  userText: string;
  isAiStreaming: boolean;
  className?: string;
}

export function TextTranscript({ 
  aiText, 
  userText, 
  isAiStreaming, 
  className 
}: TextTranscriptProps) {
  const aiScrollRef = useRef<HTMLDivElement>(null);
  const userScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll text to speech voice model text as it streams
  useEffect(() => {
    if (aiScrollRef.current) {
      aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight;
    }
  }, [aiText]);

  // Auto-scroll user text when it updates
  useEffect(() => {
    if (userScrollRef.current) {
      userScrollRef.current.scrollTop = userScrollRef.current.scrollHeight;
    }
  }, [userText]);

  return (
    <div className={cn("flex h-full bg-blue-50 dark:bg-blue-800", className)}>
      {/* Text to Speech Voice Model Response Column */}
      <div className="flex-1 flex flex-col border-r border-blue-200 dark:border-blue-700">
        <div className="px-4 py-3 bg-blue-200 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-700">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Text to Speech Voice Model
          </h3>
        </div>
        <div 
          ref={aiScrollRef}
          className="flex-1 p-4 overflow-y-auto text-sm text-gray-900 dark:text-gray-100 leading-relaxed"
        >
          {aiText || (
            <div className="text-gray-500 dark:text-gray-400 italic">
              Text to speech voice model responses will appear here...
            </div>
          )}
          {isAiStreaming && (
            <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
          )}
        </div>
      </div>

      {/* User Speech Column */}
      <div className="flex-1 flex flex-col">
        <div className="px-4 py-3 bg-blue-300 dark:bg-blue-800/40 border-b border-blue-200 dark:border-blue-700">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Your Speech
          </h3>
        </div>
        <div 
          ref={userScrollRef}
          className="flex-1 p-4 overflow-y-auto text-sm text-gray-900 dark:text-gray-100 leading-relaxed"
        >
          {userText || (
            <div className="text-gray-500 dark:text-gray-400 italic">
              Your speech will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}