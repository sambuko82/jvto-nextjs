# Phase 1: Schema & H1 Master Map Implementation Audit

**Date**: 2026-03-24
**Status**: IN PROGRESS

---

## 1. Route Validation Against Canonical Freeze Map

### Current Routes in App.tsx
```
✅ /
✅ /destinations
✅ /destinations/:slug
✅ /tours
✅ /tours/:slug
✅ /why-jvto
✅ /verify-jvto
✅ /team
✅ /team/:slug
✅ /travel-guide
✅ /travel-guide/:slug
✅ /reviews
✅ /faq
✅ /travel-guide/faq
✅ /isic
✅ /student-packages (alias to /isic)
✅ /our-story
✅ /booking-policy
✅ /privacy-policy
```

### Missing Routes (Per Canonical Freeze Map)

**Why JVTO Cluster:**
- ❌ `/why-jvto/the-jvto-difference`
- ❌ `/why-jvto/our-story` (currently at `/our-story`)
- ❌ `/why-jvto/our-team` (currently at `/team`)
- ❌ `/why-jvto/reviews` (currently at `/reviews`)
- ❌ `/why-jvto/community-standards`

**Verify JVTO Cluster:**
- ❌ `/verify-jvto/legal`
- ❌ `/verify-jvto/press-recognition`
- ❌ `/verify-jvto/history-artifacts`
- ❌ `/verify-jvto/police-safety`

**Travel Guide Cluster:**
- ❌ `/travel-guide/booking-information`
- ❌ `/travel-guide/ijen-health-screening`
- ❌ `/travel-guide/safety-on-tours`
- ❌ `/travel-guide/weather-and-closures`
- ❌ `/travel-guide/packing-and-fitness`
- ❌ `/travel-guide/police-escort-for-groups`

**Policy Cluster:**
- ❌ `/policy` (hub page)
- ❌ `/policy/booking-payment-cancellation`
- ❌ `/policy/inclusions-exclusions`
- ❌ `/policy/privacy`

**Other:**
- ❌ `/contact`
- ❌ `/isic/student-package` (currently at `/isic`)
- ❌ `/tours/from-surabaya`
- ❌ `/tours/from-bali`

---

## 2. H1 Validation Against Schema Master Map

### Current H1s (from pages)

| Route | Current H1 | Expected H1 | Status |
|-------|-----------|-------------|--------|
| `/` | Tourist Police-Led Private Volcano Tours in East Java | Tourist Police-Led Private Volcano Tours in East Java | ✅ Match |
| `/why-jvto` | Why Choose JVTO | Why Travel with Java Volcano Tour Operator (JVTO) | ⚠️ Needs update |
| `/verify-jvto` | Verify JVTO | Verify JVTO: A Proof Library You Can Check | ⚠️ Needs update |
| `/travel-guide` | Travel Guide | Travel Guide – Safety, Health & Practical Information | ⚠️ Needs update |
| `/team` | Our Team | Local Team, Daily Execution | ⚠️ Needs update |
| `/our-story` | Our Story | Our Story: Roots & Continuity Since 2015 | ⚠️ Needs update |
| `/reviews` | Reviews | Guest Voices: Real Experiences, Independently Verified | ⚠️ Needs update |
| `/destinations` | East Java Destinations | East Java Destinations: Volcanoes, Waterfalls & Coastline | ⚠️ Needs update |
| `/tours` | Private Tours | Private East Java Tours: Surabaya & Bali Departures | ⚠️ Needs update |

### Missing H1s (New pages to create)

