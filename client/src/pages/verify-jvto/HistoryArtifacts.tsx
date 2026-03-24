'use client';

import { Link } from 'wouter';
import { JsonLd, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema([{"name":"Home","url":"/"},{"name":"Verify JVTO","url":"/verify-jvto"},{"name":"History Artifacts","url":"/verify-jvto/HistoryArtifacts"}])} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            History Artifacts: Documented Origins Since 2015
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 mt-8">Origin Artifacts</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-blue-900">Booking.com Guest Review Award (2015)</h3>
              <p className="text-blue-800 text-sm mb-3">
                <strong>What it is:</strong> In 2015, JVTO received a Booking.com award for guest satisfaction and service quality.
              </p>
              <p className="text-blue-800 text-sm mb-3">
                <strong>Why it matters:</strong> This award proves that JVTO was operating and receiving positive guest feedback over 10 years ago. It is not a new startup.
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Where it fits:</strong> This is continuity proof. It shows JVTO has been in the business for over a decade with consistent guest satisfaction.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">Address Continuity</h3>
              <p className="text-green-800 text-sm mb-3">
                <strong>What it is:</strong> JVTO's business address has remained consistent since 2015, showing stable operations and not a fly-by-night operation.
              </p>
              <p className="text-green-800 text-sm mb-3">
                <strong>Why it matters:</strong> A stable address over 10 years indicates a real, established business with physical presence in East Java.
              </p>
              <p className="text-green-800 text-sm">
                <strong>Where it fits:</strong> This is operational stability. It means you can find JVTO, not just online.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">Editorial Artifacts</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-orange-900">Stefan Loose Guidebook Reference</h3>
              <p className="text-orange-800 text-sm mb-3">
                <strong>What it is:</strong> JVTO is featured in the Stefan Loose East Java travel guide, a professional editorial publication.
              </p>
              <p className="text-orange-800 text-sm mb-3">
                <strong>Why it matters:</strong> Inclusion in a professional guidebook means JVTO passed independent editorial review.
              </p>
              <p className="text-orange-800 text-sm">
                <strong>Where it fits:</strong> This is editorial credibility. It shows JVTO is recognized by professional travel media.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-yellow-900">Photographic Evidence</h3>
              <p className="text-yellow-800 text-sm mb-3">
                <strong>What it is:</strong> JVTO maintains a documented archive of guest photos, team photos, and tour documentation since 2015.
              </p>
              <p className="text-yellow-800 text-sm mb-3">
                <strong>Why it matters:</strong> Real operational history is documented in photos. This is not a website-only business.
              </p>
              <p className="text-yellow-800 text-sm">
                <strong>Where it fits:</strong> This is operational evidence. It shows JVTO actually conducts tours with real guests.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">Why History Matters</h2>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-12">
            <p className="text-slate-700 mb-4">
              History is not nostalgia. It is proof of continuity and stability.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>10+ years of operation</strong> means JVTO is not a startup. It has survived market changes and maintained guest satisfaction.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Consistent address</strong> means JVTO has physical presence and stability in East Java.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Editorial recognition</strong> means JVTO was vetted by professional travel media.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Documented operations</strong> means JVTO actually conducts tours, not just sells them online.</span>
              </li>
            </ul>
          </div>
  </div>
      </section>
    </div>
  );
}
