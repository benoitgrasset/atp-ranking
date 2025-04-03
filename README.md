This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Scraping

- utiliser une session de navigateur persistante ou réutiliser les cookies après avoir été authentifié manuellement une fois.
- limiter le taux de requêtes
- rotation d'IP, utiliser un proxy ou une rotation d'IP
- simuler action manuelle utilisateur (timer, mouvement de souris)

## Roadmap

- authentication (next-auth)
- API - swagger - postman collection
- cron job (1/week)
- ranking history
- best ranking
- player details page GET /atp/players/:id - results - matchs played
- @tanstack/react-table (virtual - sort - control panel to hide columns) (hooks de sorting)
- documentation

## Routes

atp/rankings/singles
atp/rankings/race-to-london
atp/rankings/race-to-milan
atp/rankings/doubles
atp/rankings/doubles-race

wta/rankings/singles

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
