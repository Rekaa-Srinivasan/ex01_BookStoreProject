import { Client, Account, Databases, Query} from 'appwrite';

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6617a891be2612bf76c1');

export const databases = new Databases(client);
export const account = new Account(client);
export const query = new Query();
export { ID } from 'appwrite';