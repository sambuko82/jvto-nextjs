# JVTO Next.js 15 Migration TODO

## Database Schema
- [x] Create destinations table
- [x] Create tours table
- [x] Create crew/team table
- [x] Create crew_reviews table
- [x] Create press table
- [x] Create partners table
- [x] Create proof_vault table
- [x] Create faq table
- [x] Create pages_meta table
- [x] Create reviews table

## Design System & Global
- [x] Set up design tokens (colors, fonts) in index.css
- [x] Build GlobalLayout component
- [x] Build TopNav component
- [x] Build BottomNav component
- [x] Build Footer component
- [x] Build BookingRail component
- [x] Build AuditStamp component
- [x] Build SafetyMetrics component
- [x] Build AuditTrail component
- [x] Build ForensicUI / AssetViewer component

## tRPC Procedures
- [x] destinations.list
- [x] destinations.getBySlug
- [x] tours.list (with departure filter)
- [x] tours.getBySlug
- [x] crew.list (with role filter)
- [x] crew.getBySlug
- [x] crew.getReviews
- [x] press.list
- [x] partners.list
- [x] proofVault.list (with category filter)
- [x] faq.list
- [x] reviews.list (with featured filter)

## Pages
- [x] Home page (/)
- [x] Destinations hub (/destinations)
- [x] Destination detail (/destinations/:slug)
- [x] Tours hub (/tours)
- [x] Tour detail (/tours/:slug)
- [x] Why JVTO (/why-jvto)
- [x] Verify JVTO (/verify-jvto)
- [x] Team Registry (/team)
- [x] Crew Profile (/team/:slug)
- [x] Travel Guide hub (/travel-guide)
- [x] Travel Guide detail (/travel-guide/:slug)
- [x] FAQ (/faq)
- [x] Reviews (/reviews)
- [x] ISIC Student Package (/isic)
- [x] Booking Policy (/policy/booking)
- [x] Privacy Policy (/policy/privacy)

## Database Seeding
- [x] Seed destinations data (5 destinations)
- [x] Seed tours data (3 tour packages)
- [x] Seed crew data (3 crew members)
- [x] Seed press data (6 press items)
- [x] Seed proof vault data (5 vault items)
- [x] Seed FAQ data (7 questions)
- [x] Seed reviews data (8 reviews)

## Testing
- [x] Write vitest for tRPC procedures (14 tests passing)
- [x] Verify all routes work in browser

## Future Enhancements (from live JVTO website)
- [ ] Add more tour packages (Madakaripura + Bromo, Tumpak Sewu combos)
- [ ] Add more crew members (drivers, additional guides)
- [ ] Integrate real Trustpilot widget
- [ ] Add booking form with email notification
- [ ] Add Google Maps integration for destination locations
- [ ] Add image gallery for each destination
- [ ] Add WhatsApp chat widget
- [ ] SEO meta tags and structured data (JSON-LD)
- [ ] Sitemap.xml generation
- [ ] Integrate full content from live JVTO website (javavolcano-touroperator.com)

## Audit Consolidation — Brand Voice & Content Optimization (2026-03-19)
- [x] Update seed data: 7 tours, 12 FAQ, 8 reviews, 6 press, 6 vault items, correct IDR pricing
- [x] Update Home page: entity anchor paragraph, "Tourist Police-Led" hero, real stats (44+ reviews, 4.7★, 5.0★)
- [x] Update Home trust signals: NIB number, 100% Private, Tourist Police-Led, ISIC Partner
- [x] Update Home audit terminal: real credentials (NIB, SPRIN, STR, HPWKI)
- [x] Update Home Why JVTO cards: Duty First / 100% Private / Verifiable copy
- [x] Update Home CTA: "Plan First, Then Decide" messaging
- [x] Rewrite TopNav: dropdown menus, WhatsApp CTA, correct nav labels
- [x] Rewrite Footer: full nav links, contact card, correct WhatsApp (+62 822-4478-8833), policy links
- [x] Rewrite BookingRail: correct WhatsApp number, brand-aligned copy, always-active CTA
- [x] Add Our Story page (/our-story): full timeline (2010–2026), founder quote, 5 principles
- [x] Add /our-story route to App.tsx
- [x] TypeScript: 0 errors
- [x] Tests: 14/14 passing
- [x] Update Tours page: IDR pricing, dual filter (departure + duration), 16 packages
- [x] Update FAQ page: FAQPage JSON-LD schema injected
- [ ] Update Destinations page: entity anchors, geo-signal sentences
- [ ] Add Google Maps integration for destination locations
- [ ] Add booking form with WhatsApp/email notification
- [ ] Sitemap.xml generation

