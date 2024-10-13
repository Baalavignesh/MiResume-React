import {
  Assistant,
  AssistantCreateParams,
  AssistantTool,
} from "openai/resources/beta/assistants.mjs";
import OpenAIClient from "../config/azure_openai_config";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import {
  Message,
  MessagesPage,
} from "openai/resources/beta/threads/messages.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";

const CreateAssistant = async () => {
  const assistantsClient = OpenAIClient();
  console.log(assistantsClient);

  const options: AssistantCreateParams = {
    model: import.meta.env.VITE_AZURE_AI_DEPLOYMENT_NAME,
    name: "Resume and Cover letter builder",
    instructions:
      "You are a personal resume and cover letter builder. Using the provided user information create a latex with the most appropriate project, skill and experience for the desired job role provided. Create the latex by filling in the spaces in the given latex template. The key thing to remember is it should be a 1 page resume, only use the relevent project and work experience according to the job description provided.",
    tools: [{ type: "code_interpreter" } as AssistantTool],
  };

  try {
    console.log(options);
    const assistantResponse: Assistant =
      await assistantsClient.beta.assistants.create(options);
    console.log(`Assistant created: ${JSON.stringify(assistantResponse)}`);
    return assistantResponse;
  } catch (error) {
    console.error("Error creating assistant:", error);
  }
};

const CreateThread = async () => {
  const assistantsClient = OpenAIClient();

  const assistantThread: Thread = await assistantsClient.beta.threads.create(
    {}
  );
  console.log(`Thread created: ${JSON.stringify(assistantThread)}`);
  //   Store the Thread ID for further chats
};

const CreateandRunInitialMessage = async (
  threadId: string,
  assistantId: string
) => {
  assistantId = "asst_6e0NImnxcGwA775qGVuo1l5D";
  threadId = "thread_YTlgQeCSZDKIpyWFB2NvNvZ0";
  const assistantsClient = OpenAIClient();

  const role = "user";

  const threadResponse: Message =
    await assistantsClient.beta.threads.messages.create(threadId, {
      role,
      content: `This is the latex template which you will be using as the base template for all the resumes that you will be generating for me. The latex file ID you will use: assistant-9gNLw1N3hu6xfBPhiJumO8Do
`,
    });

  //  Attach the latex file here
  console.log(`Message created:  ${threadResponse}`);
  console.log(threadResponse);

  // Run the thread and poll it until it is in a terminal state
  const runResponse: Run =
    await assistantsClient.beta.threads.runs.createAndPoll(
      threadId,
      {
        assistant_id: assistantId,
      },
      { pollIntervalMs: 500 }
    );
  console.log(`Run created:  ${runResponse}`);
  console.log(runResponse);
};

let GetMessages = async () => {
  const assistantsClient = OpenAIClient();

  const runMessages: MessagesPage =
    await assistantsClient.beta.threads.messages.list(
      "thread_YTlgQeCSZDKIpyWFB2NvNvZ0"
    );
  for await (const runMessageDatum of runMessages) {
    for (const item of runMessageDatum.content) {
      // types are: "image_file" or "text"
      if (item.type === "text") {
        console.log(item);
        // console.log(`Message content: ${item.text?.value}`);
      }
    }
  }
};

// export {
//   CreateAssistant,
//   CreateThread,
//   CreateandRunInitialMessage,
//   GetMessages,
// };
