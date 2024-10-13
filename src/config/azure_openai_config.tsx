import { AzureOpenAI } from "openai";

const OpenAIClient = () => {
  const azureOpenAIKey = import.meta.env.VITE_AZURE_AI_KEY1;
  const azureOpenAIEndpoint = import.meta.env.VITE_AZURE_AI_ENDPOINT;
  const azureOpenAIDeployment = import.meta.env.VITE_AZURE_AI_DEPLOYMENT_NAME;
  const openAIVersion = import.meta.env.VITE_AZURE_AI_VERSION;

  // Check env variables
  if (
    !azureOpenAIKey ||
    !azureOpenAIEndpoint ||
    !azureOpenAIDeployment ||
    !openAIVersion
  ) {
    throw new Error(
      "Please set AZURE_OPENAI_KEY and AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_DEPLOYMENT_NAME in your environment variables."
    );
  }
  const assistantsClient = new AzureOpenAI({
    endpoint: azureOpenAIEndpoint,
    apiVersion: openAIVersion,
    apiKey: azureOpenAIKey,
    dangerouslyAllowBrowser: true
  });
  return assistantsClient;

};

export default OpenAIClient;