- `/why-jvto/the-jvto-difference` → `The JVTO Difference: Safety Leadership and Verified Proof`
- `/why-jvto/community-standards` → `Community Standards: Partners, Ethics & Operational Rules`
- `/verify-jvto/legal` → `Legal & Accountability Proof`
- `/verify-jvto/press-recognition` → `Press & Recognition: Third-Party Context`
- `/verify-jvto/history-artifacts` → `History Artifacts: Documented Origins Since 2015`
- `/verify-jvto/police-safety` → `Police & Safety Proof`
- `/travel-guide/booking-information` → `Booking Information – How JVTO Private Tours Work`
- `/travel-guide/ijen-health-screening` → `Ijen Health Screening – Real Checks, Digital Proof`
- `/travel-guide/safety-on-tours` → `Safety on JVTO Tours`
- `/travel-guide/weather-and-closures` → `Weather, Volcano Alerts & Closures`
- `/travel-guide/packing-and-fitness` → `Packing & Fitness for Bromo, Ijen & Tumpak Sewu`
- `/travel-guide/police-escort-for-groups` → `Traffic Police Escort for Tourist Groups in East Java`
- `/policy` → `JVTO Policy Pack`
- `/policy/booking-payment-cancellation` → `Booking, Payment & Cancellation Policy`
- `/policy/inclusions-exclusions` → `Inclusions & Exclusions`
- `/policy/privacy` → `Privacy Policy`
- `/contact` → `Contact JVTO`
- `/isic/student-package` → `ISIC Student Package – Verified Discounts for Students`

---

## 3. Schema Stack Validation

### Current Schema Implementation

| Page | Current Schemas | Required Schemas | Gap |
|------|-----------------|------------------|-----|
| `/` | Organization, Person, FAQPage, BreadcrumbList, TouristTrip | TravelAgency, Organization, LocalBusiness, WebSite, WebPage, FAQPage, BreadcrumbList, WebApplication, Person, Book, NewsArticle | Missing: TravelAgency, LocalBusiness, WebSite, WebApplication, Book, NewsArticle |
| `/why-jvto` | Organization, FAQPage, BreadcrumbList | TravelAgency, Organization, LocalBusiness, WebPage, BreadcrumbList, FAQPage, ItemList, Person | Missing: TravelAgency, LocalBusiness, WebPage, ItemList |
| `/verify-jvto` | Organization, ItemList, BreadcrumbList | CollectionPage, Organization, BreadcrumbList, ImageObject, DigitalDocument, FAQPage, HowTo | Missing: CollectionPage, ImageObject, DigitalDocument, HowTo |
| `/team` | Person, BreadcrumbList | Organization, Person, WebPage, BreadcrumbList, FAQPage | Missing: Organization, WebPage, FAQPage |
| `/our-story` | Organization, BreadcrumbList | Organization, WebPage, BreadcrumbList, Book, ImageObject, FAQPage | Missing: WebPage, Book, ImageObject, FAQPage |
| `/reviews` | Organization, BreadcrumbList | Organization, WebPage, BreadcrumbList, FAQPage, ItemList | Missing: WebPage, FAQPage, ItemList |
| `/destinations` | BreadcrumbList | CollectionPage, WebPage, BreadcrumbList, ItemList | Missing: CollectionPage, WebPage, ItemList |
| `/tours` | BreadcrumbList | CollectionPage, WebPage, BreadcrumbList, ItemList | Missing: CollectionPage, WebPage, ItemList |

---

## 4. Page Role Validation

### Current Page Roles

| Route | Current Role | Expected Role | Status |
|-------|-------------|---------------|--------|
| `/` | homepage | primary trust-led commercial homepage | ✅ Correct |
| `/why-jvto` | trust hub | trust hub | ✅ Correct |
| `/verify-jvto` | proof library | centralized proof library | ✅ Correct |
| `/travel-guide` | planning hub | planning hub | ✅ Correct |
| `/team` | team roster | human trust and expertise page | ✅ Correct |
| `/our-story` | historical narrative | historical continuity page | ✅ Correct |
| `/reviews` | review aggregator | review validation page | ✅ Correct |
| `/destinations` | destination hub | destination authority hub | ✅ Correct |
| `/tours` | tour listing | transactional product hub | ✅ Correct |

---

## 5. Navigation Structure Validation

