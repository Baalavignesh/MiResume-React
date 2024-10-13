// import OpenAIClient from "../config/azure_openai_config";

// const uploadFile = async () => {
//     const assistantsClient = OpenAIClient();
  
  
//   const fileContent = new File(
//     [`Your LaTeX file content goes here`],
//     "template.tex",
//     {
//       type: "text/plain",
//       lastModified: new Date().getTime(), // Use the current timestamp for lastModified
//     }
//   );
//       const fileName = 'template.tex';

//     const fileResponse = await assistantsClient.files.create({
//       file: fileContent,
//       purpose: 'fine-tune', // Specify the purpose
//       name: fileName,
//     });
  
//     console.log(`File uploaded: ${fileResponse.id}`);
//     return fileResponse.id;
//   };
  
//   export default uploadFile;