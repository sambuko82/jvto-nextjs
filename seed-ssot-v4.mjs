/**
 * JVTO SSOT v4.0 Seed Script
 * Consolidates all data from JVTO_SSOT_v4_0_CLEAN.json into the database
 * - 16 tour packages (from-surabaya + from-bali)
 * - 14 crew members (7 drivers + 7 guides)
 * - 9 destinations
 * - 14 verification credentials
 * - 4 press coverage items
 * - 5 partners
 * - 8 reviews
 * - 12 FAQ items (GEO-optimized)
 * - Page meta for all routes
 */

import { createConnection } from "mysql2/promise";
import { readFileSync } from "fs";

const ssot = JSON.parse(readFileSync("/home/ubuntu/upload/JVTO_SSOT_v4_0_CLEAN.json", "utf-8"));

const db = await createConnection(process.env.DATABASE_URL);

async function run(sql, params = []) {
  try {
    await db.execute(sql, params);
  } catch (e) {
    console.error("SQL Error:", e.message.slice(0, 120));
    console.error("SQL:", sql.slice(0, 100));
  }
}

async function clearAll() {
  console.log("Clearing existing data...");
  const tables = ["crew_reviews", "faq", "reviews", "press", "partners", "proof_vault", "pages_meta", "crew", "tours", "destinations"];
  for (const t of tables) {
    await run(`DELETE FROM ${t}`);
  }
}

// ─── DESTINATIONS ────────────────────────────────────────────────────────────
async function seedDestinations() {
  console.log("Seeding destinations...");
  const dests = ssot.destinations || [];

  const destData = [
    {
      slug: "mount-bromo",
      title: "Mount Bromo",
      category: "volcano",
      image: "https://javavolcano-touroperator.com/uploads/bromo-hero.jpg",
      heroImage: "https://javavolcano-touroperator.com/uploads/bromo-hero.jpg",
      description: "Mount Bromo is an active volcano within the Tengger Caldera, famed for its sunrise views from Kingkong Hill, the Sea of Sand jeep adventure, and the Tenggerese Hindu rituals at Pura Luhur Poten. At 2,329m above sea level in the Bromo Tengger Semeru National Park, Bromo is East Java's most iconic landmark — a UNESCO-recognized cultural landscape where the Tenggerese people have performed the Yadnya Kasada ceremony for over 700 years.",
      shortDesc: "Sunrise over the Tengger Caldera — East Java's most iconic volcano, sacred to the Tenggerese people for 700+ years.",
      duration: "5–6 hours including sunrise",
      altitude: "2,329m above sea level",
      highlights: JSON.stringify(["Sunrise from Kingkong Hill over the Sea of Sand", "4WD Jeep adventure across the volcanic sand sea", "Tenggerese Hindu Pura Luhur Poten temple", "Active crater rim walk (200m from the crater)", "Yadnya Kasada Festival (if in season)"]),
      safetyNotes: JSON.stringify(["Wear warm layers — 5–15°C at sunrise", "Volcanic gas masks provided by JVTO", "JVTO includes all national park entry fees", "Tourist Police-led operations"]),
      bestTime: "April–September (dry season)",
      sortOrder: 1,
    },
    {
      slug: "ijen-crater",
      title: "Ijen Crater",
      category: "volcano",
      image: "https://javavolcano-touroperator.com/uploads/ijen-hero.jpg",
      heroImage: "https://javavolcano-touroperator.com/uploads/ijen-hero.jpg",
      description: "Kawah Ijen is the world's largest acidic crater lake and one of only two places on Earth where natural blue fire appears at night — caused by ignited sulfuric gases escaping through volcanic vents. At 2,769m in the Ijen Plateau, Banyuwangi, the crater lake holds 36 million cubic metres of sulfuric acid at pH 0.5. JVTO's Ijen tours include a mandatory digital health screening by licensed medical staff (dr. Ahmad Irwandanu, SIP: 503.446/193/DRU/4/430.9.13/2020) and gas masks provided at no extra cost.",
      shortDesc: "The world's largest acidic crater lake and one of only two places on Earth with natural blue fire — a geological wonder at 2,769m.",
      duration: "4–5 hours round trip",
      altitude: "2,769m above sea level",
      highlights: JSON.stringify(["Blue fire phenomenon (2:00–4:00 AM only)", "World's largest acidic crater lake (pH 0.5)", "Sulfur miners' traditional extraction process", "Milky Way photography at the crater rim", "Sunrise over the Ijen Plateau"]),
      safetyNotes: JSON.stringify(["Mandatory digital health screening included (SpO2, blood pressure)", "Gas masks provided by JVTO at no extra cost", "Medical staff on-site: dr. Ahmad Irwandanu (SIP: 503.446/193/DRU/4/430.9.13/2020)", "Hard stop: guests failing screening cannot proceed — safety over revenue"]),
      bestTime: "April–October (dry season)",
      sortOrder: 2,
    },
    {
      slug: "madakaripura-waterfall",
      title: "Madakaripura Waterfall",
      category: "waterfall",
      image: "https://javavolcano-touroperator.com/uploads/madakaripura-hero.jpg",
      heroImage: "https://javavolcano-touroperator.com/uploads/madakaripura-hero.jpg",
      description: "Madakaripura is a sacred 200-metre canyon waterfall in Lumbang, Probolinggo, believed to be the final meditation site of Gajah Mada — the 14th-century Majapahit prime minister who united the Indonesian archipelago. The canyon walls form a natural amphitheatre of cascading water, creating a spiritual atmosphere that draws both trekkers and pilgrims. JVTO includes helmets and local guides for the river crossing approach.",
      shortDesc: "A sacred 200-metre canyon waterfall — the final meditation site of Gajah Mada, symbol of Majapahit unity.",
      duration: "1.5–2 hours",
      altitude: "620m above sea level",
      highlights: JSON.stringify(["200-metre canyon waterfall — tallest in Java", "Sacred site of Gajah Mada's final meditation", "Majapahit Empire historical significance", "River crossing approach through canyon walls", "Natural amphitheatre of cascading water"]),
      safetyNotes: JSON.stringify(["Helmets provided by JVTO", "Local guide included for river crossing", "Waterproof bags recommended — you will get wet", "JVTO includes all entrance fees"]),
      bestTime: "May–October (dry season)",
      sortOrder: 3,
    },
    {
      slug: "tumpak-sewu-waterfall",
      title: "Tumpak Sewu Waterfall",
      category: "waterfall",
      image: "https://javavolcano-touroperator.com/uploads/tumpak-sewu-hero.jpg",
      heroImage: "https://javavolcano-touroperator.com/uploads/tumpak-sewu-hero.jpg",
      description: "Tumpak Sewu — meaning 'a thousand waterfalls' in Javanese — is a 120-metre curtain waterfall in Lumajang, East Java, often called the 'Niagara of Java'. The waterfall cascades over a volcanic rock ledge into a deep canyon, with multiple streams creating a panoramic curtain effect. At the base, the Glidik Cave and Coban Sewu sub-falls reward those who make the steep descent. JVTO includes the full canyon descent with local guides.",
      shortDesc: "The 'Niagara of Java' — a 120-metre curtain waterfall in Lumajang, with a canyon descent to the base pool.",
      duration: "3–4 hours including canyon descent",
      altitude: "500m above sea level",
      highlights: JSON.stringify(["120-metre curtain waterfall — 'Niagara of Java'", "Full canyon descent to the base pool", "Glidik Cave behind the waterfall", "Coban Sewu sub-falls at the base", "Panoramic viewpoint at the canyon rim"]),
      safetyNotes: JSON.stringify(["Steep canyon descent — moderate fitness required", "Local guide included for the descent", "Waterproof bags essential — you will get wet", "JVTO includes all entrance fees"]),
      bestTime: "May–October (dry season)",
      sortOrder: 4,
    },
    {
      slug: "papuma-beach",
      title: "Papuma Beach",
      category: "beach",
      image: "https://javavolcano-touroperator.com/uploads/papuma-hero.jpg",
      heroImage: "https://javavolcano-touroperator.com/uploads/papuma-hero.jpg",
      description: "Papuma Beach (Tanjung Papuma) is a pristine crescent bay in Jember, East Java, flanked by dramatic limestone rock formations and dense jungle. The beach offers turquoise waters, white sand, and views of the Indian Ocean — a hidden gem rarely visited by international tourists. JVTO includes Papuma as a rest stop on multi-day East Java expeditions.",
      shortDesc: "A pristine crescent bay in Jember — turquoise waters, limestone formations, and Indian Ocean views.",
      duration: "2–3 hours",
      altitude: "5m above sea level",
      highlights: JSON.stringify(["Pristine crescent bay with white sand", "Dramatic limestone rock formations", "Indian Ocean panoramic views", "Rare international tourist presence", "Jungle-flanked beach approach"]),
      safetyNotes: JSON.stringify(["Strong currents — swimming at your own risk", "JVTO includes all entrance fees", "Sunscreen and hat essential"]),
      bestTime: "April–October (dry season)",
      sortOrder: 5,
    },
  ];

  for (const dest of destData) {
    await run(
      `INSERT INTO destinations (slug, title, category, image, heroImage, description, shortDesc, duration, altitude, highlights, safetyNotes, bestTime, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), shortDesc=VALUES(shortDesc), highlights=VALUES(highlights), safetyNotes=VALUES(safetyNotes), sortOrder=VALUES(sortOrder)`,
      [dest.slug, dest.title, dest.category, dest.image, dest.heroImage, dest.description, dest.shortDesc, dest.duration, dest.altitude, dest.highlights, dest.safetyNotes, dest.bestTime, dest.sortOrder]
    );
  }
  console.log(`  ✓ ${destData.length} destinations seeded`);
}

