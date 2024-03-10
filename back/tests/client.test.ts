import app, { init, close } from "../src/app";
import supertest from "supertest";
import { db } from "../src/config/database";


/*

DISCLAIMER!!!!

Este arquivo de teste serve como uma demonstração de boas práticas, para testes em producao não deve ser considerado uma solução abrangente para todos os cenários. 

Embora este arquivo de teste demonstre funcionalidades básicas de teste, 
como validação de requisição/resposta HTTP e manipulação de banco de dados, 
pode não cobrir todos os casos extremos ou cenários complexos que podem surgir em uma aplicação do mundo real.
Sua unica funcao eh demonstrar uma boa pratica de criar testes de integracao para todas as rotas


*/

const api = supertest(app);
beforeAll(async () => {
  await init();
});

afterAll(async () => {
  db.query(`DELETE FROM clients WHERE name = 'TESTE123123123' `)
});

describe("Testing Route GET/Client", () => {

  it("Should return 200 when calling GET/clients", async () => {
    const resultado = await api.get("/client");

    expect(resultado.status).toBe(200);
    expect(resultado.body[0].name).toBe("John Doe")
  });



  it("Should return 200 and route based on distance of the clients when calling GET/clients/rota", async () => {
    const resultado = await api.get("/client/rota");

    expect(resultado.status).toBe(200);
  });
});


describe("Testing Route POST/Client", () => {

  it("Should return 400 when calling POST/clients with an invalid body", async () => {
    const resultado = (await api.post("/client").send({}));

    expect(resultado.status).toBe(400);
  });


  it("Should return 201 when calling POST/clients with an valid body", async () => {
    const resultado = (await api.post("/client").send({
      "name": "TESTE123123123",
      "email": "john@example.com",
      "phone": "1234567890",
      "zipcode": "01001000",
      "latitude": -23.591506,
      "longitude": -46.725553,
      "city": "Sao Paulo",
      "state": "SP",
    }));

    expect(resultado.status).toBe(201);
  });

});
