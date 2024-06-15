# Sunny Bharne

### Senior Azure Developer

*Helsinki,Finland*

| [Download Resume](/resume/TestAutomation_Specialist_SunnyBharne_Helsinki.pdf) | [LinkedIn](https://www.linkedin.com/in/sunnybharne) | [Github](https://github.com/sunnyRavindra) | [Email](mailto:sunny.bharne.automation@gmail.com?subject=Test_Automation_Expert) | [Certifications](https://www.linkedin.com/in/sunnybharne/details/certifications/) |

Experienced (9years) Azure developer and Test Automation Engineer with expertise in Azure landing zones, Azure devops pipelines, Test
Architecture, Framework Development, Test Automation and (AWS) Cloud DevOps
transformations.

<!----->
<details>
  <summary>Next Js</summary>


<!----->
<details>
  <summary>Basics</summary>

Create next app:

```bash
npx create-next-app@latest
```

App Router -> Determines your routes depending on the file structure of your pages directory.

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
├── app # app files, default behaviour --> server-side rendered components (Root segment)
│   ├── components # components files (non routable)
│   │   ├── buttun.tsx # component files
│   ├── lib 
│   │   ├── constants.ts # constants files
│   ├── dashboard
│   │   ├── page.tsx # dashboard files (routable)
│   │   ├── nav.tsx # navbar (non routable)
│   ├── api
│   │   ├── route.tsx # api route (routable)
│   │   ├── db.tsx # database config (non routable)
│   ├── layout.tsx # layout file
│   ├── page.tsx # app starting point
│   ├── loading.tsx # loading files
│   ├── error.tsx # error files
│   ├── global-error.tsx # global error files
│   ├── routes.tsx # routes files
│   ├── template.tsx # templates files
│   ├── default.tsx # default files
│   ├── nestedRoute # (segment)
│   │   ├── nesteRoute # (leaf segment)
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
├── public # static files
│   ├── favicon.ico # Icon on the browser tab
│   ├── logo.svg # Logo
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

`Hierarchy: layout.tsx > template.tsx > error.tsx > loading.tsx > notFound.tsx > page.tsx`

parallel routes:
Intercepting routes:

> **Project structure:** <https://nextjs.org/docs/getting-started/installation>.
</details>

<!----->
<details>
  <summary>FAQ's</summary>

> **FAQ's:** <https://nextjs.org/docs/app>.

> **Continue reading:** <https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts>.
</details>

</details>
