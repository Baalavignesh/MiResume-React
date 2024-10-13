import AzureClient from "../config/azure_config";

const addUserData = async (userData: IUserInfo) => {
  const client = AzureClient();
  const databaseId = "ToDoList";
  const containerId = "Items";
  const container = client.database(databaseId).container(containerId);

  try {
    // Create an item in the container
    const { resource: createdItem } = await container.items.create(userData);
    console.log("User data added successfully:", createdItem);
    return createdItem;
  } catch (error) {
    console.error("Error adding user data to Cosmos DB:", error);
    throw error;
  }
};

const fetchUserByEmail = async (email: string) => {
  try {
    const client = AzureClient();
    const databaseId = "ToDoList";
    const containerId = "Items";
    const container = client.database(databaseId).container(containerId);

    const query = `SELECT * FROM c WHERE c.email = @userEmail`;
    const parameters = [{ name: "@userEmail", value: email }];

    const { resources: users } = await container.items
      .query({ query, parameters })
      .fetchAll();

    if (users.length > 0) {
      return users[0]; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Could not fetch user data");
  }
};

const addEducationToUser = async (email: string, education: IEducation) => {
  try {
    const client = AzureClient();
    const databaseId = "ToDoList";
    const containerId = "Items";
    const container = client.database(databaseId).container(containerId);

    // Query the user by email
    const query = `SELECT * FROM c WHERE c.email = @userEmail`;
    const parameters = [{ name: "@userEmail", value: email }];

    const { resources: users } = await container.items
      .query({ query, parameters })
      .fetchAll();

    if (users.length === 0) {
      throw new Error("User not found");
    }

    const user = users[0];
    const userId = user.id;
    const partitionKey = user.partitionKey;

    // Ensure the education array exists or initialize it
    const updatedEducation = user.education ? [...user.education, education] : [education];
    user.education = updatedEducation;

    // Perform the replace operation with the correct partition key
    const { resource: updatedUser } = await container.item(userId, partitionKey).replace(user);


    console.log("Updated user education:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error adding education to user:", error);
    throw new Error("Could not add education to user data");
  }
};


const addExperienceToUser = async (email: string, experience: IExperience) => {
  try {
    const client = AzureClient();
    const databaseId = "ToDoList";
    const containerId = "Items";
    const container = client.database(databaseId).container(containerId);

    // Query the user by email
    const query = `SELECT * FROM c WHERE c.email = @userEmail`;
    const parameters = [{ name: "@userEmail", value: email }];

    const { resources: users } = await container.items
      .query({ query, parameters })
      .fetchAll();

    if (users.length === 0) {
      throw new Error("User not found");
    }

    const user = users[0];
    const userId = user.id;
    const partitionKey = user.partitionKey;

    // Ensure the experience array exists or initialize it
    const updatedExperience = user.experience ? [...user.experience, experience] : [experience];
    user.experience = updatedExperience;

    // Perform the replace operation with the correct partition key
    const { resource: updatedUser } = await container.item(userId, partitionKey).replace(user);

    console.log("Updated user experience:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error adding experience to user:", error);
    throw new Error("Could not add experience to user data");
  }
};

const addProjectToUser = async (email: string, project: IProject) => {
  try {
    const client = AzureClient();
    const databaseId = "ToDoList";
    const containerId = "Items";
    const container = client.database(databaseId).container(containerId);

    // Query the user by email
    const query = `SELECT * FROM c WHERE c.email = @userEmail`;
    const parameters = [{ name: "@userEmail", value: email }];

    const { resources: users } = await container.items
      .query({ query, parameters })
      .fetchAll();

    if (users.length === 0) {
      throw new Error("User not found");
    }

    const user = users[0];
    const userId = user.id;
    const partitionKey = user.partitionKey;

    // Ensure the projects array exists or initialize it
    const updatedProjects = user.projects ? [...user.projects, project] : [project];
    user.projects = updatedProjects;

    // Perform the replace operation with the correct partition key
    const { resource: updatedUser } = await container.item(userId, partitionKey).replace(user);

    console.log("Updated user projects:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error adding project to user:", error);
    throw new Error("Could not add project to user data");
  }
};


const addCertificationToUser = async (email: string, certification: string) => {
  try {
    const client = AzureClient();
    const databaseId = "ToDoList";
    const containerId = "Items";
    const container = client.database(databaseId).container(containerId);

    // Query the user by email
    const query = `SELECT * FROM c WHERE c.email = @userEmail`;
    const parameters = [{ name: "@userEmail", value: email }];

    const { resources: users } = await container.items
      .query({ query, parameters })
      .fetchAll();

    if (users.length === 0) {
      throw new Error("User not found");
    }

    const user = users[0];
    const userId = user.id;
    const partitionKey = user.partitionKey;

    // Ensure the certifications array exists or initialize it
    const updatedCertifications = user.certifications
      ? [...user.certifications, { certification }]
      : [{ certification }];

    user.certifications = updatedCertifications;

    // Perform the replace operation with the correct partition key
    const { resource: updatedUser } = await container.item(userId, partitionKey).replace(user);

    console.log("Updated user certifications:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error adding certification to user:", error);
    throw new Error("Could not add certification to user data");
  }
};




export { addUserData, fetchUserByEmail, addEducationToUser, addExperienceToUser, addProjectToUser, addCertificationToUser };
