import styled from "styled-components";
import LeafletComponent from "./LeafletComponent";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function ClientRouteComponent() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DATABASE}/client/route/SP`) 
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        toast.error("erro ao formar melhor rota de atendimento");
        console.log(err);
      });
  }, []); 
  return (
    <ClientRouteContainer>
      <h1>Consulte a rota mais eficiente</h1>

      <RouteDiv>
        <Clients>
          {clients.length !== 0
            ? clients.map((a) => (
                <div>
                  <ion-icon
                    style={{ color: "green" }}
                    name="ellipse"
                  ></ion-icon>
                  <p> {a.name}</p>
                  <p>
                    {a.email} <br /> Tel: {a.phone}
                  </p>

                  <p>{a.street}, {a.number}</p>

                  <p>
                    {a.city}-{a.state}, {a.zipcode}
                  </p>
                </div>
              ))
            : null}
        </Clients>
        <LeafletComponent clients={clients} /> 
      </RouteDiv>
    </ClientRouteContainer>
  );
}

const ClientRouteContainer = styled.div`
  margin-top: 10rem;
  text-align: center;

  h1 {
    font-size: 2rem;
  }
`;

const RouteDiv = styled.div`
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 2rem;
  width: 90%;
  height: 70vh;
  margin-bottom: 10rem;
  border-radius: 6px;
  color: black;
  display: flex;
`;
const Clients = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  width: 40%;
  gap: 1rem;
  overflow-y: auto;

  div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: aliceblue;
    color: black;
    min-height: 4rem;
    width: 600px;
    p {
      width: 25%;
    }
  }
`;
