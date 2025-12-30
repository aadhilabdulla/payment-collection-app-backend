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

