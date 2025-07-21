import { VapiChat } from "@/components/vapi-chat";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-blue-900">
      {/* Header */}
      <div className="bg-blue-600 dark:bg-blue-800 border-b border-blue-700 dark:border-blue-600 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center">
            Sample Drop Off/Labelling Assistant
          </h1>
          <p className="text-lg text-blue-100 text-center mt-2">
            Voice-powered text to speech voice model for medical sample processing
          </p>
        </div>
      </div>
      
      {/* Voice Chat Interface */}
      <VapiChat />
    </div>
  );
}
