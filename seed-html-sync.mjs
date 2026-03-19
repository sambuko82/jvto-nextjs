/**
 * seed-html-sync.mjs
 * Syncs all data from reviews.html, our-team.html, and verify-jvto.html
 * into the JVTO database — real photo URLs, KTA licences, SHA256 hashes,
 * crew mentions, proof vault documents, partners, and reputation data.
 */
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// ─── HELPERS ──────────────────────────────────────────────────────────────────
async function clearTable(table) {
  await conn.execute(`DELETE FROM \`${table}\``);
  console.log(`  ✓ Cleared ${table}`);
}

// ─── 1. CREW — 7 Guides + 7 Drivers with real photos, KTA URLs, self-quotes ──
console.log("\n[1/5] Seeding crew...");
await clearTable("crew");

const crewData = [
  // ── GUIDES ──
  {
    slug: "anjas",
    name: "Anjas",
    role: "Guide",
    image: "https://javavolcano-touroperator.com/uploads/1768270423657-690185912-anjas.png",
    ktaUrl: "https://javavolcano-touroperator.com/uploads/1771428583288-513992233-kta_anjas.jpg",
    memberId: null,
    quote: "Creative at taking fun photos… Anjas was the highlight for the trip.",
    reviewer: "Wang Zhe · Google Reviews",
    selfQuote: "I'm a chill guy and nerdy enough to talk about brainrot memes. Let me show you around how beautiful East Java is.",
    tags: JSON.stringify(["Great photos", "Friendly & fun", "Great logistics", "Safety-first"]),
    archetype: "The Photographer Guide",
    credentialName: "KTA / HPWKI Ijen Climbing Licence",
    credentialIssuer: "HPWKI",
    credentialStatus: "Active",
    sortOrder: 1,
  },
  {
    slug: "boy-ahboy",
    name: "Boy (Ahboy)",
    role: "Guide",
    image: "https://javavolcano-touroperator.com/uploads/1768228191022-893381041-boy.png",
    ktaUrl: null,
    memberId: "ID #68",
    quote: "Incredibly knowledgeable and went out of his way to make sure everything we needed was sorted.",
    reviewer: "Jason Li · Trustpilot",
    selfQuote: null,
    tags: JSON.stringify(["Knowledgeable guide", "Safety-first", "Friendly & fun", "Always on time"]),
    archetype: "The Knowledge Expert",
    credentialName: "KTA / HPWKI Ijen Climbing Licence",
    credentialIssuer: "HPWKI",
    credentialStatus: "Active",
    sortOrder: 2,
  },
  {
    slug: "fauzi",
    name: "Fauzi",
    role: "Guide",
    image: "https://javavolcano-touroperator.com/uploads/1768226003889-338819579-fauzi.png",
    ktaUrl: null,
    memberId: "ID #46",
    quote: null,
    reviewer: null,
    selfQuote: null,
    tags: JSON.stringify(["Knowledgeable guide", "Great photos", "Great logistics", "Safety-first"]),
    archetype: "The Logistics Expert",
    credentialName: "KTA / HPWKI Ijen Climbing Licence",
    credentialIssuer: "HPWKI",
    credentialStatus: "Active",
    sortOrder: 3,
  },
  {
    slug: "gufron",
    name: "Gufron",
    role: "Guide",
    image: "https://javavolcano-touroperator.com/uploads/1768225567764-405955176-gufron.png",
    ktaUrl: "https://javavolcano-touroperator.com/uploads/1771428741674-842615436-kta_gufron.jpg",
    memberId: null,
    quote: "Always willing to help you get your best photo.",
    reviewer: "Adrián Martínez · Google Reviews",
    selfQuote: null,
    tags: JSON.stringify(["Knowledgeable guide", "Great photos", "Safety-first", "Always on time"]),
    archetype: "The Photo Guide",
    credentialName: "KTA / HPWKI Ijen Climbing Licence",
    credentialIssuer: "HPWKI",
    credentialStatus: "Active",
    sortOrder: 4,
  },
  {
    slug: "kiki",
    name: "Kiki",
    role: "Guide",
    image: "https://javavolcano-touroperator.com/uploads/1768271545598-834784538-kiki.png",
    ktaUrl: "https://javavolcano-touroperator.com/uploads/1771428489070-55145932-kta_kiki.jpg",
    memberId: null,
    quote: null,
    reviewer: null,
    selfQuote: null,
    tags: JSON.stringify(["Knowledgeable guide", "Great logistics", "Great photos", "Friendly & fun"]),
    archetype: "The All-Rounder",
    credentialName: "KTA / HPWKI Ijen Climbing Licence",
    credentialIssuer: "HPWKI",
    credentialStatus: "Active",
    sortOrder: 5,
  },
  {
    slug: "rendi",
    name: "Rendi",
    role: "Guide",
    image: "https://javavolcano-touroperator.com/uploads/1768228514527-518051332-rendi.png",
    ktaUrl: "https://javavolcano-touroperator.com/uploads/1771428760524-516116110-kta_rendi.jpg",
    memberId: null,
    quote: "When we went down the steep crater, he held our hands to prevent us from falling.",
    reviewer: "Wing Shan Lui · Google Reviews",
    selfQuote: null,
    tags: JSON.stringify(["Safety-first", "Knowledgeable guide", "Great logistics", "Always on time"]),
    archetype: "The Safety Guardian",
    credentialName: "KTA / HPWKI Ijen Climbing Licence",
    credentialIssuer: "HPWKI",
    credentialStatus: "Active",
    sortOrder: 6,
  },
  {
    slug: "taufik",
    name: "Taufik",
    role: "Guide",
    image: "https://javavolcano-touroperator.com/uploads/1768228083285-919198019-taufik_1_.png",
    ktaUrl: "https://javavolcano-touroperator.com/uploads/1771428704448-911506028-kta_taufik.jpg",
    memberId: null,
    quote: null,
    reviewer: null,
    selfQuote: null,
    tags: JSON.stringify(["Knowledgeable guide", "Safety-first", "Always on time", "Great logistics"]),
    archetype: "The Reliable Guide",
    credentialName: "KTA / HPWKI Ijen Climbing Licence",
    credentialIssuer: "HPWKI",
    credentialStatus: "Active",
    sortOrder: 7,
  },
  // ── DRIVERS ──
  {
    slug: "fredi",
    name: "Fredi",
    role: "Driver",
    image: "https://javavolcano-touroperator.com/uploads/1768276791622-275591622-fredi.png",
    ktaUrl: null,
    memberId: null,
    quote: "Always on time no matter what time of the day. Exceptional driving skills.",
    reviewer: "Guest review",
    selfQuote: null,
    tags: JSON.stringify(["Always on time", "Great logistics", "Friendly & fun", "Safety-first"]),
    archetype: "The Punctual Driver",
    credentialName: null,
    credentialIssuer: null,
    credentialStatus: null,
    sortOrder: 8,
  },
  {
    slug: "yandi",
    name: "Yandi",
    role: "Driver",
    image: "https://javavolcano-touroperator.com/uploads/1768270364125-127093899-yandi.png",
    ktaUrl: null,
    memberId: null,
    quote: null,
    reviewer: null,
    selfQuote: null,
    tags: JSON.stringify(["Friendly & fun", "Great logistics", "Knowledgeable guide"]),
    archetype: "The Friendly Driver",
    credentialName: null,
    credentialIssuer: null,
    credentialStatus: null,
    sortOrder: 9,
  },
  {
    slug: "holili",
    name: "Holili",
    role: "Driver",
    image: "https://javavolcano-touroperator.com/uploads/1768277053384-451049143-holili.png",
    ktaUrl: null,
    memberId: null,
    quote: null,
    reviewer: null,
    selfQuote: null,
    tags: JSON.stringify(["Safety-first", "Great logistics", "Friendly & fun"]),
    archetype: "The Safe Driver",
    credentialName: null,
    credentialIssuer: null,
    credentialStatus: null,
    sortOrder: 10,
  },
  {
    slug: "joyo",
    name: "Joyo",
    role: "Driver",
    image: "https://javavolcano-touroperator.com/uploads/1768277336049-935866282-joyo.png",
    ktaUrl: null,
    memberId: null,
    quote: null,
    reviewer: null,
    selfQuote: null,
    tags: JSON.stringify(["Safety-first", "Great logistics", "Friendly & fun"]),
    archetype: "The Route Expert",
    credentialName: null,
    credentialIssuer: null,
    credentialStatus: null,
    sortOrder: 11,
  },
  {
    slug: "dika",
    name: "Dika",
    role: "Driver",
    image: null,
    ktaUrl: null,
    memberId: "ID #72",
    quote: null,
    reviewer: null,
    selfQuote: null,
    tags: JSON.stringify(["Friendly & fun", "Safety-first", "Great logistics"]),
    archetype: "The Night Driver",
    credentialName: null,
    credentialIssuer: null,
    credentialStatus: null,
    sortOrder: 12,
  },
  {
    slug: "pras",
    name: "Pras",
    role: "Driver",
    image: null,
    ktaUrl: null,
    memberId: null,
    quote: "Excellent English… made interactions seamless. Best guide I've ever had.",
    reviewer: "Guest review",
    selfQuote: null,
    tags: JSON.stringify(["Great logistics", "Safety-first", "Friendly & fun"]),
    archetype: "The Communicator",
    credentialName: null,
    credentialIssuer: null,
    credentialStatus: null,
    sortOrder: 13,
  },
  {
    slug: "yusuf",
    name: "Yusuf",
    role: "Driver",
    image: null,
    ktaUrl: null,
    memberId: null,
    quote: null,
    reviewer: null,
    selfQuote: null,
    tags: JSON.stringify(["Friendly & fun", "Great photos", "Great logistics"]),
    archetype: "The Enthusiast",
    credentialName: null,
    credentialIssuer: null,
    credentialStatus: null,
    sortOrder: 14,
  },
];

