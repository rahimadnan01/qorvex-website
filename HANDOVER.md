# Qorvex Studio — Handover Documentation & Deployment Guide

Welcome to the **Qorvex Studio** codebase. This project is built using a full **MERN Stack (MongoDB, Express, React + Vite, Node.js)** architecture with Three.js / React Three Fiber WebGL animations, GSAP ScrollTrigger, Lenis smooth scroll, Tailwind CSS, and a dynamic `/admin` CMS portal.

---

## 📁 Repository Structure

```
Qorex website/
├── backend/                  # Express REST API & MongoDB Mongoose Backend
│   ├── config/db.js          # MongoDB connector + dynamic memory fallback engine
│   ├── data/defaultData.js   # Seed data & fallback memory cache
│   ├── models/               # Mongoose Schemas (Service, TeamMember, Project, Testimonial, Contact)
│   ├── routes/               # Express REST API endpoints (/api/services, /api/team, etc.)
│   ├── seed.js               # Database population script (`npm run seed`)
│   └── server.js             # Express entry point (Port 5000)
│
├── frontend/                 # Vite + React + R3F + GSAP + Lenis Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── canvas/       # 3D R3F WebGL Canvas scenes (Hero core & service meshes)
│   │   │   ├── admin/        # Admin CMS Dashboard (/admin)
│   │   │   ├── Header.tsx    # Glassmorphic navbar & CTA
│   │   │   ├── Hero.tsx      # Kinetic typography & Q-mark circuit trace
│   │   │   ├── Manifesto.tsx # 3 Pillars reveal & metrics count-up
│   │   │   ├── Services.tsx  # API-driven dynamic capabilities list
│   │   │   ├── Portfolio.tsx # Selected work gallery & case study reader
│   │   │   ├── Process.tsx   # 5-Step interactive timeline
│   │   │   ├── Team.tsx      # Founding team cards with RGB displacement hover
│   │   │   ├── Testimonials.tsx # Dual marquee ticker & client quotes
│   │   │   ├── Contact.tsx   # Interactive project builder & REST submit form
│   │   │   └── Footer.tsx    # Giant kinetic logo & studio clock
│   │   ├── services/api.ts   # REST API client with fallback data
│   │   ├── types/index.ts    # TypeScript definitions
│   │   └── App.tsx           # Router, Lenis smooth scroll & preloader setup
│   └── vite.config.ts
└── HANDOVER.md
```

---

## 🚀 Quick Start Guide (Local Development)

### 1. Launch Backend REST API (Port 5000)
```bash
cd backend
npm install
npm start
```
*The backend connects to MongoDB if `MONGODB_URI` is provided in `.env`. If MongoDB is disconnected, it seamlessly runs using its built-in memory fallback layer so the site works 100% out of the box.*

### 2. Seed Database (Optional)
To populate MongoDB Atlas or local MongoDB with default studio data:
```bash
cd backend
npm run seed
```

### 3. Launch Frontend (Port 3000)
In a separate terminal window:
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Managing Content via Admin CMS (`/admin`)

To update Team Members, Services, or Projects without touching code:
1. Navigate to `http://localhost:3000/admin` (or click **Admin CMS** in the header).
2. Click **ADD NEW SERVICE** or **ADD TEAM MEMBER**.
3. Edit fields (title, bio, 3D icon mesh type, photo URLs, order priority) and click **SAVE**.
4. Content updates instantly on the live site!

---

## 🌐 Deployment Instructions

### Deployment to Vercel (Frontend)
1. Push `frontend/` to GitHub.
2. Import project in [Vercel](https://vercel.com).
3. Set root directory to `frontend`.
4. Add Environment Variable:
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

### Deployment to Render (Backend)
1. Push `backend/` to GitHub / Render Web Service.
2. Set build command: `npm install`
3. Set start command: `node server.js`
4. Add Environment Variable:
   ```env
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/qorvex_db?retryWrites=true&w=majority
   ```
