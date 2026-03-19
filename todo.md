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
