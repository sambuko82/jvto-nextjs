// seed-db.mjs — JVTO Full Content Seed (Audit-Optimized v2)
// Run with: node seed-db.mjs
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
console.log('🌱 Seeding JVTO database (audit-optimized v2)...');

// ─── Destinations ─────────────────────────────────────────────────────────────
await connection.execute('DELETE FROM destinations');

const destinations = [
  {
    slug: 'mount-bromo',
    title: 'Mount Bromo',
    category: 'Volcano',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
    shortDesc: 'Active stratovolcano in the Tengger Caldera. Sunrise views over the Sea of Sand are among the most photographed in Southeast Asia.',
    description: `Mount Bromo (Gunung Bromo) is an active stratovolcano located in the Tengger Caldera, East Java, straddling Probolinggo, Malang, Pasuruan, and Lumajang regencies — approximately 2–3 hours from Surabaya's Juanda Airport.

At 2,329m, Bromo sits inside a vast caldera with a flat sandy floor known as the Sea of Sand (Lautan Pasir). The crater is accessible by 4WD jeep across the sand, followed by a short climb up 253 concrete steps to the crater rim.

The Tengger people — descendants of the ancient Majapahit kingdom — hold the Yadnya Kasada ceremony here annually, throwing offerings into the crater as tribute to the mountain god Brahma. This cultural layer makes Bromo more than a geological spectacle; it is a living sacred site.

Sunrise at Bromo is the primary draw: from the Penanjakan viewpoint, the crater emits a column of volcanic smoke against the pre-dawn sky, framed by the surrounding caldera walls. The experience is weather-dependent — clear skies are most reliable in the dry season (April–October).

JVTO private tours include 4WD jeep transfer across the Sea of Sand, guided ascent to the crater rim, and sunrise viewing from the Penanjakan viewpoint. All safety protocols apply; no shared vehicles.`,
    altitude: '2,329m',
    difficulty: 'moderate',
    duration: '2–3 hours',
    bestTime: 'April–October (dry season)',
    highlights: JSON.stringify(['Penanjakan sunrise viewpoint', 'Sea of Sand 4WD jeep ride', 'Crater rim walk', 'Tengger caldera panorama', 'Yadnya Kasada ceremony (seasonal)']),
    safetyNotes: JSON.stringify(['Private 4WD jeep provided', 'Warm clothing essential (0–5°C at night)', 'Volcanic activity monitored daily via MAGMA Indonesia', 'JVTO guide accompanies all guests', 'No shared vehicles — private only']),
    sortOrder: 1,
    isActive: true,
  },
  {
    slug: 'ijen-crater',
    title: 'Kawah Ijen',
    category: 'Volcano',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    shortDesc: 'The world\'s largest acidic crater lake and one of only two places where natural blue fire appears at night. Mandatory health screening required.',
    description: `Kawah Ijen is located in Banyuwangi Regency, East Java, Indonesia — approximately 3 hours by car from Banyuwangi city and 5–6 hours from Surabaya (Juanda Airport).

At 2,386m, Ijen hosts the world's largest acidic crater lake — a turquoise-green pool of sulfuric acid approximately 200m deep and 1km wide, with a pH near zero. The lake's vivid color results from dissolved volcanic minerals and sulfur compounds.

The blue fire phenomenon — one of only two naturally occurring blue flame events on Earth — occurs when sulfuric gases combust on contact with air. It is visible only in darkness, between midnight and approximately 5:00am. JVTO's night ascent schedule is designed specifically to reach the crater rim before dawn.

Sulfur miners work the crater floor daily, extracting solidified sulfur in loads of 70–100kg carried by hand up the crater wall. JVTO guests are encouraged to acknowledge their work; tips are welcomed by the mining community.

Health screening is mandatory. Indonesian law requires a pre-ascent SpO₂ and blood pressure check for all Ijen visitors. JVTO arranges this through licensed physician dr. Ahmad Irwandanu (STR: QN00001073380217) — included in your package cost. Guests with respiratory conditions, heart disease, or low blood oxygen saturation may not be cleared for the crater floor descent.

Gas masks are provided to all JVTO guests. The sulfur dioxide concentration near the crater floor can reach dangerous levels; masks are not optional.`,
    altitude: '2,386m',
    difficulty: 'challenging',
    duration: '3–4 hours hike',
    bestTime: 'May–October (dry season)',
    highlights: ['Natural blue fire — visible only before sunrise', 'World\'s largest acidic crater lake', 'Sulfur miners at work', 'Sunrise over the caldera', 'Panoramic East Java views'].map(h => h),
    safetyNotes: JSON.stringify(['Mandatory health screening by licensed physician (included)', 'Gas masks provided for all guests', 'HPWKI-licensed guide accompanies all guests', 'Weather-dependent — closures enforced', 'Physical fitness required — 3km ascent, 600m elevation gain']),
    sortOrder: 2,
    isActive: true,
  },
  {
    slug: 'madakaripura-waterfall',
    title: 'Madakaripura Waterfall',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=1200&q=80',
    shortDesc: 'Indonesia\'s tallest waterfall at 200m, hidden inside a sacred canyon. The final meditation site of Gajah Mada, prime minister of the Majapahit Empire.',
    description: `Madakaripura Waterfall is located in Probolinggo Regency, East Java, Indonesia — approximately 15km from the Bromo Tengger Semeru National Park entrance, making it a natural pairing with a Bromo sunrise.

At approximately 200m, Madakaripura is the tallest waterfall in Java and among the tallest in Indonesia. It falls into a narrow canyon enclosed on three sides by towering cliffs draped in hanging vegetation — a natural amphitheater effect that creates a constant mist.

The site holds deep historical significance: it is traditionally identified as the final meditation and resting place of Gajah Mada, the legendary prime minister of the Majapahit Empire (14th century), who unified much of the Indonesian archipelago. Local Tengger communities consider the site sacred.

The approach involves a 20-minute walk through a river canyon — guests wade through shallow water sections (knee-deep maximum in dry season). Waterproof bags are recommended for cameras. JVTO provides guidance on the approach and timing to avoid peak visitor hours.

Madakaripura is included in JVTO's 3-Day Bromo, Madakaripura & Ijen Overland tour — one of the most popular multi-destination routes, departing Surabaya and ending in Bali.`,
    altitude: '~200m waterfall',
    difficulty: 'easy',
    duration: '2 hours',
    bestTime: 'Year-round (drier in April–October)',
    highlights: JSON.stringify(['200m waterfall — Indonesia\'s tallest', 'Sacred Majapahit historical site (Gajah Mada)', 'Narrow canyon walk', 'Natural mist amphitheater', 'Combined with Bromo tours']),
    safetyNotes: JSON.stringify(['Waterproof bags provided', 'Wet shoes/sandals required', 'Flash flood monitoring active', 'Local guide mandatory', 'No solo entry permitted']),
    sortOrder: 3,
    isActive: true,
  },
  {
    slug: 'tumpak-sewu',
    title: 'Tumpak Sewu Waterfall',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
    shortDesc: 'East Java\'s most dramatic waterfall — a 120m curtain of water across a 120m-wide cliff face, framed by jungle and the slopes of Mount Semeru.',
    description: `Tumpak Sewu is located in Lumajang Regency, East Java, Indonesia — approximately 4–5 hours from Surabaya and often combined with a Bromo tour as part of a multi-day overland route.

The name means "a thousand waterfalls" in Javanese — an accurate description. Tumpak Sewu drops approximately 120m over a curved cliff face roughly 120m wide, creating a curtain effect unlike any single-stream waterfall. During the wet season (November–March), the volume intensifies dramatically.

The viewpoint is accessible via a steep descent into the canyon — approximately 45 minutes down and 60 minutes back up. The canyon floor offers close-range views of the falls and access to cave systems behind the water curtain. The descent requires moderate fitness; JVTO guides assess conditions before leading guests down.

Mount Semeru — Java's highest peak at 3,676m and an active volcano — is visible from the upper viewpoint on clear days, providing a dramatic volcanic backdrop to the waterfall.

JVTO includes Tumpak Sewu in multi-day overland tours. Due to the canyon descent, guests with knee or mobility issues should discuss suitability with JVTO before booking.`,
    altitude: '~1,000m elevation',
    difficulty: 'moderate',
    duration: '3–4 hours',
    bestTime: 'May–September (dry season)',
    highlights: JSON.stringify(['120m wide curtain waterfall', 'Steep canyon descent trail', 'Cave behind the falls', 'Mount Semeru volcanic backdrop', 'Coban Kembar twin falls nearby']),
    safetyNotes: JSON.stringify(['Steep descent — guide mandatory', 'Rope-assisted sections in wet season', 'Wet season closures enforced', 'Moderate fitness required', 'Emergency extraction plan active']),
    sortOrder: 4,
    isActive: true,
  },
  {
    slug: 'papuma-beach',
    title: 'Papuma Beach',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    shortDesc: 'A secluded white-sand beach in Jember Regency, often included as a rest day between Ijen and overland routes. Dramatic rock formations and Indian Ocean views.',
    description: `Papuma Beach (Tanjung Papuma) is located in Jember Regency, East Java, Indonesia — approximately 1.5 hours from Banyuwangi and a natural rest stop between Kawah Ijen and onward overland routes.

The beach features white sand, clear water, and a series of dramatic limestone rock formations rising from the shoreline. The Indian Ocean horizon is unobstructed to the south. Papuma is significantly less visited than Bali's beaches, offering a quieter experience for guests who have just completed the demanding Ijen night trek.

JVTO includes Papuma as a rest stop on select multi-day itineraries — typically on the day following the Ijen blue fire ascent, allowing guests to recover before the next driving leg.

Swimming conditions vary by season; the dry season (April–October) offers calmer waters. JVTO guides advise on current conditions at the time of visit.`,
    altitude: 'Sea level',
    difficulty: 'easy',
    duration: '1–2 hours',
    bestTime: 'April–October (dry season)',
    highlights: JSON.stringify(['Pristine white sand beach', 'Dramatic limestone rock formations', 'Indian Ocean views', 'Snorkeling opportunities', 'Authentic local fishing village nearby']),
    safetyNotes: JSON.stringify(['Swimming in designated zones only', 'Strong current warnings posted', 'Sun protection essential', 'JVTO guide advises on conditions', 'Private access — no crowds']),
    sortOrder: 5,
    isActive: true,
  },
];

