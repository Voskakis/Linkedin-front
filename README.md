This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local Setup

To generate the local environment file, run:

```bash
npx auth secret
```

Add the following line at the end of the newly generated file:
```
NEXTAUTH_URL="https://localhost"
```

followed by:

```bash
npm i
```

To setup a reverse-proxy nginx server, we will need the mkcert package. 
In Windows, this will be done through the chocolatey package manager. 
Its installation is outside the scope of these instructions. 
With elevated rights, run:

```bash
choco install mkcert
```

followed by:

```bash
mkcert localhost
```

This will generate the certificate and private key used inside the containerized server.
To generate the container, make sure docker tools/ docker desktop is running and run inside this project's root directory:

```bash
docker build -t nginx-https-proxy .
```

to build the container. The image used is 1.27.^.
To run the container, run:

```bash
docker run -d -p 443:443 nginx-https-proxy
```


## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [https://localhost](https://localhost) with your browser to see the result.

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
