import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  getDestinations, getDestinationBySlug,
  getTours, getTourBySlug,
  getCrew, getCrewBySlug, getCrewReviews,
  getPress, getPartners,
  getProofVault, getFAQ, getPageMeta, getReviews, getReviewsFiltered
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  destinations: router({
    list: publicProcedure.query(async () => {
      return getDestinations();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getDestinationBySlug(input.slug);
      }),
  }),

  tours: router({
    list: publicProcedure
      .input(z.object({ departure: z.enum(['surabaya', 'bali']).optional() }))
      .query(async ({ input }) => {
        return getTours(input.departure);
      }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getTourBySlug(input.slug);
      }),
  }),

  crew: router({
    list: publicProcedure.query(async () => {
      return getCrew();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getCrewBySlug(input.slug);
      }),
    getReviews: publicProcedure
      .input(z.object({ crewSlug: z.string() }))
      .query(async ({ input }) => {
        return getCrewReviews(input.crewSlug);
      }),
  }),

  press: router({
    list: publicProcedure.query(async () => {
      return getPress();
    }),
  }),

  partners: router({
    list: publicProcedure.query(async () => {
      return getPartners();
    }),
  }),

  proofVault: router({
    list: publicProcedure
      .input(z.object({ section: z.string().optional() }))
      .query(async ({ input }) => {
        return getProofVault(input.section);
      }),
  }),

  faq: router({
    list: publicProcedure.query(async () => {
      return getFAQ();
    }),
  }),

  pages: router({
    getMeta: publicProcedure
      .input(z.object({ route: z.string() }))
      .query(async ({ input }) => {
        return getPageMeta(input.route);
      }),
  }),

  reviews: router({
    list: publicProcedure
      .input(z.object({ featured: z.boolean().optional() }))
      .query(async ({ input }) => {
        return getReviews(input.featured);
      }),
    filtered: publicProcedure
      .input(z.object({
        rating: z.number().min(1).max(5).optional(),
        crewMentionName: z.string().optional(),
        sortBy: z.enum(['newest', 'rating-high', 'rating-low']).optional(),
      }))
      .query(async ({ input }) => {
        return getReviewsFiltered(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
