#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '../client/src/pages');

const pagesToCreate = [
  // Verify JVTO Cluster
  {
    path: 'verify-jvto/Legal.tsx',
    h1: 'Legal & Accountability Proof',
    route: '/verify-jvto/legal',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Verify JVTO', url: '/verify-jvto' },
      { name: 'Legal Proof', url: '/verify-jvto/legal' }
    ]
  },
  {
    path: 'verify-jvto/PressRecognition.tsx',
    h1: 'Press & Recognition: Third-Party Context',
    route: '/verify-jvto/press-recognition',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Verify JVTO', url: '/verify-jvto' },
      { name: 'Press Recognition', url: '/verify-jvto/press-recognition' }
    ]
  },
  {
    path: 'verify-jvto/HistoryArtifacts.tsx',
    h1: 'History Artifacts: Documented Origins Since 2015',
    route: '/verify-jvto/history-artifacts',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Verify JVTO', url: '/verify-jvto' },
      { name: 'History', url: '/verify-jvto/history-artifacts' }
    ]
  },
  {
    path: 'verify-jvto/PoliceSafety.tsx',
    h1: 'Police & Safety Proof',
    route: '/verify-jvto/police-safety',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Verify JVTO', url: '/verify-jvto' },
      { name: 'Police Safety', url: '/verify-jvto/police-safety' }
    ]
  },
  // Travel Guide Cluster
  {
    path: 'travel-guide/BookingInformation.tsx',
    h1: 'Booking Information – How JVTO Private Tours Work',
    route: '/travel-guide/booking-information',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Travel Guide', url: '/travel-guide' },
      { name: 'Booking Info', url: '/travel-guide/booking-information' }
    ]
  },
  {
    path: 'travel-guide/IjenHealthScreening.tsx',
    h1: 'Ijen Health Screening – Real Checks, Digital Proof',
    route: '/travel-guide/ijen-health-screening',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Travel Guide', url: '/travel-guide' },
      { name: 'Ijen Health Screening', url: '/travel-guide/ijen-health-screening' }
    ]
  },
  {
    path: 'travel-guide/SafetyOnTours.tsx',
    h1: 'Safety on JVTO Tours',
    route: '/travel-guide/safety-on-tours',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Travel Guide', url: '/travel-guide' },
      { name: 'Safety', url: '/travel-guide/safety-on-tours' }
    ]
  },
  {
    path: 'travel-guide/WeatherClosures.tsx',
    h1: 'Weather, Volcano Alerts & Closures',
    route: '/travel-guide/weather-and-closures',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Travel Guide', url: '/travel-guide' },
      { name: 'Weather & Closures', url: '/travel-guide/weather-and-closures' }
    ]
  },
  {
    path: 'travel-guide/PackingFitness.tsx',
    h1: 'Packing & Fitness for Bromo, Ijen & Tumpak Sewu',
    route: '/travel-guide/packing-and-fitness',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Travel Guide', url: '/travel-guide' },
      { name: 'Packing & Fitness', url: '/travel-guide/packing-and-fitness' }
    ]
  },
  {
    path: 'travel-guide/PoliceEscort.tsx',
    h1: 'Traffic Police Escort for Tourist Groups in East Java',
    route: '/travel-guide/police-escort-for-groups',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Travel Guide', url: '/travel-guide' },
      { name: 'Police Escort', url: '/travel-guide/police-escort-for-groups' }
    ]
  },
  // Policy Cluster
  {
    path: 'policy/Policy.tsx',
    h1: 'JVTO Policy Pack',
    route: '/policy',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Policies', url: '/policy' }
    ]
  },
  {
    path: 'policy/InclusionsExclusions.tsx',
    h1: 'Inclusions & Exclusions',
    route: '/policy/inclusions-exclusions',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Policies', url: '/policy' },
      { name: 'Inclusions & Exclusions', url: '/policy/inclusions-exclusions' }
    ]
  },
  // Contact
  {
    path: 'Contact.tsx',
    h1: 'Contact JVTO',
    route: '/contact',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' }
    ]
  }
];

function generatePageContent(h1, breadcrumb) {
  const breadcrumbJson = JSON.stringify(breadcrumb);
  
  return `'use client';

import { Link } from 'wouter';
import { JsonLd, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema(${breadcrumbJson})} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            ${h1}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8">
            <p className="text-lg text-muted-foreground mb-6">
              This page is under construction. Content will be added soon.
            </p>
            <Link href="/">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
`;
}

// Create pages
pagesToCreate.forEach(page => {
  const fullPath = path.join(pagesDir, page.path);
  const dir = path.dirname(fullPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Generate content
  const content = generatePageContent(page.h1, page.breadcrumb);
  
  // Write file
  fs.writeFileSync(fullPath, content);
  console.log(`✓ Created: ${page.path}`);
});

console.log(`\n✓ Successfully created ${pagesToCreate.length} pages`);