## SSOT v4.0 + GEO/AEO Audit Consolidation (2026-03-19)
- [x] Re-seed: 16 tours, 14 crew, 5 destinations, 12 FAQ, 8 reviews, 5 press, 5 partners, 6 vault, 21 page meta
- [x] Add departureFrom + physicality columns to tours table
- [x] Add isFeatured column to reviews table
- [x] Update Tours.tsx: 16 packages, dual filter, loading skeleton, empty state
- [x] Update Team.tsx: 14 crew from DB, dynamic count, remove static fallback
- [x] Create JsonLd.tsx: TravelAgency, TouristTrip, TouristAttraction, FAQPage, BreadcrumbList factories
- [x] Inject TravelAgency + WebSite JSON-LD into GlobalLayout (all pages)
- [x] Inject TouristTrip JSON-LD into TourDetail page
- [x] Inject TouristAttraction JSON-LD into DestinationDetail page
- [x] Inject FAQPage JSON-LD into FAQ page
- [x] Create /llms.txt — AI crawler discovery file
- [x] Create /ai-agent-config.json — structured entity data for AI agents
- [x] Create /robots.txt — explicit AI crawler permissions (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- [x] Fix WhatsApp number to +62 822-4478-8833 in all static data
- [x] TypeScript: 0 errors
- [x] Tests: 14/14 passing

## HTML Sync (reviews.html + our-team.html + verify-jvto.html) — 2026-03-19

- [x] Add ktaUrl, selfQuote, memberId columns to crew table
- [x] Add sha256, downloadUrl, description columns to proof_vault table
- [x] Re-seed crew: 14 members with real photo URLs from javavolcano-touroperator.com server
- [x] Re-seed crew: KTA licence URLs for Anjas, Gufron, Kiki, Rendi, Taufik
- [x] Re-seed crew: self-quote for Anjas; member IDs for Boy (#68), Fauzi (#46), Dika (#72)
- [x] Re-seed reviews: 8 reviews with full reviewer names, platform, crew mention name + photo
- [x] Re-seed vault: 13 items with SHA-256 hashes, downloadUrl, description
- [x] Re-seed partners: 7 partners with tier, verifyUrl, verifyLabel, partnerId
- [x] Re-seed press: 4 items with publisher, date, quote, url, translatedTitle
- [x] Rebuild Team.tsx: real crew photos, KTA badge links, self-quotes, guide/driver trust context boxes
- [x] Rebuild Reviews.tsx: crew mention strip with photo, platform rating cards, response policy
- [x] Rebuild VerifyJVTO.tsx: 7-section proof library (Legal/Police/History/Credentials/Press/Partners/Reputation)
- [x] VerifyJVTO: sticky anchor nav with scroll-spy
- [x] VerifyJVTO: SHA-256 copy-to-clipboard button
- [x] VerifyJVTO: download + view buttons per vault item
- [x] TypeScript: 0 errors
- [x] Tests: 14/14 passing

## Homepage Narrative Blueprint Consolidation — 2026-03-19

- [x] Update Hero: H1 "Private Volcano Tours in East Java", subheadline from blueprint §2, trust strip "Licensed operator • Private tours only • Ijen screening on applicable routes • Verifiable credentials"
- [x] Update Hero CTAs: "Browse Private Tours" + "Verify Our Credentials"
- [x] Add Section §3: "What JVTO Is" — direct-answer intro paragraph for AI/impatient users
- [x] Update Section §4: "What Makes JVTO Different" — 6 differentiator cards with exact blueprint copy
- [x] Update Section §5: "Destinations We Operate" — exact descriptions per destination from blueprint
- [x] Add Section §6: "Choose Your Departure City" — Surabaya vs Bali self-sort cards
- [x] Update Section §7: "Featured Private Tours" — standardized cards (title, duration, start city, difficulty, price, 1-line summary)
- [x] Add Section §8: "Founder / Story Block" — "From Local Host to Police-Led Operator" with founder card
- [x] Update Section §9: "Independent Review Sources" — gateway not testimonial dump (Trustpilot, TripAdvisor, Google Maps cards)
- [x] Add Section §10: "Verify JVTO Independently" — 3 verification cards (Legal Identity, Police & Safety, Press & Recognition)
- [x] Add Section §11: "Plan Before You Book" — 4 travel guide teaser cards
- [x] Update Section §12: "Pre-Footer CTA Band" — "Ready to choose a route, or want to verify us first?" with 3 actions
- [x] Update Footer: Verify links cluster, policy links cluster, external proof links, correct email (hello@javavolcano-touroperator.com)
- [x] Update TopNav: "View All Tours" + "Verify JVTO" as header CTAs

## Design System v3.3 Implementation (2026-03-20)

- [x] Apply design tokens: Public Sans + JetBrains Mono fonts via Google Fonts CDN
- [x] Apply color tokens: Safety Orange #FF6B35, Authority Navy #0F172A, Verified Lime #A3E635, Audit White #F4F6F8
- [x] Apply shape tokens: radius-bento 2.5rem, radius-card 1.1rem, radius-button 0.75rem
- [x] Apply shadow tokens: shadow-sm, shadow-md, shadow-orange
- [x] Apply animation tokens: scanline 3s, animate-marquee 30s, status-live pulse
- [x] Rebuild index.css: full Tailwind v4 @theme block with OKLCH color values
- [x] Update index.html: Google Fonts CDN (Public Sans 400/700/900, JetBrains Mono 400/700)
- [x] Rebuild TopNav: mode-aware styling, progress indicator, forensic/travel/support variants, backdrop blur
- [x] Rebuild Footer: forensic surface, grid nav, contact card, trust badges
- [x] Rebuild BookingRail: orange glow shadow, encrypted-channel styling, correct WhatsApp
- [x] Apply Forensic Mode to Tours.tsx: dark header gradient, forensic filter bar (orange/lime active states), clean card grid
- [x] Apply Forensic Mode to Destinations.tsx: dark header, forensic filter bar, hover lift cards
- [x] Apply Hybrid Support Mode to WhyJVTO.tsx: dark header → light problem → dark solution → light press → dark CTA
- [x] Apply Hybrid Support Mode to TravelGuide.tsx: dark header, warning band, clean guide cards
- [x] TypeScript: 0 errors
- [x] Tests: 14/14 passing
