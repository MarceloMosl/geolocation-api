import { db } from "@/config";
import { createClientDto } from "@/interfaces/client-interfaces";

async function getAllClients(filter: boolean | string) {
    try {

        let query = `SELECT a.name, a.email, a.phone, a.zipcode, a.city, a.state, a.latitude, a.longitude, a.street, a.number FROM clients a`;

        filter ? query += `${filter}` : null;

        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        throw new Error("Error when getting clients, try again later" + error);
    }
}

async function createClient(clientData: createClientDto) {
    try {
        const query = `
            INSERT INTO clients (name, email, phone, zipcode, latitude, longitude, city, state, street, number)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id
        `;

        const values = [
            clientData.name,
            clientData.email,
            clientData.phone,
            clientData.zipcode,
            clientData.latitude,
            clientData.longitude,
            clientData.city,
            clientData.state,
            clientData.street,
            clientData.number
        ];

        await db.query(query, values);
    } catch (error) {
        throw new Error("Client could not be created try again later" + error);
    }
}


async function getClientsByState(state:string): Promise<any> {

    
    try {

        return (await db.query(`SELECT * FROM clients WHERE state LIKE '%${state}'`)).rows
            
    } catch (error) {
        throw new Error(error)
    }

    
}



const clientRepository = {
    createClient,
    getAllClients,
    getClientsByState
};

export default clientRepository;