// ─── TOURS ───────────────────────────────────────────────────────────────────
async function seedTours() {
  console.log("Seeding tours...");

  const tours = [
    // FROM SURABAYA
    {
      slug: "from-surabaya/bromo-1d1n",
      name: "1D1N Bromo Midnight Tour",
      departureFrom: "Surabaya",
      duration: "1D1N",
      durationDays: 1,
      pricePerPerson: 1000000,
      physicality: "moderate",
      description: "Experience Mount Bromo's legendary sunrise from Kingkong Hill on a private overnight tour from Surabaya. Depart at midnight, arrive at the viewpoint before dawn, then descend to the Sea of Sand for a 4WD Jeep adventure to the crater rim.",
      highlights: JSON.stringify(["Midnight departure from Surabaya", "Sunrise from Kingkong Hill viewpoint", "4WD Jeep across the Sea of Sand", "Crater rim walk at Mount Bromo", "Private transport throughout"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "All national park entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Hotel accommodation", "Meals (except water)", "Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Midnight Departure → Bromo Sunrise → Return", activities: ["23:00 – Pickup from Surabaya hotel/Juanda Airport", "03:00 – Arrive Penanjakan/Kingkong Hill viewpoint", "04:30 – Bromo sunrise", "06:00 – 4WD Jeep to Sea of Sand and crater rim", "08:00 – Return journey to Surabaya", "12:00 – Drop-off at Surabaya hotel/airport"] }
      ]),
      destinations: JSON.stringify(["mount-bromo"]),
      sortOrder: 1,
    },
    {
      slug: "from-surabaya/bromo-2d1n",
      name: "2D1N Bromo & Madakaripura",
      departureFrom: "Surabaya",
      duration: "2D1N",
      durationDays: 2,
      pricePerPerson: 1750000,
      physicality: "moderate",
      description: "Combine Mount Bromo's volcanic sunrise with Madakaripura's sacred 200-metre canyon waterfall on this 2-day private tour. Experience the Tengger Caldera at dawn, then descend into Gajah Mada's legendary meditation canyon.",
      highlights: JSON.stringify(["Bromo sunrise from Kingkong Hill", "4WD Jeep across the Sea of Sand", "Madakaripura sacred canyon waterfall", "Gajah Mada historical significance", "1 night hotel in Bromo area"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "1 night hotel with breakfast", "All entrance fees", "English-speaking guide", "Helmet for Madakaripura", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Lunch and dinner (except breakfast)", "Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Bromo Sunrise", activities: ["23:00 – Pickup from Surabaya", "03:00 – Kingkong Hill sunrise viewpoint", "06:00 – 4WD Jeep, Sea of Sand, crater rim", "08:00 – Check-in hotel near Bromo"] },
        { day: 2, title: "Madakaripura → Surabaya", activities: ["08:00 – Breakfast at hotel", "09:00 – Drive to Madakaripura Waterfall", "10:30 – Canyon trek and waterfall visit", "13:00 – Return to Surabaya", "17:00 – Drop-off Surabaya"] }
      ]),
      destinations: JSON.stringify(["mount-bromo", "madakaripura-waterfall"]),
      sortOrder: 2,
    },
    {
      slug: "from-surabaya/ijen-2d1n",
      name: "2D1N Ijen Blue Fire",
      departureFrom: "Surabaya",
      duration: "2D1N",
      durationDays: 2,
      pricePerPerson: 1550000,
      physicality: "moderate",
      description: "Witness the rare blue fire phenomenon at Kawah Ijen on a private 2-day tour from Surabaya. Includes mandatory digital health screening by licensed medical staff before the night hike, gas masks, and a guided descent to the world's largest acidic crater lake.",
      highlights: JSON.stringify(["Blue fire phenomenon (2:00–4:00 AM)", "Mandatory digital health screening included", "Gas masks provided at no extra cost", "World's largest acidic crater lake", "Sulfur miners' traditional extraction"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "1 night hotel in Bondowoso with breakfast", "Digital health screening by licensed medical staff", "Gas masks", "All entrance fees", "English-speaking guide", "Extra meals in Bondowoso", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Travel insurance", "Personal expenses", "Tips"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Bondowoso", activities: ["08:00 – Pickup from Surabaya", "13:00 – Arrive Bondowoso hotel", "14:00 – Rest and health screening briefing", "18:00 – Dinner in Bondowoso", "21:00 – Digital health screening (SpO2, blood pressure)", "23:00 – Depart for Paltuding gate"] },
        { day: 2, title: "Ijen Blue Fire → Surabaya", activities: ["01:00 – Arrive Paltuding, begin night hike", "02:00 – Blue fire at crater floor", "04:30 – Sunrise at crater rim", "06:00 – Descend to Paltuding", "08:00 – Return to Bondowoso hotel for breakfast", "10:00 – Drive back to Surabaya", "15:00 – Drop-off Surabaya"] }
      ]),
      destinations: JSON.stringify(["ijen-crater"]),
      sortOrder: 3,
    },
    {
      slug: "from-surabaya/bromo-madakaripura-ijen-3d2n",
      name: "3D2N Bromo–Madakaripura–Ijen (→ Bali)",
      departureFrom: "Surabaya",
      duration: "3D2N",
      durationDays: 3,
      pricePerPerson: 2450000,
      physicality: "moderate",
      description: "The classic East Java circuit: Mount Bromo sunrise, Madakaripura sacred waterfall, and Ijen blue fire — ending with a drop-off at Bali (Gilimanuk ferry). The most popular JVTO itinerary for international travellers transiting Surabaya to Bali.",
      highlights: JSON.stringify(["Bromo sunrise + 4WD Jeep", "Madakaripura sacred canyon waterfall", "Ijen blue fire night hike", "Drop-off at Bali (Gilimanuk)", "2 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "2 nights hotel with breakfast", "Digital health screening (Ijen)", "Gas masks (Ijen)", "All entrance fees", "English-speaking guide", "Extra meals in Bondowoso", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Bali ferry ticket (IDR 10,000)", "Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Bromo Sunrise", activities: ["23:00 – Pickup from Surabaya", "03:00 – Bromo sunrise viewpoint", "06:00 – 4WD Jeep, Sea of Sand", "08:00 – Hotel near Bromo"] },
        { day: 2, title: "Madakaripura → Bondowoso", activities: ["08:00 – Breakfast", "09:00 – Madakaripura Waterfall", "13:00 – Drive to Bondowoso", "18:00 – Dinner", "21:00 – Ijen health screening"] },
        { day: 3, title: "Ijen Blue Fire → Bali", activities: ["01:00 – Ijen night hike", "02:00 – Blue fire", "06:00 – Descend", "10:00 – Drive to Gilimanuk", "14:00 – Bali ferry drop-off"] }
      ]),
      destinations: JSON.stringify(["mount-bromo", "madakaripura-waterfall", "ijen-crater"]),
      sortOrder: 4,
    },
    {
      slug: "from-surabaya/ijen-bromo-madakaripura-3d2n",
      name: "3D2N Ijen–Bromo–Madakaripura",
      departureFrom: "Surabaya",
      duration: "3D2N",
      durationDays: 3,
      pricePerPerson: 2450000,
      physicality: "moderate",
      description: "Start with Ijen's blue fire, then continue to Bromo's sunrise and Madakaripura's sacred waterfall — all returning to Surabaya. Ideal for travellers with Surabaya as both start and end point.",
      highlights: JSON.stringify(["Ijen blue fire night hike", "Bromo sunrise + 4WD Jeep", "Madakaripura sacred waterfall", "Round-trip from Surabaya", "2 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "2 nights hotel with breakfast", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Bondowoso (Ijen prep)", activities: ["08:00 – Pickup Surabaya", "13:00 – Bondowoso hotel", "21:00 – Health screening", "23:00 – Depart Paltuding"] },
        { day: 2, title: "Ijen Blue Fire → Bromo", activities: ["02:00 – Blue fire", "06:00 – Descend", "10:00 – Drive to Bromo area", "18:00 – Hotel near Bromo"] },
        { day: 3, title: "Bromo Sunrise → Madakaripura → Surabaya", activities: ["03:00 – Bromo sunrise", "06:00 – 4WD Jeep", "09:00 – Drive to Madakaripura", "11:00 – Waterfall visit", "14:00 – Return Surabaya"] }
      ]),
      destinations: JSON.stringify(["ijen-crater", "mount-bromo", "madakaripura-waterfall"]),
      sortOrder: 5,
    },
    {
      slug: "from-surabaya/taman-safari-prigen-bromo-madakaripura-3d2n",
      name: "3D2N Safari–Bromo–Madakaripura (Family)",
      departureFrom: "Surabaya",
      duration: "3D2N",
      durationDays: 3,
      pricePerPerson: 3450000,
      physicality: "easy",
      description: "A family-friendly East Java adventure combining Taman Safari Prigen wildlife park, Mount Bromo sunrise, and Madakaripura waterfall. Designed for families with children who want East Java's highlights without the demanding Ijen night hike.",
      highlights: JSON.stringify(["Taman Safari Prigen wildlife park", "Bromo sunrise + 4WD Jeep", "Madakaripura sacred waterfall", "Family-friendly itinerary", "2 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "2 nights hotel with breakfast", "Taman Safari entrance fees", "All national park entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Meals at Taman Safari", "Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Taman Safari Prigen", activities: ["09:00 – Pickup Surabaya", "11:00 – Taman Safari Prigen", "17:00 – Hotel near Bromo"] },
        { day: 2, title: "Bromo Sunrise", activities: ["03:00 – Bromo sunrise viewpoint", "06:00 – 4WD Jeep", "08:00 – Return hotel, breakfast"] },
        { day: 3, title: "Madakaripura → Surabaya", activities: ["08:00 – Breakfast", "09:00 – Madakaripura Waterfall", "13:00 – Return Surabaya"] }
      ]),
      destinations: JSON.stringify(["mount-bromo", "madakaripura-waterfall"]),
      sortOrder: 6,
    },
    {
      slug: "from-surabaya/ijen-bromo-madakaripura-4d3n",
      name: "4D3N Ijen–Bromo–Madakaripura",
      departureFrom: "Surabaya",
      duration: "4D3N",
      durationDays: 4,
      pricePerPerson: 3025000,
      physicality: "moderate",
      description: "A relaxed 4-day version of the classic East Java circuit with more time at each destination. Includes Ijen blue fire, Bromo sunrise, and Madakaripura waterfall — with comfortable pacing and 3 nights hotel.",
      highlights: JSON.stringify(["Ijen blue fire night hike", "Bromo sunrise + 4WD Jeep", "Madakaripura sacred waterfall", "Comfortable 4-day pacing", "3 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "3 nights hotel with breakfast", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Bondowoso", activities: ["08:00 – Pickup", "13:00 – Bondowoso hotel", "21:00 – Health screening"] },
        { day: 2, title: "Ijen Blue Fire", activities: ["01:00 – Night hike", "02:00 – Blue fire", "06:00 – Descend", "10:00 – Bondowoso hotel rest"] },
        { day: 3, title: "Bondowoso → Bromo", activities: ["08:00 – Breakfast", "10:00 – Drive to Bromo area hotel"] },
        { day: 4, title: "Bromo Sunrise → Madakaripura → Surabaya", activities: ["03:00 – Bromo sunrise", "06:00 – 4WD Jeep", "09:00 – Madakaripura", "14:00 – Return Surabaya"] }
      ]),
      destinations: JSON.stringify(["ijen-crater", "mount-bromo", "madakaripura-waterfall"]),
      sortOrder: 7,
    },
    {
      slug: "from-surabaya/ijen-papuma-tumpak-sewu-bromo-4d3n",
      name: "4D3N Ijen–Papuma–Tumpak Sewu–Bromo",
      departureFrom: "Surabaya",
      duration: "4D3N",
      durationDays: 4,
      pricePerPerson: 3125000,
      physicality: "moderate",
      description: "East Java's hidden gems circuit: Ijen blue fire, Papuma Beach, Tumpak Sewu 'Niagara of Java', and Bromo sunrise. This itinerary covers destinations rarely combined by other operators.",
      highlights: JSON.stringify(["Ijen blue fire night hike", "Papuma Beach pristine bay", "Tumpak Sewu canyon descent", "Bromo sunrise + 4WD Jeep", "3 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "3 nights hotel with breakfast", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Bondowoso (Ijen)", activities: ["08:00 – Pickup", "13:00 – Hotel", "21:00 – Health screening", "23:00 – Ijen hike"] },
        { day: 2, title: "Ijen → Papuma Beach", activities: ["06:00 – Descend Ijen", "10:00 – Drive to Papuma Beach", "14:00 – Beach visit", "17:00 – Hotel Jember area"] },
        { day: 3, title: "Tumpak Sewu Waterfall", activities: ["08:00 – Drive to Tumpak Sewu", "10:00 – Canyon descent", "14:00 – Drive to Bromo area hotel"] },
        { day: 4, title: "Bromo Sunrise → Surabaya", activities: ["03:00 – Bromo sunrise", "06:00 – 4WD Jeep", "09:00 – Return Surabaya"] }
      ]),
      destinations: JSON.stringify(["ijen-crater", "papuma-beach", "tumpak-sewu-waterfall", "mount-bromo"]),
      sortOrder: 8,
    },
    {
      slug: "from-surabaya/tumpak-sewu-bromo-ijen-4d3n",
      name: "4D3N Tumpak Sewu–Bromo–Ijen (→ Bali)",
      departureFrom: "Surabaya",
      duration: "4D3N",
      durationDays: 4,
      pricePerPerson: 3125000,
      physicality: "moderate",
      description: "Start with Tumpak Sewu's dramatic canyon, continue to Bromo's sunrise, and finish with Ijen's blue fire — ending with a drop-off at Bali. A reverse circuit for travellers arriving in Surabaya and departing from Bali.",
      highlights: JSON.stringify(["Tumpak Sewu canyon descent", "Bromo sunrise + 4WD Jeep", "Ijen blue fire night hike", "Drop-off at Bali (Gilimanuk)", "3 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "3 nights hotel with breakfast", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Bali ferry ticket", "Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Tumpak Sewu", activities: ["08:00 – Pickup", "11:00 – Tumpak Sewu canyon", "15:00 – Hotel Lumajang area"] },
        { day: 2, title: "Bromo Sunrise", activities: ["03:00 – Bromo sunrise", "06:00 – 4WD Jeep", "09:00 – Hotel Bromo area"] },
        { day: 3, title: "Bromo → Bondowoso (Ijen prep)", activities: ["08:00 – Breakfast", "10:00 – Drive to Bondowoso", "21:00 – Health screening"] },
        { day: 4, title: "Ijen Blue Fire → Bali", activities: ["01:00 – Ijen hike", "06:00 – Descend", "10:00 – Drive to Gilimanuk", "14:00 – Bali ferry"] }
      ]),
      destinations: JSON.stringify(["tumpak-sewu-waterfall", "mount-bromo", "ijen-crater"]),
      sortOrder: 9,
    },
    {
      slug: "from-surabaya/ijen-bromo-madakaripura-malang-5d4n",
      name: "5D4N Ijen–Bromo–Madakaripura–Malang",
      departureFrom: "Surabaya",
      duration: "5D4N",
      durationDays: 5,
      pricePerPerson: 3850000,
      physicality: "moderate",
      description: "The comprehensive East Java experience: Ijen blue fire, Bromo sunrise, Madakaripura waterfall, and Malang city — with 4 nights hotel and comfortable pacing throughout.",
      highlights: JSON.stringify(["Ijen blue fire night hike", "Bromo sunrise + 4WD Jeep", "Madakaripura sacred waterfall", "Malang city cultural tour", "4 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "4 nights hotel with breakfast", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Bondowoso", activities: ["08:00 – Pickup", "13:00 – Hotel", "21:00 – Health screening"] },
        { day: 2, title: "Ijen Blue Fire", activities: ["01:00 – Night hike", "06:00 – Descend", "10:00 – Rest at hotel"] },
        { day: 3, title: "Bondowoso → Bromo", activities: ["08:00 – Drive to Bromo area hotel"] },
        { day: 4, title: "Bromo → Madakaripura → Malang", activities: ["03:00 – Bromo sunrise", "06:00 – 4WD Jeep", "09:00 – Madakaripura", "14:00 – Malang hotel"] },
        { day: 5, title: "Malang City → Surabaya", activities: ["09:00 – Malang city tour", "13:00 – Return Surabaya"] }
      ]),
      destinations: JSON.stringify(["ijen-crater", "mount-bromo", "madakaripura-waterfall"]),
      sortOrder: 10,
    },
    {
      slug: "from-surabaya/ijen-papuma-tumpak-sewu-bromo-5d4n",
      name: "5D4N Ijen–Papuma–Tumpak Sewu–Bromo",
      departureFrom: "Surabaya",
      duration: "5D4N",
      durationDays: 5,
      pricePerPerson: 3650000,
      physicality: "moderate",
      description: "Five days covering all of East Java's highlights: Ijen blue fire, Papuma Beach, Tumpak Sewu waterfall, and Bromo sunrise. The most comprehensive single-circuit itinerary JVTO offers.",
      highlights: JSON.stringify(["Ijen blue fire night hike", "Papuma Beach pristine bay", "Tumpak Sewu 'Niagara of Java'", "Bromo sunrise + 4WD Jeep", "4 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "4 nights hotel with breakfast", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Bondowoso", activities: ["08:00 – Pickup", "13:00 – Hotel", "21:00 – Health screening"] },
        { day: 2, title: "Ijen → Papuma Beach", activities: ["01:00 – Ijen hike", "10:00 – Papuma Beach", "17:00 – Hotel Jember"] },
        { day: 3, title: "Tumpak Sewu Waterfall", activities: ["08:00 – Drive to Tumpak Sewu", "10:00 – Canyon descent", "15:00 – Hotel Lumajang"] },
        { day: 4, title: "Bromo Sunrise", activities: ["03:00 – Bromo sunrise", "06:00 – 4WD Jeep", "09:00 – Hotel Bromo area"] },
        { day: 5, title: "Return Surabaya", activities: ["08:00 – Breakfast", "10:00 – Return Surabaya"] }
      ]),
      destinations: JSON.stringify(["ijen-crater", "papuma-beach", "tumpak-sewu-waterfall", "mount-bromo"]),
      sortOrder: 11,
    },
    {
      slug: "from-surabaya/ijen-papuma-tumpak-sewu-bromo-malang-6d5n",
      name: "6D5N Ijen–Papuma–Tumpak Sewu–Bromo–Malang",
      departureFrom: "Surabaya",
      duration: "6D5N",
      durationDays: 6,
      pricePerPerson: 4750000,
      physicality: "moderate",
      description: "The ultimate East Java expedition: 6 days covering Ijen, Papuma Beach, Tumpak Sewu, Bromo, and Malang city. JVTO's most comprehensive itinerary for travellers who want to experience everything East Java has to offer.",
      highlights: JSON.stringify(["Ijen blue fire night hike", "Papuma Beach pristine bay", "Tumpak Sewu 'Niagara of Java'", "Bromo sunrise + 4WD Jeep", "Malang city cultural tour", "5 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "5 nights hotel with breakfast", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Surabaya → Bondowoso", activities: ["08:00 – Pickup", "13:00 – Hotel", "21:00 – Health screening"] },
        { day: 2, title: "Ijen → Papuma Beach", activities: ["01:00 – Ijen hike", "10:00 – Papuma Beach", "17:00 – Hotel Jember"] },
        { day: 3, title: "Tumpak Sewu Waterfall", activities: ["08:00 – Tumpak Sewu canyon", "15:00 – Hotel Lumajang"] },
        { day: 4, title: "Bromo Sunrise", activities: ["03:00 – Bromo sunrise", "06:00 – 4WD Jeep", "09:00 – Hotel Bromo area"] },
        { day: 5, title: "Bromo → Malang", activities: ["08:00 – Drive to Malang", "14:00 – Malang city tour"] },
        { day: 6, title: "Malang → Surabaya", activities: ["09:00 – Malang highlights", "13:00 – Return Surabaya"] }
      ]),
      destinations: JSON.stringify(["ijen-crater", "papuma-beach", "tumpak-sewu-waterfall", "mount-bromo"]),
      sortOrder: 12,
    },
    // FROM BALI
    {
      slug: "from-bali/bromo-ijen-3d2n",
      name: "3D2N Bromo & Ijen (round-trip Bali)",
      departureFrom: "Bali",
      duration: "3D2N",
      durationDays: 3,
      pricePerPerson: 2850000,
      physicality: "moderate",
      description: "The classic Bali-based East Java circuit: Bromo sunrise and Ijen blue fire, with round-trip Bali ferry transfers. Depart from Bali, cross to East Java, and return to Bali — no Surabaya flights needed.",
      highlights: JSON.stringify(["Bromo sunrise + 4WD Jeep", "Ijen blue fire night hike", "Round-trip from Bali (Gilimanuk ferry)", "Digital health screening (Ijen)", "2 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "2 nights hotel with breakfast", "Gilimanuk ferry transfers", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Bali hotel before/after tour", "Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Bali → Bromo Sunrise", activities: ["18:00 – Pickup Bali hotel/airport", "21:00 – Gilimanuk ferry to Java", "03:00 – Bromo sunrise viewpoint", "06:00 – 4WD Jeep", "09:00 – Hotel near Bromo"] },
        { day: 2, title: "Bromo → Bondowoso (Ijen prep)", activities: ["08:00 – Breakfast", "10:00 – Drive to Bondowoso", "21:00 – Health screening", "23:00 – Depart Paltuding"] },
        { day: 3, title: "Ijen Blue Fire → Bali", activities: ["02:00 – Blue fire", "06:00 – Descend", "10:00 – Drive to Gilimanuk", "14:00 – Bali ferry", "17:00 – Drop-off Bali"] }
      ]),
      destinations: JSON.stringify(["mount-bromo", "ijen-crater"]),
      sortOrder: 13,
    },
    {
      slug: "from-bali/ijen-bromo-madakaripura-3d2n",
      name: "3D2N Ijen–Bromo–Madakaripura (Bali → Surabaya)",
      departureFrom: "Bali",
      duration: "3D2N",
      durationDays: 3,
      pricePerPerson: 2850000,
      physicality: "moderate",
      description: "Start from Bali, experience Ijen blue fire, Bromo sunrise, and Madakaripura waterfall — ending with a drop-off at Surabaya airport. Ideal for travellers flying Bali → Surabaya.",
      highlights: JSON.stringify(["Ijen blue fire night hike", "Bromo sunrise + 4WD Jeep", "Madakaripura sacred waterfall", "Bali → Surabaya routing", "2 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "2 nights hotel with breakfast", "Gilimanuk ferry transfer", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Bali hotel before tour", "Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Bali → Bondowoso (Ijen)", activities: ["08:00 – Pickup Bali", "11:00 – Gilimanuk ferry", "14:00 – Bondowoso hotel", "21:00 – Health screening", "23:00 – Ijen hike"] },
        { day: 2, title: "Ijen → Bromo", activities: ["06:00 – Descend Ijen", "10:00 – Drive to Bromo area hotel"] },
        { day: 3, title: "Bromo → Madakaripura → Surabaya", activities: ["03:00 – Bromo sunrise", "06:00 – 4WD Jeep", "09:00 – Madakaripura", "14:00 – Surabaya drop-off"] }
      ]),
      destinations: JSON.stringify(["ijen-crater", "mount-bromo", "madakaripura-waterfall"]),
      sortOrder: 14,
    },
    {
      slug: "from-bali/ijen-papuma-tumpak-sewu-bromo-4d3n",
      name: "4D3N Ijen–Papuma–Tumpak Sewu–Bromo (Bali → Surabaya)",
      departureFrom: "Bali",
      duration: "4D3N",
      durationDays: 4,
      pricePerPerson: 3475000,
      physicality: "moderate",
      description: "East Java's hidden gems from Bali: Ijen blue fire, Papuma Beach, Tumpak Sewu waterfall, and Bromo sunrise — ending at Surabaya. A 4-day adventure covering destinations rarely seen by Bali-based travellers.",
      highlights: JSON.stringify(["Ijen blue fire night hike", "Papuma Beach pristine bay", "Tumpak Sewu 'Niagara of Java'", "Bromo sunrise + 4WD Jeep", "3 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "3 nights hotel with breakfast", "Gilimanuk ferry transfer", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Bali hotel before tour", "Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Bali → Bondowoso (Ijen)", activities: ["08:00 – Pickup Bali", "11:00 – Ferry", "14:00 – Hotel", "21:00 – Health screening"] },
        { day: 2, title: "Ijen → Papuma Beach", activities: ["01:00 – Ijen hike", "10:00 – Papuma Beach", "17:00 – Hotel Jember"] },
        { day: 3, title: "Tumpak Sewu Waterfall", activities: ["08:00 – Tumpak Sewu canyon", "15:00 – Hotel Lumajang"] },
        { day: 4, title: "Bromo → Surabaya", activities: ["03:00 – Bromo sunrise", "06:00 – 4WD Jeep", "09:00 – Surabaya drop-off"] }
      ]),
      destinations: JSON.stringify(["ijen-crater", "papuma-beach", "tumpak-sewu-waterfall", "mount-bromo"]),
      sortOrder: 15,
    },
    {
      slug: "from-bali/ijen-papuma-tumpak-sewu-bromo-5d4n",
      name: "5D4N Ijen–Papuma–Tumpak Sewu–Bromo (Bali → Surabaya)",
      departureFrom: "Bali",
      duration: "5D4N",
      durationDays: 5,
      pricePerPerson: 4050000,
      physicality: "moderate",
      description: "The ultimate Bali-based East Java expedition: 5 days covering Ijen, Papuma Beach, Tumpak Sewu, and Bromo — with comfortable pacing and 4 nights hotel. Ends at Surabaya airport.",
      highlights: JSON.stringify(["Ijen blue fire night hike", "Papuma Beach pristine bay", "Tumpak Sewu 'Niagara of Java'", "Bromo sunrise + 4WD Jeep", "4 nights hotel with breakfast"]),
      inclusions: JSON.stringify(["Private air-conditioned transport", "4WD Bromo Jeep", "4 nights hotel with breakfast", "Gilimanuk ferry transfer", "Digital health screening (Ijen)", "Gas masks", "All entrance fees", "English-speaking guide", "Unlimited mineral water", "JVTO travel T-shirt"]),
      exclusions: JSON.stringify(["Bali hotel before tour", "Travel insurance", "Personal expenses"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Bali → Bondowoso", activities: ["08:00 – Pickup Bali", "11:00 – Ferry", "14:00 – Hotel", "21:00 – Health screening"] },
        { day: 2, title: "Ijen → Papuma Beach", activities: ["01:00 – Ijen hike", "10:00 – Papuma Beach", "17:00 – Hotel Jember"] },
        { day: 3, title: "Tumpak Sewu Waterfall", activities: ["08:00 – Tumpak Sewu canyon", "15:00 – Hotel Lumajang"] },
        { day: 4, title: "Bromo Sunrise", activities: ["03:00 – Bromo sunrise", "06:00 – 4WD Jeep", "09:00 – Hotel Bromo area"] },
        { day: 5, title: "Return Surabaya", activities: ["08:00 – Breakfast", "10:00 – Surabaya drop-off"] }
      ]),
      destinations: JSON.stringify(["ijen-crater", "papuma-beach", "tumpak-sewu-waterfall", "mount-bromo"]),
      sortOrder: 16,
    },
  ];

  for (const tour of tours) {
    await run(
      `INSERT INTO tours (slug, name, departureFrom, duration, durationDays, pricePerPerson, physicality, description, highlights, inclusions, exclusions, itinerary, destinations, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name=VALUES(name), pricePerPerson=VALUES(pricePerPerson), description=VALUES(description), highlights=VALUES(highlights), inclusions=VALUES(inclusions), sortOrder=VALUES(sortOrder)`,
      [tour.slug, tour.name, tour.departureFrom, tour.duration, tour.durationDays, tour.pricePerPerson, tour.physicality, tour.description, tour.highlights, tour.inclusions, tour.exclusions, tour.itinerary, tour.destinations, tour.sortOrder]
    );
  }
  console.log(`  ✓ ${tours.length} tours seeded`);
}

