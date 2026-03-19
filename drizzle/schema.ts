import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  float,
} from "drizzle-orm/mysql-core";

// ─── Core Auth ────────────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Destinations ─────────────────────────────────────────────────────────────
export const destinations = mysqlTable("destinations", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  image: text("image").notNull(),
  heroImage: text("heroImage"),
  description: text("description").notNull(),
  shortDesc: text("shortDesc"),
  duration: varchar("duration", { length: 100 }),
  altitude: varchar("altitude", { length: 100 }),
  difficulty: mysqlEnum("difficulty", ["easy", "moderate", "challenging", "extreme"]).default("moderate"),
  highlights: text("highlights").default('[]'),
  safetyNotes: text("safetyNotes").default('[]'),
  bestTime: varchar("bestTime", { length: 200 }),
  sortOrder: int("sortOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Destination = typeof destinations.$inferSelect;

// ─── Tours ────────────────────────────────────────────────────────────────────
export const tours = mysqlTable("tours", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  name: varchar("name", { length: 300 }).notNull(),
  departureFrom: varchar("departureFrom", { length: 100 }).default("Surabaya"),
  physicality: varchar("physicality", { length: 50 }).default("moderate"),
  departure: mysqlEnum("departure", ["surabaya", "bali"]).notNull(),
  duration: varchar("duration", { length: 100 }).notNull(),
  durationDays: int("durationDays").notNull(),
  pricePerPerson: int("pricePerPerson").notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "moderate", "challenging"]).default("moderate"),
  image: text("image"),
  description: text("description"),
  highlights: text("highlights").default('[]'),
  inclusions: text("inclusions").default('[]'),
  exclusions: text("exclusions").default('[]'),
  itinerary: text("itinerary").default('[]'),
  destinations: text("destinations").default('[]'),
  rating: float("rating").default(4.9),
  reviewCount: int("reviewCount").default(0),
  isActive: boolean("isActive").default(true),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Tour = typeof tours.$inferSelect;

// ─── Crew / Team ──────────────────────────────────────────────────────────────
export const crew = mysqlTable("crew", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  role: mysqlEnum("role", ["Guide", "Driver", "Founder"]).notNull(),
  image: text("image").notNull(),
  quote: text("quote"),
  reviewer: varchar("reviewer", { length: 200 }),
  tags: text("tags").default('[]'),
  archetype: varchar("archetype", { length: 200 }),
  fullQuote: text("fullQuote"),
  expertise: text("expertise").default('[]'),
  credentialName: varchar("credentialName", { length: 300 }),
  credentialIssuer: varchar("credentialIssuer", { length: 300 }),
  credentialStatus: varchar("credentialStatus", { length: 100 }),
  credentialCardImage: text("credentialCardImage"),
  credentialAnnotations: text("credentialAnnotations").default('[]'),
  safetyMetrics: text("safetyMetrics").default('[]'),
  isActive: boolean("isActive").default(true),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Crew = typeof crew.$inferSelect;

// ─── Crew Reviews ─────────────────────────────────────────────────────────────
export const crewReviews = mysqlTable("crew_reviews", {
  id: int("id").autoincrement().primaryKey(),
  crewSlug: varchar("crewSlug", { length: 100 }).notNull(),
  author: varchar("author", { length: 200 }).notNull(),
  text: text("text").notNull(),
  platform: varchar("platform", { length: 100 }).notNull(),
  rating: int("rating").default(5),
  date: varchar("date", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CrewReview = typeof crewReviews.$inferSelect;

// ─── Press ────────────────────────────────────────────────────────────────────
export const press = mysqlTable("press", {
  id: int("id").autoincrement().primaryKey(),
  publisher: varchar("publisher", { length: 200 }).notNull(),
  date: varchar("date", { length: 50 }),
  title: text("title").notNull(),
  translatedTitle: text("translatedTitle"),
  url: text("url"),
  quote: text("quote"),
  author: varchar("author", { length: 200 }),
  screenshot: text("screenshot"),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Press = typeof press.$inferSelect;

// ─── Partners ─────────────────────────────────────────────────────────────────
export const partners = mysqlTable("partners", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  status: varchar("status", { length: 200 }),
  description: text("description"),
  tier: varchar("tier", { length: 100 }),
  logoUrl: text("logoUrl"),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Partner = typeof partners.$inferSelect;

// ─── Proof Vault ──────────────────────────────────────────────────────────────
export const proofVault = mysqlTable("proof_vault", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  category: varchar("category", { length: 100 }).notNull(),
  vaultSection: varchar("vaultSection", { length: 100 }).notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  hash: varchar("hash", { length: 200 }),
  lastVerified: varchar("lastVerified", { length: 50 }),
  annotations: text("annotations").default('[]'),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProofVault = typeof proofVault.$inferSelect;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faq = mysqlTable("faq", {
  id: int("id").autoincrement().primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }).default("general"),
  sortOrder: int("sortOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FAQ = typeof faq.$inferSelect;

// ─── Pages Meta ───────────────────────────────────────────────────────────────
export const pagesMeta = mysqlTable("pages_meta", {
  id: int("id").autoincrement().primaryKey(),
  route: varchar("route", { length: 300 }).notNull().unique(),
  titleTag: varchar("titleTag", { length: 300 }),
  metaDescription: text("metaDescription"),
  h1: text("h1"),
  canonical: text("canonical"),
  schemaType: varchar("schemaType", { length: 100 }),
  robots: varchar("robots", { length: 300 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PageMeta = typeof pagesMeta.$inferSelect;

// ─── Trustpilot Reviews ───────────────────────────────────────────────────────
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  author: varchar("author", { length: 200 }).notNull(),
  text: text("text").notNull(),
  platform: varchar("platform", { length: 100 }).notNull(),
  rating: int("rating").default(5),
  date: varchar("date", { length: 50 }),
  guideNames: text("guideNames").default('[]'),
  isFeatured: boolean("isFeatured").default(false),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
