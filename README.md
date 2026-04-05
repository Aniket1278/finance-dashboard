# FinTrack — Finance Dashboard

A modern, lightweight personal finance dashboard built with **React 19** and **Vite**. Track your income, expenses, and overall balance with clean analytics and visual insights.

🔗 **Live Demo:** [finance-dashboard-rho-red.vercel.app](https://finance-dashboard-rho-red.vercel.app)

---

## Features

### Overview Cards
- Total Balance calculated in real time
- Total Income and Total Expense at a glance

### Analytics & Charts
- **Line Chart** — Income vs. Expenses trend over time
- **Pie Chart** — Category-wise expense distribution
- Visual insights for better financial decision-making

### Transaction Management
- Add income & expense transactions (admin mode)
- View all transactions in a structured, readable format
- Export transaction data to **CSV / Excel**

### Filtering & Sorting
- Filter transactions by type (Income / Expense)
- Sort by Amount or Date

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool & dev server |
| Recharts | Chart visualizations |
| Context API | Global state management |
| CSS | Custom styling |
| Vercel | Deployment |

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Aniket1278/finance-dashboard.git

# 2. Navigate into the project
cd finance-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

The production build will be output to the `/dist` folder.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
finance-dashboard/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Charts/       # Line chart, Pie chart
│   │   ├── Cards/        # Balance, Income, Expense cards
│   │   └── Transactions/ # Transaction list, add form
│   ├── context/          # Context API — global state
│   ├── utils/            # Utility/helper functions
│   ├── App.jsx           # Root component
│   └── main.jsx          # Entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Approach

- **Context API** for global state — avoids prop drilling without over-engineering with Redux
- **Utility functions** for logic separation (calculations, formatting, CSV export)
- **Modular component architecture** — each feature is an independent, reusable component
- **Recharts** for declarative, responsive chart components
- Focus on **simplicity and usability** over feature bloat

---

## Admin Mode

The dashboard includes an **admin toggle** that controls who can add transactions. This simulates role-based UI behavior — in admin mode, the "Add Transaction" form is accessible; in viewer mode, it is hidden.

---

## Author

**Aniket Patil**
- GitHub: [@Aniket1278](https://github.com/Aniket1278)

---


