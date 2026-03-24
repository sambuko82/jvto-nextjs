'use client';

import { Link } from 'wouter';
import { JsonLd, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function TheDifference() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Why JVTO', url: '/why-jvto' },
        { name: 'The JVTO Difference', url: '/why-jvto/the-jvto-difference' }
      ])} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            The JVTO Difference: Safety Leadership and Verified Proof
          </h1>
          <p className="text-xl text-slate-300">
            What makes JVTO fundamentally different from other East Java tour operators
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">What Changes for Your Trip</h2>
          
          <div className="space-y-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Less Guesswork</h3>
              <p className="text-muted-foreground">
                Every claim JVTO makes is backed by documented proof. You don't have to guess whether credentials are real — you can verify them yourself.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">More Accountability</h3>
              <p className="text-muted-foreground">
                JVTO operates under police oversight, government licensing, and transparent operational standards. Your safety is not just a promise — it's a legal mandate.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">More Private Control</h3>
              <p className="text-muted-foreground">
                100% private tours mean your group controls the pace, the route, and the experience. No strangers, no shared vans, no compromises.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8">Authority Shield (Proof-Backed)</h2>
          
          <div className="space-y-8 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-blue-900">Legal Identity</h3>
              <p className="text-blue-800">
                PT Java Volcano Rendezvous, NIB 1102230032918, registered with Indonesia's government. Verifiable at oss.go.id.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-green-900">Operational Safety</h3>
              <p className="text-green-800">
                HPWKI membership, BBKSDA permits, health screening protocols. Safety is embedded in operations, not added as an afterthought.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-orange-900">Police-Led Oversight</h3>
              <p className="text-orange-800">
                Founder is an active Ditpamobvit Tourist Police officer. Your safety is his legal duty, not just his business interest.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8">What We Do Not Promise</h2>
          
          <div className="space-y-4 mb-12">
            <div className="flex gap-3">
              <span className="text-xl font-bold text-slate-400">✗</span>
              <div>
                <h3 className="font-bold mb-1">No Guaranteed Sunrise</h3>
                <p className="text-muted-foreground">Weather is unpredictable. We promise professional guide work, not weather control.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-xl font-bold text-slate-400">✗</span>
              <div>
                <h3 className="font-bold mb-1">No False Safety Claims</h3>
                <p className="text-muted-foreground">Volcanoes are inherently risky. We manage risk with systems and expertise, not false certainty.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-xl font-bold text-slate-400">✗</span>
              <div>
                <h3 className="font-bold mb-1">No Shared-Group Ambiguity</h3>
                <p className="text-muted-foreground">Private means private. If you see shared groups on our site, we've failed our promise.</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8">How Our Proof Works</h2>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-12">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">1. Claim</h3>
                <p className="text-muted-foreground">JVTO makes a specific, measurable claim about safety, credentials, or operations.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">2. Evidence</h3>
                <p className="text-muted-foreground">We provide documented proof: licenses, certifications, third-party reviews, or artifacts.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">3. Verify</h3>
                <p className="text-muted-foreground">You can independently verify the claim using the links and proof we provide.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/verify-jvto">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                See Proof
              </button>
            </Link>
            <Link href="/travel-guide">
              <button className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
                Read the Rulebook
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
