TITLE: Advanced Endpointing with smartEndpointingPlan and customEndpointingRules
DESCRIPTION: The `smartEndpointingEnabled` property in `StartSpeakingPlan` is now deprecated. Developers should transition to using the new `smartEndpointingPlan` or `customEndpointingRules` properties, which offer enhanced control over speech endpointing and allow for custom rule definitions to improve conversational interactions.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
StartSpeakingPlan Updates:
  Deprecated Property: smartEndpointingEnabled
  New Properties for Endpointing Control:
    smartEndpointingPlan:
      Purpose: Enhanced control over speech endpointing
    customEndpointingRules:
      Purpose: Define custom rules for endpointing behavior
```

----------------------------------------

TITLE: Define Initial Message for Customer Identification
DESCRIPTION: Provides the initial message for the 'customer_identification' node, requesting the customer's phone number or email address to look up their account.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: txt
CODE:
```
I'll be happy to help you with that. To look up your account, can you please provide your phone number or email address associated with your TechGear Online account?
```

----------------------------------------

TITLE: TypeScript Conversation Chain with Context (previousChatId)
DESCRIPTION: Demonstrates how to build a conversational flow in TypeScript that maintains context using the `previousChatId` parameter. The `createConversation` function returns a `sendMessage` method that automatically updates the `lastChatId` for subsequent requests, ensuring continuity.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: typescript
CODE:
```
async function createConversation() {
  let lastChatId: string | undefined;

  async function sendMessage(input: string): Promise<any> {
    const response = await fetch('https://api.vapi.ai/chat', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assistantId: 'your-assistant-id',
        input: input,
        ...(lastChatId && { previousChatId: lastChatId })
      })
    });

    const chat = await response.json();
    lastChatId = chat.id;
    return chat.output[0].content;
  }

  return { sendMessage };
}

// Usage
const conversation = await createConversation();

const response1 = await conversation.sendMessage("Hello, I'm Alice");
console.log(response1);

const response2 = await conversation.sendMessage("What's my name?");
console.log(response2); // Should remember "Alice"
```

----------------------------------------

TITLE: Programmatically Create Vapi.ai Voice Assistant with TypeScript
DESCRIPTION: Demonstrates how to initialize the Vapi.ai client with an API key and programmatically create a new voice assistant. This includes configuring its AI model (e.g., GPT-4o), voice provider, and setting the initial message and system prompt using the Vapi.ai TypeScript SDK.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: typescript
CODE:
```
import { VapiClient } from '@vapi-ai/server-sdk';

// Initialize the Vapi client
const vapi = new VapiClient({
  token: 'your-api-key', // Replace with your actual API key
});

// Define the system prompt for customer support
const systemPrompt = `You are Alex, a customer service voice assistant for TechSolutions. Your primary purpose is to help customers resolve issues with their products, answer questions about services, and ensure a satisfying support experience.\n- Sound friendly, patient, and knowledgeable without being condescending\n- Use a conversational tone with natural speech patterns\n- Speak with confidence but remain humble when you don't know something\n- Demonstrate genuine concern for customer issues`;

async function createSupportAssistant() {
  try {
    const assistant = await vapi.assistants.create({
      name: 'Customer Support Assistant',
      // Configure the AI model
      model: {
        provider: 'openai',
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
        ],
      },
      // Configure the voice
      voice: {
        provider: 'playht',
        voice_id: 'jennifer',
      },
      // Set the first message
      firstMessage: 'Hi there, this is Alex from TechSolutions customer support. How can I help you today?',
    });

    console.log('Assistant created:', assistant.id);
    return assistant;
  } catch (error) {
    console.error('Error creating assistant:', error);
    throw error;
  }
}

// Create the assistant
createSupportAssistant();
```

----------------------------------------

TITLE: Create Vapi AI Assistant with Custom Configuration
DESCRIPTION: This snippet demonstrates how to create a new AI assistant using the Vapi AI SDK. It configures the assistant with a name, an initial greeting message, an OpenAI GPT-4o model with specific temperature and system message, and an ElevenLabs voice ID. The assistant is designed to act as a sales representative.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: typescript
CODE:
```
const assistant = await vapi.assistants.create({
  name: "Sales Assistant",
  firstMessage: "Hi! I'm calling about your interest in our software solutions.",
  model: {
    provider: "openai",
    model: "gpt-4o",
    temperature: 0.7,
    messages: [{
      role: "system",
      content: "You are a friendly sales representative. Keep responses under 30 words."
    }]
  },
  voice: {
    provider: "11labs",
    voiceId: "21m00Tcm4TlvDq8ikWAM"
  }
});
```

LANGUAGE: python
CODE:
```
assistant = vapi.assistants.create(
    name="Sales Assistant",
    first_message="Hi! I'm calling about your interest in our software solutions.",
    model={
        "provider": "openai",
        "model": "gpt-4o",
        "temperature": 0.7,
        "messages": [{
            "role": "system",
            "content": "You are a friendly sales representative. Keep responses under 30 words."
        }]
    },
    voice={
        "provider": "11labs",
        "voice_id": "21m00Tcm4TlvDq8ikWAM"
    }
)
```

LANGUAGE: java
CODE:
```
Assistant assistant = vapi.assistants().create(CreateAssistantRequest.builder()
    .name("Sales Assistant")
    .firstMessage("Hi! I'm calling about your interest in our software solutions.")
    .model(Model.builder()
            .provider("openai")
            .model("gpt-4o")
            .temperature(0.7)
            .messages(List.of(Message.builder()
                .role("system")
                .content("You are a friendly sales representative. Keep responses under 30 words.")
                .build()))
            .build())
        .voice(Voice.builder()
            .provider("11labs")
            .voiceId("21m00Tcm4TlvDq8ikWAM")
            .build())
        .build());