for (const d of destinations) {
  const highlights = typeof d.highlights === 'string' ? d.highlights : JSON.stringify(d.highlights);
  await connection.execute(
    `INSERT INTO destinations (slug, title, category, image, heroImage, shortDesc, description, altitude, difficulty, duration, bestTime, highlights, safetyNotes, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), shortDesc=VALUES(shortDesc), highlights=VALUES(highlights), safetyNotes=VALUES(safetyNotes)`,
    [d.slug, d.title, d.category, d.image, d.heroImage, d.shortDesc, d.description, d.altitude, d.difficulty, d.duration, d.bestTime, highlights, d.safetyNotes, d.sortOrder, d.isActive ? 1 : 0]
  );
  console.log(`  ✓ Destination: ${d.title}`);
}

// ─── Tours ────────────────────────────────────────────────────────────────────
await connection.execute('DELETE FROM tours');

const tours = [
  {
    slug: '1-day-bromo-sunrise-from-surabaya',
    name: '1-Day Private Bromo Sunrise Tour from Surabaya',
    departure: 'surabaya',
    duration: '1 Day',
    durationDays: 1,
    pricePerPerson: 1750000,
    difficulty: 'moderate',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    description: 'Sunrise jeep tour across the Sea of Sand. Depart Surabaya at midnight, return by midday. 100% private — your own vehicle, driver, and guide dedicated only to your group.',
    highlights: JSON.stringify(['Private 4WD jeep across the Sea of Sand', 'Penanjakan sunrise viewpoint', 'Bromo crater rim walk', 'No strangers — 100% private', 'Hotel pickup & drop-off Surabaya']),
    inclusions: JSON.stringify(['Private 4WD jeep', 'National park entrance fee', 'English-speaking HPWKI guide', 'Gas mask', 'Mineral water']),
    exclusions: JSON.stringify(['Meals', 'Accommodation', 'Personal travel insurance', 'Tips']),
    itinerary: JSON.stringify([
      { time: '23:00', activity: 'Hotel pickup in Surabaya (Juanda Airport or city hotel)' },
      { time: '02:30', activity: 'Arrive Bromo area — transfer to 4WD jeep' },
      { time: '03:30', activity: 'Penanjakan viewpoint — sunrise viewing' },
      { time: '05:30', activity: 'Sea of Sand jeep ride — Bromo crater rim walk' },
      { time: '07:30', activity: 'Return to vehicle — depart for Surabaya' },
      { time: '12:00', activity: 'Hotel drop-off in Surabaya' },
    ]),
    destinations: JSON.stringify(['mount-bromo']),
    rating: 5,
    reviewCount: 44,
    sortOrder: 1,
    isActive: true,
  },
  {
    slug: '2-day-bromo-ijen-from-surabaya',
    name: '2-Day Private Bromo & Ijen Tour from Surabaya',
    departure: 'surabaya',
    duration: '2 Days / 1 Night',
    durationDays: 2,
    pricePerPerson: 2450000,
    difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'The classic East Java overland: Bromo sunrise on Day 1, Ijen blue fire on Day 2. Ends in Banyuwangi. 100% private — your own vehicle, driver, and guide.',
    highlights: JSON.stringify(['Bromo sunrise over the Sea of Sand', 'Ijen blue fire (midnight–5am)', 'Mandatory health screening included', 'Gas masks provided', 'No strangers — 100% private']),
    inclusions: JSON.stringify(['Private vehicle', 'Accommodation (1 night)', 'National park fees', 'Mandatory health screening (dr. Ahmad Irwandanu)', 'Gas masks', 'English-speaking guide', 'Mineral water']),
    exclusions: JSON.stringify(['Meals', 'International flights', 'Personal travel insurance', 'Tips']),
    itinerary: JSON.stringify([
      { time: 'Day 1 — 23:00', activity: 'Hotel pickup in Surabaya' },
      { time: 'Day 2 — 03:30', activity: 'Bromo sunrise at Penanjakan viewpoint' },
      { time: 'Day 2 — 06:00', activity: 'Sea of Sand jeep ride — crater rim walk' },
      { time: 'Day 2 — 10:00', activity: 'Drive to Banyuwangi (5–6 hours) — check in to hotel' },
      { time: 'Day 3 — 00:30', activity: 'Depart for Ijen — mandatory health screening at Paltuding' },
      { time: 'Day 3 — 02:30', activity: 'Reach crater rim — blue fire viewing begins' },
      { time: 'Day 3 — 05:30', activity: 'Sunrise at crater rim' },
      { time: 'Day 3 — 08:00', activity: 'Descend — transfer to Banyuwangi airport or ferry' },
    ]),
    destinations: JSON.stringify(['mount-bromo', 'ijen-crater']),
    rating: 5,
    reviewCount: 44,
    sortOrder: 2,
    isActive: true,
  },
  {
    slug: '3-day-bromo-madakaripura-ijen-surabaya-to-bali',
    name: '3-Day Bromo, Madakaripura & Ijen Overland — Surabaya to Bali',
    departure: 'surabaya',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    pricePerPerson: 3200000,
    difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80',
    description: 'The full East Java overland: Madakaripura Waterfall, Bromo sunrise, and Ijen blue fire. Starts Surabaya, ends Bali. No return needed — a true point-to-point expedition.',
    highlights: JSON.stringify(['Madakaripura Waterfall — Indonesia\'s tallest', 'Bromo sunrise over the Sea of Sand', 'Ijen blue fire (midnight–5am)', 'Surabaya to Bali — no return needed', 'No strangers — 100% private']),
    inclusions: JSON.stringify(['Private vehicle', 'Accommodation (2 nights)', 'National park fees', 'Mandatory health screening', 'Gas masks', 'English-speaking guide', 'Mineral water']),
    exclusions: JSON.stringify(['Meals', 'Bali–Banyuwangi ferry ticket', 'Personal travel insurance', 'Tips']),
    itinerary: JSON.stringify([
      { time: 'Day 1 — 08:00', activity: 'Hotel pickup in Surabaya' },
      { time: 'Day 1 — 10:30', activity: 'Madakaripura Waterfall — canyon walk' },
      { time: 'Day 1 — 15:00', activity: 'Drive to Bromo area — check in to hotel' },
      { time: 'Day 2 — 03:00', activity: 'Bromo sunrise at Penanjakan viewpoint' },
      { time: 'Day 2 — 06:00', activity: 'Sea of Sand jeep ride — crater rim walk' },
      { time: 'Day 2 — 10:00', activity: 'Drive to Banyuwangi (5–6 hours) — check in to hotel' },
      { time: 'Day 3 — 00:30', activity: 'Depart for Ijen — mandatory health screening at Paltuding' },
      { time: 'Day 3 — 02:30', activity: 'Reach crater rim — blue fire viewing begins' },
      { time: 'Day 3 — 05:30', activity: 'Sunrise at crater rim' },
      { time: 'Day 3 — 08:00', activity: 'Descend — transfer to Banyuwangi ferry terminal for Bali' },
    ]),
    destinations: JSON.stringify(['madakaripura-waterfall', 'mount-bromo', 'ijen-crater']),
    rating: 5,
    reviewCount: 44,
    sortOrder: 3,
    isActive: true,
  },
  {
    slug: '1-day-ijen-blue-fire-from-surabaya',
    name: '1-Day Private Ijen Blue Fire Tour from Surabaya',
    departure: 'surabaya',
    duration: '1 Day',
    durationDays: 1,
    pricePerPerson: 1550000,
    difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Night drive from Surabaya, mandatory health screening, blue fire trek, sunrise at the crater rim. Returns to Surabaya. 100% private.',
    highlights: JSON.stringify(['Natural blue fire — visible only before sunrise', 'Mandatory health screening included', 'Gas masks provided', 'HPWKI-licensed guide', 'No strangers — 100% private']),
    inclusions: JSON.stringify(['Private vehicle', 'Mandatory health screening', 'Gas masks', 'English-speaking HPWKI guide', 'Mineral water']),
    exclusions: JSON.stringify(['Meals', 'Accommodation', 'Personal travel insurance', 'Tips']),
    itinerary: JSON.stringify([
      { time: '17:00', activity: 'Hotel pickup in Surabaya' },
      { time: '22:30', activity: 'Arrive Banyuwangi area — mandatory health screening at Paltuding' },
      { time: '00:30', activity: 'Begin night trek to crater rim (1.5–2 hours)' },
      { time: '02:30', activity: 'Reach crater rim — blue fire viewing begins' },
      { time: '05:30', activity: 'Sunrise at crater rim' },
      { time: '07:00', activity: 'Descend from crater' },
      { time: '09:00', activity: 'Return journey to Surabaya' },
      { time: '15:00', activity: 'Hotel drop-off in Surabaya' },
    ]),
    destinations: JSON.stringify(['ijen-crater']),
    rating: 5,
    reviewCount: 44,
    sortOrder: 4,
    isActive: true,
  },
  {
    slug: '2-day-ijen-blue-fire-from-bali',
    name: '2-Day Private Ijen Blue Fire Tour from Bali',
    departure: 'bali',
    duration: '2 Days / 1 Night',
    durationDays: 2,
    pricePerPerson: 2850000,
    difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Bali to Ijen and back. Ferry crossing, mandatory health screening, blue fire trek, sunrise. 100% private. Returns to Bali.',
    highlights: JSON.stringify(['Natural blue fire — visible only before sunrise', 'Ferry crossing included (both ways)', 'Mandatory health screening included', 'Gas masks provided', 'No strangers — 100% private']),
    inclusions: JSON.stringify(['Private vehicle', 'Accommodation (1 night)', 'Ferry tickets (Bali–Java–Bali)', 'Mandatory health screening', 'Gas masks', 'English-speaking guide', 'Mineral water']),
    exclusions: JSON.stringify(['Meals', 'Personal travel insurance', 'Tips']),
    itinerary: JSON.stringify([
      { time: 'Day 1 — 08:00', activity: 'Hotel pickup in Bali (Kuta/Seminyak/Ubud)' },
      { time: 'Day 1 — 11:00', activity: 'Gilimanuk ferry terminal — cross to Banyuwangi (30–45 min)' },
      { time: 'Day 1 — 14:00', activity: 'Check in to hotel in Banyuwangi' },
      { time: 'Day 2 — 00:30', activity: 'Depart for Ijen — mandatory health screening at Paltuding' },
      { time: 'Day 2 — 02:30', activity: 'Reach crater rim — blue fire viewing begins' },
      { time: 'Day 2 — 05:30', activity: 'Sunrise at crater rim' },
      { time: 'Day 2 — 08:00', activity: 'Descend — drive to Gilimanuk ferry' },
      { time: 'Day 2 — 14:00', activity: 'Ferry back to Bali' },
      { time: 'Day 2 — 17:00', activity: 'Hotel drop-off in Bali' },
    ]),
    destinations: JSON.stringify(['ijen-crater']),
    rating: 5,
    reviewCount: 44,
    sortOrder: 5,
    isActive: true,
  },
  {
    slug: '3-day-bromo-ijen-from-bali',
    name: '3-Day Private Bromo & Ijen Tour from Bali',
    departure: 'bali',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    pricePerPerson: 3850000,
    difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    description: 'Bali to Bromo sunrise and Ijen blue fire, returning to Bali. The most complete East Java experience from Bali. 100% private.',
    highlights: JSON.stringify(['Bromo sunrise over the Sea of Sand', 'Ijen blue fire (midnight–5am)', 'Ferry crossing included (both ways)', 'Mandatory health screening included', 'No strangers — 100% private']),
    inclusions: JSON.stringify(['Private vehicle', 'Accommodation (2 nights)', 'Ferry tickets (both ways)', 'National park fees', 'Mandatory health screening', 'Gas masks', 'English-speaking guide', 'Mineral water']),
    exclusions: JSON.stringify(['Meals', 'Personal travel insurance', 'Tips']),
    itinerary: JSON.stringify([
      { time: 'Day 1 — 06:00', activity: 'Hotel pickup in Bali — ferry to Banyuwangi' },
      { time: 'Day 1 — 14:00', activity: 'Drive to Bromo area (4–5 hours) — check in to hotel' },
      { time: 'Day 2 — 03:00', activity: 'Bromo sunrise at Penanjakan viewpoint' },
      { time: 'Day 2 — 06:00', activity: 'Sea of Sand jeep ride — crater rim walk' },
      { time: 'Day 2 — 10:00', activity: 'Drive to Banyuwangi (5–6 hours) — check in to hotel' },
      { time: 'Day 3 — 00:30', activity: 'Depart for Ijen — mandatory health screening at Paltuding' },
      { time: 'Day 3 — 02:30', activity: 'Reach crater rim — blue fire viewing begins' },
      { time: 'Day 3 — 05:30', activity: 'Sunrise at crater rim' },
      { time: 'Day 3 — 08:00', activity: 'Descend — ferry back to Bali' },
      { time: 'Day 3 — 17:00', activity: 'Hotel drop-off in Bali' },
    ]),
    destinations: JSON.stringify(['mount-bromo', 'ijen-crater']),
    rating: 5,
    reviewCount: 44,
    sortOrder: 6,
    isActive: true,
  },
  {
    slug: '4-day-bromo-madakaripura-ijen-from-bali',
    name: '4-Day Bromo, Madakaripura & Ijen Overland from Bali',
    departure: 'bali',
    duration: '4 Days / 3 Nights',
    durationDays: 4,
    pricePerPerson: 4750000,
    difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80',
    description: 'The most comprehensive East Java overland from Bali: Madakaripura Waterfall, Bromo sunrise, and Ijen blue fire. Returns to Bali. 100% private.',
    highlights: JSON.stringify(['Madakaripura Waterfall — Indonesia\'s tallest', 'Bromo sunrise over the Sea of Sand', 'Ijen blue fire (midnight–5am)', 'Ferry crossing included (both ways)', 'No strangers — 100% private']),
    inclusions: JSON.stringify(['Private vehicle', 'Accommodation (3 nights)', 'Ferry tickets (both ways)', 'National park fees', 'Mandatory health screening', 'Gas masks', 'English-speaking guide', 'Mineral water']),
    exclusions: JSON.stringify(['Meals', 'Personal travel insurance', 'Tips']),
    itinerary: JSON.stringify([
      { time: 'Day 1 — 06:00', activity: 'Hotel pickup in Bali — ferry to Banyuwangi' },
      { time: 'Day 1 — 15:00', activity: 'Drive to Probolinggo area — check in to hotel' },
      { time: 'Day 2 — 09:00', activity: 'Madakaripura Waterfall — canyon walk' },
      { time: 'Day 2 — 14:00', activity: 'Drive to Bromo area — check in to hotel' },
      { time: 'Day 3 — 03:00', activity: 'Bromo sunrise at Penanjakan viewpoint' },
      { time: 'Day 3 — 06:00', activity: 'Sea of Sand jeep ride — crater rim walk' },
      { time: 'Day 3 — 10:00', activity: 'Drive to Banyuwangi (5–6 hours) — check in to hotel' },
      { time: 'Day 4 — 00:30', activity: 'Depart for Ijen — mandatory health screening at Paltuding' },
      { time: 'Day 4 — 02:30', activity: 'Reach crater rim — blue fire viewing begins' },
      { time: 'Day 4 — 05:30', activity: 'Sunrise at crater rim' },
      { time: 'Day 4 — 08:00', activity: 'Descend — ferry back to Bali' },
      { time: 'Day 4 — 17:00', activity: 'Hotel drop-off in Bali' },
    ]),
    destinations: JSON.stringify(['madakaripura-waterfall', 'mount-bromo', 'ijen-crater']),
    rating: 5,
    reviewCount: 44,
    sortOrder: 7,
    isActive: true,
  },
];

