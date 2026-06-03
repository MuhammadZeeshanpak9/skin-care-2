# aïaaïa Skincare Platform — Project Context for Claude

## What this project is

aïaaïa is a luxury African botanical skincare brand. This codebase is the frontend platform — a React SPA that will eventually include:
- A branded homepage
- A personalized skin assessment engine (18 questions, branching logic)
- Product catalog connected to Supabase
- User auth (Supabase)
- Cart and checkout
- Results page that recommends products based on assessment

---

## Tech Stack (actual, as built)

| Layer | Technology |
|---|---|
| Framework | **Vite + React 19 + React Router v7** (NOT Next.js) |
| Language | TypeScript ~5.9 |
| Styling | Tailwind CSS v3.4, custom design system |
| Animation | Framer Motion v12, GSAP installed but unused |
| UI Components | shadcn/ui (50+ components in `src/components/ui/`) |
| State | Zustand installed but no stores built yet |
| Data fetching | @tanstack/react-query (initialized in main.tsx) |
| Forms | react-hook-form + zod installed but unused |
| Backend/DB | **Nothing connected yet** — Supabase not installed |
| Smooth scroll | lenis installed but not imported |

---

## Project Structure

```
app/
└── src/
    ├── main.tsx              ← Entry point, QueryClient, ThemeProvider, BrowserRouter
    ├── App.tsx               ← Route definitions (12 routes)
    ├── index.css             ← Global styles, CSS vars, glass utility classes
    ├── components/
    │   ├── BackgroundEngine.tsx  ← Canvas animation (petals, gold dust, silk lines, mouse orbs)
    │   ├── layout/
    │   │   ├── Navbar.tsx    ← Scroll-hide, glass blur, mobile overlay, hardcoded cart=0
    │   │   └── Footer.tsx    ← 4-column links, newsletter input, social icons
    │   └── ui/               ← shadcn components (badge, button, card, dialog, form, etc.)
    ├── sections/home/        ← 10 homepage sections (all complete)
    │   ├── Hero.tsx
    │   ├── TrustBar.tsx
    │   ├── HowItWorks.tsx
    │   ├── Ingredients.tsx
    │   ├── FeaturedProducts.tsx
    │   ├── MissionStatement.tsx
    │   ├── WellnessEdit.tsx
    │   ├── BrandStory.tsx
    │   ├── Journal.tsx
    │   └── FinalCTA.tsx
    ├── pages/
    │   ├── Home.tsx          ← Assembles all 10 sections
    │   ├── Assessment.tsx    ← SHELL: "coming soon" placeholder only
    │   ├── Results.tsx       ← SHELL: static placeholder only
    │   ├── Products.tsx      ← Partial: UI done, 8 hardcoded products, filter works
    │   ├── ProductDetail.tsx ← Partial: UI done, hardcoded data (ignores slug)
    │   ├── Boutique.tsx      ← Partial: UI done, 4 hardcoded services
    │   ├── Cart.tsx          ← Partial: UI done, 2 hardcoded items, buttons do nothing
    │   ├── Checkout.tsx      ← Partial: form UI only, not wired, hardcoded total $112
    │   ├── OrderConfirmation.tsx ← Partial: static content, no real order data
    │   ├── Auth.tsx          ← Partial: UI toggle login/signup, inputs NOT connected
    │   ├── Account.tsx       ← Partial: shows "Guest User", no real data
    │   └── Admin.tsx         ← Partial: dashboard layout, all hardcoded mock data
    └── lib/
        ├── animations.ts     ← Framer Motion variants (fadeUp, staggerContainer, etc.)
        └── utils.ts          ← cn() helper from shadcn

MISSING (does not exist):
  src/store/                  ← no Zustand stores
  src/types/                  ← no shared types
  src/constants/              ← no question data
  src/components/assessment/  ← no assessment components
  lib/supabase.ts             ← no Supabase client
  .env.local                  ← no environment variables
```

---

## Design System

### Brand Colors (defined in `tailwind.config.js` and `index.css`)

```
cream:           #FFF9F3   ← page background
text-primary:    #2E2923   ← main text
text-muted:      #7A7168   ← secondary text
text-light:      #B5A99A   ← placeholder/disabled
solar-gold:      #F2A900   ← primary accent (CTAs, highlights)
deep-mauve:      #634141   ← hero title, brand accent
luxury-green:    #7C9A78   ← botanical, nature
light-sage:      #E4F4DE   ← soft green backgrounds
champagne:       #E8D7B8   ← warm accent
rose:            #D9B6AA   ← soft pink
dusty-rose:      #D19999   ← medium pink
dark-panel:      #1C1A17   ← footer, journal section
```

### Fonts
- `font-cormorant` — Cormorant Garamond (display / headings / italic accents)
- `font-jost` — Jost (body, labels, buttons, UI text)

### Glass Utility Classes (in `index.css`)
- `.glass-warm` — frosted white glass (cards, navbar)
- `.glass-dark` — frosted dark glass (footer, journal)
- `.glass-gold` — gold-tinted glass (product images, accent containers)

### Custom Effects
- `.card-lift` — translateY(-6px) on hover with shadow
- `.img-zoom` — scale(1.05) on hover
- `.btn-liquid` — ripple overlay effect on hover

### Font Size Scale
```
text-display  clamp(4rem, 10vw, 9rem)  ← hero brand name
text-hero     clamp(3rem, 7vw, 7rem)
text-h1       clamp(2.5rem, 5vw, 5rem)
text-h2       clamp(2rem, 4vw, 3.5rem)
text-h3       clamp(1.5rem, 3vw, 2.5rem)
text-overline 0.6875rem, tracking 0.18em, uppercase
```