```

LANGUAGE: ruby
CODE:
```
assistant = vapi.assistants.create(
  name: "Sales Assistant",
  first_message: "Hi! I'm calling about your interest in our software solutions.",
  model: {
    provider: "openai",
    model: "gpt-4o",
    temperature: 0.7,
    messages: [{
      role: "system",
      content: "You are a friendly sales representative. Keep responses under 30 words."
    }]
  },
  voice: {
    provider: "11labs",
    voice_id: "21m00Tcm4TlvDq8ikWAM"
  }
)
```

LANGUAGE: csharp
CODE:
```
var assistant = await vapi.Assistants.CreateAsync(new CreateAssistantRequest
{
    Name = "Sales Assistant",
    FirstMessage = "Hi! I'm calling about your interest in our software solutions.",
    Model = new Model
    {
        Provider = "openai",
        ModelName = "gpt-4o",
        Temperature = 0.7,
        Messages = new List
        {
            new Message
            {
                Role = "system",
                Content = "You are a friendly sales representative. Keep responses under 30 words."
            }
        }
    },
    Voice = new Voice
    {
        Provider = "11labs",
        VoiceId = "21m00Tcm4TlvDq8ikWAM"
    }
});
```

LANGUAGE: go
CODE:
```
assistant, err := client.Assistants.Create(&vapi.CreateAssistantRequest{
    Name:         "Sales Assistant",
    FirstMessage: "Hi! I'm calling about your interest in our software solutions.",
    Model: &vapi.Model{
        Provider:    "openai",
        Model:       "gpt-4o",
        Temperature: 0.7,
        Messages: []vapi.Message{
            {
                Role:    "system",
                Content: "You are a friendly sales representative. Keep responses under 30 words.",
            },
        },
    },
    Voice: &vapi.Voice{
        Provider: "11labs",
        VoiceID:  "21m00Tcm4TlvDq8ikWAM",
    },
})
```

----------------------------------------

TITLE: Manage Conversational Context with Vapi and OpenAI SDK in TypeScript
DESCRIPTION: This TypeScript example demonstrates how to implement context management for chat sessions using Vapi's API and the OpenAI SDK. It defines a function to create a stateful chat session that remembers previous interactions by passing `previousChatId`, ensuring conversational continuity. A usage example illustrates how to maintain context across multiple messages.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: typescript
CODE:
```
function createContextualChatSession(apiKey: string, assistantId: string) {
  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://api.vapi.ai/chat'
  });
  let lastChatId: string | null = null;

  async function sendMessage(input: string, stream: boolean = false) {
    const requestParams = {
      model: 'gpt-4o',
      input: input,
      stream: stream,
      assistantId: assistantId,
      ...(lastChatId && { previousChatId: lastChatId })
    };

    const response = await openai.responses.create(requestParams);

    if (!stream) {
      lastChatId = response.id;
      return response.output[0].content[0].text;
    }

    return response;
  }

  return { sendMessage };
}

// Usage example
const session = createContextualChatSession('YOUR_VAPI_API_KEY', 'your-assistant-id');

const response1 = await session.sendMessage("My name is Sarah and I'm having login issues");
console.log('Response 1:', response1);

const response2 = await session.sendMessage("What was my name again?");
console.log('Response 2:', response2); // Should remember "Sarah"
```

----------------------------------------

TITLE: Vapi Tool Critical Response Rules
DESCRIPTION: Outlines essential rules for Vapi tool responses, such as always returning HTTP 200, using single-line strings, matching 'toolCallId's, including a 'results' array, and using string types for values. Adhering to these rules is critical for successful tool integration and operation.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
Critical Response Rules:
- Always return HTTP 200 (even for errors)
- Use single-line strings (no line breaks)
- Match tool call IDs exactly (from request to response)
- Include results array (required structure)
- String types only (for result/error values)
```

----------------------------------------

TITLE: Vapi.ai Custom Tool Definition (Dashboard Equivalent)
DESCRIPTION: Defines the structure and parameters for configuring a custom tool within the Vapi.ai platform, mirroring the dashboard's input fields. This specifies the tool's name, description, function signature, and required parameters for a weather lookup example.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
Tool Definition:
  Tool Name: "Weather Lookup"
  Description: "Retrieves current weather information for any location"
  Function Name: "get_weather"
  Parameters:
    location (string, required): "The city or location to get weather for"
  Server URL: "https://api.openweathermap.org/data/2.5/weather"
```

----------------------------------------

TITLE: Anthropic Model Integration
DESCRIPTION: Explains how to specify the new `claude-3-5-haiku-20241022` model for assistants by setting the provider and model name.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
Assistant.model:
  properties:
    provider: string = "anthropic"
    model: string = "claude-3-5-haiku-20241022"
```

----------------------------------------

TITLE: Tool Selection for Sending Confirmation
DESCRIPTION: Specifies the pre-configured tool responsible for sending a confirmation message to the customer. This tool can be an SMS or email confirmation service.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
Tool: pre-configured SMS/email confirmation tool
```

----------------------------------------

TITLE: Evaluate Account Inquiry Call Agent Rubric
DESCRIPTION: This rubric evaluates the voice agent's performance in an account inquiry call, focusing on presenting the current balance, providing transaction breakdown, and addressing concerns calmly.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: Markdown
CODE:
```
1. The voice agent clearly presents the current account balance.
2. The voice agent provides a detailed breakdown of recent transactions.
3. The response addresses the customer's concerns in a calm and informative manner.
```

----------------------------------------

TITLE: Assistant Overrides per Customer
DESCRIPTION: Enables customizing assistant settings for individual customers using the `assistantOverrides` property within the `CreateCustomerDTO` when creating customers, facilitating personalized assistant interactions.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
CreateCustomerDTO: {
  assistantOverrides?: object // Custom assistant settings for the customer
  // ... other customer properties
}
```

----------------------------------------

TITLE: Create Outbound Call with Vapi.ai Server SDK (TypeScript)
DESCRIPTION: Demonstrates how to initialize the VapiClient with an API token and programmatically create an outbound call using the server-side SDK. This snippet shows how to specify the phone number ID, customer details, and the assistant to be used for the call.
SOURCE: https://docs.vapi.ai/quickstart/web

LANGUAGE: TypeScript
CODE:
```
import { VapiClient } from "@vapi-ai/server-sdk";

const vapi = new VapiClient({
  token: process.env.VAPI_API_KEY!
});

// Create an outbound call
const call = await vapi.calls.create({
  phoneNumberId: "YOUR_PHONE_NUMBER_ID",
  customer: { number: "+1234567890" },
  assistantId: "YOUR_ASSISTANT_ID"
});

console.log(`Call created: ${call.id}`);
```

