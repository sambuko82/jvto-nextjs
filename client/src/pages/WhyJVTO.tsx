'use client';

import { Link } from 'wouter';
import { ExternalLink, CheckCircle, Shield, Award, Users, Heart, Lock, Globe } from 'lucide-react';
import { JsonLd, buildFAQSchema, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function WhyJVTO() {
  // 7 visual reasons (simplified from 14)
  const reasons = [
    {
      icon: Shield,
      title: 'Tourist Police-Led',
      description: 'Founder is active Ditpamobvit Tourist Police (NRP: 87040755)',
      proof: 'Police ID verified',
      proofLink: '/verify-jvto/'
    },
    {
      icon: Award,
      title: 'Legally Licensed',
      description: 'NIB 1102230032918 + HPWKI + BBKSDA permits',
      proof: 'All credentials verified',
      proofLink: '/verify-jvto/'
    },
    {
      icon: Lock,
      title: 'SHA-256 Verified',
      description: 'Cryptographic proof of document authenticity',
      proof: 'Evidence locker',
      proofLink: '/verify-jvto/#evidence-locker'
    },
    {
      icon: Globe,
      title: '5.0★ TripAdvisor',
      description: '4.8★ Trustpilot (44+ verified reviews)',
      proof: 'Independent reviews',
      proofLink: 'https://www.tripadvisor.com',
      external: true
    },
    {
      icon: Heart,
      title: 'Health Screening',
      description: 'Physician-supervised at Kawah Ijen',
      proof: 'Medical checkpoint',
      proofLink: '/travel-guide/ijen-health-screening/'
    },
    {
      icon: Users,
      title: 'Private Tours Only',
      description: 'No shared groups, no strangers',
      proof: 'Exclusive experience',
      proofLink: '/tours/'
    },
    {
      icon: Award,
      title: 'Press Featured',
      description: 'Stefan Loose, Detik.com, Radar Jember',
      proof: 'Media coverage',
      proofLink: '/verify-jvto/#press'
    }
  ];

  const faqs = [
    {
      question: 'Is JVTO legally registered?',
      answer: 'Yes. PT Java Volcano Rendezvous, NIB 1102230032918, verified at oss.go.id. Operating since 2015 at same address.'
    },
    {
      question: 'How do I verify your credentials?',
      answer: 'Visit /verify-jvto/ for SHA-256 cryptographic verification of all licenses, permits, and certifications.'
    },
    {
      question: 'Why is health screening required?',
      answer: 'Kawah Ijen has toxic gases. Dr. Ahmad Irwandanu performs medical screening to ensure safe participation.'
    },
    {
      question: 'Are tours really private?',
      answer: 'Yes, 100% private. Your group only, your vehicle, your dedicated guide. Never mixed with other clients.'
    },
    {
      question: 'What if I\'m a student?',
      answer: 'ISIC members get verified discounts. Visit /isic/ for details.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Why JVTO', url: '/why-jvto' }
      ])} />
      <JsonLd data={buildFAQSchema(faqs)} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Why Choose JVTO
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            7 reasons why JVTO is the only choice for safe, verified volcano tours in East Java
          </p>
        </div>
      </section>

      {/* 7 Reasons Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, idx) => {
              const IconComponent = reason.icon;
              return (
                <Link key={idx} href={reason.proofLink || '#'}>
                  <div className="group cursor-pointer bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {reason.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <CheckCircle className="w-4 h-4" />
                      {reason.proof}
                      {reason.external && <ExternalLink className="w-3 h-3" />}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-3 text-card-foreground">
                  {idx + 1}. {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our verified tours and experience the safest volcano adventure in East Java
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours/">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Browse Tours
              </button>
            </Link>
            <Link href="/verify-jvto/">
              <button className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
                Verify Credentials
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