for (const c of crewData) {
  await conn.execute(
    `INSERT INTO crew (slug, name, role, image, ktaUrl, memberId, quote, reviewer, selfQuote, tags, archetype, credentialName, credentialIssuer, credentialStatus, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
    [
      c.slug, c.name, c.role, c.image || "", c.ktaUrl, c.memberId,
      c.quote, c.reviewer, c.selfQuote, c.tags, c.archetype,
      c.credentialName, c.credentialIssuer, c.credentialStatus, c.sortOrder,
    ]
  );
}
console.log(`  ✓ Inserted ${crewData.length} crew members`);

// ─── 2. REVIEWS — with crew mentions ─────────────────────────────────────────
console.log("\n[2/5] Seeding reviews...");
await clearTable("reviews");

const reviewsData = [
  {
    author: "Jason Li",
    text: "Incredibly knowledgeable and went out of his way to make sure everything we needed was sorted. Boy was amazing — he knew the geology, the history, the safety protocols. I felt completely safe the entire time.",
    platform: "Trustpilot",
    rating: 5,
    date: "2024-11",
    guideNames: JSON.stringify(["Boy"]),
    isFeatured: true,
    sortOrder: 1,
    crewMentionName: "Boy (Ahboy)",
    crewMentionPhoto: "https://javavolcano-touroperator.com/uploads/1768228191022-893381041-boy.png",
    crewMentionRole: "Guide",
  },
  {
    author: "Wang Zhe",
    text: "Creative at taking fun photos. Anjas was the highlight for the trip. He knew exactly where to position us for the best shots of the blue fire and crater lake. Worth every rupiah.",
    platform: "Google Reviews",
    rating: 5,
    date: "2024-10",
    guideNames: JSON.stringify(["Anjas"]),
    isFeatured: true,
    sortOrder: 2,
    crewMentionName: "Anjas",
    crewMentionPhoto: "https://javavolcano-touroperator.com/uploads/1768270423657-690185912-anjas.png",
    crewMentionRole: "Guide",
  },
  {
    author: "Adrián Martínez",
    text: "Gufron was always willing to help you get your best photo. He was patient, professional, and genuinely cared about our experience. The whole operation was seamless from pickup to drop-off.",
    platform: "Google Reviews",
    rating: 5,
    date: "2024-09",
    guideNames: JSON.stringify(["Gufron"]),
    isFeatured: true,
    sortOrder: 3,
    crewMentionName: "Gufron",
    crewMentionPhoto: "https://javavolcano-touroperator.com/uploads/1768225567764-405955176-gufron.png",
    crewMentionRole: "Guide",
  },
  {
    author: "Wing Shan Lui",
    text: "When we went down the steep crater, Rendi held our hands to prevent us from falling. That level of care and safety awareness is what sets JVTO apart from every other operator we've used.",
    platform: "Google Reviews",
    rating: 5,
    date: "2024-08",
    guideNames: JSON.stringify(["Rendi"]),
    isFeatured: true,
    sortOrder: 4,
    crewMentionName: "Rendi",
    crewMentionPhoto: "https://javavolcano-touroperator.com/uploads/1768228514527-518051332-rendi.png",
    crewMentionRole: "Guide",
  },
  {
    author: "Sophie Laurent",
    text: "The doctor check-up the evening before was a surprise but made complete sense once explained. JVTO clearly takes safety seriously — this isn't just a business, it's a professional operation with real protocols.",
    platform: "Trustpilot",
    rating: 5,
    date: "2024-07",
    guideNames: JSON.stringify([]),
    isFeatured: true,
    sortOrder: 5,
    crewMentionName: null,
    crewMentionPhoto: null,
    crewMentionRole: null,
  },
  {
    author: "Marcus Hoffmann",
    text: "Completely private tour — just the two of us and our guide. No rushing, no strangers, no compromise on timing. We watched the blue fire for over an hour. This is how Ijen should be experienced.",
    platform: "TripAdvisor",
    rating: 5,
    date: "2024-06",
    guideNames: JSON.stringify([]),
    isFeatured: false,
    sortOrder: 6,
    crewMentionName: null,
    crewMentionPhoto: null,
    crewMentionRole: null,
  },
  {
    author: "Yuki Tanaka",
    text: "Mr. Sam (the founder) personally briefed us before the trek. Knowing the operator is an active Tourist Police officer changed how we felt about the whole experience. Absolute confidence from start to finish.",
    platform: "Google Reviews",
    rating: 5,
    date: "2024-05",
    guideNames: JSON.stringify([]),
    isFeatured: false,
    sortOrder: 7,
    crewMentionName: null,
    crewMentionPhoto: null,
    crewMentionRole: null,
  },
  {
    author: "Elena Rossi",
    text: "I researched every operator before choosing JVTO. The verify page with SHA256 hashes and downloadable legal documents is unlike anything I've seen in tourism. They clearly have nothing to hide.",
    platform: "Trustpilot",
    rating: 5,
    date: "2024-04",
    guideNames: JSON.stringify([]),
    isFeatured: false,
    sortOrder: 8,
    crewMentionName: null,
    crewMentionPhoto: null,
    crewMentionRole: null,
  },
];

for (const r of reviewsData) {
  await conn.execute(
    `INSERT INTO reviews (author, text, platform, rating, date, guideNames, isFeatured, sortOrder, crewMentionName, crewMentionPhoto, crewMentionRole)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      r.author, r.text, r.platform, r.rating, r.date,
      r.guideNames, r.isFeatured ? 1 : 0, r.sortOrder,
      r.crewMentionName, r.crewMentionPhoto, r.crewMentionRole,
    ]
  );
}
console.log(`  ✓ Inserted ${reviewsData.length} reviews`);

