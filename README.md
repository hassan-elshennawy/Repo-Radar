# 📡 Repo Radar

A frontend dashboard that lets users search GitHub repositories, track their favorites, and monitor their latest stats. Built as a technical challenge showcasing modern React architecture and data fetching patterns.

## 🚀 Features

- **Real-time Search:** Debounced GitHub repository search directly from the GitHub REST API.
- **Track & Monitor:** Save favorite repositories to track key metrics like Stars, Open Issues, and Last Commit dates.
- **Data Visualization:** An interactive bar chart dynamically comparing stars across all tracked repositories.
- **Offline Persistence:** Tracked repositories are seamlessly persisted in `localStorage`.
- **Advanced State Management:** Leverages Redux Toolkit and RTK Query for efficient caching, invalidation, and data fetching.
- **Polished UI:** Built with Material UI (MUI), featuring a fully responsive layout, loading skeletons, and a seamless Light/Dark Mode toggle.

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **State & Data Fetching:** Redux Toolkit + RTK Query
- **Styling & UI:** Material UI (MUI) v6
- **Data Visualization:** Recharts
- **API:** GitHub REST API

## ⚙️ Technical Highlights

- **RTK Query Integration:** Uses RTK Query's caching and `providesTags` to efficiently fetch and invalidate repository data without unnecessary network requests.
- **Debounced Inputs:** Implements a custom `useDebounce` hook to prevent rate-limiting the GitHub API during fast typing.
- **UI UX Polish:** Utilizes MUI `<Skeleton>` components for smooth loading states and avoids layout shifts. Includes deep linking to repositories and rich avatar displays.

## 🏃‍♂️ Running Locally

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/repo-radar-challenge.git
```
2. Navigate into the directory:
```bash
cd repo-radar
```
3. Install dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm run dev
```

---
*Built with ❤️ for the Frontend Challenge.*