----------------------------------------

TITLE: Customize Call Analysis Structured Data Schema
DESCRIPTION: Illustrates how to define or customize the JSON Schema for structured data extraction in call analysis, specifying field types and required properties.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: json
CODE:
```
{
  "structuredDataSchema": {
    "type": "object",
    "properties": {
      "field1": { "type": "string" },
      "field2": { "type": "number" }
    },
    "required": ["field1", "field2"]
  }
}
```

----------------------------------------

TITLE: Configure Initial Sales Call Opening Node
DESCRIPTION: Sets up the first message and AI prompt for an outbound sales call, designed to initiate contact and determine the prospect's initial intent. It also outlines the variables extracted from the prospect's response, such as 'permission_status' with enum values like 'permission_granted', 'busy_reschedule', 'not_interested', and 'gatekeeper'.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: txt
CODE:
```
Hi, this is Alex calling from TechFlow Solutions. I hope I'm catching you at a good time. I'm reaching out because I noticed your company might benefit from our workflow automation platform. Do you have just 2 minutes to chat?
```

LANGUAGE: txt
CODE:
```
You are Alex, a professional outbound sales representative for TechFlow Solutions.

Listen for their response and determine:
- "permission_granted" if they agree to talk
- "busy_reschedule" if they're busy but open to rescheduling
- "not_interested" if they decline
- "gatekeeper" if you're speaking to someone who isn't the decision maker

Keep responses under 30 words and be respectful of their time.
```

----------------------------------------

TITLE: Create Assistant with Custom LLM Provider Model
DESCRIPTION: Provides the JSON payload structure for creating a new VAPI assistant configured to use a custom LLM provider and model. This includes specifying the provider name, model identifier, initial system messages for context, and optional parameters like temperature.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: json
CODE:
```
{
  "name": "My Assistant",
  "model": {
    "provider": "openrouter",
    "model": "cognitivecomputations/dolphin-mixtral-8x7b",
    "messages": [
      {
        "role": "system",
        "content": "You are an assistant."
      }
    ],
    "temperature": 0.7
  }
}
```

----------------------------------------

TITLE: Initiate Call Using Permanent Vapi.ai Configurations
DESCRIPTION: Illustrates how to start a Vapi.ai call by referencing previously created permanent assistant and tool configurations using their IDs. It also shows how to apply assistant overrides for specific call parameters, combining reusability with dynamic adjustments.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: bash
CODE:
```
curl -X POST "https://api.vapi.ai/call" \
  -H "Authorization: Bearer $VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumberId": "your-phone-number-id",
    "customer": {
      "number": "+1234567890"
    },
    "assistantId": "your-assistant-id",
    "assistantOverrides": {
      "toolIds": ["tool-id-1", "tool-id-2"],
      "variableValues": {
        "customerName": "John Smith",
        "accountId": "ACC123456"
      }
    }
  }'
```

----------------------------------------

TITLE: API Reference: Create OpenAI Compatible Chat Response
DESCRIPTION: Provides the API specification for creating a new chat response in an OpenAI compatible format. This endpoint requires authentication and a JSON request body.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
POST https://api.vapi.ai/chat/responses
Content-Type: application/json

Response Body:
- 200: OpenAI Responses API format - either non-streaming or streaming
```

----------------------------------------

TITLE: Create Vapi.ai Assistant (Python SDK Fragment)
DESCRIPTION: This Python code snippet illustrates a portion of the process for creating a Vapi.ai assistant using their SDK. It shows the handling of the first message, printing the assistant's ID upon success, and a basic error handling block. This is part of a larger function, likely `create_support_assistant()`.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: Python
CODE:
```
                    # Set the first message
                    first_message="Hi there, this is Alex from TechSolutions customer support. How can I help you today?",
                )

                print(f"Assistant created: {assistant.id}")
                return assistant
            except Exception as error:
                print(f"Error creating assistant: {error}")
                raise error

        # Create the assistant
        create_support_assistant()
```

----------------------------------------

TITLE: Assistant Hooks Configuration Schema
DESCRIPTION: Defines the overall structure for configuring assistant hooks, including events, actions, and optional filters. Hooks are defined within the `hooks` array of the assistant configuration, allowing for automated responses to various call events.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
hooks: Array of Hook objects
  Hook: Object
    on: String (Required) - The event that triggers the hook.
      Supported values: "call.ending", "assistant.speech.interrupted", "customer.speech.interrupted"
    do: Array of Action objects (Required) - The actions to perform.
      Action: Object
        type: String (Required) - Type of action.
          Supported values: "transfer", "function", "say"
        transfer: Object (if type is "transfer")
          destination: Object (Required) - Destination for the transfer.
            type: String (Required) - Type of destination.
              Supported values: "number", "sip"
            number: String (if type is "number") - Phone number.
            callerId: String (Optional, if type is "number") - Caller ID.
            sipUri: String (if type is "sip") - SIP URI.
        function: Object (if type is "function")
          name: String (Required) - Name of the function.
          parameters: Object (Optional) - Parameters for the function.
          description: String (Optional) - Description of the function.
          async: Boolean (Optional, if type is "function") - Whether to call function asynchronously.
          server: Object (Optional, if type is "function")
            url: String (Required) - URL of the server.
        say: String or Array of Strings (if type is "say") - Message(s) to say.
          exact: String or Array of Strings (Required) - The exact message(s) to say.
    filters: Array of Filter objects (Optional) - Conditions for the hook to trigger.
      Filter: Object
        type: String (Required) - Type of filter.
          Supported values: "oneOf"
        key: String (Required) - The key to filter on.
          Supported values: "call.endedReason"
        oneOf: Array of Strings (Required, if type is "oneOf") - List of values to match.
          Example values for "call.endedReason": "pipeline-error"
```

----------------------------------------

TITLE: Configure Workflow Conversation Nodes with OpenAI Models
DESCRIPTION: Conversation nodes in workflows can now be configured to use OpenAI models via `WorkflowOpenAIModel`. This allows customization of model parameters such as `maxTokens` and `temperature` to control response generation.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
WorkflowOpenAIModel:
  Properties:
    model: string (e.g., "gpt-4")
    maxTokens: number (optional)
    temperature: number (optional)
