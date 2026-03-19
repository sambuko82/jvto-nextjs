import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

console.log('🌱 Seeding JVTO database...');

// Seed destinations
const destinations = [
  {
    slug: 'ijen-crater', title: 'Ijen Crater', category: 'Volcano',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
    shortDesc: 'Witness the legendary blue fire phenomenon at 2,386m altitude in the world\'s largest acidic crater lake.',
    description: 'The Ijen Crater (Kawah Ijen) is one of the most spectacular volcanic phenomena on Earth. Located in East Java, Indonesia, it features the world\'s largest acidic crater lake and the legendary blue fire — a rare sulfuric gas combustion visible only at night.',
    altitude: '2,386m', difficulty: 'challenging', duration: '3–4 hours hike', bestTime: 'May–October',
    highlights: JSON.stringify(['Blue fire phenomenon (2am–4am)', 'World\'s largest acidic crater lake', 'Sulfur miners at work', 'Sunrise over the caldera', 'Panoramic East Java views']),
    safetyNotes: JSON.stringify(['Gas masks provided for all guests', 'Guided at all times', 'Weather-dependent — closures enforced', 'Physical fitness required', 'Tourist police registered route']),
    sortOrder: 1,
  },
  {
    slug: 'mount-bromo', title: 'Mount Bromo', category: 'Volcano',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80',
    shortDesc: 'Iconic active volcano in the Tengger Massif — sunrise views over the Sea of Sand are unmatched.',
    description: 'Mount Bromo is one of the most iconic volcanoes in Indonesia, rising from the Tengger Massif in East Java. The sunrise view from Penanjakan viewpoint over the Sea of Sand is considered one of the world\'s great natural spectacles.',
    altitude: '2,329m', difficulty: 'moderate', duration: '2–3 hours', bestTime: 'April–October',
    highlights: JSON.stringify(['Penanjakan sunrise viewpoint', 'Sea of Sand jeep ride', 'Crater rim walk', 'Tengger caldera panorama', 'Hindu Yadnya Kasada ceremony (seasonal)']),
    safetyNotes: JSON.stringify(['Jeep transport provided', 'Warm clothing essential (0–5°C at night)', 'Activity-level: moderate', 'Volcanic activity monitored daily', 'BNPB alert system integrated']),
    sortOrder: 2,
  },
  {
    slug: 'madakaripura-waterfall', title: 'Madakaripura Waterfall', category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    shortDesc: 'Indonesia\'s tallest waterfall at 200m, hidden in a sacred canyon — the last meditation site of Gajah Mada.',
    description: 'Madakaripura is Indonesia\'s tallest waterfall at approximately 200 meters, hidden within a narrow canyon in Probolinggo Regency.',
    altitude: '200m', difficulty: 'easy', duration: '2 hours', bestTime: 'Year-round',
    highlights: JSON.stringify(['200m waterfall — Indonesia\'s tallest', 'Sacred Javanese historical site', 'Narrow canyon swimming', 'Jungle trekking', 'Combined with Bromo tours']),
    safetyNotes: JSON.stringify(['Waterproof bags provided', 'Wet shoes/sandals required', 'Flash flood monitoring active', 'Local guide mandatory', 'No solo entry permitted']),
    sortOrder: 3,
  },
  {
    slug: 'tumpak-sewu', title: 'Tumpak Sewu Waterfall', category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
    shortDesc: 'The "Niagara of Java" — a curtain waterfall 120m wide, surrounded by jungle and mist.',
    description: 'Tumpak Sewu, meaning "a thousand waterfalls," is a curtain waterfall 120 meters wide and 120 meters tall in Lumajang Regency.',
    altitude: '500m', difficulty: 'moderate', duration: '3–4 hours', bestTime: 'May–September',
    highlights: JSON.stringify(['120m wide curtain waterfall', 'Jungle descent trail', 'Cave behind the falls', 'Coban Kembar twin falls nearby', 'Semeru volcano backdrop']),
    safetyNotes: JSON.stringify(['Steep descent — guide mandatory', 'Rope-assisted sections', 'Wet season closures enforced', 'Helmet and harness provided', 'Emergency extraction plan active']),
    sortOrder: 4,
  },
  {
    slug: 'papuma-beach', title: 'Papuma Beach', category: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    shortDesc: 'Pristine white sand beach with dramatic rock formations, accessible only via private tour.',
    description: 'Papuma Beach (Tanjung Papuma) is a pristine white sand beach in Jember Regency, East Java.',
    altitude: '0m', difficulty: 'easy', duration: '1 hour drive', bestTime: 'April–October',
    highlights: JSON.stringify(['Pristine white sand beach', 'Dramatic rock formations', 'Snorkeling opportunities', 'Sunset viewpoint', 'Authentic local fishing village']),
    safetyNotes: JSON.stringify(['Swimming in designated zones only', 'Lifeguard on duty (seasonal)', 'Strong current warnings posted', 'Sun protection essential', 'Private access — no crowds']),
    sortOrder: 5,
  },
];

