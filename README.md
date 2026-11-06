# Mohammed Touzeeh Ahmed — Portfolio

A modern, high-performance, scroll-driven 3D personal portfolio built with **Next.js (App Router)**, **React Three Fiber**, **Tailwind CSS**, and **Lenis**.

Live at: [https://touzeeh.xyz](https://touzeeh.xyz)

---

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript + React 19
- **3D Graphics**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Smooth Scroll**: Lenis
- **Styling**: Tailwind CSS v4 + Glassmorphism
- **API & Backend**: Next.js Route Handlers (`/api/contact`) with validation, honeypot spam protection, and free email/Discord notification forwarding
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

## 🌐 Deploy to Vercel with Custom Domain (`touzeeh.xyz`)

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
6. Add `touzeeh.xyz` (and `www.touzeeh.xyz`).
7. Update your DNS settings at your domain registrar with the CNAME / A records provided by Vercel.

---

## 📬 Free Contact Form Setup (Receive Messages to Your Email or Phone)

To receive all messages sent via the contact form on `touzeeh.xyz` 100% free:

### Option 1: Direct to Email with Web3Forms (Recommended, 2 min setup)
1. Go to [web3forms.com](https://web3forms.com).
2. Enter your email address (`touzeeh@engineer.com` or your personal email) and click **"Create Access Key"**.
3. Check your email for your free Access Key.
4. Go to **Vercel Dashboard > Project Settings > Environment Variables**.
5. Add variable:
   - **Key**: `WEB3FORMS_ACCESS_KEY`
   - **Value**: `your_access_key_here`
6. Click **Save** and trigger a redeploy (or push any commit).
Every message submitted on your site will now be emailed directly to your inbox with reply-to set to the sender!

### Option 2: Instant Phone Notification via Discord Webhook
1. In your personal Discord, create a private channel (e.g., `#portfolio-leads`).
2. Go to Channel Settings > Integrations > Webhooks > **New Webhook** and copy the URL.
3. In **Vercel Dashboard > Environment Variables**, add:
   - **Key**: `DISCORD_WEBHOOK_URL`
   - **Value**: `https://discord.com/api/webhooks/...`
Whenever someone submits the form, Discord will instantly ping your phone with the sender's details and message!

---

## 📄 License

MIT © [Mohammed Touzeeh Ahmed](https://github.com/touzeeh)
