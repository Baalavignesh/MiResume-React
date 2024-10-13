import openaiInstance from "../config/openai_config";
import coverletterTemplate from "../constants/coverletter";
import latex_template from "../constants/latex_template";

const CreateAssistant = async () => {
  return await openaiInstance.beta.assistants.create({
    name: "Resume and Cover letter builder",
    instructions:
      "You are a personal resume and cover letter builder. Using the provided user information create a latex with the most appropriate project, skill and experience for the desired job role provided. Create the latex by filling in the spaces in the given latex template. The key thing to remember is it should be a 1 page resume, only use the relevent project and work experience according to the job description provided.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4o",
  });
};

const CreateThread = async () => {
  const thread = await openaiInstance.beta.threads.create();
  console.log(thread);
  return thread;
};

const AddMessageToThreads = async (threadId: string) => {
  const message = await openaiInstance.beta.threads.messages.create(threadId, {
    role: "user",
    content: `This is the latex template which you will be using as the base template for all the resumes that you will be generating for me. The file id for the latex template is ${latex_template}`,
  });
  console.log(message);
  return message;
};

const AddMessageToThreadsResume = async (
  userInfo: IUserInfo,
  jobDescription: string,
  threadId: string
) => {
  try {
    const message = await openaiInstance.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: `Identify and use the appropriate information from the given json ${JSON.stringify(
          userInfo
        )}. The job that I am applying for is ${jobDescription}. Give me the latex for the newly generated resume by filling the latex template with appropriate projects and work experience. Just give me the latex without any errors and nothing else. Make sure the latex doesn't exceed 1 page. DO NOT MODIFY THE GIVEN TEMPLATE AT ANY COST`,
      }
    );
    return message;
  } catch (error) {
    console.log(error);
  }
};

const AddMessageToThreadsCoverLetter = async (
  threadId: string
) => {
  try {
    const message = await openaiInstance.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: `Generate me a cover letter explaining why I am excited to join the desired job role. take inspiration from the given template, have the first and last paragraph as such ${coverletterTemplate}. Give me text, not latex`,
      }
    );
    return message;
  } catch (error) {
    console.log(error);
  }
};

const RunThread = async (threadId: string, assistantId: string) => {
  try {
    let run = await openaiInstance.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistantId,
    });
    return run;
  } catch (error: any) {
    console.log(error);
  }
};

let RetrieveThreadMessages = async (threadId: string) => {
  const myThread: any = await openaiInstance.beta.threads.messages.list(
    threadId
  );
  console.log("data here");
  console.log(myThread.data);
  console.log(myThread.data[0].content[0].text.value);
  return myThread.data[0].content[0].text.value;
};

// const uploadLatex = async () => {
//   try {
//     const response = await fetch("./latex_template.tex");
//     const blob = await response.blob();

//     // Create a FormData object and append the Blob
//     const formData = new FormData();
//     formData.append("file", blob, "sample.tex");
//     formData.append('purpose', 'fine-tune');

//     // Use fetch directly to upload the file
//     const uploadResponse = await fetch("https://api.openai.com/v1/files", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
//       },
//       body: formData,

//     });

//     const result = await uploadResponse.json();
//     if (!uploadResponse.ok) {
//       throw new Error(result.error.message);
//     }

//     console.log("File uploaded successfully:", response);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//   }
// };

export {
  CreateAssistant,
  CreateThread,
  AddMessageToThreads,
  RunThread,
  RetrieveThreadMessages,
  AddMessageToThreadsResume,
  AddMessageToThreadsCoverLetter,
  //   uploadLatex
};