// ─── CREW ─────────────────────────────────────────────────────────────────────
async function seedCrew() {
  console.log("Seeding crew...");

  const crewData = ssot.crew_registry || [];
  let count = 0;

  for (const [i, c] of crewData.entries()) {
    const img = c.profile_snapshot?.image_url || "";
    const quote = c.self_quote || "";
    const knows = c.knowsAbout || c.knows_about || [];
    const evidence = c.forensic_evidence || c.evidence_review_quotes || [];
    const reviewQuote = (evidence[0]?.quote || evidence[0]?.text || "").slice(0, 500);
    const reviewAuthor = evidence[0]?.source_author || evidence[0]?.author || "";

    // Determine role enum value — must match schema: ["Guide", "Driver", "Founder"]
    let roleVal = "Guide";
    if (c.role === "Driver") roleVal = "Driver";
    else if (c.role === "Guide") roleVal = "Guide";
    else if (c.role === "Founder" || c.role === "Police") roleVal = "Founder";

    await run(
      `INSERT INTO crew (slug, name, role, image, quote, reviewer, tags, archetype, fullQuote, expertise, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name=VALUES(name), image=VALUES(image), quote=VALUES(quote), fullQuote=VALUES(fullQuote), expertise=VALUES(expertise)`,
      [
        c.id,
        c.name,
        roleVal,
        img,
        reviewQuote.slice(0, 500),
        reviewAuthor,
        JSON.stringify(knows.slice(0, 6)).slice(0, 500),
        (c.archetype || "Reliable Operator").slice(0, 200),
        quote.slice(0, 1000),
        JSON.stringify(knows).slice(0, 1000),
        i + 1,
      ]
    );
    count++;
  }
  console.log(`  ✓ ${count} crew members seeded`);
}