### Current Navigation
- TopNav: TOURS, DESTINATIONS, WHY JVTO, TRAVEL INFO
- Footer: Limited grouping

### Expected Navigation (Per Build Blueprint)

**Primary Nav:**
- Tours
- Destinations
- Why JVTO
- Travel Guide
- Contact

**Utility Trust Links:**
- Verify JVTO
- Reviews
- Student Deals

**Footer Groups:**
- Company
- Travel Guide
- Destinations
- Policies
- Contact
- Verify / Trust

**Status**: ⚠️ Needs restructuring

---

## 6. Implementation Tasks for Phase 1

### Route Restructuring
- [ ] Move `/our-story` → `/why-jvto/our-story`
- [ ] Move `/team` → `/why-jvto/our-team`
- [ ] Move `/reviews` → `/why-jvto/reviews`
- [ ] Create `/why-jvto/the-jvto-difference`
- [ ] Create `/why-jvto/community-standards`
- [ ] Create `/verify-jvto/legal`
- [ ] Create `/verify-jvto/press-recognition`
- [ ] Create `/verify-jvto/history-artifacts`
- [ ] Create `/verify-jvto/police-safety`
- [ ] Create `/travel-guide/booking-information`
- [ ] Create `/travel-guide/ijen-health-screening`
- [ ] Create `/travel-guide/safety-on-tours`
- [ ] Create `/travel-guide/weather-and-closures`
- [ ] Create `/travel-guide/packing-and-fitness`
- [ ] Create `/travel-guide/police-escort-for-groups`
- [ ] Create `/policy` (hub)
- [ ] Create `/policy/booking-payment-cancellation`
- [ ] Create `/policy/inclusions-exclusions`
- [ ] Create `/policy/privacy`
- [ ] Create `/contact`
- [ ] Update `/isic` route to `/isic/student-package`
- [ ] Add `/tours/from-surabaya`
- [ ] Add `/tours/from-bali`

### H1 Updates
- [ ] Update `/why-jvto` H1
- [ ] Update `/verify-jvto` H1
- [ ] Update `/travel-guide` H1
- [ ] Update `/team` H1
- [ ] Update `/our-story` H1
- [ ] Update `/reviews` H1
- [ ] Update `/destinations` H1
- [ ] Update `/tours` H1

### Schema Enhancements
- [ ] Add TravelAgency schema to homepage
- [ ] Add LocalBusiness schema to homepage
- [ ] Add WebSite schema to homepage
- [ ] Add WebApplication schema to homepage
- [ ] Add Book schema to homepage
- [ ] Add NewsArticle schema to homepage
- [ ] Add ItemList schema to `/why-jvto`
- [ ] Add CollectionPage schema to `/verify-jvto`
- [ ] Add ImageObject schema to `/verify-jvto`
- [ ] Add DigitalDocument schema to `/verify-jvto`
- [ ] Add HowTo schema to `/verify-jvto`
- [ ] Add FAQPage schema to all pages
- [ ] Add ItemList schema to `/destinations`
- [ ] Add ItemList schema to `/tours`

### Navigation Restructuring
- [ ] Update TopNav with canonical structure
- [ ] Update Footer with proper grouping
- [ ] Add Verify JVTO to utility links
- [ ] Add Student Deals to utility links
- [ ] Ensure all routes are properly linked

---

## 7. Validation Checklist

- [ ] All canonical routes are implemented
- [ ] All H1s match Schema Master Map
- [ ] All page roles are correct
- [ ] All required schemas are present
- [ ] Navigation structure matches Build Blueprint
- [ ] No route conflicts or duplicates
- [ ] All internal links are correct
- [ ] TypeScript: 0 errors
- [ ] All tests passing

---

## 8. Next Steps

After Phase 1 validation is complete:
1. Proceed to Phase 2: Canonical Freeze Map implementation
2. Lock all routes, identity, and narrative principles
3. Begin Phase 3: Build Blueprint implementation