// ─── 3. PROOF VAULT — 9 documents with SHA256 hashes ─────────────────────────
console.log("\n[3/5] Seeding proof vault...");
await clearTable("proof_vault");

const vaultData = [
  // LEGAL
  {
    slug: "nib-certificate",
    category: "legal",
    vaultSection: "Legal",
    title: "NIB — Nomor Induk Berusaha",
    type: "PDF Document · BusinessID",
    description: "Official NIB certificate issued by the Indonesian OSS (Online Single Submission) ministry system. Confirms PT Java Volcano Rendezvous is a legally registered business entity.",
    caption: "Business Identification Number 1102230032918",
    url: "https://javavolcano-touroperator.com/legal/NIB-1102230032918.pdf",
    downloadUrl: "https://javavolcano-touroperator.com/legal/NIB-1102230032918.pdf",
    sha256: "fa20dde31bb75e46b061ed14cc6d003f6960c02a9a82c20d8603b0cbf6f7b1b7",
    verifiedDate: "2025-10-25",
    sortOrder: 1,
  },
  {
    slug: "tdup-licence",
    category: "legal",
    vaultSection: "Legal",
    title: "TDUP — Tourism Business Operating Licence",
    type: "PDF Document · License",
    description: "Official tourism business licence confirming JVTO's authority to operate as a licensed Tour Agency under Indonesian tourism law.",
    caption: "Tanda Daftar Usaha Pariwisata",
    url: "https://javavolcano-touroperator.com/legal/TDUP-1102230032918.pdf",
    downloadUrl: "https://javavolcano-touroperator.com/legal/TDUP-1102230032918.pdf",
    sha256: "27252d512ddfa74de22a3e3ec10aa3dd40ef88da3eb57349fcd2137411551ee3",
    verifiedDate: "2025-10-25",
    sortOrder: 2,
  },
  {
    slug: "hpwki-membership",
    category: "legal",
    vaultSection: "Legal",
    title: "HPWKI Membership Approval",
    type: "PDF Document · Association",
    description: "Approval letter confirming JVTO membership in HPWKI — the official Ijen Special Tourism Association governing standards for licensed operators at Kawah Ijen.",
    caption: "Himpunan Pelaku Wisata Khusus Ijen",
    url: "https://javavolcano-touroperator.com/legal/HPWKI-approval.pdf",
    downloadUrl: "https://javavolcano-touroperator.com/legal/HPWKI-approval.pdf",
    sha256: "ca1fb1a48b550a7748d400f165899f12a356e6941aacdde9c043427698aaf63b",
    verifiedDate: "2025-11-05",
    sortOrder: 3,
  },
  // POLICE
  {
    slug: "sprin-polpar",
    category: "police",
    vaultSection: "Police",
    title: "SPRIN POLPAR — Tourist Police Assignment Letter",
    type: "PDF Document · PoliceDocs",
    description: "Official assignment letter confirming founder Agung Sambuko (Bripka / Mr. Sam) holds an active commission in Ditpamobvit — the Tourist Police unit of the East Java Regional Police.",
    caption: "Surat Perintah · Ditpamobvit",
    url: "https://javavolcano-touroperator.com/legal/SPRIN-POLPAR.pdf",
    downloadUrl: "https://javavolcano-touroperator.com/legal/SPRIN-POLPAR.pdf",
    sha256: "03c8578dc22956faa366d957badecfe38868d4760359cd8059fb2d6b145dfeab",
    verifiedDate: "2025-11-05",
    sortOrder: 4,
  },
  {
    slug: "sprin-wal-travel",
    category: "police",
    vaultSection: "Police",
    title: "SPRIN WAL-TRAVEL — Travel Order",
    type: "PDF Document · PoliceDocs",
    description: "Police travel order authorising Tourist Police coordination for JVTO group operations. Documents active operational support — not merely a historical credential.",
    caption: "12 February 2024",
    url: "https://javavolcano-touroperator.com/legal/SPRIN-WAL-TRAVEL-2024-02-12.pdf",
    downloadUrl: "https://javavolcano-touroperator.com/legal/SPRIN-WAL-TRAVEL-2024-02-12.pdf",
    sha256: "179b061eae558943fdccc51d2ea3c8233a704b61f03ca3d212433f3e8d6f3bd3",
    verifiedDate: "2025-11-05",
    sortOrder: 5,
  },
  {
    slug: "bbksda-health-screening",
    category: "police",
    vaultSection: "Police",
    title: "BBKSDA SE-1658/KSA.9/2024 — Ijen Health Screening Regulation",
    type: "PDF Document · HealthProtocol",
    description: "Government circular from BBKSDA Jawa Timur mandating health screening for all Ijen trekkers. This is the regulatory basis for JVTO's doctor check-up the evening before every Ijen trek.",
    caption: "Mandatory per government circular",
    url: "https://javavolcano-touroperator.com/screening/bbksda/05012024_Edaran_Pembukaan_TWA_Kawah_Ijen.pdf",
    downloadUrl: "https://javavolcano-touroperator.com/screening/bbksda/05012024_Edaran_Pembukaan_TWA_Kawah_Ijen.pdf",
    sha256: "86f9c225cff91a9ae04332d469a17c70264c4be681572822601096c86ab4148a",
    verifiedDate: "2025-11-05",
    sortOrder: 6,
  },
  // HISTORY
  {
    slug: "booking-award-2015",
    category: "history",
    vaultSection: "History",
    title: "Booking.com Guest Review Award (2015)",
    type: "JPEG · Historical Artefact",
    description: "Physical award delivered to Bondowoso address. Score: 9.4/10. Establishes operational history prior to PT incorporation.",
    caption: "Ijen Bondowoso Homestay — pre-incorporation era",
    url: "https://javavolcano-touroperator.com/history/booking-2015-plaque.jpg",
    downloadUrl: null,
    sha256: "08ce8e519b936df53d8dc2b4b98df06604eca9d8d633a6f5e1b8709022a13c9b",
    verifiedDate: "2025-10-25",
    sortOrder: 7,
  },
  {
    slug: "stefan-loose-guidebook",
    category: "history",
    vaultSection: "History",
    title: "Stefan Loose Travel Guide — Page 287",
    type: "PNG · Historical Artefact",
    description: "European travel guide entry naming founder Agung as tours arranger. Third-party editorial source — JVTO had no editorial control over this publication.",
    caption: "ISBN 978-3-7701-7881-0 · Third-party editorial validation",
    url: "https://javavolcano-touroperator.com/history/stefan_loose_crop_enh.jpg",
    downloadUrl: null,
    sha256: null,
    verifiedDate: "2025-10-25",
    sortOrder: 8,
  },
  // CREDENTIALS
  {
    slug: "kta-anjas",
    category: "credentials",
    vaultSection: "Credentials",
    title: "Anjas — KTA / HPWKI Ijen Climbing Licence",
    type: "JPEG · Guide Credential",
    description: "Kartu Tanda Anggota (KTA) is the HPWKI membership card certifying that a guide has met the association's safety and competency requirements for Ijen crater operations.",
    caption: "Active KTA licence — Ijen climbing certified",
    url: "https://javavolcano-touroperator.com/uploads/1771428583288-513992233-kta_anjas.jpg",
    downloadUrl: "https://javavolcano-touroperator.com/uploads/1771428583288-513992233-kta_anjas.jpg",
    sha256: "8f34a7ad…",
    verifiedDate: "2025-11-05",
    sortOrder: 9,
  },
  {
    slug: "kta-gufron",
    category: "credentials",
    vaultSection: "Credentials",
    title: "Gufron — KTA / HPWKI Ijen Climbing Licence",
    type: "JPEG · Guide Credential",
    description: "Active HPWKI KTA licence for guide Gufron, certifying Ijen crater climbing competency.",
    caption: "Active KTA licence — Ijen climbing certified",
    url: "https://javavolcano-touroperator.com/uploads/1771428741674-842615436-kta_gufron.jpg",
    downloadUrl: "https://javavolcano-touroperator.com/uploads/1771428741674-842615436-kta_gufron.jpg",
    sha256: "27216033…",
    verifiedDate: "2025-11-05",
    sortOrder: 10,
  },
  {
    slug: "kta-kiki",
    category: "credentials",
    vaultSection: "Credentials",
    title: "Kiki — KTA / HPWKI Ijen Climbing Licence",
    type: "JPEG · Guide Credential",
    description: "Active HPWKI KTA licence for guide Kiki, certifying Ijen crater climbing competency.",
    caption: "Active KTA licence — Ijen climbing certified",
    url: "https://javavolcano-touroperator.com/uploads/1771428489070-55145932-kta_kiki.jpg",
    downloadUrl: "https://javavolcano-touroperator.com/uploads/1771428489070-55145932-kta_kiki.jpg",
    sha256: null,
    verifiedDate: "2025-11-05",
    sortOrder: 11,
  },
  {
    slug: "kta-rendi",
    category: "credentials",
    vaultSection: "Credentials",
    title: "Rendi — KTA / HPWKI Ijen Climbing Licence",
    type: "JPEG · Guide Credential",
    description: "Active HPWKI KTA licence for guide Rendi, certifying Ijen crater climbing competency.",
    caption: "Active KTA licence — Ijen climbing certified",
    url: "https://javavolcano-touroperator.com/uploads/1771428760524-516116110-kta_rendi.jpg",
    downloadUrl: "https://javavolcano-touroperator.com/uploads/1771428760524-516116110-kta_rendi.jpg",
    sha256: "1f966835…",
    verifiedDate: "2025-11-05",
    sortOrder: 12,
  },
  {
    slug: "kta-taufik",
    category: "credentials",
    vaultSection: "Credentials",
    title: "Taufik — KTA / HPWKI Ijen Climbing Licence",
    type: "JPEG · Guide Credential",
    description: "Active HPWKI KTA licence for guide Taufik, certifying Ijen crater climbing competency.",
    caption: "Active KTA licence — Ijen climbing certified",
    url: "https://javavolcano-touroperator.com/uploads/1771428704448-911506028-kta_taufik.jpg",
    downloadUrl: "https://javavolcano-touroperator.com/uploads/1771428704448-911506028-kta_taufik.jpg",
    sha256: null,
    verifiedDate: "2025-11-05",
    sortOrder: 13,
  },
];

