'use client';

import { Link } from 'wouter';
import { JsonLd, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema([{"name":"Home","url":"/"},{"name":"Travel Guide","url":"/travel-guide"},{"name":"Safety on JVTO Tours","url":"/travel-guide/SafetyOnTours"}])} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Safety on JVTO Tours
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 mt-8">Safety Systems</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Guide Training</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Equipment Standards</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Emergency Protocols</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 mt-8">Risk Management</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Volcano Hazards</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Weather Monitoring</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Group Size Control</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 mt-8">Your Role</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Following Guide Instructions</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Physical Fitness</h3>
              <p className="text-muted-foreground text-sm">Content to be added.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-2">Health Disclosure</h3>
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
