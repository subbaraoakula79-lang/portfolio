# Sanjay Akula — Interactive Developer Portfolio

> An Apple-inspired, high-performance personal developer portfolio engineered with React 19, Vite, Tailwind CSS v4, and Framer Motion. Featuring sophisticated glassmorphic surfaces, fluid GPU-accelerated motion choreography, 3D interactive project showcases, and accessible responsive design.

---

## 1. Project Title & Overview

**Sanjay Akula Developer Portfolio** is a modern, single-page creative web application designed to present software engineering projects, technical capabilities, academic foundations, and athletic milestones. Built with an Apple-grade design language, the portfolio emphasizes understated luxury, balanced contrast, layered translucency, and intentional micro-interactions.

- **Developer:** Sanjay Akula
- **Live URL:** [https://sanjay-portfolio-2026.web.app](https://sanjay-portfolio-2026.web.app)
- **Repository:** [https://github.com/subbaraoakula79-lang/portfolio](https://github.com/subbaraoakula79-lang/portfolio)
- **Hosting Platform:** Firebase Hosting & Vercel compatible

---

## 2. Portfolio Introduction

This portfolio bridges the gap between engineering discipline and visual artistry. Sanjay is an Information Technology student at PR Degree College (Adikavi Nannaya University) with core strengths in Java, Python, JavaScript, and Full-Stack Web Development, combined with the focus and mental discipline developed as an Inter-University bronze medalist in Archery.

---

## 3. Key Features

- **Apple-Inspired Glassmorphism:** Layered glass panels (`backdrop-filter: blur(28px) saturate(190%)`), hairline specular highlight borders, and subtle elevation depth.
- **Dynamic 3D Project Tilt:** Interactive mouse-tracking perspective transforms on project cards with smooth cubic-bezier easing.
- **Grace of Christ (GOC) Showcase:** Production showcase of the live church web platform with interactive modal details, responsive aspect-ratio banner, and direct external launch.
- **Command Palette (`⌘K` / `Ctrl+K`):** Global keyboard shortcut modal for instantaneous section navigation and external profile jumping.
- **Categorized Technical Matrix:** Interactive category-filtered tabs for Programming Languages, Web Technologies, Database Systems, Tools, and Core Problem Solving.
- **Magnetic Buttons & Fluid Cursor:** Physics-based spring pull buttons and responsive contextual cursor feedback.
- **Dynamic Island-Style Floating Navbar:** Sticky glass pill navigation with automated `IntersectionObserver` active-section tracking and smooth spring layout pill underlay.
- **Light & Dark Theme Engine:** Seamless system and manual theme toggling with smooth token transitions across the entire DOM tree.
- **Zero-Bloat Minimalist Footer:** Elegant typography, current copyright, social networking shortcuts, and scroll-to-top utility without framework clutter.

---

## 4. Technologies Used

### Frontend Core
- **React 19 (`^19.2.0`)**: Modern component architecture utilizing hooks and concurrent rendering features.
- **Vite 7 (`^7.3.1`)**: Next-generation lightning-fast frontend tooling and production bundler.
- **Tailwind CSS v4 (`^4.2.1`)**: Utility-first CSS engine utilizing modern `@theme` variables and high-performance compilation.
- **Framer Motion (`^12.34.3`)**: Declarative animations, layout animations (`layoutId`), and spring physics.
- **Lucide React (`^0.575.0`)**: Crisp, accessible, and scalable SVG iconography.
- **Typewriter Effect (`^2.22.0`)**: Dynamic animated textual typewriter elements.

### Hosting & Infrastructure
- **Firebase Hosting**: Worldwide CDN caching, SSL encryption, and instant preview channel support.
- **Git & GitHub**: Version management and collaborative continuous deployment pipeline.

---

## 5. Main Sections of the Portfolio

1. **Navigation Bar (`Navbar.jsx`):** Floating translucent glass pill with logo monogram, section links, search shortcut, and theme toggle.
2. **Hero Section (`Hero.jsx`):** Bold animated staggered headline reveal, dynamic role ticker, dual action buttons (View Projects, Contact Me), and animated metric counters.
3. **About Me & Skills (`About.jsx`):** Editorial-style narrative, formal academic timeline, interactive categorized tech stack pills, and engineering pillars.
4. **Selected Work (`Projects.jsx`):** High-impact cards featuring the **Grace of Christ (GOC)** platform and **National Admission Portal**, equipped with 3D tilt and modal breakdowns.
5. **Milestones (`Achievement.jsx`):** Recognition of the Inter-University Archery Bronze medal, linking athletic focus to software debugging rigor.
6. **Current Initiatives (`NowSection.jsx`):** Real-time status indicators on active algorithm practice (LeetCode) and full-stack software development.
7. **Contact (`Contact.jsx`):** Glassmorphic input fields, state-managed feedback submission, and quick contact cards for Email, Phone, LinkedIn, and Instagram.
8. **Footer (`App.jsx`):** Minimalist copyright, brand links, social channels, and scroll-to-top utility.

---

## 6. Animation and Interaction Details

- **Spring Physics:** Buttons, modals, and cursor followers leverage damped springs (`stiffness: 300, damping: 28`) to prevent robotic motion.
- **Perspective Tilt:** The custom `TiltCard` computes relative cursor offset across axes (`(clientX - left) / width - 0.5`) and applies damped rotations.
- **Specular Border Highlights:** Cards utilize pseudo-elements (`::before`) with 1px linear gradients that catch light dynamically upon hover.
- **Accessibility Motion Fallback:** The CSS includes `@media (prefers-reduced-motion: reduce)` which zeroes animation durations for users with vestibular sensitivities.

---

## 7. Project Structure

```
interactive-portfolio/
├── .firebase/                    # Firebase deployment cache and hosting artifacts
├── .vscode/                      # Editor configuration (CSS lint suppression for Tailwind v4)
├── public/                       # Static public assets
│   ├── goc.png                   # Grace of Christ platform screenshot
│   ├── profile.jpg               # Professional headshot
│   ├── new-resume.pdf            # Updated digital resume PDF
│   └── vite.svg                  # Vite logo
├── src/
│   ├── assets/                   # Bundled graphics
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.jsx        # Floating glass navigation bar
│   │   ├── sections/
│   │   │   ├── About.jsx         # Narrative, education timeline & categorized skills
│   │   │   ├── Achievement.jsx   # Archery championship showcase
│   │   │   ├── Contact.jsx       # Contact form & verified social endpoints
│   │   │   ├── Hero.jsx          # Headline, metrics counter & CTA triggers
│   │   │   ├── NowSection.jsx    # Current initiatives & real-time focus
│   │   │   └── Projects.jsx      # 3D interactive project cards & details modal
│   │   └── ui/
│   │       ├── BackgroundEffect.jsx # Dot grid canvas & ambient gradient mesh
│   │       ├── CommandPalette.jsx   # Global keyboard command modal (⌘K)
│   │       ├── CustomCursor.jsx     # Mouse tracking blend-mode circle
│   │       ├── MagneticButton.jsx   # Physics-based magnetic hover component
│   │       └── ScrollProgress.jsx   # Top viewport scroll progress indicator
│   ├── App.css                   # Global component rules
│   ├── App.jsx                   # Application root, theme provider & footer
│   ├── index.css                 # Design tokens, Apple glassmorphic classes & CSS variables
│   └── main.jsx                  # React DOM entrypoint
├── eslint.config.js              # ESLint 9 flat configuration
├── firebase.json                 # Firebase Hosting rewrites, headers & cache policies
├── index.html                    # Root HTML document with font imports
├── package.json                  # Dependencies, metadata & build scripts
├── postcss.config.js             # PostCSS plugin pipeline
└── vite.config.js                # Vite build configuration
```

---

## 8. Prerequisites

Ensure your development workstation has the following installed:
- **Node.js**: `v18.0.0` or higher (Node 20+ LTS recommended)
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)
- **Git**: Latest version

---

## 9. Installation Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/subbaraoakula79-lang/portfolio.git
   cd portfolio
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

---

## 10. Environment Variable Setup

This portfolio runs client-side with static and API-connected endpoints and does not require mandatory local `.env` variables for general previewing. Optional analytics or backend contact endpoints may be specified in a `.env.local` file:

```env
# Optional configuration
VITE_SITE_URL=https://sanjay-portfolio-2026.web.app
```

---

## 11. Development Server Commands

To launch the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will start immediately at:
`http://localhost:5173/`

---

## 12. Production Build Instructions

To compile and bundle the application into production-ready static assets:

```bash
npm run build
```

Vite will bundle and minify all JavaScript, CSS, and HTML files into the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 13. Deployment Instructions

### Deploy to Firebase Hosting (Configured)
1. Ensure the Firebase CLI is installed and authenticated:
   ```bash
   npx firebase login
   ```
2. Build the latest production bundle:
   ```bash
   npm run build
   ```
3. Deploy to the live hosting channel:
   ```bash
   npx firebase deploy --only hosting
   ```

### Deploy to Vercel
1. Install the Vercel CLI or import the repository via the Vercel Dashboard.
2. Build command: `npm run build`
3. Output directory: `dist`

---

## 14. Asset Management

- **Public Assets (`/public`):** Store non-bundled assets such as `goc.png`, `profile.jpg`, and favicons directly in the `public/` directory. They are served at the web root `/filename.ext`.
- **Image Optimization:** Images should be formatted in modern compressed formats (`.webp` or optimized `.png`/`.jpg`) to ensure rapid Time to Interactive (TTI).

---

## 15. Customization Guide

- **Color Palette & Themes:** Modify design tokens in `src/index.css` under the `:root` and `.dark` blocks. Adjust `--color-primary`, `--gradient-btn`, and glass opacity tokens to change the visual identity.
- **Projects Data:** Edit the `projects` array in `src/components/sections/Projects.jsx` to update descriptions, tech badges, live URLs, or thumbnails.
- **Skills Matrix:** Update `skillCategories` in `src/components/sections/About.jsx` to reflect new competencies.
- **Contact Details:** Modify `contactLinks` in `src/components/sections/Contact.jsx` and social links in `src/App.jsx`.

---

## 16. Responsive Design Details

The layout is built mobile-first and tested thoroughly across multiple screen breakpoints:
- **Mobile (`< 640px`):** Single-column stacked cards, full-width touch targets, collapsible glass sheet navigation.
- **Tablet (`640px - 1024px`):** Balanced two-column grids, optimized typography scaling, fluid stats display.
- **Desktop (`> 1024px`):** Expansive multi-column layouts, 3D mouse tilt tracking, custom blend cursor, and floating nav pill.

---

## 17. Accessibility and Performance Notes

- **Keyboard Navigation:** Full tab order support, `ESC` dismiss on all modals, and `⌘K` global shortcut.
- **High Contrast:** All text passes WCAG AA contrast criteria across both light and dark mode backgrounds.
- **Semantic HTML:** Utilizes semantic `<header>`, `<main>`, `<section>`, and `<footer>` elements.
- **Reduced Motion:** Automatic disabling of parallax, card tilt, and continuous loops when `prefers-reduced-motion: reduce` is detected.

---

## 18. Credits & Acknowledgements

- **Design Philosophy:** Inspired by Apple's human interface guidelines and minimalist Scandinavian UI aesthetics.
- **Icons:** [Lucide Icons](https://lucide.dev)
- **Typography:** Space Grotesk, Inter, and JetBrains Mono via Google Fonts.
- **Engineering:** Crafted with care by **Sanjay Akula**.