---

## Routes

| Path | Page | Status |
|---|---|---|
| `/` | Home | COMPLETE |
| `/assessment` | Assessment | SHELL |
| `/results/:id` | Results | SHELL |
| `/products` | Products | PARTIAL |
| `/products/:slug` | ProductDetail | PARTIAL |
| `/boutique` | Boutique | PARTIAL |
| `/cart` | Cart | PARTIAL |
| `/checkout` | Checkout | PARTIAL |
| `/order-confirmation/:id` | OrderConfirmation | PARTIAL |
| `/auth` | Auth | PARTIAL |
| `/account` | Account | PARTIAL |
| `/admin` | Admin | PARTIAL |

---

## What Is Complete

- **Homepage** — all 10 sections, fully animated, all images present
- **BackgroundEngine** — canvas with floating petals, gold dust particles, silk lines, mouse-tracked gradient orbs, reduced-motion support
- **Navbar** — scroll-hide behavior, glass blur on scroll, mobile fullscreen overlay menu
- **Footer** — 4-column links, newsletter input, social icons
- **Design system** — all colors, fonts, glass classes, animation variants
- **UI components** — full shadcn library available
- **TypeScript** — zero type errors
- **Build** — `npm run build` succeeds (567 kB JS bundle, one chunk-size warning)

---

## What Needs to Be Built

### Priority 1 — Backend Connection
1. Install `@supabase/supabase-js` and `@supabase/ssr`
2. Create `.env.local` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Create `src/lib/supabase.ts` — Supabase client
4. Wire `Auth.tsx` to Supabase auth (signIn, signUp, signOut, session)

### Priority 2 — State Management
5. Create `src/store/cartStore.ts` — Zustand store for cart items
6. Create `src/store/assessmentStore.ts` — Zustand store for assessment progress
7. Wire Navbar cart badge to cartStore
8. Wire Cart page buttons (+/-/remove) to cartStore

### Priority 3 — Assessment Engine (the core feature)
9. Create `src/types/assessment.ts` — Question, Answer, SkinProfile types
10. Create `src/constants/questions.ts` — 18 questions with branching logic
11. Create `src/components/assessment/QuestionCard.tsx`
12. Create `src/components/assessment/ProgressBar.tsx`
13. Create `src/components/assessment/AssessmentEngine.tsx`
14. Replace the shell `Assessment.tsx` with the real engine
15. On complete: save result to Supabase, navigate to `/results/:id`
16. Build `Results.tsx` — fetch assessment result, display skin profile + recommended products

### Priority 4 — Product Data
17. Create Supabase `products` table
18. Import product data (name, price, collection, description, images, ingredient tags)
19. Replace hardcoded arrays in `Products.tsx` and `FeaturedProducts.tsx` with Supabase queries
20. Fix `ProductDetail.tsx` — look up product by slug from Supabase

### Priority 5 — Polish & Deploy
21. Fix Rules of Hooks violation in `MissionStatement.tsx` (useTransform inside .map())
22. Add `/journal` route (or remove footer link)
23. Wire Checkout form with react-hook-form + zod validation
24. Add `vercel.json` and deploy

---

## Known Bugs

| Bug | Location |
|---|---|
| Cart badge always shows "0" | `Navbar.tsx:107` |
| `useTransform` called inside `.map()` — Rules of Hooks violation | `MissionStatement.tsx:35-45` |
| ProductDetail ignores URL slug — always shows serum | `ProductDetail.tsx` |
| Auth form inputs are uncontrolled (no value/onChange) | `Auth.tsx` |
| Footer `/journal` link is a 404 | `Footer.tsx:13` |
| Cart +/- buttons and remove X do nothing | `Cart.tsx` |
| Checkout "Place Order" does nothing | `Checkout.tsx:79` |

---

## Dependencies Reference

```json
"dependencies": {
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router": "^7.6.1",
  "framer-motion": "^12.40.0",
  "gsap": "^3.15.0",
  "lenis": "^1.3.23",
  "zustand": "^5.0.13",
  "react-hook-form": "^7.76.1",
  "zod": "^4.4.3",
  "@tanstack/react-query": "^5.100.14",
  "three": "^0.184.0",
  "tailwind-merge": "^3.6.0",
  "clsx": "^2.1.1",
  "lucide-react": "^0.562.0",
  "next-themes": "^0.4.6",
  "sonner": "^2.0.7"
}
```

NOT installed (needs to be added):
- `@supabase/supabase-js`
- `@supabase/ssr`

---

## How to Run

```bash
cd app
npm install
npm run dev        # → http://localhost:5173 (or next available port)
npm run build      # production build → dist/
npx tsc --noEmit   # type check (currently 0 errors)
```

---

## Notes for Claude

- The project uses **path alias `@/`** which maps to `src/` (configured in vite.config.ts)
- All imports use `@/components/...`, `@/lib/...`, `@/pages/...` etc.
- Framer Motion animation variants are centralized in `src/lib/animations.ts` — use these instead of writing inline variants
- The glass classes (`.glass-warm`, `.glass-dark`, `.glass-gold`) are defined in `index.css` — use them instead of raw Tailwind
- Fonts are referenced as `font-cormorant` and `font-jost` in Tailwind classes
- The shadcn `Badge` component has custom variants: `"sage"`, `"rose"`, `"gold"`, `"dark"` — check `src/components/ui/badge.tsx` before adding more
- `cn()` helper is in `src/lib/utils.ts`
- Do not add comments to code unless the logic is genuinely non-obvious
- Do not create new pages or abstractions beyond what is asked
