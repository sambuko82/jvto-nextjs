import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const clearedCookies: string[] = [];
    const ctx: TrpcContext = {
      user: {
        id: 1, openId: "test-user", email: "test@test.com", name: "Test User",
        loginMethod: "manus", role: "user", createdAt: new Date(),
        updatedAt: new Date(), lastSignedIn: new Date(),
      },
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {
        clearCookie: (name: string) => { clearedCookies.push(name); },
      } as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies.length).toBe(1);
  });
});

describe("auth.me", () => {
  it("returns null for unauthenticated user", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });
});

describe("destinations router", () => {
  it("destinations.list returns an array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.destinations.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("destinations.getBySlug returns null for non-existent slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.destinations.getBySlug({ slug: "non-existent-destination-xyz" });
    expect(result).toBeUndefined();
  });
});

describe("tours router", () => {
  it("tours.list returns an array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.tours.list({});
    expect(Array.isArray(result)).toBe(true);
  });

  it("tours.list with departure filter returns array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.tours.list({ departure: "surabaya" });
    expect(Array.isArray(result)).toBe(true);
  });

  it("tours.getBySlug returns undefined for non-existent slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.tours.getBySlug({ slug: "non-existent-tour-xyz" });
    expect(result).toBeUndefined();
  });
});

describe("crew router", () => {
  it("crew.list returns an array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.crew.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("press router", () => {
  it("press.list returns an array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.press.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("faq router", () => {
  it("faq.list returns an array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.faq.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("reviews router", () => {
  it("reviews.list returns an array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.reviews.list({});
    expect(Array.isArray(result)).toBe(true);
  });

  it("reviews.list with featured filter returns array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.reviews.list({ featured: true });
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("proofVault router", () => {
  it("proofVault.list returns an array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.proofVault.list({});
    expect(Array.isArray(result)).toBe(true);
  });
});
