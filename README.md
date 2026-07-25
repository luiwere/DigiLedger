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

- `DATABASE_URL`
- `OWNER_DATABASE_URL` (optional; if unset, the app uses `DATABASE_URL`)
- `PORT` (Render sets this automatically, but you can also set `8080`)

If you only have one managed database available, set both env vars to the same connection URL.

To create the secondary database if needed, use the SQL script in `db/create_databases.sql`.

## Postgres setup helper

If you need to create the databases with `psql`, run:

```bash
psql $DATABASE_URL -f db/create_databases.sql
```

Then start the app.