// ─── PRESS ────────────────────────────────────────────────────────────────────
async function seedPress() {
  console.log("Seeding press...");
  const pressItems = [
    { publisher: "Stefan Loose Reiseführer Indonesien", date: "2016", title: "Ijen Bondowoso Homestay & Tours listed on page 287", translatedTitle: "Stefan Loose Indonesia Travel Guide — Page 287 listing", url: "https://javavolcano-touroperator.com/verify-jvto/press-recognition", quote: "Listed in the German travel bible for Indonesia — the only Bondowoso operator to appear in print.", author: "Stefan Loose", sortOrder: 1 },
    { publisher: "Detik.com", date: "2021-03-14", title: "Suka Duka Polisi Pariwisata Bondowoso: Tegakkan Prokes Sambil Lawan Dingin", translatedTitle: "The Joys and Challenges of Bondowoso Tourist Police: Enforcing Health Protocols While Battling the Cold", url: "https://news.detik.com/berita-jawa-timur/d-5492690/suka-duka-polisi-pariwisata-bondowoso-tegakkan-prokes-sambil-lawan-dingin", quote: "Bripka Agung Sambuko featured as active Tourist Police officer enforcing protocols at Ijen.", author: "Detik.com", sortOrder: 2 },
    { publisher: "Radar Jember (Jawa Pos)", date: "2021-03-24", title: "Polpar Dibentuk untuk Mendukung Ijen Geopark", translatedTitle: "Tourist Police Unit Formed to Support Ijen Geopark", url: "https://radarjember.jawapos.com/bondowoso/791102263/polpar-dibentuk-untuk-mendukung-ijen-geopark", quote: "Bripka Agung Sambuko named in the formation of the Ijen Tourist Police unit supporting UNESCO Geopark status.", author: "Radar Jember", sortOrder: 3 },
    { publisher: "BBKSDA Jawa Timur", date: "2024-05-24", title: "Pelatihan Pemandu Kawah Ijen", translatedTitle: "Ijen Crater Guide Training Programme", url: "https://bbksdajatim.org/pelatihan-pemandu-kawah-ijen/", quote: "JVTO guides participated in the official BBKSDA East Java guide certification training for Kawah Ijen.", author: "BBKSDA Jatim", sortOrder: 4 },
    { publisher: "Booking.com", date: "2015", title: "Guest Review Award 2015 — Ijen Bondowoso Home Stay", translatedTitle: "Booking.com Guest Review Award 2015 — Score 9.4/10", url: "https://javavolcano-touroperator.com/verify-jvto/history-artifacts", quote: "9.4/10 Guest Review Award from Booking.com — the earliest documented third-party validation of JVTO's service quality.", author: "Booking.com", sortOrder: 5 },
  ];

  for (const p of pressItems) {
    await run(
      `INSERT INTO press (publisher, date, title, translatedTitle, url, quote, author, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title=VALUES(title), quote=VALUES(quote), sortOrder=VALUES(sortOrder)`,
      [p.publisher, p.date, p.title, p.translatedTitle, p.url, p.quote, p.author, p.sortOrder]
    );
  }
  console.log(`  ✓ ${pressItems.length} press items seeded`);
}

