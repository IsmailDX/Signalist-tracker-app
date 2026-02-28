Here is your **clean, polished, professional README.md** — properly spaced, formatted, and GitHub-ready.
You can copy this directly.

---

<div align="center">

# 📈 Signalist

### Real-Time Stock Intelligence Platform

A modern stock market tracker with **personalized watchlists**, **interactive charts**, and **AI-powered email alerts**.

<br/>

[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Getting Started](#-getting-started) •
[Environment Variables](#-environment-variables) •
[Project Structure](#-project-structure)

</div>

---

# 🚀 Features

## 📊 Real-Time Market Dashboard

* Interactive market overview
* S&P 500 heatmap
* Live market quotes
* Top financial news timeline
  Powered by **TradingView widgets**

---

## 🔎 Stock Search

* Search by ticker or company name
* Finnhub API integration
* Keyboard shortcut: **Ctrl + K**
* Debounced real-time results

---

## 📈 Detailed Stock Pages

* Candlestick & baseline charts
* Technical analysis
* Company profile
* Financial metrics
* Market news

---

## ⭐ Watchlist Management

* Add / remove stocks
* Persistent MongoDB storage
* Dedicated watchlist page
* Unique constraints via Mongoose

---

## 🔐 Authentication

* Email / password authentication
* Session-based auth via Better Auth
* Personalized onboarding:

  * Investment goals
  * Risk tolerance
  * Preferred industries

---

## 🤖 AI-Powered Email Notifications

* Personalized welcome emails
* Daily market news digests
* Price & volume alerts
* Generated using **Google Gemini**
* Delivered via **Nodemailer**

---

## ⚙️ Background Jobs

* Event-driven workflows with **Inngest**
* Welcome email generation
* Scheduled daily summaries
* Watchlist-context awareness per user

---

## 🌙 Modern Dark UI

* Tailwind CSS v4
* Radix UI primitives
* Clean, responsive design
* Lucide icons

---

# 🧱 Tech Stack

| Layer           | Technology                        |
| --------------- | --------------------------------- |
| Framework       | Next.js 16 (App Router, React 19) |
| Language        | TypeScript                        |
| Styling         | Tailwind CSS v4, Radix UI         |
| Database        | MongoDB Atlas (Mongoose)          |
| Authentication  | Better Auth                       |
| Market Data     | Finnhub API                       |
| Charts          | TradingView Widgets               |
| AI              | Google Gemini                     |
| Background Jobs | Inngest                           |
| Email           | Nodemailer (Gmail SMTP)           |
| Forms           | React Hook Form                   |
| Deployment      | Vercel                            |

---

# 🛠 Getting Started

## Prerequisites

* Node.js 18+
* npm / yarn / pnpm
* MongoDB Atlas cluster
* Finnhub API key
* Google Gemini API key
* Gmail App Password (for Nodemailer)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/signalist.git
cd signalist

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

In a separate terminal:

```bash
npx inngest-cli@latest dev
```

Open:

```
http://localhost:3000
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Nodemailer (Gmail)
NODEMAILER_EMAIL=your_email@gmail.com
NODEMAILER_PASSWORD=your_app_password

# Finnhub
NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key
```

---

# 📂 Project Structure

```
├── app/
│   ├── (auth)/               # Sign-in & sign-up
│   ├── (root)/               # Authenticated routes
│   │   ├── page.tsx          # Dashboard
│   │   ├── stocks/[symbol]/  # Stock detail pages
│   │   └── watchlist/        # Watchlist
│   └── api/inngest/          # Inngest webhook

├── components/
│   ├── Header.tsx
│   ├── SearchCommand.tsx
│   ├── TradingViewWidget.tsx
│   ├── WatchlistButton.tsx
│   ├── WatchlistList.tsx
│   ├── forms/
│   └── ui/

├── database/
│   ├── mongoose.ts
│   └── models/

├── hooks/

├── lib/
│   ├── actions/
│   ├── better-auth/
│   ├── inngest/
│   ├── nodemailer/
│   ├── constants.ts
│   └── utils.ts

└── types/
```

---

# 📜 Scripts

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run ESLint
npm run lint:fix      # Fix lint issues
npm run format        # Format with Prettier
npm run format:check  # Check formatting
```

---

# 📄 License

This project is open source and available under the **MIT License**.

---

<div align="center">

Built with ❤️ using Next.js, TradingView, Finnhub & Google Gemini

</div>

---

If you'd like, I can also:

* 🔥 Make it more recruiter-optimized
* 💼 Make it more startup/pitch style
* 🧠 Make it more technical/system-design heavy
* 📊 Add architecture diagram section

Just tell me the goal.