Usage: Conversation Nodes
```

----------------------------------------

TITLE: Create Vapi AI Assistant Programmatically
DESCRIPTION: This code snippet demonstrates how to create a Vapi AI assistant named 'Tom' with a predefined system prompt, first message, OpenAI model (gpt-4o), and an 11Labs voice. The assistant is configured to act as a VapiBank customer support agent, capable of checking balances and viewing transactions after verifying identity.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: typescript
CODE:
```
import { VapiClient } from "@vapi-ai/server-sdk";

const vapi = new VapiClient({ token: "YOUR_VAPI_API_KEY" });

const systemPrompt = `You are Tom, a friendly VapiBank customer support assistant. Help customers check balances and view recent transactions. Always verify identity with phone number first.`;

const assistant = await vapi.assistants.create({
  name: "Tom",
  firstMessage: "Hello, you've reached VapiBank customer support! My name is Tom, how may I assist you today?",
  model: {
    provider: "openai",
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: systemPrompt
      }
    ]
  },
  voice: {
    provider: "11labs",
    voice_id: "burt"
  }
});

console.log(`Assistant created with ID: ${assistant.id}`);
```

LANGUAGE: python
CODE:
```
import requests

url = "https://api.vapi.ai/assistant"
headers = {
    "Authorization": f"Bearer {YOUR_VAPI_API_KEY}",
    "Content-Type": "application/json"
}

system_prompt = "You are Tom, a friendly VapiBank customer support assistant. Help customers check balances and view recent transactions. Always verify identity with phone number first."

data = {
    "name": "Tom",
    "firstMessage": "Hello, you've reached VapiBank customer support! My name is Tom, how may I assist you today?",
    "model": {
        "provider": "openai",
        "model": "gpt-4o",
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            }
        ]
    },
    "voice": {
        "provider": "11labs",
        "voice_id": "burt"
    }
}

response = requests.post(url, headers=headers, json=data)
assistant = response.json()
print(f"Assistant created with ID: {assistant['id']}")
```

LANGUAGE: bash
CODE:
```
curl -X POST https://api.vapi.ai/assistant \
         -H "Authorization: Bearer YOUR_VAPI_API_KEY" \
         -H "Content-Type: application/json" \
         -d '{
           "name": "Tom",
           "firstMessage": "Hello, you've reached VapiBank customer support! My name is Tom, how may I assist you today?",
           "model": {
             "provider": "openai",
             "model": "gpt-4o",
             "messages": [
               {
                 "role": "system",
                 "content": "You are Tom, a friendly VapiBank customer support assistant. Help customers check balances and view recent transactions. Always verify identity with phone number first."
               }
             ]
           },
           "voice": {
             "provider": "11labs",
             "voice_id": "burt"
           }
         }'
```

----------------------------------------

TITLE: Enable Organization-Level Compliance Settings with CompliancePlan
DESCRIPTION: Organizations can now specify compliance settings using the new `compliancePlan` property. This enables features such as PCI compliance at the organizational level, enhancing security and regulatory adherence.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
Organization:
  properties:
    compliancePlan: object (enables PCI compliance at the organization level)
```

----------------------------------------

TITLE: Create a Vapi.ai Assistant
DESCRIPTION: Illustrates how to create a new Vapi.ai assistant using different programming languages and cURL. This operation typically involves sending a JSON payload with the assistant's configuration.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: shell
CODE:
```
curl -X POST https://api.vapi.ai/assistant \
     -H "Authorization: Bearer " \
     -H "Content-Type: application/json" \
     -d '{}'
```

LANGUAGE: python
CODE:
```
from vapi import Vapi

client = Vapi(
    token="YOUR_TOKEN",
)
client.assistants.create()
```

LANGUAGE: typescript
CODE:
```
import { VapiClient, Vapi } from "@vapi/server-sdk";

const client = new VapiClient({ token: "YOUR_TOKEN" });
await client.assistants.create({});
```

LANGUAGE: go
CODE:
```
import (
	context "context"
	option "github.com/VapiAI/server-sdk-go/option"
	serversdkgo "github.com/VapiAI/server-sdk-go"
	serversdkgoclient "github.com/VapiAI/server-sdk-go/client"
)

client := serversdkgoclient.NewClient(
	option.WithToken(
		"",
	),
)
response, err := client.Assistants.Create(
	context.TODO(),
	&serversdkgo.CreateAssistantDto{},
)
```

----------------------------------------

TITLE: Add New `Kylie` Voice to Vapi Provider
DESCRIPTION: A new voice, `Kylie`, is now available for use with Vapi as the voice provider. This expands the range of available voices for assistant configurations.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
Vapi Voice Provider:
  Available Voices:
    - Kylie
Configuration: Assistant Voice Configuration
```

----------------------------------------

TITLE: Configure Initial Conversation Node for Vapi Workflow
DESCRIPTION: This snippet defines the initial greeting message and prompt for the Vapi AI conversation node. It sets up the AI's persona, introduces its capabilities, and guides it to extract the customer's primary intent from their response, categorizing it into predefined types.
SOURCE: https://docs.vapi.ai/workflows/examples/appointment-scheduling

LANGUAGE: APIDOC
CODE:
```
First Message:
Hello! Thank you for calling Tony's Barbershop. This is Sarah, your booking assistant. I can help you schedule, reschedule, or cancel appointments. How can I help you today?

Prompt:
You are Sarah, the friendly booking assistant for Tony's Barbershop.

Listen to the customer's response and determine their intent:
- "schedule" for new appointments
- "reschedule" for changing existing appointments
- "cancel" for canceling appointments
- "status" for checking appointment details
- "other" for anything else

Keep responses under 35 words. Ask clarifying questions if intent is unclear.

