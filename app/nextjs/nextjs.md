# Next Js

<details>
  <summary>Basics</summary>

- Create next app 
```bash
npx create-next-app@latest
```

- App Router -> Determines your routes depending on the file structure of your pages directory.

```bash
  "scripts": {
    "dev": "next dev", # yarn run dev, starts the development server on http://localhost:3000
    "build": "next build", # yarn run build, builds the application for production usage
    "start": "next start", # yarn run start, starts a Next.js production server
    "lint": "next lint" # yarn run lint,  sets up Next.js' built-in ESLint configuration
  }
```
> **Installation guide:** <https://nextjs.org/docs/getting-started/installation>
</details>

<!----->
<details>
  <summary>Repository structure</summary>
 
```bash
Root
├── app # app files
│   ├── layout.tsx # layout file
│   ├── page.tsx # app starting point
│   ├── loading.tsx # loading files
│   ├── error.tsx # error files
│   ├── global-error.tsx # global error files
│   ├── routes.tsx # routes files
│   ├── template.tsx # templates files
│   ├── default.tsx # default files
│   ├── nestedRoute
│   │   ├── nesteRoute
│   │   │   ├── page.tsx # nested folder files
│   ├── [dynamicRouete]
│   │   │   ├── page.tsx # nested folder files
│   ├── [...dynamicRoute]
│   │   │   ├── page.tsx # nested folder files
│   ├── [[...optionalRoute]
│   │   │   ├── page.tsx # nested folder files
│   ├── (privateRoute)
│   │   │   ├── page.tsx # nested folder files
│   ├── (_publicRoute)
│   │   │   ├── page.tsx # nested folder files
│   
├── public # static files
│   ├── favicon.ico # Icon on the browser tab
│   
├── next.config.js # next.js configuration
├── package.json # dependencies and scripts
├── instrumentation.ts # OpenTelemetry instrumentation file
├── middleware.tsx # middleware files
├── .env # environment variables
├── .env.local # environment variables local
├── .env.development # environment variables development
├── .env.production # environment variables production
├── eslintrc.json # eslint configuration
├── gitignore # gitignore file
├── next-env.d.ts # next.js typescript files
├── tsconfig.json # typescript configuration
├── jsconfig.json # javascript configuration
```
> **Project structure:** <https://nextjs.org/docs/getting-started/installation>.
</details>

> **Continue reading:** <https://nextjs.org/docs/getting-started/project-structure>.
