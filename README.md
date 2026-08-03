# LejaSmart

> A web-based expense tracking and business management platform built for local vendors who operate on paper. LejaSmart digitizes the financial record-keeping process — expenses, inventory, sales, and profit & loss — with role-based access for vendors, accountants, and business owners.

---

## Overview

LejaSmart helps local vendors and small business owners replace paper ledgers with a simple web app for tracking expenses, inventory, sales, and profit & loss. It supports three roles (vendor, accountant, owner) and uses PostgreSQL for persistence.

## Project Structure (high level)

```
LejaSmart/
├── main.go
├── go.mod
├── README.md
├── db/
├── models/
├── handlers/
├── static/
└── templates/
```

## Getting Started (short)

Clone and run:

```bash
git clone https://github.com/yourusername/LejaSmart.git
cd LejaSmart
go mod tidy
export DATABASE_URL=postgres://postgres:postgres@localhost:5432/lejasmart?sslmode=disable
export OWNER_DATABASE_URL=postgres://postgres:postgres@localhost:5432/lejasmart_owner?sslmode=disable
go run main.go
```

Visit http://localhost:8080

The app now uses PostgreSQL. If `OWNER_DATABASE_URL` is not provided, the app will fall back to `DATABASE_URL`.

## Local Docker (Postgres)

Start the app with local Postgres using Docker Compose:

```bash
docker compose up -d
```

This starts two services:
- `lejasmart` web app
- `postgres` local Postgres server

The Compose setup uses `DATABASE_URL` and `OWNER_DATABASE_URL` to connect to two databases on the same Postgres server.

## Render deployment

On Render, use a managed Postgres instance and set these environment variables in your service:

- ## Environment Variables

LejaSmart uses environment variables for configuration. Create a `.env` file in the project root for local development.

### Local Development (`.env`)

```dotenv
PORT=8080
DATABASE_URL=postgresql://username:password@hostname/lejasmart_postgres
OWNER_DATABASE_URL=postgresql://username:password@hostname/lejasmart_postgres
```

### Production (Render)

Add these in your Render Web Service → **Environment** tab:

| Key | Description |
|---|---|
| `PORT` | Port the server listens on (Render sets this automatically) |
| `DATABASE_URL` | Internal PostgreSQL URL for vendors and accountants database |
| `OWNER_DATABASE_URL` | Internal PostgreSQL URL for owner database |

> **Note:** For Render deployment, use the **Internal Database URL** from your PostgreSQL service for `DATABASE_URL` and `OWNER_DATABASE_URL` — it is faster since both services run on Render's network. Use the **External Database URL** only in your local `.env` file.

### Getting your database URLs from Render

1. Go to your Render dashboard
2. Click your **PostgreSQL service**
3. Scroll to the **Connections** section
4. Copy **Internal Database URL** → use for Render environment variables
5. Copy **External Database URL** → use in your local `.env` file

### Security

- Never commit your `.env` file to GitHub — it contains your database password
- Confirm `.env` is listed in your `.gitignore`
- Reset your database password on Render after sharing it anywhere — go to PostgreSQL service → **Settings** → **Reset Password**

## Postgres setup helper

If you need to create the databases with `psql`, run:

```bash
psql $DATABASE_URL -f db/create_databases.sql
```

Then start the app.
