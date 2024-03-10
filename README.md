# Clients
This is a sample application that combines a React.js frontend, a Node.js backend, and NGINX as a reverse proxy server. This README will guide you through setting up and running the application using Docker Compose.

## Prerequisites

- Docker installed on your machine. You can download and install Docker from [here](https://www.docker.com/products/docker-desktop).

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Navigate to the project directory:

   ```bash
   cd <repository_name>
   ```

3. Build the Docker images and start the containers:

   ```bash
   docker-compose up --build
   ```

4. Once the containers are up and running, you can access the application in your browser:

   - Frontend: [http://localhost:80(http://localhost:80)
   - Backend: [http://localhost:4000](http://localhost:4000)

## Folder Structure

- `frontend`: Contains the React.js frontend code.
- `backend`: Contains the Node.js backend code.
- `nginx`: Contains NGINX configuration files.

## Notes

- By default, the backend API is accessible at `http://localhost:4000`.
- NGINX serves the frontend on port 80, so it's accessible directly at `http://localhost`.

