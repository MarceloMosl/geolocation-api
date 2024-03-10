import express, { Express } from "express";
import cors from "cors";
import {  connectDb, disconnectDb } from "./config";
import { clientsRouter } from "./routes/clients-route";
import { handleApplicationErrors } from "./middlewares/errors-middleware";
const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/client", clientsRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;
