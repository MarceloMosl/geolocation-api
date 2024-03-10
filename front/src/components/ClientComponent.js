import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function ClientComponent() {
  const [clients, setClients] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState();
  const [coordinates, setCoordinates] = useState({});
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");

  useEffect(() => {
    if (cep.length === 8 && street.length === 0) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=2934f07afc304616a184c6d98007b930`
        )
        .then((res) => {
          if (res.data.results.length === 0)
            return toast.error("CEP nao encontrado");

          setStreet(res.data.results[0].formatted);
          setCoordinates(res.data.results[0].geometry);
          setState(res.data.results[0].components.state_code);
          setCity(res.data.results[0].components.municipality);
        })
        .catch((error) => {
          console.error("Error fetching street data:", error);
        });
    }
  }, [cep, street]);

  const clearStates = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCep("");
    setStreet("");
    setNumber("");
    setCoordinates({});
    setState("");
    setCity("");
  };

  function newClient(e) {
    e.preventDefault();

    const body = {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      phone,
      zipcode: cep,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      city,
      state,
      street,
      number,
    };

    axios
      .post(`${process.env.REACT_APP_DATABASE}/client`, body)
      .then(() => {
        toast("Cliente Adicionado com sucesso");
        clearStates();
      })
      .catch((err) => {
        toast.error("Erro ao criar novo cliente tente novamente  mais tarde");
        console.log(err);
      });
  }

  function getClients(e) {
    e.preventDefault();

    const nome = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const telefone = e.target.querySelector('input[type="number"]').value;

    axios
      .get(`${process.env.REACT_APP_DATABASE}/client`, {
        params: {
          name: nome,
          email: email,
          phone: telefone,
        },
      })
      .then((res) => {
        setClients(res.data);
        console.log(res);
      })
      .catch((err) => {
        toast("erro ao buscar clients");
        console.log(err);
      });
  }

  return (
    <ClientContainer>
      <CreateClient>
        <form onSubmit={(e) => newClient(e)}>
          <h1>Novo Cliente </h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nome"
          ></input>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          ></input>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Telefone"
          ></input>
          <input
            type="number"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
            placeholder="CEP"
          ></input>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Rua"
            disabled={street.length === 0}
            maxLength={50}
          ></input>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Numero"
          ></input>

          <button type="submit">Cadastrar</button>
        </form>
      </CreateClient>

      <ListClients>
        <h1 style={{ fontSize: "1.5rem", marginTop: "5rem" }}>
          Consulte os Clientes Cadastrados
        </h1>
        <ClientFilters onSubmit={(e) => getClients(e)}>
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Nome"
          ></input>
          <input
            type="email"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            placeholder="Email"
          ></input>
          <input
            type="number"
            value={filterPhone}
            onChange={(e) => setFilterPhone(e.target.value)}
            placeholder="Telefone"
          ></input>
          <button type="submit">Buscar</button>
        </ClientFilters>

        <ClientsSearchResults>
          {clients.length > 0
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
                  <p>{a.street}</p>
                </div>
              ))
            : null}
        </ClientsSearchResults>
      </ListClients>
    </ClientContainer>
  );
}

const ClientContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  align-items: center;
`;
 
const CreateClient = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h1 {
      font-size: 1.5rem;
    }
    input {
      width: 30rem;
      height: 3rem;
      border: none;
      text-align: center;
    }
  }

  button {
    background: none;
    border: 2px solid;
    margin: 0.5em;
    height: 3rem;
    cursor: pointer;
    font-size: 1rem;
    font-family: inherit;
    &:hover {
      background-color: white;
      color: purple;
      border: none;
      border-radius: 6px;
    }
  }
`;

const ListClients = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 50%;
  height: 100%;

  div,
  section,
  h1 {
    margin: 0 auto 0 auto;
  }
`;
const ClientFilters = styled.form`
  display: flex;
  gap: 1rem;
  input {
    padding: 0.5rem;
  }
  button {
    width: 10rem;
    background: none;
    border: 2px solid;
    height: 3rem;
    cursor: pointer;
    font-size: 1rem;
    font-family: inherit;
    &:hover {
      background-color: white;
      color: purple;
      border: none;
      border-radius: 6px;
    }
  }
`;

const ClientsSearchResults = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: aliceblue;
    color: black;
    min-height: 4rem;
    width: 800px;
    p {
      width: 25%;
    }
  }
`;
