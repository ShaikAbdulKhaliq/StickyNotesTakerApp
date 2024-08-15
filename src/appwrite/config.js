import { Client, Databases } from "appwrite";
 
const client = new Client()
    .setEndpoint(import.meta.env.VITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_PROJECT_ID || '66bafe51001c7c370fd2');

 
const databases = new Databases(client);
const collections = [
    {
        name: "notes",
        id: "66bafeb4000afcd4671b" ,
        dbId: "66bafe9b000e1db1e0ae"
    },
];

export { client, databases,collections };

