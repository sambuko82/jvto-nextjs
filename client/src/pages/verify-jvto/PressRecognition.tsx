'use client';

import { Link } from 'wouter';
import { JsonLd, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema([{"name":"Home","url":"/"},{"name":"Verify JVTO","url":"/verify-jvto"},{"name":"Press & Recognition","url":"/verify-jvto/PressRecognition"}])} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Press & Recognition: Third-Party Context
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 mt-8">Media and Editorial References</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-blue-900">Stefan Loose Travel Guide</h3>
              <p className="text-blue-800 text-sm mb-3">
                <strong>What it is:</strong> Stefan Loose is a German travel guide publisher known for independent, detailed destination guides. JVTO is referenced in their East Java guide.
              </p>
              <p className="text-blue-800 text-sm mb-3">
                <strong>Why it matters:</strong> Stefan Loose guides are known for rigorous editorial standards. Inclusion means JVTO passed independent verification and meets quality standards for tour operators.
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Where it fits:</strong> This is third-party editorial validation. It shows that JVTO is recognized by professional travel media, not just self-promotion.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">National and Local Press</h3>
              <p className="text-green-800 text-sm mb-3">
                <strong>What it is:</strong> JVTO has been featured in Indonesian media outlets covering tourism, business, and local news.
              </p>
              <p className="text-green-800 text-sm mb-3">
                <strong>Why it matters:</strong> Media coverage indicates that JVTO is established enough to be newsworthy and transparent enough to speak with journalists.
              </p>
              <p className="text-green-800 text-sm">
                <strong>Where it fits:</strong> This is local credibility and transparency. It shows JVTO is not hiding from public scrutiny.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-orange-900">Why These References Matter</h3>
              <p className="text-orange-800 text-sm">
                Press and editorial references are not paid advertising. They are independent third-party validation that JVTO is a legitimate, established operator worthy of coverage.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">Recognition in Context</h2>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-12">
            <p className="text-slate-700 mb-4">
              JVTO's press presence is not decorative. It reflects:
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Longevity</strong> — JVTO has been around long enough to be recognized by media and guidebooks.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Transparency</strong> — JVTO speaks openly with journalists and media outlets.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Quality</strong> — Inclusion in professional guides means JVTO meets editorial standards.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">Verification Links</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <a href="https://www.stefan-loose.de" target="_blank" rel="noopener noreferrer" className="p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
              <h3 className="font-bold mb-1">Stefan Loose Travel Guides</h3>
              <p className="text-sm text-muted-foreground">Professional travel guide publisher</p>
            </a>

            <Link href="/verify-jvto/legal">
              <button className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <h3 className="font-bold mb-1">Legal Proof</h3>
                <p className="text-sm text-muted-foreground">NIB, TDUP, business registration</p>
              </button>
            </Link>
          </div>
  </div>
      </section>
    </div>
  );
}
