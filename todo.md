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