Extract Variables:
Variable: `intent`
Type: `String`
Description: `The customer's primary intent`
Enum Values: `schedule`, `reschedule`, `cancel`, `status`, `other`
```

----------------------------------------

TITLE: Retrieve a Vapi.ai Assistant by ID
DESCRIPTION: Shows how to fetch details of a specific Vapi.ai assistant using its unique ID across various programming languages and cURL. This operation requires the assistant's ID as a path parameter.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: shell
CODE:
```
curl https://api.vapi.ai/assistant/id \
     -H "Authorization: Bearer "
```

LANGUAGE: python
CODE:
```
from vapi import Vapi

client = Vapi(
    token="YOUR_TOKEN",
)
client.assistants.get(
    id="id",
)
```

LANGUAGE: typescript
CODE:
```
import { VapiClient } from "@vapi/server-sdk";

const client = new VapiClient({ token: "YOUR_TOKEN" });
await client.assistants.get("id");
```

LANGUAGE: go
CODE:
```
import (
	context "context"
	option "github.com/VapiAI/server-sdk-go/option"
	serversdkgoclient "github.com/VapiAI/server-sdk-go/client"
)

client := serversdkgoclient.NewClient(
	option.WithToken(
		"",
	),
)
response, err := client.Assistants.Get(
	context.TODO(),
	"id",
)
```

----------------------------------------

TITLE: API Request Parameters, Headers, and Body Definition
DESCRIPTION: Defines the structure for API requests, including path parameters, authentication headers, and the expected fields within the request body, along with an illustrative JSON payload structure.
SOURCE: https://docs.vapi.ai/api-reference/calls/update

LANGUAGE: APIDOC
CODE:
```
API Endpoint Details:

JSON Structure Example/Schema:
{
  "delimiters": "#",
  "backgroundDenoisingEnabled": false,
  "number": "foo",
  "sipUri": "foo",
  "name": "foo",
  "email": "foo",
  "externalId": "foo",
  "name": "foo",
  "schedulePlan": {
    "earliestAt": "foo",
    "latestAt": "foo"
  },
  "transport": {},
  "phoneCallProvider": "twilio",
  "phoneCallProviderId": "foo"
}

Path Parameters:
  id: string (Required)

Headers:
  Authorization: string (Required)
    Description: Bearer authentication of the form Bearer <token>, where token is your auth token.

Request Body:
  This endpoint expects an object.
  name: string (Optional)
    Constraints: <=40 characters
    Description: This is the name of the call. This is just for your own reference.
```

----------------------------------------

TITLE: Configure Vapi Assistant with Custom LLM for Response Generation
DESCRIPTION: This snippet demonstrates how to update an existing Vapi assistant to use a custom LLM for response generation only, without tool calling. It uses a PATCH request to the Vapi API, specifying the custom LLM's URL, model, and initial system messages, along with transcriber settings.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: bash
CODE:
```
curl -X PATCH https://api.vapi.ai/assistant/insert-your-assistant-id-here \
     -H "Authorization: Bearer insert-your-private-key-here" \
     -H "Content-Type: application/json" \
     -d '{
  "model": {
    "provider": "custom-llm",
    "model": "gpt-4o",
    "url": "https://custom-llm-url/chat/completions",
    "messages": [
      {
        "role": "system",
        "content": "[TASK] Ask the user if they want to transfer the call; if not, continue the conversation."
      }
    ]
  },
  "transcriber": {
    "provider": "azure",
    "language": "en-CA"
  }
}'
```

----------------------------------------

TITLE: Install Vapi.ai Server SDK for JavaScript/Python
DESCRIPTION: Provides command-line instructions for installing the Vapi.ai server-side SDK using various package managers like npm, yarn, pnpm, bun for JavaScript/TypeScript projects, and pip for Python projects.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: bash
CODE:
```
npm install @vapi-ai/server-sdk
```

LANGUAGE: bash
CODE:
```
yarn add @vapi-ai/server-sdk
```

LANGUAGE: bash
CODE:
```
pnpm add @vapi-ai/server-sdk
```

LANGUAGE: bash
CODE:
```
bun add @vapi-ai/server-sdk
```

LANGUAGE: bash
CODE:
```
pip install vapi_server_sdk
```

----------------------------------------

TITLE: Condition for Error Handling/Customer Confusion
DESCRIPTION: Specifies the condition for activating the global error handling node, triggered when the customer is confused or an error is detected.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: txt
CODE:
```
Customer confused or error detected
```

----------------------------------------

TITLE: Define Tool Schema for 'get_weather'
DESCRIPTION: This JSON snippet defines the schema for a 'get_weather' tool, specifying its name, parameters, and required fields. It ensures that the 'city' parameter is mandatory for weather lookups.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: json
CODE:
```
{
  "name": "get_weather",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "City name for weather lookup"
      }
    },
    "required": ["city"] // Must be array of required parameter names
  }
}
```

----------------------------------------

TITLE: Integrate Provider Lookup API Tool Node
DESCRIPTION: Configures a tool node to check for available appointments by calling an API, considering the determined urgency and required specialty.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: txt
CODE:
```
Urgency level determined and provider needed
```

LANGUAGE: APIDOC
CODE:
```
Tool Node Action: Checks available appointments based on urgency and specialty
```

----------------------------------------

TITLE: Create Vapi.ai Patient Lookup Tool via cURL
DESCRIPTION: Shows a direct cURL command to create a 'Patient Lookup' tool with the Vapi.ai API. This example specifies the tool's function name, description, and required parameters for looking up a patient by ID.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: bash
CODE:
```
# Create Patient Lookup Tool
curl -X POST https://api.vapi.ai/tool \
     -H "Authorization: Bearer YOUR_VAPI_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "type": "function",
       "function": {
         "name": "lookup_patient",
         "description": "Look up patient record by ID",
         "parameters": {
           "type": "object",
           "properties": {
             "patient_id": {
               "type": "string",
               "description": "Patient ID number"
             }
           },
           "required": ["patient_id"]
         }
       },
       "serverUrl": "https://jsonplaceholder.typicode.com/users"
```

----------------------------------------

TITLE: Programmatically Create Vapi.ai Voice Assistant with Python
DESCRIPTION: Illustrates how to initialize the Vapi.ai client with an API key and begin the process of creating a new voice assistant. This snippet shows configuration for the AI model and voice provider using the Vapi.ai Python SDK.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: python
CODE:
```
from vapi import Vapi