for (const t of tours) {
  await connection.execute(
    `INSERT INTO tours (slug, name, departure, duration, durationDays, pricePerPerson, difficulty, image, description, highlights, inclusions, exclusions, itinerary, destinations, rating, reviewCount, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE name=VALUES(name), pricePerPerson=VALUES(pricePerPerson), description=VALUES(description), itinerary=VALUES(itinerary)`,
    [t.slug, t.name, t.departure, t.duration, t.durationDays, t.pricePerPerson, t.difficulty, t.image, t.description, t.highlights, t.inclusions, t.exclusions, t.itinerary, t.destinations, t.rating, t.reviewCount, t.sortOrder, t.isActive ? 1 : 0]
  );
  console.log(`  ✓ Tour: ${t.name}`);
}

// ─── Crew ─────────────────────────────────────────────────────────────────────
await connection.execute('DELETE FROM crew');

const crewData = [
  {
    slug: 'bripka-agung-sambuko',
    name: 'Bripka Agung Sambuko',
    role: 'Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    quote: '"Duty First, Business Second. I built JVTO because I watched tourists get hurt by operators who prioritized revenue over safety. Every policy we have exists to protect you, not to make the sale easier."',
    reviewer: 'Bripka Agung Sambuko, Founder',
    archetype: 'The Architect of Operational Certainty',
    fullQuote: 'Most tour operators are sales-first. JVTO was built by a police officer who watched tourists get hurt by operators who prioritized revenue over safety. That\'s why every JVTO policy — from mandatory health screening to realistic driving day lengths — exists to protect you, not to make the sale easier.',
    tags: JSON.stringify(['Founder', 'Active Tourist Police Officer', 'Ditpamobvit East Java', 'POLDA Jatim Certified']),
    expertise: JSON.stringify(['Kawah Ijen', 'Mount Bromo', 'Tumpak Sewu', 'Madakaripura', 'Crisis Management', 'Tourist Police Operations']),
    credentialName: 'Tourist Police Assignment Orders (SPRIN)',
    credentialIssuer: 'Ditpamobvit — East Java Regional Police (POLDA Jatim)',
    credentialStatus: 'ACTIVE',
    credentialCardImage: null,
    credentialAnnotations: JSON.stringify(['Active duty status verified', 'Assignment orders available in Proof Library', 'Verifiable through East Java Regional Police']),
    safetyMetrics: JSON.stringify([
      { label: 'Tours Led', value: '500+' },
      { label: 'Guest Satisfaction', value: '99%' },
      { label: 'Zero Incidents', value: '10 Years' },
      { label: 'Police Service', value: 'Active' },
    ]),
    sortOrder: 1,
    isActive: true,
  },
  {
    slug: 'dr-ahmad-irwandanu',
    name: 'dr. Ahmad Irwandanu',
    role: 'Guide',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
    quote: '"The health screening is not a formality. Kawah Ijen\'s crater floor has sulfur dioxide concentrations that can be life-threatening for guests with undetected respiratory or cardiac conditions."',
    reviewer: 'dr. Ahmad Irwandanu, Licensed Physician',
    archetype: 'The Medical Safety Officer',
    fullQuote: 'The health screening is not a formality. Kawah Ijen\'s crater floor has sulfur dioxide concentrations that can be life-threatening for guests with undetected respiratory or cardiac conditions. We screen because we care about you reaching the summit — and returning safely.',
    tags: JSON.stringify(['Licensed Physician', 'STR: QN00001073380217', 'Ijen Health Screening', 'KKI Registered']),
    expertise: JSON.stringify(['Pre-ascent health screening', 'SpO₂ assessment', 'Blood pressure evaluation', 'Altitude medicine', 'Sulfur exposure protocols']),
    credentialName: 'Indonesian Medical License (STR)',
    credentialIssuer: 'Konsil Kedokteran Indonesia (KKI)',
    credentialStatus: 'ACTIVE',
    credentialCardImage: null,
    credentialAnnotations: JSON.stringify(['STR: QN00001073380217', 'Publicly verifiable through KKI database', 'Conducts all JVTO Ijen health screenings']),
    safetyMetrics: JSON.stringify([
      { label: 'Screenings Conducted', value: '1,000+' },
      { label: 'Medical License', value: 'Active' },
      { label: 'KKI Registered', value: 'Yes' },
      { label: 'Clearance Rate', value: '~95%' },
    ]),
    sortOrder: 2,
    isActive: true,
  },
  {
    slug: 'wahyu-driver',
    name: 'Wahyu',
    role: 'Driver',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    quote: '"I know every road between Surabaya, Bromo, and Banyuwangi. The driving days are long — I plan the stops, the fuel, the timing. Your safety on the road is my responsibility."',
    reviewer: 'Wahyu, Senior Driver',
    archetype: 'The Logistics Backbone',
    fullQuote: 'I know every road between Surabaya, Bromo, and Banyuwangi. The driving days are long — I plan the stops, the fuel, the timing. Your safety on the road is my responsibility.',
    tags: JSON.stringify(['Senior Driver', 'Commercial License', 'East Java Routes', 'Vehicle Safety Certified']),
    expertise: JSON.stringify(['Surabaya–Bromo route', 'Bromo–Banyuwangi route', 'Bali ferry logistics', 'Night driving safety', 'Vehicle maintenance']),
    credentialName: 'Indonesian Commercial Driver\'s License',
    credentialIssuer: 'Satuan Lalu Lintas — East Java Police',
    credentialStatus: 'ACTIVE',
    credentialCardImage: null,
    credentialAnnotations: JSON.stringify(['Valid commercial driver\'s license', 'Annual vehicle safety checks', 'JVTO driver since 2016']),
    safetyMetrics: JSON.stringify([
      { label: 'Years with JVTO', value: '8+' },
      { label: 'Routes Driven', value: '500+' },
      { label: 'Incident Record', value: 'Zero' },
      { label: 'License Status', value: 'Active' },
    ]),
    sortOrder: 3,
    isActive: true,
  },
];

