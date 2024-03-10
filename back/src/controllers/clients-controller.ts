import clientsService from "@/services/clients-service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

async function getAllClients(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {

    try {

        const response = await clientsService.getAllClients(req.query)
       
        return res.status(httpStatus.OK).send(response)
    
    } catch (error) {
       
        next(error)
    }

}

async function createClient(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {

    try {

        await clientsService.createClient(req.body)
        
        return res.sendStatus(httpStatus.CREATED)
    
    } catch (error) {
    
        next(error)
    }

}

async function getFastestRoute(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    try {

        const {state} = req.params

        const response = await clientsService.getFastestRoute(`${state}`)
        
        return res.status(httpStatus.OK).send(response)
    
    } catch (error) {
    
        next(error)
    }
}

const clientsController = {
    getAllClients,
    createClient,
    getFastestRoute
}

export default clientsController