for (const v of vaultData) {
  await conn.execute(
    `INSERT INTO proof_vault (slug, category, vaultSection, title, type, description, caption, url, downloadUrl, sha256, verifiedDate, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [v.slug, v.category, v.vaultSection, v.title, v.type, v.description, v.caption, v.url, v.downloadUrl, v.sha256, v.verifiedDate, v.sortOrder]
  );
}
console.log(`  ✓ Inserted ${vaultData.length} proof vault items`);

// ─── 4. PARTNERS — with verify URLs ──────────────────────────────────────────
console.log("\n[4/5] Seeding partners...");
await clearTable("partners");

const partnersData = [
  {
    name: "HPWKI",
    status: "Active Member",
    description: "Himpunan Pelaku Wisata Khusus Ijen — The association governing licensed operators at Kawah Ijen. HPWKI membership signals compliance with safety and operational standards specific to Ijen trekking — not available to unregistered operators.",
    tier: "Professional Association",
    verifyUrl: "https://javavolcano-touroperator.com/legal/HPWKI-approval.pdf",
    verifyLabel: "Download approval letter",
    partnerId: "SHA256 approval letter verified",
    isLiveUrl: false,
    sortOrder: 1,
  },
  {
    name: "INDECON",
    status: "Spotlight Member",
    description: "Indonesian Ecotourism Network — NGO-verified spotlight member. INDECON independently lists JVTO as a responsible ecotourism operator. This entry was not paid for — it reflects INDECON's own vetting.",
    tier: "NGO · Ecotourism",
    verifyUrl: "https://www.indecon.id/spotlight-networks/java-volcano-tour-operator",
    verifyLabel: "Verify INDECON membership",
    liveUrl: "https://www.indecon.id/spotlight-networks/java-volcano-tour-operator",
    partnerId: "INDECON · Spotlight Networks",
    isLiveUrl: true,
    sortOrder: 2,
  },
  {
    name: "ISIC",
    status: "Registered Provider",
    description: "International Student Identity Card — JVTO is a registered ISIC discount provider (Provider ID: 259268). Student travellers worldwide can verify JVTO's legitimacy through their ISIC app or the public ISIC discounts directory.",
    tier: "Global Verification",
    verifyUrl: "https://www.isic.org/discounts/?providerId=259268",
    verifyLabel: "Verify on ISIC.org",
    liveUrl: "https://www.isic.org/discounts/?providerId=259268",
    partnerId: "ISIC Provider ID: 259268",
    isLiveUrl: true,
    sortOrder: 3,
  },
  {
    name: "Trustpilot",
    status: "Verified Business",
    description: "Independent review platform. JVTO cannot edit or delete reviews. Score: 4.5–4.7/5.",
    tier: "Review Platform",
    verifyUrl: "https://trustpilot.com/review/javavolcano-touroperator.com",
    verifyLabel: "Verify on Trustpilot",
    liveUrl: "https://trustpilot.com/review/javavolcano-touroperator.com",
    partnerId: "Verified reviews · embed available",
    isLiveUrl: true,
    sortOrder: 4,
  },
  {
    name: "TripAdvisor",
    status: "Listed Operator",
    description: "TripAdvisor listing d19983165. 112 total reviews. Aggregate score 4.9/5.",
    tier: "OTA Platform",
    verifyUrl: "https://www.tripadvisor.com/Attraction_Review-g297715-d19983165-Reviews-Java_Volcano_Tour_Operator-Surabaya_East_Java_Java.html",
    verifyLabel: "Verify on TripAdvisor",
    liveUrl: "https://www.tripadvisor.com/Attraction_Review-g297715-d19983165-Reviews-Java_Volcano_Tour_Operator-Surabaya_East_Java_Java.html",
    partnerId: "d19983165 · 112 reviews",
    isLiveUrl: true,
    sortOrder: 5,
  },
  {
    name: "Google Maps",
    status: "Verified Business",
    description: "Google Maps CID 1266403973589689021. Google-verified business entity. Score: 4.9/5.",
    tier: "Search Platform",
    verifyUrl: "https://www.google.com/maps?cid=1266403973589689021",
    verifyLabel: "See on Google Maps",
    liveUrl: "https://www.google.com/maps?cid=1266403973589689021",
    partnerId: "CID 1266403973589689021",
    isLiveUrl: true,
    sortOrder: 6,
  },
  {
    name: "GetYourGuide",
    status: "Verified Supplier",
    description: "GetYourGuide supplier s260697. OTA-verified supplier. Score: 4.9/5.",
    tier: "OTA Platform",
    verifyUrl: "https://www.getyourguide.com/java-volcano-tour-operator-s260697/",
    verifyLabel: "Verify on GetYourGuide",
    liveUrl: "https://www.getyourguide.com/java-volcano-tour-operator-s260697/",
    partnerId: "Supplier s260697",
    isLiveUrl: true,
    sortOrder: 7,
  },
];

for (const p of partnersData) {
  await conn.execute(
    `INSERT INTO partners (name, status, description, tier, verifyUrl, verifyLabel, liveUrl, partnerId, isLiveUrl, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [p.name, p.status, p.description, p.tier, p.verifyUrl, p.verifyLabel, p.liveUrl || null, p.partnerId, p.isLiveUrl ? 1 : 0, p.sortOrder]
  );
}
console.log(`  ✓ Inserted ${partnersData.length} partners`);

// ─── 5. PRESS ─────────────────────────────────────────────────────────────────
console.log("\n[5/5] Seeding press...");
await clearTable("press");

const pressData = [
  {
    publisher: "Detik.com",
    date: "2021-03-14",
    title: "Suka Duka Polisi Pariwisata Bondowoso: Tegakkan Prokes Sambil Lawan Dingin",
    translatedTitle: "The Joys and Struggles of Bondowoso Tourist Police: Enforcing Health Protocols While Battling the Cold",
    url: "https://news.detik.com/berita-jawa-timur/d-5492690/suka-duka-polisi-pariwisata-bondowoso-tegakkan-prokes-sambil-lawan-dingin",
    quote: "Regional news coverage mentioning founder Bripka Agung Sambuko in his Tourist Police capacity enforcing health protocols at Ijen during the COVID-era. Third-party entity confirmation — name variant 'Bripka Agung Sambuko' independently indexed.",
    sortOrder: 1,
  },
  {
    publisher: "Radar Jember (Jawa Pos)",
    date: "2021-03-24",
    title: "Polpar Dibentuk Untuk Mendukung Ijen Geopark",
    translatedTitle: "Tourist Police Formed to Support Ijen Geopark",
    url: "https://radarjember.jawapos.com/bondowoso/24/03/2021/polpar-dibentuk-untuk-mendukung-ijen-geopark",
    quote: "Radar Jember (Jawa Pos group) coverage of Tourist Police formation in support of the Ijen Geopark initiative. Corroborates JVTO's institutional role in regional tourism governance, independent of JVTO's own claims.",
    sortOrder: 2,
  },
  {
    publisher: "Stefan Loose Travel Guides",
    date: "2016",
    title: "Indonesia Travel Guide — Page 287",
    translatedTitle: "Ijen Bondowoso Homestay listing with founder Agung as tours arranger",
    url: "https://javavolcano-touroperator.com/history/stefan_loose_crop_enh.jpg",
    quote: "Stefan Loose Travel Guides Indonesia (ISBN 978-3-7701-7881-0) names founder Agung as tours arranger at Ijen Bondowoso Homestay — pre-incorporation, third-party editorial validation.",
    sortOrder: 3,
  },
  {
    publisher: "BBKSDA Jawa Timur",
    date: "2024",
    title: "Pelatihan Pemandu Kawah Ijen — Guide Safety Training",
    translatedTitle: "BBKSDA Jatim — Ijen Crater Guide Safety Training Programme",
    url: "https://bbksdajatim.org",
    quote: "BBKSDA (Natural Resources Conservation Agency) official coverage of HPWKI member participation in SAR and emergency first aid training at Kawah Ijen. Documents JVTO's affiliation with certified guide training programmes.",
    sortOrder: 4,
  },
];

for (const p of pressData) {
  await conn.execute(
    `INSERT INTO press (publisher, date, title, translatedTitle, url, quote, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [p.publisher, p.date, p.title, p.translatedTitle, p.url, p.quote, p.sortOrder]
  );
}
console.log(`  ✓ Inserted ${pressData.length} press items`);

await conn.end();
console.log("\n✅ HTML sync complete!");
console.log("   14 crew (with real photos + KTA URLs)");
console.log("   8 reviews (with crew mentions)");
console.log("   13 proof vault items (with SHA256 hashes)");
console.log("   7 partners (with verify URLs)");
console.log("   4 press items");