# Initialize the Vapi client
client = Vapi(token="your-api-key")  # Replace with your actual API key

# Define the system prompt for customer support
system_prompt = """You are Alex, a customer service voice assistant for TechSolutions. Your primary purpose is to help customers resolve issues with their products, answer questions about services, and ensure a satisfying support experience.
- Sound friendly, patient, and knowledgeable without being condescending
- Use a conversational tone with natural speech patterns
- Speak with confidence but remain humble when you don't know something
- Demonstrate genuine concern for customer issues"""

def create_support_assistant():
    try:
        assistant = client.assistants.create(
            name="Customer Support Assistant",
            # Configure the AI model
            model={
                "provider": "openai",
                "model": "gpt-4o",
                "messages": [
                    {
                        "role": "system",
                        "content": system_prompt,
                    }
                ],
            },
            # Configure the voice
            voice={
                "provider": "playht",
                "voice_id": "jennifer",
            },
```

----------------------------------------

TITLE: Define Initial Greeting Message for Conversation Node
DESCRIPTION: Sets the initial message for the 'greeting_and_inquiry_type' conversation node, introducing the virtual assistant and outlining the types of customer service assistance available.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: txt
CODE:
```
Hello! Thank you for calling TechGear Online customer service. This is Emma, your virtual assistant. I can help you track orders, process returns, answer product questions, or resolve any issues. How can I assist you today?
```

----------------------------------------

TITLE: Variable Extraction Definition: Order Number
DESCRIPTION: Defines the 'order_number' variable, specifying its type as string and its purpose as storing the customer's order number for subsequent use in the flow.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
Variable: order_number
Type: string
Description: Customer's order number
```

----------------------------------------

TITLE: Define Prompt for Order Number Collection
DESCRIPTION: This prompt guides the AI in collecting the order number, emphasizing patience and offering alternative methods if the customer struggles to find it.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: txt
CODE:
```
You are collecting the order number for tracking.

Be patient if they need time to find it.
Offer alternative methods if they can't locate the order number.
Keep responses under 25 words.
```

----------------------------------------

TITLE: API Reference: analysisPlan Object
DESCRIPTION: This object defines the plan for analysis of the assistant's calls, with its data stored in `call.analysis`.
SOURCE: https://docs.vapi.ai/api-reference/assistants/create

LANGUAGE: APIDOC
CODE:
```
analysisPlan: object Optional
  Description: This is the plan for analysis of assistant’s calls. Stored in `call.analysis`.
  Properties: 5
```

----------------------------------------

TITLE: Optional Ephemeral Announcement and Conference Exit
DESCRIPTION: This optional route (`/announce`) demonstrates how to play an announcement (e.g., 'Specialist is not available') and then join and immediately end the conference. This can be used for scenarios where a specialist is unavailable and the call needs to be gracefully terminated.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: js
CODE:
```
app.post("/announce", (req, res) => {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();
  twiml.say("Specialist is not available. Ending call now.");

  // Join the conference, then end it.
  twiml.dial().conference(
    {
      startConferenceOnEnter: true,
      endConferenceOnExit: true,
    },
    "my_conference_room"
  );

  return res.type("text/xml").send(twiml.toString());
});
```

----------------------------------------

TITLE: Vapi SIP Trunking Network IP Allowlist
DESCRIPTION: Lists the required IP addresses that must be allowlisted for SIP signaling and media traffic between Vapi and a SIP provider. These IPs are exclusively for SIP traffic.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
IP Addresses:
- 44.229.228.186/32
- 44.238.177.138/32
- 172.31.9.106/32
```

----------------------------------------

TITLE: Configure Tool with Strict Validation and Token Limit
DESCRIPTION: This JSON configuration demonstrates how to enable strict validation ("strict: true") for a tool to catch schema errors early. It also shows how to increase the "maxTokens" limit for complex tool responses, preventing truncation.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: json
CODE:
```
{
  "name": "get_weather",
  "description": "Get current weather for a city",
  "parameters": {
    // ... your parameters
  },
  "strict": true,
  "maxTokens": 500
}
```

----------------------------------------

TITLE: VAPI Voice Input Formatting Functions Overview
DESCRIPTION: This section provides an overview of VAPI's built-in voice input formatting functions, detailing their purpose, example inputs, and expected outputs for enhancing text-to-speech clarity and naturalness.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
formatNumbers:
  description: Formats general numbers: years read as digits, large numbers spelled out, negative and decimal numbers clarified.
  example_input: -9, 2.5, 2023
  example_output: minus nine, two point five, 2023

removeAsterisks:
  description: Removes all asterisk characters from the text.
  example_input: **Bold** and *italic*
  example_output: Bold and italic

Applying Replacements:
  description: Applies user-defined final replacements like expanding street abbreviations.
  example_input: 320 ST 21 RD
  example_output: 320 STREET 21 ROAD
```

----------------------------------------

TITLE: Initiate Outbound Call via Vapi.ai API
DESCRIPTION: This cURL command initiates an outbound call through the Vapi.ai API. It requires your Vapi API key, the `assistantId` to use for the call, the `DESTINATION_PHONE_NUMBER` to call, and the `phoneNumberId` of your registered Vapi.ai phone number. The call will be routed via the configured SIP trunk.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: bash
CODE:
```
curl --location 'https://api.vapi.ai/call/phone' \
--header 'Authorization: Bearer YOUR_VAPI_API_KEY' \
--header 'Content-Type: application/json' \
--data '{
  "assistantId": "YOUR_ASSISTANT_ID",
  "customer": {
    "number": "DESTINATION_PHONE_NUMBER",
    "numberE164CheckEnabled": false
  },
  "phoneNumberId": "YOUR_PHONE_NUMBER_ID"
}'
```

----------------------------------------

TITLE: Control Text Replacement Behavior
DESCRIPTION: Introduces `replaceAllEnabled` in `ExactReplacement` configurations to control whether all instances of a specified text (`key`) are replaced or just the first occurrence. Setting it to `true` ensures all instances are replaced.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
ExactReplacement: {
  key: string,
  value: string,
  replaceAllEnabled?: boolean // Default: false (replaces only first occurrence)
}
```

----------------------------------------

TITLE: Configure Phone Number Hook to Transfer Call to Number on Ringing
DESCRIPTION: Updates an existing Vapi.ai phone number to include a hook that transfers an incoming call to another phone number when it starts ringing. This is useful for routing calls to different destinations.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: bash
CODE:
```
curl -X PATCH "https://api.vapi.ai/phone-number/" \
     -H "Authorization: Bearer " \
     -H "Content-Type: application/json" \
     -d '{
  "hooks": [{
    "on": "call.ringing",
    "do": [{
      "type": "transfer",
      "destination": {
        "type": "number",
        "number": "+1234567890",
        "callerId": "+1987654321"
      }
    }]
  }]
}'
```

----------------------------------------

TITLE: Vapi.ai Session Creation Response Example
DESCRIPTION: An example of the JSON response received from the Vapi.ai API after successfully creating a new session. It includes the unique session ID and the associated assistant ID.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: json
CODE:
```
{
  "id": "session_xyz789",
  "assistantId": "your-assistant-id"
}
```

----------------------------------------

TITLE: Retrieve Call Analysis using Vapi SDK (TypeScript)
DESCRIPTION: This TypeScript example demonstrates how to use the `@vapi-ai/server-sdk` to programmatically fetch call analysis data. It includes functions to get a call by ID, access its summary and success evaluation, and extract potential improvement suggestions for AI assistant prompts.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: typescript
CODE:
```
import { VapiClient } from "@vapi-ai/server-sdk";