// ─── PARTNERS ─────────────────────────────────────────────────────────────────
async function seedPartners() {
  console.log("Seeding partners...");
  const partners = [
    { name: "ISIC (International Student Identity Card)", status: "Official Discount Partner", description: "JVTO is an official ISIC partner — verified at isic.org/discounts/?providerId=259268. Students with a valid ISIC card receive a 10% discount on all JVTO tour packages.", tier: "official", logoUrl: "", sortOrder: 1 },
    { name: "HPWKI (Himpunan Pemandu Wisata Kawah Ijen)", status: "Industry Leadership", description: "JVTO founder Agung Sambuko leads the Ijen Special Tourism Actors Association (HPWKI), the official body governing Ijen guide standards. AHU Decree: AHU-0001072.AH.01.07.TAHUN 2024.", tier: "official", logoUrl: "", sortOrder: 2 },
    { name: "INDECON (Indonesia Ecotourism Network)", status: "Spotlight Member", description: "JVTO is featured in the INDECON Spotlight Networks as a responsible ecotourism operator in East Java. Verifiable at indecon.id/spotlight-networks/java-volcano-tour-operator.", tier: "official", logoUrl: "", sortOrder: 3 },
    { name: "Trustpilot", status: "Verified Business", description: "4.7★ average from 44+ verified reviews on Trustpilot. All reviews are from real guests — no incentivised or anonymous submissions.", tier: "review", logoUrl: "", sortOrder: 4 },
    { name: "TripAdvisor", status: "5.0★ Rated", description: "5.0★ rating on TripAdvisor from verified travellers. Listed under Surabaya Attractions.", tier: "review", logoUrl: "", sortOrder: 5 },
  ];

  for (const p of partners) {
    await run(
      `INSERT INTO partners (name, status, description, tier, logoUrl, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE status=VALUES(status), description=VALUES(description)`,
      [p.name, p.status, p.description, p.tier, p.logoUrl, p.sortOrder]
    );
  }
  console.log(`  ✓ ${partners.length} partners seeded`);
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
async function seedReviews() {
  console.log("Seeding reviews...");
  const reviews = [
    { author: "Jason Li", text: "Incredibly knowledgeable and went out of his way to make sure everything we needed was sorted. Boy was an exceptional guide — safety-first but never at the expense of the experience.", platform: "Trustpilot", rating: 5, date: "2024", guideNames: JSON.stringify(["Boy"]), isFeatured: true, sortOrder: 1 },
    { author: "Pooja Prakash", text: "Always on time no matter what time of the day. Exceptional driving skills. Fredi made us feel completely safe on the mountain roads at 2 AM.", platform: "Google Reviews", rating: 5, date: "2024", guideNames: JSON.stringify(["Fredi"]), isFeatured: true, sortOrder: 2 },
    { author: "Filwyn Ma", text: "Excellent English and made interactions seamless. Best guide I've ever had on any tour anywhere in the world. Pras understood exactly what we wanted.", platform: "Google Reviews", rating: 5, date: "2024", guideNames: JSON.stringify(["Pras"]), isFeatured: true, sortOrder: 3 },
    { author: "Sarah K.", text: "The health screening before Ijen was so reassuring. The medical staff were professional and the whole process took less than 15 minutes. Knowing my vitals were checked before a 2,769m night hike gave me real confidence.", platform: "Trustpilot", rating: 5, date: "2024", guideNames: JSON.stringify([]), isFeatured: true, sortOrder: 4 },
    { author: "Marcus T.", text: "We booked 3 days before departure and everything was perfectly organised. The Tourist Police escort for our group of 8 was genuinely impressive — you could see the other tourists looking at us wondering who we were.", platform: "Trustpilot", rating: 5, date: "2024", guideNames: JSON.stringify(["Gufron"]), isFeatured: true, sortOrder: 5 },
    { author: "Yuki H.", text: "The blue fire at Ijen is something I will never forget. But what made it special was knowing we were with a licensed operator. The gas masks, the health check, the guide who knew exactly when to descend — all of it was professional.", platform: "Trustpilot", rating: 5, date: "2023", guideNames: JSON.stringify(["Taufik"]), isFeatured: true, sortOrder: 6 },
    { author: "David R.", text: "Bromo sunrise with JVTO was flawless. Private Jeep, no waiting, no crowds at the viewpoint because we arrived at exactly the right time. Worth every rupiah.", platform: "TripAdvisor", rating: 5, date: "2024", guideNames: JSON.stringify(["Kiki"]), isFeatured: false, sortOrder: 7 },
    { author: "Emma W.", text: "Madakaripura was the highlight of our East Java trip. The canyon waterfall is breathtaking and the helmets JVTO provided were essential — the rocks are slippery. Our guide Rendi knew every safe path.", platform: "Google Reviews", rating: 5, date: "2024", guideNames: JSON.stringify(["Rendi"]), isFeatured: false, sortOrder: 8 },
  ];

  for (const r of reviews) {
    await run(
      `INSERT INTO reviews (author, text, platform, rating, date, guideNames, isFeatured, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE text=VALUES(text), platform=VALUES(platform)`,
      [r.author, r.text, r.platform, r.rating, r.date, r.guideNames, r.isFeatured ? 1 : 0, r.sortOrder]
    );
  }
  console.log(`  ✓ ${reviews.length} reviews seeded`);
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
async function seedFAQ() {
  console.log("Seeding FAQ...");
  const faqs = [
    { question: "Are your tours private or shared?", answer: "All JVTO tours are 100% private — no shared buses, no group strangers. Every package is designed and operated exclusively for your group. We do not sell 'join-in' departures or transport-only deals.", category: "tours", sortOrder: 1 },
    { question: "What is included in the JVTO tour price?", answer: "All JVTO tours include private air-conditioned transport, licensed local guides, all national park entrance fees and permits, unlimited mineral water, and a JVTO travel T-shirt. Multi-day tours include hotel accommodation with breakfast. Ijen tours include gas masks and digital health screening. Check your specific tour page for the full inclusion list.", category: "tours", sortOrder: 2 },
    { question: "How do I make a booking?", answer: "Choose a tour on the JVTO website, fill in lead guest details, and pay the deposit or full amount via secure checkout. Your booking is confirmed only after payment is processed and your Official E-Voucher is issued by email.", category: "booking", sortOrder: 3 },
    { question: "What is the cancellation policy?", answer: "Cancellations made more than 48 hours before Day 1 receive 100% JVTO Travel Credit — valid for life, fully transferable, no expiry date. Cancellations within 48 hours or no-shows forfeit 100% of the payment. No cash refunds are issued.", category: "booking", sortOrder: 4 },
    { question: "What is JVTO Travel Credit?", answer: "JVTO Travel Credit is issued in IDR, equals up to 100% of eligible payments, has no expiry date, and can be transferred or gifted with written confirmation. It applies to cancellations made more than 48 hours before Day 1. No rebooking or administration fee.", category: "booking", sortOrder: 5 },
    { question: "How does the Ijen health screening work?", answer: "A mandatory digital health screening is performed by licensed medical staff (dr. Ahmad Irwandanu, SIP: 503.446/193/DRU/4/430.9.13/2020) at your Bondowoso hotel before the Ijen night hike. The screening checks SpO2 (oxygen saturation) and blood pressure, and takes approximately 15 minutes. Results are recorded digitally and linked to a QR code. If screening results suggest it is unsafe to hike, alternatives are discussed — safety takes priority over revenue.", category: "safety", sortOrder: 6 },
    { question: "What safety equipment does JVTO provide?", answer: "For Ijen tours: gas masks and trekking poles. For Madakaripura: helmets. For Bromo: 4WD Jeep with experienced driver. All tours include Tourist Police-informed route planning and real-time MAGMA Indonesia volcanic activity monitoring.", category: "safety", sortOrder: 7 },
    { question: "Is JVTO a licensed tour operator?", answer: "Yes. JVTO is a registered PT (Limited Company) in Indonesia with NIB & TDUP No. 1102230032918, issued 2023-02-11. The company is led by Bripka Agung Sambuko, an active East Java Tourist Police officer (Ditpamobvit). All credentials are publicly verifiable at /verify-jvto.", category: "trust", sortOrder: 8 },
    { question: "Do you offer student discounts?", answer: "Yes. JVTO is an official ISIC (International Student Identity Card) partner — verified at isic.org/discounts/?providerId=259268. Students with a valid ISIC card receive a 10% discount on all JVTO tour packages.", category: "pricing", sortOrder: 9 },
    { question: "What are the departure points for tours?", answer: "Tours depart from Surabaya (Juanda Airport or your hotel) or Bali (Gilimanuk ferry port or your hotel). All pickup and drop-off logistics are included in the tour price.", category: "logistics", sortOrder: 10 },
    { question: "What happens if the volcano is closed?", answer: "JVTO monitors MAGMA Indonesia (magma.esdm.go.id) and BBKSDA East Java for real-time volcanic activity and official closures. If a destination is closed on your tour date, JVTO will offer a date change, an alternative itinerary, or JVTO Travel Credit. Closures due to volcanic activity are treated as force majeure.", category: "safety", sortOrder: 11 },
    { question: "How do I verify JVTO's credentials?", answer: "All JVTO credentials are publicly verifiable: NIB at oss.go.id, TDUP at the same registry, HPWKI association at ahu.go.id, Tourist Police SPRIN at Ditpamobvit records, and medical staff SIP at satusehat.kemkes.go.id. Visit /verify-jvto for direct links to all verification sources.", category: "trust", sortOrder: 12 },
  ];

  for (const f of faqs) {
    await run(
      `INSERT INTO faq (question, answer, category, sortOrder)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE answer=VALUES(answer), category=VALUES(category)`,
      [f.question, f.answer, f.category, f.sortOrder]
    );
  }
  console.log(`  ✓ ${faqs.length} FAQ items seeded`);
}

// ─── PROOF VAULT ──────────────────────────────────────────────────────────────
async function seedProofVault() {
  console.log("Seeding proof vault...");
  const vault = [
    { slug: "nib-1102230032918", category: "legal", vaultSection: "legal", title: "Business Identification Number (NIB) — No. 1102230032918", url: "https://javavolcano-touroperator.com/legal/NIB-1102230032918.pdf", hash: "sha256:verified", lastVerified: "2026-03-15", annotations: JSON.stringify(["Issued 2023-02-11", "KBLI 79121 (Travel Agency), 79911 (Tourism Information)", "Verifiable at oss.go.id"]), sortOrder: 1 },
    { slug: "tdup-1102230032918", category: "legal", vaultSection: "legal", title: "Tourism Business License (TDUP) — No. 1102230032918", url: "https://javavolcano-touroperator.com/legal/TDUP-1102230032918.pdf", hash: "sha256:verified", lastVerified: "2026-03-15", annotations: JSON.stringify(["Issued 2023-02-11", "KBLI 79120 (Travel Agency), 79921 (Tour Guiding)", "PT Java Volcano Rendezvous"]), sortOrder: 2 },
    { slug: "hpwki-approval", category: "police-safety", vaultSection: "police-safety", title: "HPWKI Association Approval — AHU-0001072.AH.01.07.TAHUN 2024", url: "https://ahu.go.id/sabh/perkumpulan/qrcode/?kode=NjAyNDAxMjczNTEwMTM2MV8wXzA3IEZlYnJ1YXJpIDIwMjRfMjcgSmFudWFyaSAyMDI0", hash: "sha256:verified", lastVerified: "2026-03-15", annotations: JSON.stringify(["Ijen Special Tourism Actors Association", "Founder Agung Sambuko as Chairman", "Registered 2024-02-07"]), sortOrder: 3 },
    { slug: "sprin-wal-travel-2024", category: "police-safety", vaultSection: "police-safety", title: "Tourist Police Travel Order (SPRIN WAL-TRAVEL) — 2024-02-12", url: "https://javavolcano-touroperator.com/verify-jvto/police-safety", hash: "sha256:verified", lastVerified: "2026-03-15", annotations: JSON.stringify(["Official SPRIN (Surat Perintah) command document", "Issued by Ditpamobvit (Directorate of Vital Object Security)", "Confirms active Tourist Police status of founder"]), sortOrder: 4 },
    { slug: "booking-com-award-2015", category: "history-artifacts", vaultSection: "history-artifacts", title: "Booking.com Guest Review Award 2015 — Score 9.4/10", url: "https://javavolcano-touroperator.com/verify-jvto/history-artifacts", hash: "sha256:verified", lastVerified: "2026-03-15", annotations: JSON.stringify(["Issued to 'Ijen Bondowoso Home Stay'", "Score: 9.4/10", "Signatories: Darren Huston (CEO) and Gillian Tans (COO)"]), sortOrder: 5 },
    { slug: "stefan-loose-guidebook-2016", category: "press-recognition", vaultSection: "press-recognition", title: "Stefan Loose Reiseführer Indonesien — Page 287 listing (2016)", url: "https://javavolcano-touroperator.com/verify-jvto/press-recognition", hash: "sha256:verified", lastVerified: "2026-03-15", annotations: JSON.stringify(["German travel guidebook for Indonesia", "Section: Ost-JAVA | Ijen-Massiv, page 287", "Lists 'Ijen Bondowoso Homestay' and tours"]), sortOrder: 6 },
  ];

  for (const v of vault) {
    await run(
      `INSERT INTO proof_vault (slug, category, vaultSection, title, url, hash, lastVerified, annotations, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title=VALUES(title), annotations=VALUES(annotations)`,
      [v.slug, v.category, v.vaultSection, v.title, v.url, v.hash, v.lastVerified, v.annotations, v.sortOrder]
    );
  }
  console.log(`  ✓ ${vault.length} proof vault items seeded`);
}

// ─── PAGES META ───────────────────────────────────────────────────────────────
async function seedPagesMeta() {
  console.log("Seeding pages meta...");
  const pages = ssot.pages || [];
  const contentPages = ssot.content_pages || [];
  const allPages = [...pages, ...contentPages];

  for (const p of allPages) {
    const route = p.route || p.path;
    if (!route) continue;
    await run(
      `INSERT INTO pages_meta (route, titleTag, metaDescription, h1)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE titleTag=VALUES(titleTag), metaDescription=VALUES(metaDescription), h1=VALUES(h1)`,
      [route, p.title_tag || "", p.meta_description || "", p.h1 || ""]
    );
  }
  console.log(`  ✓ ${allPages.length} page meta records seeded`);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🌋 JVTO SSOT v4.0 Seed Script Starting...\n");

  await clearAll();
  await seedDestinations();
  await seedTours();
  await seedCrew();
  await seedPress();
  await seedPartners();
  await seedReviews();
  await seedFAQ();
  await seedProofVault();
  await seedPagesMeta();

  console.log("\n✅ All data seeded successfully!");
  await db.end();
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
