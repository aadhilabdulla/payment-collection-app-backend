# Payment Collection Backend API

This repository contains the backend service for the Payment Collection application.  
It is built using Node.js, Express, PostgreSQL, and Sequelize ORM, and exposes REST APIs for managing loan customers and EMI payments.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Swagger UI
- CORS

---

## Features

- Retrieve customer loan details
- Calculate outstanding EMI due dynamically based on payment history
- Accept EMI payments (no partial EMI allowed)
- Track payment history per account
- Swagger-based API documentation
- MVC + Service-layer architecture

---

## Project Structure

```
src/
├── app.js
├── server.js
├── config/
│   ├── db.js
│   └── swagger.js
├── models/
│   ├── index.js
│   ├── customer.model.js
│   └── payment.model.js
├── controllers/
├── services/
├── routes/
```

---

## Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- npm

---

## Environment Variables

Create a `.env` file in the root directory:

```
DB_HOST=localhost
DB_NAME=paymentdb
DB_USER=postgres
DB_PASSWORD=yourpassword
PORT=3000
```

---

## Installation

```
npm install
```

---

## Database Setup

Create the database manually:

```
psql -U postgres
CREATE DATABASE paymentdb;
```

Tables are created automatically via Sequelize on server start.

---

## Running the Server (Local)

```
npm run dev
```

Server runs on:
```
http://localhost:3000
```

---

## API Documentation (Swagger)

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

You can:
- View all endpoints
- Test APIs directly
- Inspect request and response formats

---

## API Endpoints

### Get all customers with outstanding due
```
GET /api/customers
```

### Make EMI payment
```
POST /api/payments
```

Request body:
```
{
  "accountNumber": "ACC1001",
  "amount": 8500
}
```

### Get payment history for an account
```
GET /api/payments/:accountNumber
```

---

## Business Rules

- Outstanding due is calculated as:
  (Expected EMI till date) - (Total paid)

---

## Deployment Notes

- Backend runs on HTTP internally
- HTTPS is handled via Nginx in production
- API base URL is injected into frontend via environment variables

---
# CI/CD Pipeline Configuration
This project uses GitHub Actions to automate deployment to an AWS EC2 instance using Docker. Every time code is pushed to the main branch, the pipeline automatically updates the server.

## Architecture

GitHub Actions: Triggered on push to main.

SSH Connection: Uses an SSH Private Key to securely log into the EC2 instance.

Automated Deployment:

Pulls the latest code from GitHub.

Rebuilds Docker images.

Restarts containers using docker-compose.

## Required Secrets

To run this pipeline, the following secrets must be configured in Settings > Secrets and variables > Actions:

Secret	Description
REMOTE_HOST	The Public IP or Domain of your AWS EC2 instance.
REMOTE_USER	The SSH username (default: ubuntu).
EC2_SSH_KEY	The Private SSH Key (Starts with -----BEGIN OPENSSH PRIVATE KEY-----).

## Workflow File (.github/workflows/deploy.yml)

```
name: Deploy to AWS EC2

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ~/payment-collection-app-backend
            git pull origin main
            docker compose up -d --build
```
## Server-Side Setup

To allow the pipeline to run successfully, the EC2 instance was configured with:

Docker Permissions: The ubuntu user was added to the docker group to run commands without sudo.

SSH Auth: The public key matching EC2_SSH_KEY was added to ~/.ssh/authorized_keys.

GitHub Access: The EC2's public key was added to GitHub Deploy Keys to allow git pull.
