# 📡 Repo Radar

A frontend dashboard that lets users search GitHub repositories, track their favorites, and monitor their latest stats. Built as a technical challenge showcasing modern React architecture and data fetching patterns.

## 🛠️ Architecture & Technical Decisions

- **State & Data Fetching (RTK Query):** Chosen over standard Redux thunks or Context API for its powerful built-in caching, deduping, and automatic state management (`isLoading`, `isFetching`). The `providesTags` and `invalidateTags` feature is used to handle global refetching ("Refresh All") cleanly without writing boilerplate code.
- **Debounced Inputs:** Implemented a custom `useDebounce` hook for the search input to delay API calls by 500ms. This prevents spamming the GitHub API while typing and ensures a snappy UI.
- **UI & Styling (Material UI):** MUI v6 was selected to rapidly build a polished, accessible, and responsive interface. Components like `<Skeleton>` are used to prevent layout shifts during network requests, and `ThemeProvider` handles the seamless Light/Dark mode toggle.
- **Data Visualization:** `Recharts` was integrated for the bar chart due to its declarative, React-friendly API and responsive nature.

## ⚠️ Assumptions & Limitations

- **GitHub API Rate Limits:** The app uses unauthenticated requests to the GitHub REST API, which has a strict limit of 60 requests per hour. It is assumed the reviewer will not exceed this during normal testing. Handling OAuth/PAT tokens was considered out of scope for this specific UI challenge.
- **Storage Strategy:** Tracked repository names are persisted using standard browser `localStorage`. It is assumed the user will not track enough repositories to exceed the ~5MB quota limit.
- **Data Freshness:** Data is fetched on mount and cached. The app does not implement background polling (e.g., websockets or intervals), assuming that the manual "Refresh" / "Refresh All" buttons are sufficient for the dashboard requirements.

## 🏃‍♂️ Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/repo-radar-challenge.git
```
2. **Navigate into the directory:**
```bash
cd repo-radar
```
3. **Install dependencies:**
```bash
npm install
```
4. **Start the development server:**
```bash
npm run dev
```
5. **View the app:** Open your browser and navigate to `http://localhost:5173`
