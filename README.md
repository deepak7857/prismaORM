# PostgreSQL + Prisma ORM CRUD API (Node.js + Express)

This project is a simple User CRUD API built with:
- Node.js + Express
- PostgreSQL database
- Prisma ORM

## 1) Project Overview

The API provides these operations:
- Create user (`POST /api/user/register`)
- Read users (`GET /api/user/users`)
- Update user (`PUT /api/user/user/:id`)
- Delete user (`DELETE /api/user/user/:id`)

## 2) Tech Stack

- `express`
- `@prisma/client`
- `prisma`
- `dotenv`
- `express-validator`

## 3) Project Structure

```
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

## 4) Database Configuration (PostgreSQL)

In `.env`:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:1234@localhost:5432/testdb"
```

- DB provider: `postgresql`
- Database name: `testdb`
- Username: `postgres`
- Password: `1234`
- Host: `localhost`
- Port: `5432`

> Change credentials as per your local PostgreSQL setup.

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

## 6) Setup & Run

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Create database in PostgreSQL (if not already created)

```sql
CREATE DATABASE testdb;
```

### Step 3: Run Prisma migration

```bash
npx prisma migrate dev --name init
```

### Step 4: (Optional) Open Prisma Studio

```bash
npx prisma studio
```

### Step 5: Start server

```bash
npm start
```

Server starts on:
- `http://localhost:3000`

## 7) API Base URL

```text
http://localhost:3000/api/user
```

## 8) CRUD API Endpoints (Postman Ready)

### A) Create User

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/user/register`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**

```json
{
  "name": "Deepak Kumar",
  "email": "deepak_new@example.com",
  "password": "secret123"
}
```

**Success Response (201):**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Deepak Kumar",
    "email": "deepak_new@example.com",
    "password": "secret123",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Error Responses:**
- `400` → `{"message":"All fields are required"}`
- `409` → `{"message":"Email already exists"}`
- `500` → `{"message":"Server error"}`

---

### B) Get All Users

- **Method:** `GET`
- **URL:** `http://localhost:3000/api/user/users`

**Success Response (200):**

```json
[
  {
    "id": 1,
    "name": "Deepak Kumar",
    "email": "deepak_new@example.com",
    "password": "secret123",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

### C) Update User

- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/user/user/1`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**

```json
{
  "name": "Deepak Updated",
  "email": "deepak_updated@example.com",
  "password": "newsecret123"
}
```

You can also send only one field (for example only `name` or only `email`).

**Success Response (200):**

```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "name": "Deepak Updated",
    "email": "deepak_updated@example.com",
    "password": "newsecret123",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Error Responses:**
- `400` → `{"message":"At least one field (name, email, or password) is required to update"}`
- `500` → `{"message":"Server error"}`

---

### D) Delete User

- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/user/user/1`

**Success Response (200):**

```json
{
  "message": "User deleted successfully"
}
```

**Error Responses:**
- `400` → `{"message":"User ID is required"}`
- `500` → `{"message":"Server error"}`

## 9) Common Postman Mistakes

If `GET /users` works but `POST /register` does not, check:

1. Method is `POST` (not `GET`).
2. URL is exactly `/api/user/register`.
3. Body is set to **raw + JSON**.
4. Header includes `Content-Type: application/json`.
5. Email is unique (same email returns `409`).
6. Server is running (`npm start`).

## 10) Useful Prisma Commands

```bash
# Apply schema changes to DB
npx prisma migrate dev --name <migration_name>

# Regenerate Prisma Client
npx prisma generate

# Open DB UI
npx prisma studio
```

## 11) Current Route Mapping

- `POST /api/user/register`
- `GET /api/user/users`
- `PUT /api/user/user/:id`
- `DELETE /api/user/user/:id`

---

### Note

This project currently stores passwords as plain text for learning/demo purposes.
For production, always hash passwords using `bcrypt` before saving.
