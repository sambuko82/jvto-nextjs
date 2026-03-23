import { eq, and, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, destinations, tours, crew, crewReviews, press, partners, proofVault, faq, pagesMeta, reviews } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Destinations ─────────────────────────────────────────────────────────────
export async function getDestinations() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(destinations).where(eq(destinations.isActive, true)).orderBy(asc(destinations.sortOrder));
}

export async function getDestinationBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(destinations).where(and(eq(destinations.slug, slug), eq(destinations.isActive, true))).limit(1);
  return result[0];
}

// ─── Tours ────────────────────────────────────────────────────────────────────
export async function getTours(departure?: 'surabaya' | 'bali') {
  const db = await getDb();
  if (!db) return [];
  if (departure) {
    return db.select().from(tours).where(and(eq(tours.departure, departure), eq(tours.isActive, true))).orderBy(asc(tours.sortOrder));
  }
  return db.select().from(tours).where(eq(tours.isActive, true)).orderBy(asc(tours.sortOrder));
}

export async function getTourBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(tours).where(and(eq(tours.slug, slug), eq(tours.isActive, true))).limit(1);
  return result[0];
}

// ─── Crew ─────────────────────────────────────────────────────────────────────
export async function getCrew() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(crew).where(eq(crew.isActive, true)).orderBy(asc(crew.sortOrder));
}

export async function getCrewBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(crew).where(and(eq(crew.slug, slug), eq(crew.isActive, true))).limit(1);
  return result[0];
}

export async function getCrewReviews(crewSlug: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(crewReviews).where(eq(crewReviews.crewSlug, crewSlug)).orderBy(asc(crewReviews.id));
}

// ─── Press ────────────────────────────────────────────────────────────────────
export async function getPress() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(press).orderBy(asc(press.sortOrder));
}

// ─── Partners ─────────────────────────────────────────────────────────────────
export async function getPartners() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners).orderBy(asc(partners.sortOrder));
}

// ─── Proof Vault ──────────────────────────────────────────────────────────────
export async function getProofVault(section?: string) {
  const db = await getDb();
  if (!db) return [];
  if (section) {
    return db.select().from(proofVault).where(eq(proofVault.vaultSection, section)).orderBy(asc(proofVault.sortOrder));
  }
  return db.select().from(proofVault).orderBy(asc(proofVault.sortOrder));
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export async function getFAQ() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(faq).where(eq(faq.isActive, true)).orderBy(asc(faq.sortOrder));
}

// ─── Pages Meta ───────────────────────────────────────────────────────────────
export async function getPageMeta(route: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(pagesMeta).where(eq(pagesMeta.route, route)).limit(1);
  return result[0];
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
export async function getReviews(featured?: boolean) {
  const db = await getDb();
  if (!db) return [];
  if (featured !== undefined) {
    return db.select().from(reviews).where(eq(reviews.isFeatured, featured)).orderBy(asc(reviews.sortOrder));
  }
  return db.select().from(reviews).orderBy(asc(reviews.sortOrder));
}

export async function getReviewsFiltered(options?: { rating?: number; crewMentionName?: string; sortBy?: 'newest' | 'rating-high' | 'rating-low' }) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (options?.rating !== undefined) {
    conditions.push(eq(reviews.rating, options.rating));
  }
  if (options?.crewMentionName !== undefined) {
    conditions.push(eq(reviews.crewMentionName, options.crewMentionName));
  }
  let query = conditions.length > 0 ? db.select().from(reviews).where(and(...conditions)) : db.select().from(reviews);
  if (options?.sortBy === 'newest') {
    return query.orderBy(desc(reviews.createdAt));
  } else if (options?.sortBy === 'rating-high') {
    return query.orderBy(desc(reviews.rating));
  } else if (options?.sortBy === 'rating-low') {
    return query.orderBy(asc(reviews.rating));
  }
  return query.orderBy(asc(reviews.sortOrder));
}
