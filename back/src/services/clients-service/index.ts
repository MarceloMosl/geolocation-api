import { createClientDto } from "@/interfaces/client-interfaces";
import clientRepository from "@/repositories/clients-repository";
import { calculateDistance } from "@/utils/caculateDistance";


interface Client {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

async function getAllClients(queryParams: any) {

  const {email, name, phone} = queryParams;

  const filters = [
        email ? `email LIKE '%${email}%'` : null,
        name ? `name LIKE '%${name}%'` : null,
        phone ? `phone LIKE '%${phone}%'` : null,
      ].filter(Boolean);

  const filterClause =
        filters.length > 0 ? ` WHERE ${filters.join(" AND ")}` : false;

  return await clientRepository.getAllClients(filterClause);
 
}

async function createClient(clientData: createClientDto): Promise<void> {
  await clientRepository.createClient(clientData);
}

async function getFastestRoute(startingPoint: string, startingLat: number = -23.5879906, startingLong: number = -46.7304053) {

function nearestClient(clients: any[], startingLat: number, startingLong: number): Client[] {
  const visited: boolean[] = [];
  let currentLat = startingLat;
  let currentLong = startingLong;
  const route: any[] = [];
  for (let i = 0; i < clients.length; i++) {
      let minDistance = Infinity;
      let nextClientIndex = -1;
      for (let j = 0; j < clients.length; j++) {
          if (!visited[j]) {
              const distance = calculateDistance(currentLat, currentLong, clients[j].latitude, clients[j].longitude);
              if (distance < minDistance) {
                  minDistance = distance;
                  nextClientIndex = j;
              }
          }
      }
      route.push(clients[nextClientIndex]);
      visited[nextClientIndex] = true;
      currentLat = clients[nextClientIndex].latitude;
      currentLong = clients[nextClientIndex].longitude;
  }
  
  return route;
}

  const clients = await clientRepository.getClientsByState(startingPoint)

  return nearestClient(clients, startingLat, startingLong)

}

const clientsService = {
  getAllClients,
  createClient,
  getFastestRoute
};

export default clientsService;
