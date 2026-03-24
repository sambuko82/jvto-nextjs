'use client';

import { Link } from 'wouter';
import { JsonLd, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function CommunityStandards() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Why JVTO', url: '/why-jvto' },
        { name: 'Community Standards', url: '/why-jvto/community-standards' }
      ])} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Community Standards: Partners, Ethics & Operational Rules
          </h1>
          <p className="text-xl text-slate-300">
            How JVTO operates within the East Java tourism ecosystem
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Partner Grid</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">HPWKI</h3>
              <p className="text-muted-foreground text-sm">
                Himpunan Pelaku Wisata Khusus Ijen — Official special-interest tourism association for Ijen operators. JVTO guides must pass BBKSDA safety training.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">ISIC</h3>
              <p className="text-muted-foreground text-sm">
                International Student Identity Card. JVTO is an official ISIC benefit provider offering verified student discounts.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">INDECON</h3>
              <p className="text-muted-foreground text-sm">
                Indonesian Ecotourism Network. JVTO is affiliated with Indonesia's national sustainable tourism body.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Ditpamobvit</h3>
              <p className="text-muted-foreground text-sm">
                East Java Tourist Police. JVTO founder is an active member, making police oversight integral to operations.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8">Guest Meaning</h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            These partnerships mean JVTO doesn't operate in isolation. We're accountable to professional standards, community ethics, and government oversight.
          </p>

          <h2 className="text-3xl font-bold mb-8">Operational Standards</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 text-blue-900">Private Tour Rule</h3>
              <p className="text-blue-800">
                Every JVTO tour is 100% private. We never mix client groups to fill seats. This is operational policy, not a premium upsell.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 text-green-900">Health Screening Requirement</h3>
              <p className="text-green-800">
                Kawah Ijen has toxic gases. JVTO conducts physician-supervised pre-trek health screening for all Ijen tours. This is mandatory, not optional.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 text-orange-900">Fairness Principle</h3>
              <p className="text-orange-800">
                JVTO operates transparently. Pricing is clear, policies are documented, and guest expectations are set before payment.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/verify-jvto">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Verify JVTO
              </button>
            </Link>
            <Link href="/tours">
              <button className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
                Explore Tours
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
