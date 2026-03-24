'use client';

import { Link } from 'wouter';
import { JsonLd, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema([{"name":"Home","url":"/"},{"name":"Travel Guide","url":"/travel-guide"},{"name":"Ijen Health Screening – Real Checks, Digital Proof","url":"/travel-guide/IjenHealthScreening"}])} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Ijen Health Screening – Real Checks, Digital Proof
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 mt-8">Why Health Screening Matters</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Toxic Gas Hazard</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Medical Necessity</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 mt-8">What the Screening Includes</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Pre-Trek Assessment</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Doctor Consultation</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Gate Verification</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 mt-8">How to Prepare</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Medical Conditions to Disclose</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Fitness Requirements</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 mt-8">FAQ</h2>
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <p className="text-muted-foreground">Content to be added.</p>
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
