# Client Order History App (Vite + Express + Prisma)

A full-stack application to manage clients, orders, and products. Built with:

- **Frontend**: Vite + JavaScript
- **Backend**: Express.js + Prisma + SQLite
- **Seed Data**: Faker for realistic mock data

---

## Project Structure
```
project-root/
│
├── backend/
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── seed.js
│ ├── public/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── main.js
│ │ └── style.css
│ ├── index.html
│ └── package.json
```

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [SQLite](https://www.sqlite.org/) (used as local database)

---

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jordannlenhart/JordanL_Intro_to_Prisma
cd JordanL_Intro_to_Prisma
```

### 2. Set Up Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
node server.js
```

Server will run at: http://localhost:5555
Backend API: http://localhost:5555/api/data

### 3. Set Up Frontend
```bash
cd frontend
npm install
npm run dev
```

## How Frontend and Backend Work Together
- Frontend fetches data from backend API endpoint:
http://localhost:5555/api/data

- Backend serves API routes and static assets (CSS) for any backend-rendered pages

- Ensure CORS is enabled on backend if frontend and backend run on different ports

## Model Relationships
- Client
    - Has many Orders (1:N relationship)

- Order
    - Belongs to one Client
    - Has many Products (Many:Many)

- Product
    - Has many Orders (Many:Many)

## Generating New Data
- Use the seed script prisma/seed.js which uses Faker.js to generate random clients, orders, and products.

- Run the seed script anytime to refresh data:

``` bash
node backend/prisma/seed.js
```
- The script:

    - Clears existing data from tables

    - Creates sample products

    - Creates clients

    - Creates orders for each client

    - Associates products with orders

## Starting the Servers
- From /backend 
```bash
npm server.js
```
- From /frontend 
```bash
npm run dev
```
### Access
Backend API
- http://localhost:5555

Frontend Page
- http://localhost:5173 (or as Vite outputs in terminal)