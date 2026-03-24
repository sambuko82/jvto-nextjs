'use client';

import { Link } from 'wouter';
import { JsonLd, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema([{"name":"Home","url":"/"},{"name":"Verify JVTO","url":"/verify-jvto"},{"name":"Legal & Accountability Proof","url":"/verify-jvto/Legal"}])} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Legal & Accountability Proof
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          {/* Business Identity Section */}
          <h2 className="text-3xl font-bold mb-8 mt-8">Business Identity</h2>
          
          <div className="space-y-6 mb-12">
            {/* NIB */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-blue-900">NIB (Nomor Induk Berusaha)</h3>
              <p className="text-blue-800 mb-4">
                <strong>1102230032918</strong>
              </p>
              <p className="text-blue-800 text-sm mb-3">
                <strong>What it is:</strong> Indonesia's unified business identification number, issued by the Ministry of Law and Human Rights through the OSS (Online Single Submission) system.
              </p>
              <p className="text-blue-800 text-sm mb-3">
                <strong>Why it matters:</strong> The NIB is the legal proof that JVTO (PT Java Volcano Rendezvous) is a registered business entity in Indonesia. It is required for all commercial operations and tax compliance.
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Where it fits:</strong> This is the foundation of operational legitimacy. Without a valid NIB, JVTO could not legally operate tours or accept payments.
              </p>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <a href="https://oss.go.id" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Verify on OSS.go.id →
                </a>
              </div>
            </div>

            {/* TDUP */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">TDUP (Tanda Daftar Usaha Pariwisata)</h3>
              <p className="text-green-800 mb-4">
                <strong>Tourism Business Registration Certificate</strong>
              </p>
              <p className="text-green-800 text-sm mb-3">
                <strong>What it is:</strong> Indonesia's official tourism business license, issued by the Ministry of Tourism and Creative Economy. It certifies that a business meets operational standards for tourism activities.
              </p>
              <p className="text-green-800 text-sm mb-3">
                <strong>Why it matters:</strong> The TDUP proves that JVTO has been vetted and approved by Indonesia's tourism authority. It confirms compliance with safety, operational, and service standards specific to tour operators.
              </p>
              <p className="text-green-800 text-sm">
                <strong>Where it fits:</strong> This is the operational authorization layer. It shows that JVTO is not just registered as a business, but specifically authorized to conduct tourism activities.
              </p>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-green-700 text-sm">
                  Available upon request. Contact JVTO for verification.
                </p>
              </div>
            </div>

            {/* Legal Traceability */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-orange-900">Legal Traceability</h3>
              <p className="text-orange-800 mb-4">
                <strong>Business Name:</strong> PT Java Volcano Rendezvous
              </p>
              <p className="text-orange-800 text-sm mb-3">
                <strong>What it is:</strong> JVTO's formal legal entity name, registered with Indonesia's Ministry of Law and Human Rights.
              </p>
              <p className="text-orange-800 text-sm mb-3">
                <strong>Why it matters:</strong> The legal entity name ensures that contracts, payments, and liability are tied to a specific, traceable business. This protects both JVTO and guests by creating clear legal accountability.
              </p>
              <p className="text-orange-800 text-sm">
                <strong>Where it fits:</strong> This is the accountability layer. It means that every tour, every payment, and every guest interaction is legally documented and traceable to a specific registered entity.
              </p>
            </div>
          </div>

          {/* Why This Matters Section */}
          <h2 className="text-3xl font-bold mb-8 mt-12">Why This Matters</h2>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-12">
            <p className="text-slate-700 mb-4">
              Legal proof is not decorative. It is the foundation of operational certainty.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>NIB + TDUP</strong> means JVTO is not an informal operator or a one-person side business. It is a registered, licensed, and accountable company.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Legal registration</strong> means your payment is tied to a traceable business entity, not a personal bank account or cash arrangement.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Tourism license</strong> means JVTO has been vetted by Indonesia's government for safety and operational standards.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Traceability</strong> means if something goes wrong, there is a clear legal entity to hold accountable.</span>
              </li>
            </ul>
          </div>

          {/* Document Access Section */}
          <h2 className="text-3xl font-bold mb-8 mt-12">Document Access</h2>
          
          <div className="space-y-4 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">Public Records</h3>
              <p className="text-muted-foreground text-sm mb-4">
                NIB and basic business information are publicly searchable on Indonesia's OSS portal.
              </p>
              <a href="https://oss.go.id" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 font-medium text-sm">
                Search on OSS.go.id →
              </a>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">Direct Request</h3>
              <p className="text-muted-foreground text-sm mb-4">
                For TDUP, business certificates, or other legal documents, contact JVTO directly.
              </p>
              <Link href="/contact">
                <button className="text-primary hover:text-primary/80 font-medium text-sm">
                  Contact JVTO →
                </button>
              </Link>
            </div>
          </div>

          {/* Related Proof Links */}
          <h2 className="text-3xl font-bold mb-8 mt-12">Related Proof</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <Link href="/verify-jvto/history-artifacts">
              <button className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <h3 className="font-bold mb-1">History Artifacts</h3>
                <p className="text-sm text-muted-foreground">Booking.com award, Stefan Loose guidebook reference, continuity since 2015</p>
              </button>
            </Link>

            <Link href="/verify-jvto/police-safety">
              <button className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <h3 className="font-bold mb-1">Police & Safety Proof</h3>
                <p className="text-sm text-muted-foreground">Founder credentials, operational safety systems, guide certifications</p>
              </button>
            </Link>

            <Link href="/verify-jvto/press-recognition">
              <button className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <h3 className="font-bold mb-1">Press & Recognition</h3>
                <p className="text-sm text-muted-foreground">Media coverage, editorial references, third-party validation</p>
              </button>
            </Link>

            <Link href="/travel-guide">
              <button className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <h3 className="font-bold mb-1">Travel Guide</h3>
                <p className="text-sm text-muted-foreground">Operational transparency, booking process, safety standards</p>
              </button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
