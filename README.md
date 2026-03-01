# PostgreSQL + Prisma ORM CRUD API

Simple User CRUD REST API built with Node.js, Express, PostgreSQL, and Prisma ORM.

## 1) Project Overview

This API supports:

- Create User: `POST /api/user/register`
- Read Users: `GET /api/user/users`
- Update User: `PUT /api/user/user/:id`
- Delete User: `DELETE /api/user/user/:id`

## 2) Tech Stack

- `express`
- `@prisma/client`
- `prisma`
- `dotenv`
- `express-validator`
- `cors` (optional, if enabled)
- `express-rate-limit` (optional, if enabled)

## 3) Project Structure

```text
.
├── index.js
├── package.json
├── controler/
│   └── userControler.js
├── routes/
│   └── user.js
├── prisma/
│   └── schema.prisma
└── .env
```

## 4) Environment Configuration

Create or update `.env`:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:1234@localhost:5432/testdb"
```

Update credentials for your local PostgreSQL setup.

## 5) Prisma Schema

`prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 6) Setup and Run

### 1. Install dependencies

```bash
npm install
```

If required:

```bash
npm install cors express-rate-limit
```

### 2. Create database

```sql
CREATE DATABASE testdb;
```

### 3. Run migration

```bash
npx prisma migrate dev --name init
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Start server

```bash
npm start
```

Server URL:

```text
http://localhost:3000
```

## 7) Optional Security Middleware

Add this in `index.js` before route registration if you want CORS and request limiting.

```js
const cors = require('cors');
const rateLimit = require('express-rate-limit');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);
```

For production, replace `origin: '*'` with your frontend domain.

## 8) API Base URL

```text
http://localhost:3000/api/user
```

## 9) CRUD Endpoints (Postman)

### A) Register User

- Method: `POST`
- URL: `http://localhost:3000/api/user/register`
- Header: `Content-Type: application/json`
- Body:

```json
{
  "name": "Deepak Kumar",
  "email": "deepak_new@example.com",
  "password": "secret123"
}
```

Responses:

- `201` User created
- `400` Missing required fields
- `409` Email already exists
- `500` Server error

### B) Get All Users

- Method: `GET`
- URL: `http://localhost:3000/api/user/users`

### C) Update User

- Method: `PUT`
- URL: `http://localhost:3000/api/user/user/:id`
- Header: `Content-Type: application/json`
- Body (example):

```json
{
  "name": "Updated Name"
}
```

### D) Delete User

- Method: `DELETE`
- URL: `http://localhost:3000/api/user/user/:id`

## 10) Common Postman Issues

If `GET /users` works but `POST /register` fails, verify:

1. Method is `POST`.
2. URL is exactly `http://localhost:3000/api/user/register`.
3. Body type is `raw` + `JSON`.
4. Header includes `Content-Type: application/json`.
5. Email is unique.
6. Server is running.

## 11) Useful Prisma Commands

```bash
npx prisma migrate dev --name <migration_name>
npx prisma generate
npx prisma studio
```

## 12) Current Route Mapping

- `POST /api/user/register`
- `GET /api/user/users`
- `PUT /api/user/user/:id`
- `DELETE /api/user/user/:id`

## 13) Note

This project currently stores passwords in plain text for learning/demo purposes.

For production, hash passwords using `bcrypt` before saving.

👨‍💻 Author
Deepak Kumar

Backend Developer | Node.js | PostgreSQL | Prisma ORM