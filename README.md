# Faculty of Computing & Information Technology (FOCITSA) - UNIOSUN

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

Welcome to the official frontend platform for the **Faculty of Computing and Information Technology (FOCITSA)** at Osun State University (UNIOSUN). 

This platform serves as the digital ecosystem for the faculty, providing prospective students, current undergraduates, staff, and alumni with a centralized hub for academic resources, news, departmental profiling, and student union administration.

## 🚀 Key Features

* **Dynamic Departmental Portals**: Each of the 7 departments has a dedicated page showcasing their vision, staff directory (streamed for optimal FCP), and Hall of Fame.
* **Student Union (FOCITSA) Dashboard**: Complete database of the Executive and Legislative student leaders, organized by academic session and branch.
* **Alumni & Donation Portals**: Robust, client-validated forms utilizing `react-hook-form` and `zod` schema validation to ensure data integrity before network transit.
* **Backend for Frontend (BFF) Pattern**: Payload optimization inside the API service layer prevents massive JSON blobs from blocking the main thread.
* **Suspense & Streaming**: Slow relational data (e.g., Staff Directories) are streamed to the client using React Router v7 `<Await>` blocks, preserving instant First Contentful Paint.

## 🛠 Tech Stack

* **Core:** React 18
* **Routing & Data Loading:** React Router v7 (Data APIs)
* **Styling:** Tailwind CSS v4, Lucide React (Icons)
* **Forms & Validation:** React Hook Form, Zod
* **Build Tool:** Vite

## 🏗 Architecture & Deployment

This application is engineered for high performance and seamless deployment on static hosts like Vercel or Netlify.

### Environment Toggling (The Proxy Router)
The data layer (`src/services/api.js`) acts as an environment proxy. It automatically detects the active environment via `.env` files and routes requests either to the local mock JSON arrays (for frontend development/demonstration) or the live backend server.
* Development: `VITE_USE_MOCK_API=true`
* Production: `VITE_USE_MOCK_API=false`

### Build Optimization
The Vite configuration (`vite.config.js`) implements explicit chunk splitting via `manualChunks`. Heavy third-party libraries are isolated into specific chunks:
* `vendor-react` (React, React-DOM)
* `vendor-router` (React Router)
* `vendor-ui` (Lucide, Hook Form, Zod, Tailwind-Merge)

This guarantees that our application code remains incredibly lightweight, while the browser caches the heavy dependencies indefinitely.

### SPA Catch-All Routing
A `vercel.json` file is included at the root directory to implement a rewrite rule. This intercepts deep links (e.g., `/departments/computer-science`) and directs traffic back to `index.html`, preventing the standard 404 server errors associated with Single Page Applications on static hosts.

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Donops-07/focit.git
   cd focit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Production Build & Preview:**
   ```bash
   npm run build
   npm run preview
   ```

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/       # Navbar, Footer, Main Layout
│   └── ui/           # Reusable atomic UI (ProfileCard, DataGrid, etc.)
├── data/             # Static JSON configurations (Navigation, About history)
├── pages/            # Top-level Route components (Home, Focitsa, Departments)
├── services/         # API Layer and Mock Data (api.js)
├── lib/              # Utility functions (Tailwind merge)
└── main.jsx          # React Router Configuration & Entry Point
```

## 🤝 Contributing
For frontend modifications, adhere strictly to the established Atomic Design principles. Create reusable components in `src/components/ui/` rather than hardcoding complex JSX blocks inside the page routes. Maintain robust Information Architecture (IA) by utilizing the `api.js` abstraction for all data fetching.