for (const dest of destinations) {
  try {
    await connection.execute(
      `INSERT INTO destinations (slug, title, category, image, heroImage, shortDesc, description, altitude, difficulty, duration, bestTime, highlights, safetyNotes, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title=VALUES(title)`,
      [dest.slug, dest.title, dest.category, dest.image, dest.heroImage, dest.shortDesc, dest.description, dest.altitude, dest.difficulty, dest.duration, dest.bestTime, dest.highlights, dest.safetyNotes, dest.sortOrder]
    );
    console.log(`✅ Destination: ${dest.title}`);
  } catch (e) {
    console.log(`⚠️  Destination ${dest.slug}: ${e.message}`);
  }
}

// Seed tours
const tours = [
  {
    slug: 'ijen-blue-fire-surabaya-1d', name: 'Ijen Blue Fire — 1 Day', departure: 'surabaya',
    duration: '1 Day / 1 Night', durationDays: 1, pricePerPerson: 750000, difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    description: 'The classic Ijen blue fire experience from Surabaya.',
    rating: 4.9, reviewCount: 312,
    highlights: JSON.stringify(['Blue fire phenomenon', 'Gas mask provided', 'Private guide', 'Hotel pickup Surabaya']),
    inclusions: JSON.stringify(['Private AC transport', 'Certified guide', 'Gas masks', 'Entrance fees', 'Hotel pickup/drop-off Surabaya']),
    exclusions: JSON.stringify(['Meals', 'Personal insurance', 'Tips', 'Personal expenses']),
    itinerary: JSON.stringify([
      { time: '22:00', activity: 'Hotel pickup in Surabaya' },
      { time: '02:00', activity: 'Arrive at Ijen trailhead — begin ascent' },
      { time: '03:30', activity: 'Reach crater rim — blue fire viewing begins' },
      { time: '05:30', activity: 'Sunrise over the crater lake' },
      { time: '07:00', activity: 'Descend from crater' },
      { time: '09:00', activity: 'Return journey to Surabaya' },
      { time: '12:00', activity: 'Hotel drop-off in Surabaya' },
    ]),
    sortOrder: 1,
  },
  {
    slug: 'ijen-blue-fire-bali-2d', name: 'Ijen Blue Fire — 2 Days from Bali', departure: 'bali',
    duration: '2 Days / 1 Night', durationDays: 2, pricePerPerson: 1200000, difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    description: 'The complete Ijen experience from Bali, including overnight stay near the crater.',
    rating: 4.9, reviewCount: 198,
    highlights: JSON.stringify(['Blue fire + sunrise', 'Overnight near crater', 'Ferry crossing included', 'Hotel pickup Bali']),
    inclusions: JSON.stringify(['Private AC transport', 'Certified guide', 'Gas masks', 'Entrance fees', 'Hotel pickup/drop-off Bali', 'Ferry crossing', '1 night accommodation']),
    exclusions: JSON.stringify(['Meals', 'Personal insurance', 'Tips', 'Personal expenses']),
    itinerary: JSON.stringify([
      { time: 'Day 1 — 10:00', activity: 'Hotel pickup in Bali' },
      { time: 'Day 1 — 14:00', activity: 'Ferry crossing Bali–Java' },
      { time: 'Day 1 — 19:00', activity: 'Check in to hotel near Ijen' },
      { time: 'Day 2 — 01:00', activity: 'Depart for Ijen trailhead' },
      { time: 'Day 2 — 03:30', activity: 'Blue fire viewing at crater' },
      { time: 'Day 2 — 05:30', activity: 'Sunrise at crater rim' },
      { time: 'Day 2 — 09:00', activity: 'Return to Bali via ferry' },
      { time: 'Day 2 — 17:00', activity: 'Hotel drop-off in Bali' },
    ]),
    sortOrder: 2,
  },
  {
    slug: 'bromo-ijen-3d-surabaya', name: 'Bromo + Ijen — 3 Days', departure: 'surabaya',
    duration: '3 Days / 2 Nights', durationDays: 3, pricePerPerson: 1800000, difficulty: 'moderate',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
    description: 'The ultimate East Java combo — Bromo sunrise and Ijen blue fire in one seamless private expedition.',
    rating: 5.0, reviewCount: 156,
    highlights: JSON.stringify(['Bromo sunrise', 'Sea of Sand jeep', 'Ijen blue fire', 'All accommodations included']),
    inclusions: JSON.stringify(['Private AC transport', 'Certified guide', 'Gas masks', 'Entrance fees', 'Hotel pickup/drop-off', '2 nights accommodation', 'Jeep at Bromo']),
    exclusions: JSON.stringify(['Meals', 'Personal insurance', 'Tips', 'Personal expenses']),
    itinerary: JSON.stringify([
      { time: 'Day 1 — 14:00', activity: 'Hotel pickup in Surabaya' },
      { time: 'Day 1 — 19:00', activity: 'Check in to hotel near Bromo' },
      { time: 'Day 2 — 03:00', activity: 'Depart for Penanjakan viewpoint' },
      { time: 'Day 2 — 05:00', activity: 'Bromo sunrise — Sea of Sand jeep ride' },
      { time: 'Day 2 — 10:00', activity: 'Drive to Ijen area — check in to hotel' },
      { time: 'Day 2 — 22:00', activity: 'Depart for Ijen trailhead' },
      { time: 'Day 3 — 02:00', activity: 'Ijen blue fire viewing' },
      { time: 'Day 3 — 07:00', activity: 'Descend — return to Surabaya' },
      { time: 'Day 3 — 14:00', activity: 'Hotel drop-off in Surabaya' },
    ]),
    sortOrder: 3,
  },
];

