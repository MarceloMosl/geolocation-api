import clientsController from "@/controllers/clients-controller";
import { validateBody, validateParams } from "@/middlewares/validation-middleware";
import { createClientSchema, getClientRouteSchema } from "@/schemas/client-schemas";
import { Router } from "express";

const clientsRouter = Router();

clientsRouter.get("/", clientsController.getAllClients)
clientsRouter.post("/", validateBody(createClientSchema), clientsController.createClient)
clientsRouter.get("/route/:state", validateParams(getClientRouteSchema), clientsController.getFastestRoute)


export { clientsRouter };
