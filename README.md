This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local Setup

Run:

```bash
npx auth secret
```

followed by:

```bash
npm i
```

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# TODO

* remove duplicate signin prompt
* implement unauthorized/authorized redirects
* remove logs and use the error handling instead

# NOTES FOR FINAL README

* next.js as a subframework for react because it offers the developer the power to choose when rendering something by seperating components between client and server
* next-auth for authorization, because it offers variety of providers, plus for given framework, there isn't any other complete library
* mui for components because it offers all-around support with nice definitions and powerful component properties
* context-api and react state for state handling