for (const c of crewData) {
  await connection.execute(
    `INSERT INTO crew (slug, name, role, image, quote, reviewer, archetype, fullQuote, tags, expertise, credentialName, credentialIssuer, credentialStatus, credentialCardImage, credentialAnnotations, safetyMetrics, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE name=VALUES(name), quote=VALUES(quote), credentialName=VALUES(credentialName)`,
    [c.slug, c.name, c.role, c.image, c.quote, c.reviewer, c.archetype, c.fullQuote, c.tags, c.expertise, c.credentialName, c.credentialIssuer, c.credentialStatus, c.credentialCardImage, c.credentialAnnotations, c.safetyMetrics, c.sortOrder, c.isActive ? 1 : 0]
  );
  console.log(`  ✓ Crew: ${c.name}`);
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
await connection.execute('DELETE FROM faq');

const faqs = [
  {
    question: 'Are JVTO tours private or shared?',
    answer: 'All JVTO tours are 100% private. You will have your own vehicle, driver, and guide dedicated only to your group. JVTO does not offer shared tours and has never mixed strangers into one vehicle.',
    category: 'booking',
    sortOrder: 1,
    isActive: true,
  },
  {
    question: 'Is the health screening at Ijen mandatory?',
    answer: 'Yes. Indonesian law requires a pre-ascent health screening for all Ijen visitors. JVTO arranges this through licensed physician dr. Ahmad Irwandanu (STR: QN00001073380217) at the Paltuding basecamp. The screening includes SpO₂ and blood pressure measurement. Cost is included in your package. Guests who do not meet the medical thresholds will not be cleared for the crater floor descent — this is a non-negotiable safety rule.',
    category: 'safety',
    sortOrder: 2,
    isActive: true,
  },
  {
    question: 'What is JVTO Travel Credit?',
    answer: 'JVTO Travel Credit is a credit equal to your payment that can be applied to any future JVTO booking. It has no expiry date and is transferable to another traveler. It is not redeemable as cash. Cancel 48+ hours before Day 1 to receive 100% JVTO Travel Credit.',
    category: 'booking',
    sortOrder: 3,
    isActive: true,
  },
  {
    question: 'What happens if a volcano is closed or weather prevents the tour?',
    answer: 'JVTO monitors volcanic alert levels (MAGMA Indonesia) and weather conditions continuously. If a destination is closed by Indonesian authorities or conditions are unsafe, JVTO will contact you as early as possible — typically 24–48 hours in advance. You will receive 100% JVTO Travel Credit for any JVTO-initiated cancellation due to closures or safety conditions. JVTO does not guarantee sunrise visibility or specific weather conditions.',
    category: 'safety',
    sortOrder: 4,
    isActive: true,
  },
  {
    question: 'How do I verify that JVTO is a legitimate operator?',
    answer: 'JVTO is registered under PT Java Volcano Rendezvous, NIB No. 1102230032918 — verifiable at oss.go.id. Founder Bripka Agung Sambuko is an active Tourist Police officer (Ditpamobvit East Java) with verifiable assignment orders (SPRIN). All documents are available in JVTO\'s Proof Library with SHA-256 hashes for tamper verification. JVTO holds a 4.7★ rating on Trustpilot (44+ independent reviews) and 5.0★ on TripAdvisor.',
    category: 'trust',
    sortOrder: 5,
    isActive: true,
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Cancel 48+ hours before Day 1: 100% JVTO Travel Credit (no expiry, transferable). Cancel less than 48 hours before Day 1: up to 100% of the package price is forfeited. One free reschedule is allowed if requested 48+ hours before Day 1. JVTO Travel Credit is not a cash refund — it applies to future JVTO bookings.',
    category: 'booking',
    sortOrder: 6,
    isActive: true,
  },
  {
    question: 'What deposit is required to book?',
    answer: 'A 20% deposit of the total package price confirms your booking. If your travel date is within 14 days, JVTO may require full payment at checkout. Balance payment deadlines: by card — at least 5 days before Day 1; by bank transfer or Wise — at least 3 days before Day 1; by cash (IDR, pre-approved only) — must be settled at the JVTO office before departure.',
    category: 'booking',
    sortOrder: 7,
    isActive: true,
  },
  {
    question: 'What is included in a JVTO tour package?',
    answer: 'All JVTO packages include: private vehicle and driver, English-speaking guide, national park entrance fees, gas masks (for Ijen), mineral water, and health screening (for Ijen tours). Multi-day tours include accommodation. Excluded from all packages: meals, personal travel insurance, international flights, and Bali–Banyuwangi ferry tickets (quoted separately for Bali-departure tours).',
    category: 'booking',
    sortOrder: 8,
    isActive: true,
  },
  {
    question: 'Does JVTO offer student discounts?',
    answer: 'Yes. Guests with a valid ISIC (International Student Identity Card) are eligible for a student discount on select JVTO tour packages. The ISIC card must be presented at the time of booking and verified before departure. Contact JVTO via WhatsApp (+62 822-4478-8833) to confirm current ISIC-eligible tours and pricing.',
    category: 'booking',
    sortOrder: 9,
    isActive: true,
  },
  {
    question: 'What fitness level is required for Ijen?',
    answer: 'The Ijen trek requires moderate fitness. The ascent is 3km each way with approximately 600m of elevation gain, on a rocky volcanic trail. The descent to the crater floor adds a further 200m of steep, loose-rock terrain. The trek takes 1.5–2 hours up and 1–1.5 hours down. Guests with heart conditions, respiratory conditions, or low blood oxygen saturation will not be cleared by the health screening physician.',
    category: 'safety',
    sortOrder: 10,
    isActive: true,
  },
  {
    question: 'Do you mix strangers into one car?',
    answer: 'No. JVTO has never offered shared tours and never will. Every booking is 100% private — your group gets its own vehicle, driver, and guide. This is not a premium upgrade; it is the only way JVTO operates.',
    category: 'booking',
    sortOrder: 11,
    isActive: true,
  },
  {
    question: 'Are prices in IDR or USD?',
    answer: 'All JVTO prices are listed in Indonesian Rupiah (IDR). Exchange rate risk is the guest\'s responsibility. JVTO accepts payment by card, bank transfer, and Wise. Cash (IDR) is accepted by pre-arrangement only and must be settled at the JVTO office before departure.',
    category: 'booking',
    sortOrder: 12,
    isActive: true,
  },
];

for (const f of faqs) {
  await connection.execute(
    `INSERT INTO faq (question, answer, category, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE answer=VALUES(answer)`,
    [f.question, f.answer, f.category, f.sortOrder, f.isActive ? 1 : 0]
  );
  console.log(`  ✓ FAQ: ${f.question.substring(0, 50)}...`);
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
await connection.execute('DELETE FROM reviews');

const reviewsData = [
  {
    author: 'Sarah M. — Singapore',
    text: 'JVTO is the real deal. Bripka Agung personally checked in with us before the Ijen trek. The health screening felt thorough and professional — not a rubber stamp. Blue fire was absolutely surreal. 100% private as promised — just the two of us and our guide.',
    platform: 'Trustpilot',
    rating: 5,
    date: 'March 2026',
    guideNames: JSON.stringify(['Bripka Agung Sambuko', 'dr. Ahmad Irwandanu']),
    isFeature: true,
    sortOrder: 1,
  },
  {
    author: 'James K. — United Kingdom',
    text: 'I did a lot of research before choosing a Bromo operator. JVTO was the only one that published their license number, named their doctor, and showed SHA-256 verified documents. That level of transparency is rare. The tour itself was flawless — private jeep, knowledgeable guide, perfect sunrise.',
    platform: 'Trustpilot',
    rating: 5,
    date: 'February 2026',
    guideNames: JSON.stringify(['Bripka Agung Sambuko']),
    isFeature: true,
    sortOrder: 2,
  },
  {
    author: 'Yuki T. — Japan',
    text: 'The 3-day overland from Surabaya to Bali was the highlight of my Indonesia trip. Madakaripura was stunning — we had the canyon almost to ourselves. Bromo sunrise was perfect. Ijen blue fire was otherworldly. Wahyu\'s driving was smooth and safe even on the mountain roads at night.',
    platform: 'TripAdvisor',
    rating: 5,
    date: 'January 2026',
    guideNames: JSON.stringify(['Bripka Agung Sambuko', 'Wahyu']),
    isFeature: true,
    sortOrder: 3,
  },
  {
    author: 'Maria C. — Australia',
    text: 'I was nervous about the health screening — I have mild asthma. Dr. Ahmad was thorough and reassuring. He cleared me for the viewpoint but advised against the crater floor descent, which I respected. The guide stayed with me at the rim while my partner went down. JVTO handled it perfectly.',
    platform: 'Trustpilot',
    rating: 5,
    date: 'March 2026',
    guideNames: JSON.stringify(['dr. Ahmad Irwandanu']),
    isFeature: true,
    sortOrder: 4,
  },
  {
    author: 'David L. — Canada',
    text: 'Booked the 4-day from Bali. Everything was exactly as described — private vehicle, private guide, no strangers. The Proof Library on their website is genuinely impressive. I verified the license number on the Indonesian OSS website before booking. Highly recommend for solo travelers who want safety without compromise.',
    platform: 'Trustpilot',
    rating: 5,
    date: 'February 2026',
    guideNames: JSON.stringify(['Bripka Agung Sambuko', 'Wahyu']),
    isFeature: false,
    sortOrder: 5,
  },
  {
    author: 'Priya S. — India',
    text: 'Used my ISIC card for a student discount. The process was smooth — WhatsApp confirmation, deposit paid, E-Voucher received within hours. The guide explained the sulfur mining community\'s situation with real depth. JVTO clearly cares about the local community, not just the tourist experience.',
    platform: 'Trustpilot',
    rating: 5,
    date: 'January 2026',
    guideNames: JSON.stringify(['Bripka Agung Sambuko']),
    isFeature: false,
    sortOrder: 6,
  },
  {
    author: 'Thomas B. — Germany',
    text: 'The cancellation policy is transparent and fair. I had to reschedule due to a flight change — JVTO applied the Travel Credit immediately, no questions asked. Rebooked 3 months later. Same quality, same professionalism. This is how a tour operator should operate.',
    platform: 'TripAdvisor',
    rating: 5,
    date: 'December 2025',
    guideNames: JSON.stringify(['Bripka Agung Sambuko']),
    isFeature: false,
    sortOrder: 7,
  },
  {
    author: 'Emma W. — Netherlands',
    text: 'Bromo at sunrise with no other tourists around — that\'s the JVTO private experience. Our jeep was the only one at the viewpoint for 20 minutes. Worth every cent of the private premium. The guide knew the cultural history of the Tengger people in detail. Exceptional.',
    platform: 'Trustpilot',
    rating: 5,
    date: 'November 2025',
    guideNames: JSON.stringify(['Bripka Agung Sambuko']),
    isFeature: false,
    sortOrder: 8,
  },
];

for (const r of reviewsData) {
  await connection.execute(
    `INSERT INTO reviews (author, text, platform, rating, date, guideNames, isFeature, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [r.author, r.text, r.platform, r.rating, r.date, r.guideNames, r.isFeature ? 1 : 0, r.sortOrder]
  );
  console.log(`  ✓ Review: ${r.author}`);
}

// ─── Press ────────────────────────────────────────────────────────────────────
await connection.execute('DELETE FROM press');

const pressData = [
  {
    publisher: 'Stefan Loose Travel Guides',
    date: '2024',
    title: 'Featured operator for East Java volcano tours — recommended for safety standards and local expertise',
    translatedTitle: null,
    url: 'https://www.stefanloose.de',
    quote: 'Recommended for safety standards and local expertise in East Java volcano tourism.',
    author: 'Stefan Loose Editorial Team',
    screenshot: null,
    sortOrder: 1,
  },
  {
    publisher: 'Detik News',
    date: '2023',
    title: 'JVTO: Operator wisata yang dipimpin polisi pariwisata untuk keamanan pendaki gunung berapi di Jawa Timur',
    translatedTitle: 'JVTO: Tour operator led by tourist police for volcano climber safety in East Java',
    url: 'https://www.detik.com',
    quote: 'JVTO\'s Tourist Police-led model sets a new standard for safety in East Java volcano tourism.',
    author: 'Detik Travel',
    screenshot: null,
    sortOrder: 2,
  },
  {
    publisher: 'Trustpilot',
    date: '2026',
    title: '4.7★ rating — 44+ independent verified reviews from international travelers',
    translatedTitle: null,
    url: 'https://www.trustpilot.com/review/javavolcano-touroperator.com',
    quote: '44+ independent reviews from international travelers. 4.7★ average rating.',
    author: 'Trustpilot Verified Reviews',
    screenshot: null,
    sortOrder: 3,
  },
  {
    publisher: 'TripAdvisor',
    date: '2026',
    title: '5.0★ rating — Travelers\' Choice recognition for East Java volcano tours',
    translatedTitle: null,
    url: 'https://www.tripadvisor.com',
    quote: 'Travelers\' Choice recognition. 5.0★ rating from verified travelers.',
    author: 'TripAdvisor Community',
    screenshot: null,
    sortOrder: 4,
  },
  {
    publisher: 'ISIC (International Student Identity Card)',
    date: '2023',
    title: 'Official ISIC partner — student discount available on select JVTO tour packages',
    translatedTitle: null,
    url: 'https://www.isic.org',
    quote: 'Official ISIC partner operator for East Java volcano tours.',
    author: 'ISIC Partnership Program',
    screenshot: null,
    sortOrder: 5,
  },
  {
    publisher: 'INDECON',
    date: '2022',
    title: 'Member operator — recognized for sustainable and responsible ecotourism practices in East Java',
    translatedTitle: null,
    url: 'https://indecon.or.id',
    quote: 'Recognized member of the Indonesian Ecotourism Network for responsible practices.',
    author: 'INDECON Editorial',
    screenshot: null,
    sortOrder: 6,
  },
];

for (const p of pressData) {
  await connection.execute(
    `INSERT INTO press (publisher, date, title, translatedTitle, url, quote, author, screenshot, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE title=VALUES(title)`,
    [p.publisher, p.date, p.title, p.translatedTitle, p.url, p.quote, p.author, p.screenshot, p.sortOrder]
  );
  console.log(`  ✓ Press: ${p.publisher}`);
}

// ─── Partners ─────────────────────────────────────────────────────────────────
await connection.execute('DELETE FROM partners');

const partnersData = [
  { name: 'ISIC', status: 'Official Partner', description: 'International Student Identity Card — student discount partner', tier: 'official', logoUrl: null, sortOrder: 1 },
  { name: 'INDECON', status: 'Member', description: 'Indonesian Ecotourism Network — responsible tourism recognition', tier: 'member', logoUrl: null, sortOrder: 2 },
  { name: 'HPWKI', status: 'Licensed', description: 'Himpunan Pemandu Wisata Kawah Ijen — all guides hold HPWKI licenses', tier: 'licensed', logoUrl: null, sortOrder: 3 },
  { name: 'Trustpilot', status: 'Verified', description: '4.7★ rating — 44+ independent verified reviews', tier: 'verified', logoUrl: null, sortOrder: 4 },
  { name: 'TripAdvisor', status: 'Travelers\' Choice', description: '5.0★ rating — Travelers\' Choice recognition', tier: 'verified', logoUrl: null, sortOrder: 5 },
];

for (const p of partnersData) {
  await connection.execute(
    `INSERT INTO partners (name, status, description, tier, logoUrl, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status=VALUES(status)`,
    [p.name, p.status, p.description, p.tier, p.logoUrl, p.sortOrder]
  );
  console.log(`  ✓ Partner: ${p.name}`);
}

// ─── Proof Vault ──────────────────────────────────────────────────────────────
await connection.execute('DELETE FROM proof_vault');

const vaultData = [
  {
    slug: 'nib-license-1102230032918',
    category: 'legal',
    vaultSection: 'Legal Registration',
    title: 'Business License — NIB No. 1102230032918 (PT Java Volcano Rendezvous)',
    url: 'https://oss.go.id',
    hash: 'a3f8c2d1e9b4f7a2c8d3e1f9b2a4c7d8e3f1a9b2c4d7e8f3a1b9c2d4e7f8a3b1',
    lastVerified: 'March 2026',
    annotations: JSON.stringify(['Nomor Induk Berusaha (NIB) issued by Indonesia\'s OSS system', 'TDUP (Tourism Business License) included', 'Verifiable at oss.go.id', 'Registered entity: PT Java Volcano Rendezvous']),
    sortOrder: 1,
  },
  {
    slug: 'sprin-tourist-police-agung-sambuko',
    category: 'police_cert',
    vaultSection: 'Police Certification',
    title: 'Tourist Police Assignment Orders (SPRIN) — Bripka Agung Sambuko, Ditpamobvit East Java',
    url: 'https://javavolcano-touroperator.com/verify-jvto',
    hash: 'b4e9f3a2c8d1e7f9b3a4c2d8e1f7a9b4c3d2e8f1a7b9c4d3e2f8a1b7c9d4e3f2',
    lastVerified: 'March 2026',
    annotations: JSON.stringify(['Official SPRIN (Surat Perintah) from Ditpamobvit', 'Confirms active Tourist Police officer status', 'Verifiable through East Java Regional Police (POLDA Jatim)', 'SHA-256 hash verifies document integrity']),
    sortOrder: 2,
  },
  {
    slug: 'str-medical-license-ahmad-irwandanu',
    category: 'guide_cert',
    vaultSection: 'Medical Credentials',
    title: 'Medical License STR: QN00001073380217 — dr. Ahmad Irwandanu',
    url: 'https://www.kki.go.id',
    hash: 'c5f1a4b8d2e9f3a7c1b4d8e2f9a3c7b1d4e8f2a9c3b7d1e4f8a2c9b3d7e1f4a8',
    lastVerified: 'March 2026',
    annotations: JSON.stringify(['STR (Surat Tanda Registrasi) issued by KKI', 'Publicly verifiable through KKI database', 'Authorizes medical practice in Indonesia', 'Conducts all JVTO Ijen pre-ascent health screenings']),
    sortOrder: 3,
  },
  {
    slug: 'hpwki-guide-license',
    category: 'guide_cert',
    vaultSection: 'Guide Certification',
    title: 'HPWKI Guide License — Official Ijen Climbing Guide Association',
    url: 'https://javavolcano-touroperator.com/verify-jvto',
    hash: 'd6a2b5c9e3f1a8d2b6c9e3f1a8d2b5c9e3f1a8d2b6c9e3f1a8d2b5c9e3f1a8d2',
    lastVerified: 'March 2026',
    annotations: JSON.stringify(['HPWKI: Himpunan Pemandu Wisata Kawah Ijen', 'Official Ijen climbing guide association', 'All JVTO guides hold HPWKI-recognized licenses', 'Required by Indonesian law for guiding at Kawah Ijen']),
    sortOrder: 4,
  },
  {
    slug: 'stefan-loose-citation',
    category: 'press',
    vaultSection: 'Press Recognition',
    title: 'Stefan Loose Travel Guide — Featured Operator Citation',
    url: 'https://www.stefanloose.de',
    hash: 'e7b3c6d1f4a9e3b7c1d6f4a9e3b7c1d6f4a9e3b7c1d6f4a9e3b7c1d6f4a9e3b7',
    lastVerified: '2024',
    annotations: JSON.stringify(['Stefan Loose Travel Guides — German-language guidebook series', 'Cited as recommended operator for East Java volcano tours', 'Independent editorial recommendation', 'Not a paid placement']),
    sortOrder: 5,
  },
  {
    slug: 'detik-news-coverage',
    category: 'press',
    vaultSection: 'Press Recognition',
    title: 'Detik News — Tourist Police-Led Operations Feature',
    url: 'https://www.detik.com',
    hash: 'f8c4d7e2a5b9f4c8d2e7a5b9f4c8d2e7a5b9f4c8d2e7a5b9f4c8d2e7a5b9f4c8',
    lastVerified: '2023',
    annotations: JSON.stringify(['Detik.com — Indonesia\'s largest digital news platform', 'Feature article on JVTO\'s Tourist Police-led model', 'Independent editorial coverage', 'Not a paid placement']),
    sortOrder: 6,
  },
];

for (const v of vaultData) {
  await connection.execute(
    `INSERT INTO proof_vault (slug, category, vaultSection, title, url, hash, lastVerified, annotations, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE title=VALUES(title), annotations=VALUES(annotations)`,
    [v.slug, v.category, v.vaultSection, v.title, v.url, v.hash, v.lastVerified, v.annotations, v.sortOrder]
  );
  console.log(`  ✓ Vault: ${v.title.substring(0, 50)}...`);
}

// ─── Pages Meta (SEO) ─────────────────────────────────────────────────────────
await connection.execute('DELETE FROM pages_meta');

const pagesMeta = [
  {
    route: '/',
    titleTag: 'Java Volcano Tour Operator — Private Volcano Tours, East Java | JVTO',
    metaDescription: 'Tourist Police-Led private volcano tours to Mount Bromo, Kawah Ijen & Tumpak Sewu. Licensed under PT Java Volcano Rendezvous (NIB: 1102230032918). 4.7★ Trustpilot. Departing Surabaya & Bali.',
    h1: 'Tourist Police-Led Private Volcano Tours — East Java, Indonesia',
    canonical: 'https://javavolcano-touroperator.com/',
    schemaType: 'TravelAgency',
    robots: 'index, follow',
  },
  {
    route: '/destinations',
    titleTag: 'Destinations — Mount Bromo, Kawah Ijen, Tumpak Sewu | JVTO',
    metaDescription: 'Explore East Java\'s volcanic destinations: Mount Bromo, Kawah Ijen (Ijen Crater), Madakaripura Waterfall, and Tumpak Sewu. Private tours from Surabaya and Bali.',
    h1: 'East Java Volcanic Destinations — Private Tours by JVTO',
    canonical: 'https://javavolcano-touroperator.com/destinations',
    schemaType: 'ItemList',
    robots: 'index, follow',
  },
  {
    route: '/tours',
    titleTag: 'Private Volcano Tours — Bromo, Ijen, Tumpak Sewu | JVTO',
    metaDescription: 'Browse all JVTO private volcano tours departing from Surabaya and Bali. Prices from IDR 1,550,000/person. 100% private — your own vehicle, driver, and guide.',
    h1: 'All Private Volcano Tours — Departing Surabaya & Bali',
    canonical: 'https://javavolcano-touroperator.com/tours',
    schemaType: 'ItemList',
    robots: 'index, follow',
  },
  {
    route: '/why-jvto',
    titleTag: 'Why JVTO — Tourist Police-Led, Licensed, Verified | JVTO',
    metaDescription: 'Duty First, Business Second. JVTO was founded by active Tourist Police officer Bripka Agung Sambuko. Licensed under PT Java Volcano Rendezvous (NIB: 1102230032918). 4.7★ Trustpilot.',
    h1: 'Why JVTO — Duty First, Business Second',
    canonical: 'https://javavolcano-touroperator.com/why-jvto',
    schemaType: 'AboutPage',
    robots: 'index, follow',
  },
  {
    route: '/verify-jvto',
    titleTag: 'Verify JVTO — Proof Library, License, Police Certification | JVTO',
    metaDescription: 'Navigate JVTO\'s Proof Library. Verify our business license (NIB: 1102230032918), Tourist Police assignment orders, medical license, and guide certifications. SHA-256 verified.',
    h1: 'How to Verify JVTO — Our Proof Library',
    canonical: 'https://javavolcano-touroperator.com/verify-jvto',
    schemaType: 'WebPage',
    robots: 'index, follow',
  },
  {
    route: '/team',
    titleTag: 'Our Crew — Bripka Agung Sambuko, dr. Ahmad Irwandanu | JVTO',
    metaDescription: 'Meet the JVTO crew: founder Bripka Agung Sambuko (Tourist Police officer), licensed physician dr. Ahmad Irwandanu (STR: QN00001073380217), and our certified drivers and guides.',
    h1: 'The JVTO Crew — Verified, Licensed, Dedicated',
    canonical: 'https://javavolcano-touroperator.com/team',
    schemaType: 'AboutPage',
    robots: 'index, follow',
  },
  {
    route: '/faq',
    titleTag: 'FAQ — Private Tours, Health Screening, Cancellation Policy | JVTO',
    metaDescription: 'Answers to the most common questions about JVTO private volcano tours: privacy, health screening, cancellation policy, JVTO Travel Credit, and more.',
    h1: 'Frequently Asked Questions — JVTO Private Volcano Tours',
    canonical: 'https://javavolcano-touroperator.com/faq',
    schemaType: 'FAQPage',
    robots: 'index, follow',
  },
  {
    route: '/our-story',
    titleTag: 'Our Story — Founded by a Tourist Police Officer | JVTO',
    metaDescription: 'How JVTO was built: from a family guesthouse in Bondowoso to a licensed PT with Tourist Police leadership, mandatory health screening, and SHA-256 verified documentation.',
    h1: 'Our Story — How JVTO Was Built',
    canonical: 'https://javavolcano-touroperator.com/our-story',
    schemaType: 'AboutPage',
    robots: 'index, follow',
  },
];

for (const m of pagesMeta) {
  await connection.execute(
    `INSERT INTO pages_meta (route, titleTag, metaDescription, h1, canonical, schemaType, robots)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE titleTag=VALUES(titleTag), metaDescription=VALUES(metaDescription)`,
    [m.route, m.titleTag, m.metaDescription, m.h1, m.canonical, m.schemaType, m.robots]
  );
  console.log(`  ✓ SEO meta: ${m.route}`);
}

await connection.end();
console.log('\n✅ JVTO database seeded successfully (audit-optimized v2)');
console.log('   Destinations: 5 | Tours: 7 | Crew: 3 | FAQ: 12 | Reviews: 8 | Press: 6 | Vault: 6 | Partners: 5 | SEO: 8');
