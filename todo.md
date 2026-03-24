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


## Trustpilot Integration (2026-03-21)

- [x] Create Trustpilot scraper to extract all 31 reviews from javavolcano-touroperator.com
- [x] Parse review text to identify crew mentions (Yandi: 8, Rendi: 7, Ahboy: 4, Gufron: 3, etc.)
- [x] Add trustpilotUrl and crewId columns to reviews table
- [x] Seed database with 31 Trustpilot reviews with crew linkages
- [x] Update Reviews.tsx to display Trustpilot data with crew mention cards
- [x] Verify all crew mentions correlate correctly with crew database (crew IDs 60023-60036)
- [x] TypeScript: 0 errors
- [x] Tests: 14/14 passing


## Reviews Filter & Sort (2026-03-23)

- [x] Add reviews.listFiltered tRPC procedure with rating and crewId filters
- [x] Add reviews.listSorted tRPC procedure with sort options (newest, rating-high, rating-low)
- [x] Update Reviews.tsx: add filter bar (rating dropdown, crew dropdown), sort selector
- [x] Update Reviews.tsx: implement dynamic review loading based on filters
- [x] TypeScript: 0 errors
- [x] Tests: 14/14 passing

## Homepage Blueprint FINAL Implementation (2026-03-24)

- [x] Rebuild Home.tsx Section A: TopNav with exact labels
- [x] Rebuild Home.tsx Section B: Hero with eyebrow, H1, subheadline, trust strip, CTA row
- [x] Rebuild Home.tsx Section C: Entity Anchor / Direct-Answer Intro Block
- [x] Rebuild Home.tsx Section D: 6 differentiator cards
- [x] Rebuild Home.tsx Section E: 5 destination cards
- [x] Rebuild Home.tsx Section F: Choose Departure City (Surabaya vs Bali)
- [x] Rebuild Home.tsx Section G: Featured Tours (6 tours with currency toggle)
- [x] Rebuild Home.tsx Section H: Our Story inline (2-column + founder card + timeline)
- [x] Rebuild Home.tsx Section I: Mandatory Requirement (Ijen Health Screening)
- [x] Rebuild Home.tsx Section J: International Guests (geographic entity signal)
- [x] Rebuild Home.tsx Section K: Independent Review Sources (3 platform cards)
- [x] Rebuild Home.tsx Section L: Verify JVTO Independently (3 verification cards)
- [x] Rebuild Home.tsx Section M: Plan Before You Book (4 travel guide teasers)
- [x] Rebuild Home.tsx Section N: FAQ (7 flat visible Q&A + FAQPage JSON-LD)
- [x] Verify all CTA routes are correct
- [x] TypeScript: 0 errors
- [x] Tests: all passing


## All-Hubs Blueprint Implementation (2026-03-24)

### Why JVTO Page (/why-jvto)
- [x] Section A: AEO Answer Block (55-word trust summary)
- [x] Section B: 14 Verified Reasons (numbered list with proof links)
- [x] Section C: FAQ (flat HTML <details> or <div> blocks)
- [x] Add Organization schema with 14 reasons
- [x] Add BreadcrumbList schema
- [x] TypeScript: 0 errors

### JSON-LD Schema Implementation (2026-03-24)
- [x] Create reusable JsonLd component and schema factories
- [x] Add Organization schema to Home page
- [x] Add Person schemas (Founder + Medical Officer)
- [x] Add FAQPage schema to Why JVTO page
- [x] Add BreadcrumbList schemas to all pages
- [x] Add ItemList schema (credential registry) to Verify JVTO page
- [x] Add TouristTrip schema to Tour Detail pages
- [x] All 14 tests passing, TypeScript: 0 errors

### Verify JVTO Page (/verify-jvto)
- [ ] Section A: Intro + Proof Library Overview
- [ ] Section B: Legal Identity (NIB, TDUP documents)
- [ ] Section C: Police Credentials (Tourist Police ID, NRP)
- [ ] Section D: Guide Credentials (HPWKI, climbing permits)
- [ ] Section E: Medical Officer (dr. Ahmad Irwandanu, STR)
- [ ] Section F: Press Coverage (Stefan Loose, Detik.com, Radar Jember)
- [ ] Section G: Partner Affiliations (ISIC, INDECON)
- [ ] Add SHA-256 copy-to-clipboard for each document

### Our Story Page (/our-story)
- [ ] Section A: Origin Story (2015 guesthouse narrative)
- [ ] Section B: The Problem That Built JVTO
- [ ] Section C: The Pillars We Built On (5 founding principles)
- [ ] Section D: JVTO Today (current state, metrics)
- [ ] Section E: Timeline (2015-2026 chronology as <ol>)
- [ ] Section F: CTA (Meet team, Verify, Explore tours)
- [ ] Add TravelAgency schema with foundingDate
- [ ] Add Person schema for founder
- [ ] Add BreadcrumbList schema
- [ ] TypeScript: 0 errors

### Travel Guide Hub (/travel-guide)
- [ ] Section A: Intro + 4 guide card teasers
- [ ] Section B: Quick Links to sub-pages
- [ ] Add index of all travel guide sub-pages
- [ ] Add BreadcrumbList schema
- [ ] TypeScript: 0 errors

### Travel Guide Sub-pages
- [ ] /travel-guide/ijen-health-screening
- [ ] /travel-guide/packing-list
- [ ] /travel-guide/booking-steps
- [ ] /travel-guide/volcano-closure-policy
- [ ] Each with full content from blueprint
- [ ] Each with BreadcrumbList schema

### Reviews Page (/reviews)
- [ ] Ensure all 31 Trustpilot reviews display correctly
- [ ] Add crew mention cards with photos
- [ ] Add filter/sort functionality
- [ ] Add AggregateRating schema
- [ ] TypeScript: 0 errors

### Team/Crew Pages (/team, /team/:slug)
- [ ] Verify all 14 crew members display with photos
- [ ] Add KTA badge links
- [ ] Add self-quotes for each crew member
- [ ] Add trust context boxes (guide/driver)
- [ ] Add BreadcrumbList schema
- [ ] TypeScript: 0 errors

### ISIC Student Package Page (/isic)
- [ ] Section A: Student Discount Intro
- [ ] Section B: How to Verify ISIC Card
- [ ] Section C: Eligible Tours
- [ ] Section D: Discount Amount
- [ ] Section E: CTA (Book Now)
- [ ] Add BreadcrumbList schema
- [ ] TypeScript: 0 errors

### Policy Pages (/policy/booking-payment-cancellation, /policy/privacy)
- [ ] Booking & Payment Policy: full terms
- [ ] Cancellation Policy: 48+ hours rule
- [ ] Privacy Policy: data handling
- [ ] Add BreadcrumbList schema
- [ ] TypeScript: 0 errors

### FAQ Page (/faq)
- [ ] Ensure all 12 FAQ items render as flat HTML
- [ ] Add FAQPage JSON-LD schema
- [ ] Add BreadcrumbList schema
- [ ] TypeScript: 0 errors

### Final QA
- [ ] All pages render without console errors
- [ ] All pages have correct meta tags (title, description, canonical)
- [ ] All pages have JSON-LD schemas
- [ ] All internal links are correct
- [ ] All external links open in new tab with rel="noopener noreferrer"
- [ ] All tests passing (14+)
- [ ] TypeScript: 0 errors
