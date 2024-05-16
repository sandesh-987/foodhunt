import { config } from "dotenv";

config();
export let port = process.env.port;
export let dbUrl = process.env.DB_URL;