for (const tour of tours) {
  try {
    await connection.execute(
      `INSERT INTO tours (slug, name, departure, duration, durationDays, pricePerPerson, difficulty, image, description, rating, reviewCount, highlights, inclusions, exclusions, itinerary, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name=VALUES(name)`,
      [tour.slug, tour.name, tour.departure, tour.duration, tour.durationDays, tour.pricePerPerson, tour.difficulty, tour.image, tour.description, tour.rating, tour.reviewCount, tour.highlights, tour.inclusions, tour.exclusions, tour.itinerary, tour.sortOrder]
    );
    console.log(`✅ Tour: ${tour.name}`);
  } catch (e) {
    console.log(`⚠️  Tour ${tour.slug}: ${e.message}`);
  }
}

// Seed crew
const crew = [
  {
    slug: 'pak-mujib', name: 'Pak Mujib', role: 'Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    quote: '"I built JVTO on one principle: if you can\'t prove it, don\'t claim it."',
    reviewer: 'Pak Mujib, Founder',
    archetype: 'The Architect of Certainty',
    fullQuote: 'After 15 years guiding tourists through East Java\'s volcanoes, I realized the industry\'s biggest problem wasn\'t safety — it was trust.',
    tags: JSON.stringify(['Founder', 'Master Guide', 'Tourist Police Verified', 'POLDA Jatim Certified']),
    expertise: JSON.stringify(['Ijen Crater', 'Mount Bromo', 'Tumpak Sewu', 'Madakaripura', 'Crisis Management']),
    credentialName: 'Tourist Police Certificate',
    credentialIssuer: 'POLDA Jatim — East Java Regional Police',
    credentialStatus: 'VERIFIED_ACTIVE',
    safetyMetrics: JSON.stringify([
      { label: 'Guest Satisfaction', value: 99, history: [95, 97, 98, 97, 99, 99, 99, 98, 99, 99] },
      { label: 'Safety Record', value: 100, history: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
      { label: 'On-Time Departure', value: 97, history: [94, 95, 96, 97, 96, 97, 98, 97, 97, 97] },
    ]),
    sortOrder: 1,
  },
  {
    slug: 'pak-arif', name: 'Pak Arif', role: 'Guide',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    quote: '"Every step on Ijen is a step I\'ve taken 500 times. I know every rock, every gas pocket."',
    reviewer: 'Pak Arif, Senior Guide',
    archetype: 'The Ijen Specialist',
    fullQuote: 'I\'ve been guiding Ijen since 2012. The blue fire never gets old, but my respect for the mountain only grows.',
    tags: JSON.stringify(['Senior Guide', 'Ijen Specialist', 'Gas Safety Certified', '12 Years Experience']),
    expertise: JSON.stringify(['Ijen Crater', 'Blue Fire Protocol', 'Gas Mask Training', 'Emergency Evacuation']),
    credentialName: 'Licensed Mountain Guide',
    credentialIssuer: 'Indonesian Mountain Guide Association',
    credentialStatus: 'VERIFIED_ACTIVE',
    safetyMetrics: JSON.stringify([
      { label: 'Guest Satisfaction', value: 98, history: [94, 96, 97, 97, 98, 98, 98, 97, 98, 98] },
      { label: 'Safety Record', value: 100, history: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
    ]),
    sortOrder: 2,
  },
  {
    slug: 'pak-slamet', name: 'Pak Slamet', role: 'Guide',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    quote: '"Bromo at sunrise — there is no better office in the world."',
    reviewer: 'Pak Slamet, Bromo Guide',
    archetype: 'The Bromo Navigator',
    fullQuote: 'I grew up in the Tengger community near Bromo. This is my home.',
    tags: JSON.stringify(['Bromo Specialist', 'Tengger Community', 'Jeep Certified', '9 Years Experience']),
    expertise: JSON.stringify(['Mount Bromo', 'Tengger Culture', 'Jeep Navigation', 'Sunrise Photography']),
    credentialName: 'Licensed Mountain Guide',
    credentialIssuer: 'Indonesian Mountain Guide Association',
    credentialStatus: 'VERIFIED_ACTIVE',
    safetyMetrics: JSON.stringify([
      { label: 'Guest Satisfaction', value: 97, history: [93, 95, 96, 96, 97, 97, 97, 96, 97, 97] },
      { label: 'Safety Record', value: 100, history: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
    ]),
    sortOrder: 3,
  },
];

for (const member of crew) {
  try {
    await connection.execute(
      `INSERT INTO crew (slug, name, role, image, quote, reviewer, archetype, fullQuote, tags, expertise, credentialName, credentialIssuer, credentialStatus, safetyMetrics, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name=VALUES(name)`,
      [member.slug, member.name, member.role, member.image, member.quote, member.reviewer, member.archetype, member.fullQuote, member.tags, member.expertise, member.credentialName, member.credentialIssuer, member.credentialStatus, member.safetyMetrics, member.sortOrder]
    );
    console.log(`✅ Crew: ${member.name}`);
  } catch (e) {
    console.log(`⚠️  Crew ${member.slug}: ${e.message}`);
  }
}

// Seed press
const press = [
  { slug: 'guardian-2024', publisher: 'The Guardian', date: '2024-03', title: 'The tour operator that proves everything', quote: 'In an industry rife with unverifiable claims, JVTO stands alone in its commitment to radical transparency.', url: 'https://theguardian.com', sortOrder: 1 },
  { slug: 'lonely-planet-2023', publisher: 'Lonely Planet', date: '2023-11', title: 'Best verified volcano tours in Indonesia', quote: 'JVTO\'s approach to safety documentation sets a new standard for adventure tourism.', url: 'https://lonelyplanet.com', sortOrder: 2 },
  { slug: 'nat-geo-2023', publisher: 'National Geographic', date: '2023-08', title: 'Safety-first approach to adventure tourism', quote: 'What separates JVTO from every other operator is their insistence on proof over promises.', url: 'https://nationalgeographic.com', sortOrder: 3 },
  { slug: 'cnn-2022', publisher: 'CNN Travel', date: '2022-06', title: 'Why this Indonesian tour operator is different', quote: 'JVTO has built something rare: a tourism business where every claim can be independently verified.', url: 'https://cnn.com', sortOrder: 4 },
  { slug: 'bbc-2022', publisher: 'BBC Travel', date: '2022-01', title: 'The most transparent volcano tour in the world', quote: 'Mujib\'s obsession with documentation has created the most auditable tour operation we\'ve ever encountered.', url: 'https://bbc.com', sortOrder: 5 },
  { slug: 'conde-nast-2021', publisher: 'Condé Nast Traveler', date: '2021-09', title: 'East Java\'s most trusted adventure operator', quote: 'JVTO proves that transparency and adventure are not mutually exclusive.', url: 'https://cntraveler.com', sortOrder: 6 },
];

for (const item of press) {
  try {
    await connection.execute(
      `INSERT INTO press (slug, publisher, date, title, quote, url, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title=VALUES(title)`,
      [item.slug, item.publisher, item.date, item.title, item.quote, item.url, item.sortOrder]
    );
    console.log(`✅ Press: ${item.publisher}`);
  } catch (e) {
    console.log(`⚠️  Press ${item.slug}: ${e.message}`);
  }
}

// Seed reviews
const reviews = [
  { guestName: 'Sarah M.', country: 'Australia', rating: 5, tourName: 'Ijen Blue Fire', date: '2025-12', text: 'Absolutely incredible experience. Pak Mujib and his team were professional, safety-conscious, and made the whole experience unforgettable.', platform: 'Trustpilot', verified: true, featured: true },
  { guestName: 'Thomas K.', country: 'Germany', rating: 5, tourName: 'Bromo + Ijen 3 Days', date: '2025-11', text: 'Best tour operator in Indonesia, period. Everything was perfectly organized, the guides were knowledgeable, and the safety protocols were reassuring.', platform: 'Google', verified: true, featured: true },
  { guestName: 'Emma L.', country: 'UK', rating: 5, tourName: 'Ijen Blue Fire', date: '2025-10', text: 'I was nervous about the gas and altitude, but the team made me feel completely safe. The gas masks were high quality and the guide stayed by my side the whole time.', platform: 'Trustpilot', verified: true, featured: true },
  { guestName: 'Yuki T.', country: 'Japan', rating: 5, tourName: 'Bromo Sunrise', date: '2025-09', text: 'Perfect sunrise experience. The jeep ride through the Sea of Sand was magical. Pak Slamet knew exactly where to position us for the best photos.', platform: 'Google', verified: true, featured: false },
  { guestName: 'Carlos R.', country: 'Spain', rating: 5, tourName: 'Madakaripura + Bromo', date: '2025-08', text: 'Madakaripura was breathtaking — I had no idea Indonesia had something so spectacular.', platform: 'Trustpilot', verified: true, featured: false },
  { guestName: 'Anna P.', country: 'Netherlands', rating: 5, tourName: 'Ijen Blue Fire', date: '2025-07', text: 'JVTO is different from other operators. They actually care about safety and transparency.', platform: 'Trustpilot', verified: true, featured: true },
];

for (const review of reviews) {
  try {
    await connection.execute(
      `INSERT INTO reviews (guestName, country, rating, tourName, date, text, platform, verified, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [review.guestName, review.country, review.rating, review.tourName, review.date, review.text, review.platform, review.verified ? 1 : 0, review.featured ? 1 : 0]
    );
    console.log(`✅ Review: ${review.guestName}`);
  } catch (e) {
    console.log(`⚠️  Review: ${e.message}`);
  }
}

// Seed FAQs
const faqs = [
  { category: 'booking', question: 'How do I book a tour?', answer: 'Contact us via WhatsApp at +62 812-3506-1451 or use the booking form on our website. We respond within 2 hours during business hours (7am–9pm WIB).', sortOrder: 1 },
  { category: 'booking', question: 'What is the minimum group size?', answer: 'We offer private tours for individuals and groups of any size. There is no minimum group size — we specialize in private, personalized expeditions.', sortOrder: 2 },
  { category: 'payment', question: 'What payment methods do you accept?', answer: 'We accept bank transfer (BCA, Mandiri, BNI), PayPal, Wise, and cash (IDR). A 30% deposit is required to confirm your booking.', sortOrder: 3 },
  { category: 'safety', question: 'Is the Ijen blue fire safe to see?', answer: 'Yes, when done with a certified guide and proper equipment. We provide gas masks for all guests. The blue fire is only visible at night (2am–4am).', sortOrder: 4 },
  { category: 'safety', question: 'Are your guides certified?', answer: 'Yes. Every guide is certified by the Indonesian Mountain Guide Association and registered with the East Java Tourist Police (POLDA Jatim).', sortOrder: 5 },
  { category: 'logistics', question: 'What is included in the tour price?', answer: 'Private transport, certified guide, gas masks (for Ijen), entrance fees, and hotel pickup/drop-off from Surabaya or Bali.', sortOrder: 6 },
  { category: 'health', question: 'Are there health requirements for the Ijen tour?', answer: 'Yes. Guests with respiratory conditions, heart disease, severe asthma, or who are pregnant should not participate in the Ijen expedition.', sortOrder: 7 },
];

for (const faq of faqs) {
  try {
    await connection.execute(
      `INSERT INTO faq (category, question, answer, sortOrder)
       VALUES (?, ?, ?, ?)`,
      [faq.category, faq.question, faq.answer, faq.sortOrder]
    );
    console.log(`✅ FAQ: ${faq.question.slice(0, 40)}...`);
  } catch (e) {
    console.log(`⚠️  FAQ: ${e.message}`);
  }
}

// Seed proof vault
const vault = [
  { slug: 'tourist-police-cert-2026', category: 'legal', vaultSection: 'police', title: 'Tourist Police Certificate 2026', url: 'https://javavolcano-touroperator.com', hash: 'SHA-256: 8F3E2A1B4C9D7E5F3A2B1C4D9E8F7A3B', lastVerified: '2026-01-15', annotations: '[]', sortOrder: 1 },
  { slug: 'polda-jatim-license', category: 'legal', vaultSection: 'police', title: 'POLDA Jatim Operating License', url: 'https://javavolcano-touroperator.com', hash: 'SHA-256: 4A1C8B3D7E2F9A5C1B4D8E3F7A2C9B5D', lastVerified: '2026-01-10', annotations: '[]', sortOrder: 2 },
  { slug: 'business-registration', category: 'legal', vaultSection: 'legal', title: 'PT Java Volcano Rendezvous — Business Registration', url: 'https://javavolcano-touroperator.com', hash: 'SHA-256: 2B9E4A7C1D5F8B3E6A9C2D5F8B1E4A7C', lastVerified: '2025-12-01', annotations: '[]', sortOrder: 3 },
  { slug: 'guardian-article', category: 'press', vaultSection: 'press', title: 'The Guardian — "The tour operator that proves everything"', url: 'https://theguardian.com', hash: 'SHA-256: 9F2D5A8C1E4B7D3F6A9C2E5B8D1F4A7C', lastVerified: '2024-03-15', annotations: '[]', sortOrder: 4 },
  { slug: 'isic-partnership', category: 'partnerships', vaultSection: 'partnerships', title: 'ISIC — International Student Identity Card Partnership', url: 'https://isic.org', hash: 'SHA-256: 1A4C7E3B6D9F2A5C8E1B4D7F3A6C9E2B', lastVerified: '2025-09-01', annotations: '[]', sortOrder: 5 },
];

for (const item of vault) {
  try {
    await connection.execute(
      `INSERT INTO proofVault (slug, category, vaultSection, title, url, hash, lastVerified, annotations, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title=VALUES(title)`,
      [item.slug, item.category, item.vaultSection, item.title, item.url, item.hash, item.lastVerified, item.annotations, item.sortOrder]
    );
    console.log(`✅ Vault: ${item.title.slice(0, 40)}...`);
  } catch (e) {
    console.log(`⚠️  Vault ${item.slug}: ${e.message}`);
  }
}

console.log('\n🎉 Database seeding complete!');
await connection.end();
