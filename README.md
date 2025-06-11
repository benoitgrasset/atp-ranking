This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


| Intitulé du projet personnel | ATP Ranking Tracker |
|-----------------------------|---------------------|
| **Descriptif** | Application web permettant de consulter, suivre et analyser les classements ATP/WTA de tennis, avec historique, détails joueurs et progression. |
| **Descriptif/Contexte du projet** | Ce projet vise à centraliser et visualiser les classements officiels de tennis (ATP/WTA) en temps réel, en automatisant la récupération des données via du scraping, et en offrant des fonctionnalités avancées de recherche, filtrage et historique pour les passionnés et analystes de tennis. |
| **Tâches** |  |
| Tâche 1 | Développement du backend (scraping, API REST, base de données) |
| Tâche 2 | Création de l’interface utilisateur (tableaux dynamiques, pages de détails, filtres) |
| Tâche 3 | Mise en place de l’authentification, de la documentation API et du déploiement |
| **Outils & technologies** | Next.js / React / Prisma / PostgreSQL / Puppeteer / Cheerio / Tailwind CSS / @tanstack/react-table / @tanstack/react-query / next-auth / Swagger / shadcn-ui |

## Scraping

- utiliser une session de navigateur persistante ou réutiliser les cookies après avoir été authentifié manuellement une fois.
- limiter le taux de requêtes
- rotation d'IP, utiliser un proxy ou une rotation d'IP
- simuler action manuelle utilisateur (timer, mouvement de souris)

## Techno

- @tanstack/react-table
- @tanstack/react-query
- prisma - postgresql
- scrap with puppeteer / cheerios
- NextJS app router - with small backend
- tailwind CSS - shadcn-ui

## Roadmap

- authentication (next-auth)
- API - swagger - postman collection
- cron job (1/week)
- ranking history
- best ranking
- player details page GET /atp/players/:id - results - matchs played
- @tanstack/react-table (virtual - sort - control panel to hide columns) (hooks de sorting)
- documentation
- Save state in URL with nuqs
- Progression -> JOIN tables ATP `single` and `single-race`

## CRON

`0 4 \* \* 2` -> “At 04:00 on Tuesday.”

## Routes

atp/rankings/singles
atp/rankings/single-race
atp/rankings/next-gen-race
atp/rankings/doubles
atp/rankings/doubles-race

wta/rankings/singles

http://localhost:3000/api/v1/openapi

**Query params**: region, rankRange

## Other Repo

- https://github.com/JeffSackmann/tennis_atp
- https://github.com/n63li/Tennis-API
- https://github.com/openstatusHQ/data-table-filters

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