const vapi = new VapiClient({ token: "YOUR_VAPI_API_KEY" });

// Retrieve call analysis for continuous improvement
async function getCallAnalysis(callId: string) {
  try {
    const call = await vapi.calls.get(callId);

    if (call.analysis) {
      console.log("Call Summary:", call.analysis.summary);
      console.log("Success Score:", call.analysis.successEvaluation);

      // Use analysis data to improve prompts
      return {
        summary: call.analysis.summary,
        successScore: call.analysis.successEvaluation,
        improvements: extractImprovements(call.analysis)
      };
    }
  } catch (error) {
    console.error("Error fetching call analysis:", error);
  }

  return call;
}

// Extract improvement suggestions from analysis
function extractImprovements(analysis: any) {
  // Analyze patterns to suggest prompt improvements
  return {
    promptSuggestions: "Based on call analysis...",
    commonQueries: "Users frequently ask about...",
    successFactors: "Successful calls typically..."
  };
}

// Get analysis for a specific call
const analysis = await getCallAnalysis("CALL_ID");
```

----------------------------------------

TITLE: Define Inquiry Type Variable Extraction Schema
DESCRIPTION: Specifies the schema for extracting the 'inquiry_type' variable from the customer's response, including its data type (String), a description, and the enumerated valid values for categorization.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
Variable: `inquiry_type`
Type: `String`
Description: `The customer's inquiry type`
Enum Values: `order_tracking`, `return_exchange`, `product_inquiry`, `billing_payment`, `complaint`, `general`
```

----------------------------------------

TITLE: Condition for Order Tracking Flow Node
DESCRIPTION: Specifies the condition for entering the 'order_tracking_flow' conversation node, which requires both customer verification and the inquiry type to be 'order tracking'.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: txt
CODE:
```
Customer verified and inquiry is order tracking
```

----------------------------------------

TITLE: Test Vapi AI API Compatibility with cURL
DESCRIPTION: Demonstrates how to make a direct API call to Vapi AI's chat endpoint using cURL, mimicking an OpenAI-like request structure to test compatibility with Vapi's API.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: bash
CODE:
```
curl -X POST https://api.vapi.ai/chat/responses \
  -H "Authorization: Bearer YOUR_VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "input": "Hello, I need help with my account",
    "stream": false,
    "assistantId": "your-assistant-id"
  }'
```

----------------------------------------

TITLE: Server Response for Vapi Function Call (String Result)
DESCRIPTION: Example JSON response expected by Vapi from your server after a function call, containing a simple string result. This result is appended to the conversation.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: json
CODE:
```
{ "result": "Your email has been sent." }
```

----------------------------------------

TITLE: Initial Message for VIP Customer Priority Node
DESCRIPTION: The first message delivered by the AI from the 'vip_customer_priority' node, acknowledging the VIP status and assuring prioritized, quick resolution.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: txt
CODE:
```
Thank you for being a valued VIP customer! I'm prioritizing your call and will personally ensure your issue is resolved quickly. How can I assist you today?
```

----------------------------------------

TITLE: Customize Conditional Call Transfer Messages
DESCRIPTION: This JSON snippet shows how to define a `request-start` message that is played to the caller when a transfer is initiated. The message is conditional, ensuring the correct announcement is made based on the specific transfer `destination`.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: json
CODE:
```
{
  "messages": [
    {
      "type": "request-start",
      "content": "I am forwarding your call to Department A. Please stay on the line.",
      "conditions": [
        {
          "param": "destination",
          "operator": "eq",
          "value": "+1234567890"
        }
      ]
    }
  ]
}
```

----------------------------------------

TITLE: Define Prompt for VIP Customer Service
DESCRIPTION: This prompt guides the AI in providing VIP-level customer service, emphasizing extra attentiveness, premium solutions, and expedited handling.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: txt
CODE:
```
You are providing VIP-level customer service to a high-value customer.

Be extra attentive and go above and beyond normal service.
Offer premium solutions and expedited handling.
Keep responses under 35 words but show special attention.
```

----------------------------------------

TITLE: AI Edge Condition `matches` Renamed to `prompt`
DESCRIPTION: The `matches` property in AI edge conditions has been renamed to `prompt`. This property now accepts a natural language condition (up to 1000 characters) to guide AI decision-making in workflows.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
AIEdgeCondition: {
  prompt: string // Natural language condition, max 1000 characters
  // ... previously 'matches'
}
```

----------------------------------------

TITLE: New OpenAI Realtime Preview Models
DESCRIPTION: Adds `gpt-4o-realtime-preview-2024-12-17` and `gpt-4o-mini-realtime-preview-2024-12-17` as new models for `OpenAIModel.model` and `OpenAIModel.fallbackModels`.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
OpenAIModel.model:
  options:
    - gpt-4o-realtime-preview-2024-12-17
    - gpt-4o-mini-realtime-preview-2024-12-17
