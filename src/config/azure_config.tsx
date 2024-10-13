import { CosmosClient } from "@azure/cosmos";

let AzureClient = () => {
  const endpoint = import.meta.env.VITE_COSMO_URI;
  const key = import.meta.env.VITE_AZURE_KEY;
  const client = new CosmosClient({ endpoint, key });
  return client;
};

export default AzureClient;
