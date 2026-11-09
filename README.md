# 🛒 বাজার দর (BazarDor)

**বাজার দর** is a Bengali market-price tracker. It shows today's prices of everyday essentials — rice, lentils, oil, vegetables, fish, meat, eggs & dairy and spices — with price changes, market-wise breakdowns and a live price ticker.

> Built with Next.js (App Router), Tailwind CSS, DaisyUI and BetterAuth.

## ✨ Features

1. **Live price ticker** – an infinite scrolling strip of every product with its price and ▲/▼ change.
2. **Daily movers** – "আজ দাম বেড়েছে" and "আজ দাম কমেছে" show the top 6 risers and fallers, plus a full "সব পণ্য" list.
3. **Category pages with sorting** – sort by default, price low→high or high→low (sorted on the numeric value, displayed in Bengali digits).
4. **Product details (protected)** – minimum, maximum and average price, price history and a market-by-market table.
5. **Authentication with BetterAuth** – email/password, Google and GitHub login, toast messages, protected routes and skeleton loaders.
6. **Profile & update information** – view your profile and change your name on a separate route.
7. **Fully responsive** – mobile, tablet and desktop, with a custom 404 page and loading skeletons.

## 🧰 Technologies

| Purpose | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, DaisyUI 5 |
| Auth | BetterAuth (email/password, Google, GitHub) |
| Database | MongoDB Atlas |
| Notifications | react-hot-toast |
| Fonts | Noto Sans Bengali, Inter (via Fontsource) |
| Data | BazarDor public REST API |

## 🔌 API endpoints used

- `GET /categories` – navbar and category cards
- `GET /categories/:id` – category page header and slug validation
- `GET /products` – home page, ticker, product lookup
- `GET /products?category=:id` – category listing
- `GET /products/:id` – product details

Base URL: `https://api.api-store.workers.dev/api/bazardor`

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

| Variable | Description |
|---|---|
| `BETTER_AUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | Site URL, e.g. `http://localhost:3000` |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth (optional) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth (optional) |

OAuth callback URLs: `<BETTER_AUTH_URL>/api/auth/callback/google` and `<BETTER_AUTH_URL>/api/auth/callback/github`.

Without `MONGODB_URI` the app falls back to an in-memory database for quick local testing (accounts are lost on restart).

## ☁️ Deployment (Vercel)

1. Push the repo to GitHub and import it in Vercel.
2. Add the environment variables above (set `BETTER_AUTH_URL` to your Vercel URL).
3. Add the Vercel URL to your Google/GitHub OAuth callback settings.
4. Deploy. Dynamic routes (`/product/[slug]`, `/category/[slug]`) are rendered on the server, so refreshing any page works.

## 🗂 Project structure

```
src/
  app/          routes (home, category, product, signin, signup, profile, api/auth)
  components/   Navbar, PriceTicker, ProductCard, forms, ...
  lib/          API client, formatting helpers, auth config
  proxy.ts      route protection for private pages
```
