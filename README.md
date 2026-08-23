# Qorvex — Next-Gen Software • Design • SEO Studio Website

A premium, Awwwards-tier marketing website built for **Qorvex**, built with the **MERN Stack (MongoDB, Express, React + Vite, Node.js)**.

## Key Features

- **Interactive 3D WebGL Scene**: Morphing geometric core built with React Three Fiber, custom shaders, and particle swarms that react to cursor movement.
- **Kinetic Typography & Brand Motion**: Animated "Q" tail circuit trace, scroll-triggered text reveals, line-by-line masks, and count-up metrics.
- **Full MERN REST API Backend**: Express server (`/api/services`, `/api/team`, `/api/projects`, `/api/testimonials`, `/api/contact`) with Mongoose models and database seeding script (`seed.js`).
- **CMS Admin Portal (`/admin`)**: Interactive dashboard allowing team members and services to be added, edited, reordered, or deleted live without touching frontend code.
- **Smooth Physics Scroll**: Integrated Lenis smooth scroll engine synced with GSAP ScrollTrigger.
- **Interactive Case Study Showcase**: Gallery with hover preview and deep-dive case study modal breakdown (`Problem -> Approach -> Result`).
- **Interactive Project Builder**: Multi-select capability pills, budget tier selectors, and instant REST API form submission.
- **SEO & Performance Built-in**: Complete OpenGraph, JSON-LD Schema markup, dynamic sitemap (`sitemap.xml`), and `robots.txt`.

## Getting Started

### Backend Server
```bash
cd backend
npm install
npm start
```
Starts Express server on `http://localhost:5000`.

### Frontend Application
```bash
cd frontend
npm install
npm run dev
```
Starts Vite dev server on `http://localhost:3000`.