OpenAIModel.fallbackModels:
  options:
    - gpt-4o-realtime-preview-2024-12-17
    - gpt-4o-mini-realtime-preview-2024-12-17
```

----------------------------------------

TITLE: Vapi Assistant Variable Placeholder Syntax
DESCRIPTION: Illustrates the syntax for embedding dynamic variables within Vapi assistant instructions or messages, allowing for personalized conversation content based on data provided by your server.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: text
CODE:
```
"Hello {{customerName}}! I see you've been a {{accountType}} customer since {{joinDate}}."
```

----------------------------------------

TITLE: Configure VAPI for Flush Syntax Support
DESCRIPTION: This snippet demonstrates the necessary configuration to enable flush syntax in VAPI. The `chunkPlan` must be explicitly enabled within the voice settings for flush tags to be processed correctly.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: json
CODE:
```
{
  "voice": {
    "chunkPlan": {
      "enabled": true  // Required for flush to work
    }
  }
}
```

LANGUAGE: typescript
CODE:
```
const assistant = await vapi.assistants.create({
  voice: {
    chunkPlan: {
      enabled: true
    }
    // ... other configuration
  }
});
```

----------------------------------------

TITLE: Vapi Dashboard: Launching an Outbound Campaign
DESCRIPTION: This section outlines the step-by-step process to create and launch a new outbound call campaign using the Vapi dashboard. It covers campaign naming, type selection, phone number assignment, recipient CSV upload, and Assistant configuration.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: APIDOC
CODE:
```
1. Access Dashboard:
   - Go to dashboard.vapi.ai and log in.
2. Navigate to Campaigns:
   - Click 'Outbound Campaigns' in the left sidebar.
3. Create New Campaign:
   - Click 'Create Campaign'.
   - Enter 'Campaign Name' (e.g., "Post-Service Feedback Campaign").
   - Select 'Campaign Type' based on feedback needs.
4. Select Phone Number:
   - Choose an available phone number (must be from a provider like Twilio, not a Vapi free number).
5. Upload Customer List (Recipients):
   - Click 'Manage Recipients'.
   - Upload your CSV file with customer information.
   - Review the recipient list for accuracy.
   - Ensure CSV follows best practices (e.g., E.164 format for numbers).
6. Choose Assistant:
   - Select an existing Assistant configured to conduct the calls.
7. Review and Launch:
   - Review all campaign settings.
   - Verify recipient count and Assistant configuration.
   - Click 'Launch Campaign' to start outbound calls.
```

----------------------------------------

TITLE: Configure and Initiate Calls with Transient VAPI.ai Assistants
DESCRIPTION: These snippets demonstrate how to configure a transient VAPI.ai assistant with pre-filled customer data and then initiate a call using this configuration. The JSON defines the assistant's behavior, while the `curl` command shows how to create a call with such an assistant directly in the API request payload.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: json
CODE:
```
{
    "assistant": {
      "name": "Customer Service Agent",
      "model": {
        "provider": "openai",
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "content": "You are a customer service representative for Acme Corp. The customer's name is John Smith and their account status is premium. Provide personalized assistance based on their business account history."
          }
        ],
        "temperature": 0.7
      },
      "voice": {
        "provider": "11labs",
        "voiceId": "N2lVS1w4EtoT3dr4eOWO"
      },
      "firstMessage": "Hello John, I see you're calling about your business account. How can I help you today?"
    }
  }
```

LANGUAGE: bash
CODE:
```
curl -X POST "https://api.vapi.ai/call" \
    -H "Authorization: Bearer $VAPI_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "phoneNumberId": "your-phone-number-id",
      "customer": {
        "number": "+1234567890"
      },
      "assistant": {
        "name": "Personalized Sales Agent",
        "model": {
          "provider": "openai",
          "model": "gpt-4",
          "messages": [
            {
              "role": "system",
              "content": "You are calling John about their interest in Enterprise Solution. Their budget is $5000."
            }
          ]
        },
        "voice": {
          "provider": "11labs",
          "voiceId": "N2lVS1w4EtoT3dr4eOWO"
        },
        "firstMessage": "Hi John, this is Sarah from Acme Corp calling about Enterprise Solution. Do you have a moment to chat?"
      }
    }'
```

----------------------------------------

TITLE: Configure Vapi.ai Assistant with Custom LLM and Tools via cURL
DESCRIPTION: This `PATCH` request uses `curl` to update a Vapi.ai assistant's configuration. It specifies a custom LLM provider and model, defines system messages for the assistant's behavior, and integrates both native `transferCall` and custom `processOrder` tools, including their respective configurations and server endpoints. It also sets the transcriber details.
SOURCE: https://docs.vapi.ai/llms-full

LANGUAGE: bash
CODE:
```
curl -X PATCH https://api.vapi.ai/assistant/insert-your-assistant-id-here \
     -H "Authorization: Bearer insert-your-private-key-here" \
     -H "Content-Type: application/json" \
     -d '{
  "model": {
    "provider": "custom-llm",
    "model": "gpt-4o",
    "url": "https://custom-llm-url/chat/completions",
    "messages": [
      {
        "role": "system",
        "content": "[TASK] Ask the user if they want to transfer the call; if they agree, trigger the transferCall tool; if not, continue the conversation. Also, if the user asks about the custom function processOrder, trigger that tool."
      }
    ],
    "tools": [
      {
        "type": "transferCall",
        "destinations": [
          {
            "type": "number",
            "number": "+xxxxxx",
            "numberE164CheckEnabled": false,
            "message": "Transferring Call To Customer Service Department"
          }
        ]
      },
      {
        "type": "function",
        "async": false,
        "function": {
          "name": "processOrder",
          "description": "it's a custom tool function named processOrder according to vapi.ai custom tools guide"
        },
        "server": {
          "url": "https://custom-llm-url/chat/completions/custom-tool"
        }
      }
    ]
  },
  "transcriber": {
    "provider": "azure",
    "language": "en-CA"
  }
}'
```