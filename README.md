# Stock Tracker

This is a case study to show how Next.js works. The example shows a simple stock tracker with authentication.

## Tech Stack
- Next.js
- SQLite
- Prisma
- Finnhub Stock API
- Bootstrap

## Setup
Get the project and install all the dependencies for your project with the following command:
```
git clone https://github.com/4KevR/stock-tracker-nextjs.git
cd stock-tracker-nextjs/
npm install
```
Then, define your enviromnent variables accordingly to your setup. Modify the `DATABASE_URL` in `.env` and create a `.env.local` for the following variables:
```
NEXTAUTH_URL (url to /api/auth - example: http://127.0.0.1:3000/api/auth)
NEXTAUTH_SECRET (random string for cryptographic operations - use e.g. $ openssl rand -base64 32)
FINNHUB_TOKEN (token for your access to the Finnhub API)
```
The last step is to initialize your database:
```
npx prisma migrate dev --name init
```
Now, you can build the application or also start it in the development environment:
```
# build & start
npm run build
npm start

# development
npm run dev
```
At the moment, it is only possible to manually create users by inserting them into the database. With the command `npx prisma studio`, you can do this with a graphical user interface.