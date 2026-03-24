'use client';

import { Link } from 'wouter';
import { JsonLd, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema([{"name":"Home","url":"/"},{"name":"Verify JVTO","url":"/verify-jvto"},{"name":"Police & Safety Proof","url":"/verify-jvto/PoliceSafety"}])} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Police & Safety Proof
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 mt-8">Authority and Safety Evidence</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-blue-900">Founder and Police Context</h3>
              <p className="text-blue-800 text-sm mb-3">
                <strong>What it is:</strong> JVTO was founded by Bripka Agung Sambuko, an active Tourist Police officer in East Java. He brings operational safety expertise and police authority to the business.
              </p>
              <p className="text-blue-800 text-sm mb-3">
                <strong>Why it matters:</strong> The founder's police background means JVTO is not just a tour company. It is led by someone with official authority and safety responsibility.
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Where it fits:</strong> This is authority proof. It shows JVTO is not just a commercial operator; it is led by someone with official government responsibility for tourist safety.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">Operational Safety Proof</h3>
              <p className="text-green-800 text-sm mb-3">
                <strong>What it is:</strong> JVTO maintains documented safety protocols, guide certifications, and operational procedures for all tours.
              </p>
              <p className="text-green-800 text-sm mb-3">
                <strong>Why it matters:</strong> Safety is not improvised. JVTO has systems, training, and documentation to ensure guest safety on every tour.
              </p>
              <p className="text-green-800 text-sm">
                <strong>Where it fits:</strong> This is operational proof. It shows JVTO takes safety seriously with documented systems.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-orange-900">What This Means for Guests</h3>
              <p className="text-orange-800 text-sm">
                Police-led safety is not marketing language. It means your tour is led by someone with official responsibility for tourist safety and operational authority.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">Verification Path</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <Link href="/why-jvto/our-story">
              <button className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <h3 className="font-bold mb-1">Our Story</h3>
                <p className="text-sm text-muted-foreground">Founder background and continuity since 2015</p>
              </button>
            </Link>

            <Link href="/travel-guide/safety-on-tours">
              <button className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <h3 className="font-bold mb-1">Safety on Tours</h3>
                <p className="text-sm text-muted-foreground">Operational safety systems and procedures</p>
              </button>
            </Link>

            <Link href="/verify-jvto/legal">
              <button className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <h3 className="font-bold mb-1">Legal Proof</h3>
                <p className="text-sm text-muted-foreground">NIB, TDUP, business registration</p>
              </button>
            </Link>

            <Link href="/contact">
              <button className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <h3 className="font-bold mb-1">Contact JVTO</h3>
                <p className="text-sm text-muted-foreground">Ask questions about safety and credentials</p>
              </button>
            </Link>
          </div>
  </div>
      </section>
    </div>
  );
}
