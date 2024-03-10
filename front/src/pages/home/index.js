import React from "react";
import styled from "styled-components";
import { ClientComponent } from "../../components/ClientComponent";
import { ClientRouteComponent } from "../../components/ClientRouteComponent";

export default function HomePage() {

  return (
    <Container>
      <ClientComponent />
      <ClientRouteComponent/>
    </Container>
  );
} 

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Geologica&display=swap");
  font-family: "Geologica";
  background-color: rgba(115, 10, 253, 1);
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
`;

