# Mohammed Touzeeh Ahmed — Portfolio

A modern, high-performance, scroll-driven 3D personal portfolio built with **Next.js (App Router)**, **React Three Fiber**, **Tailwind CSS**, and **Lenis**.

Live at: [https://touzeehverse.xyz](https://touzeehverse.xyz)

---

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript + React 19
- **3D Graphics**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Smooth Scroll**: Lenis
- **Styling**: Tailwind CSS v4 + Glassmorphism
- **API & Backend**: Next.js Route Handlers (`/api/contact`) with validation & honeypot spam protection
- **SEO & Accessibility**: Open Graph, Twitter Cards, Sitemap, Robots, JSON-LD Person schema, WCAG AA contrast (≥ 4.5:1), and prefers-reduced-motion support.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # Contact form submission handler
│   ├── globals.css            # Tailwind tokens, fluid clamp typography
│   ├── layout.tsx             # RootLayout, fonts, metadata & JSON-LD
│   ├── page.tsx               # Main page & scroll stage orchestration
│   ├── robots.ts              # /robots.txt
│   └── sitemap.ts             # /sitemap.xml
├── components/
│   ├── 3d/                    # Shared Canvas, ScrollCamera & 6 Stage visualizers
│   ├── sections/              # Navbar, Hero, About, Skills, Projects, Timeline, Contact, Footer
│   └── ui/                    # TiltCard, CustomCursor, SmoothScroll, Icons
├── data/
│   └── portfolioData.ts       # Central source of truth for all portfolio content
├── lib/
│   └── utils.ts
└── types/
    └── index.ts
```

---

## 🛠️ Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/touzeeh/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 Deploy to Vercel with Custom Domain (`touzeehverse.xyz`)

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/touzeeh/portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `touzeeh/portfolio` repository. Next.js will be detected automatically.
4. Click **Deploy**.
5. Once deployed, navigate to **Project Settings > Domains** in your Vercel Dashboard.
6. Add `touzeehverse.xyz` (and `www.touzeehverse.xyz`).
7. Update your DNS settings at your domain registrar with the CNAME / A records provided by Vercel.

---

## 📄 License

MIT © [Mohammed Touzeeh Ahmed](https://github.com/touzeeh)
