# 🌊 JobPortal UI — React + Vite + Tailwind CSS

> A modern, fully responsive Job Portal built with React, featuring AI-powered job matching, smooth animations, light/dark theme toggle, and real company SVG logos.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer&logoColor=white&style=flat-square)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white&style=flat-square)

---

## ✨ Features

-  **Midnight Teal + Gold Theme** — Unique color palette, not your average purple/dark blue
-  **Light / Dark Mode** — Full toggle with smooth transitions, text readable in both modes
-  **Smart Job Search** — Search by title, company, skills with real-time filtering
-  **Category & Type Filters** — Filter by Engineering, Design, Marketing, Product, Data, Security
-  **Scroll Reveal Animations** — Every section animates in smoothly on scroll
-  **Page Transitions** — Smooth fade + slide between all routes via AnimatePresence
-  **Real Company SVG Logos** — Google, Apple, Meta, Netflix, Spotify, Airbnb, AWS, Figma, HubSpot, Notion, Snap, CrowdStrike
-  **AI Match % Badge** — Each job card shows your match percentage
-  **Save Jobs** — Heart/save toggle on every job card with localStorage support
-  **CountUp Animations** — Stats section counts up on scroll into view
-  **Featured Jobs** — Gold gradient stripe + featured badge on top listings
-  **Fully Responsive** — Mobile drawer menu, hamburger animation, works on all screen sizes
-  **Sign In Modal** — Animated form with email/password validation
-  **Newsletter Subscribe** — With success animation on submission

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, Stats, Categories, Job Grid, How It Works, Testimonials, Newsletter |
| Find Jobs | `/jobs` | Search + Filter + Sort job listings |
| Job Detail | `/jobs/:id` | Full job info, tabbed sections, apply button, related jobs |
| Companies | `/companies` | 12 top companies with logos, ratings, industry info |
| Profile | `/profile` | User profile, skills, saved + applied jobs tabs |

---

## 🧩 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | v3 | Utility-first styling |
| Framer Motion | 11 | Animations & transitions |
| React Router DOM | 6 | Client-side routing |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mahak-012/job-portal-ui.git

# Navigate into the project
cd job-portal-ui

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed navbar, theme toggle, sign in modal, hamburger
│   ├── Hero.jsx            # Animated hero with search, floating pills, stats
│   ├── Stats.jsx           # CountUp animated statistics section
│   ├── CategorySection.jsx # Browse jobs by category (8 fields)
│   ├── JobGrid.jsx         # Tabbed job grid with filter tabs
│   ├── JobCard.jsx         # Individual job card with real logos + match badge
│   ├── HowItWorks.jsx      # 4-step process section
│   ├── Testimonials.jsx    # Success stories section
│   ├── Newsletter.jsx      # Email subscription with success animation
│   ├── Footer.jsx          # Footer with links + social buttons
│   └── ScrollReveal.jsx    # Reusable scroll animation wrapper
├── pages/
│   ├── Home.jsx            # Landing page (all sections combined)
│   ├── Jobs.jsx            # Job listing page with search & filters
│   ├── JobDetail.jsx       # Individual job detail with tabs
│   ├── Companies.jsx       # Company showcase with logos & ratings
│   └── Profile.jsx         # User profile with saved/applied jobs
├── context/
│   └── ThemeContext.jsx    # Global dark/light theme context
├── data/
│   └── jobs.jsx            # All job data, company data, SVG logos, categories
├── App.jsx                 # Router setup, AnimatePresence, ScrollTop
├── main.jsx                # React entry point
└── index.css               # Global styles, animations, theme classes
```

---

## 🎨 Design System

### Color Palette

| Name | Dark Mode | Light Mode | Usage |
|------|-----------|------------|-------|
| Background | `#060d12` | `#f0f9f7` | Page background |
| Surface | `rgba(255,255,255,0.04)` | `#ffffff` | Cards |
| Primary | `#0d9488` | `#0d9488` | Teal accent |
| Gold | `#f59e0b` | `#f59e0b` | Highlights |
| Text Primary | `#e8f4f0` | `#0a1f1c` | Headings |
| Text Muted | `rgba(232,244,240,0.45)` | `rgba(10,31,28,0.5)` | Subtitles |

### Typography

- **Headings** — Cormorant Garamond (elegant serif)
- **Body** — DM Sans (clean, modern)

### Animations

- `ScrollReveal` — fade up on viewport enter
- `AnimatePresence` — page route transitions
- `CountUp` — number animation on scroll
- `float` — floating pill elements in hero
- `pulse-dot` — live badge pulsing
- `ticker` — marquee/ticker text

---

## 🏢 Companies Featured

Google · Apple · Meta · Netflix · Spotify · Airbnb · AWS · Figma · HubSpot · CrowdStrike · Snap · Notion

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | 1 column, hamburger menu |
| Tablet | 640px–1024px | 2 columns, hamburger menu |
| Desktop | > 1024px | 3–4 columns, full navbar |

---

## 🔧 Key Components Explained

### `ThemeContext`
Global context that toggles `dark`/`light` class on `document.body`. All components read `useTheme()` and apply conditional styles inline.

### `ScrollReveal`
Wraps any content with Framer Motion `whileInView` animation. Accepts `delay`, `y`, `x`, `scale` props for custom entrance effects.

### `JobCard`
Displays job info with real SVG company logo, AI match %, save toggle, featured stripe, type badge, and animated apply button.

### `CountUp`
Uses `IntersectionObserver` to trigger number animation only once when the element scrolls into view.

---

## 🤝 Author

**Mahak Abdul Ghani**
- 🌐 Portfolio: [mahak-portfolio.vercel.app](https://my-portfolio-seven-pi-49.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/mahak-webdev](https://linkedin.com/in/mahak-webdev)
- 🐙 GitHub: [github.com/Mahak-012](https://github.com/Mahak-012)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <strong>Mahak</strong> — Frontend Developer from Lahore 🇵🇰</p>
