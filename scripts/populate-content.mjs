#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '../client/src/pages');

// Content architecture mapping
const contentArchitecture = {
  'verify-jvto/Legal.tsx': {
    h1: 'Legal & Accountability Proof',
    h2s: [
      { title: 'Business Identity', h3s: ['NIB', 'TDUP', 'Legal Traceability'] },
      { title: 'Why This Matters', h3s: [] },
      { title: 'Document Access', h3s: [] }
    ]
  },
  'verify-jvto/PressRecognition.tsx': {
    h1: 'Press & Recognition: Third-Party Context',
    h2s: [
      { title: 'Media and Editorial References', h3s: ['National and Local Press', 'Guidebook Recognition', 'Why These References Matter'] },
      { title: 'Recognition in Context', h3s: [] },
      { title: 'Verification Links', h3s: [] }
    ]
  },
  'verify-jvto/HistoryArtifacts.tsx': {
    h1: 'History Artifacts: Documented Origins Since 2015',
    h2s: [
      { title: 'Origin Artifacts', h3s: ['Booking.com 2015', 'Address Continuity'] },
      { title: 'Editorial Artifacts', h3s: ['Stefan Loose', 'Photographic Evidence'] },
      { title: 'Why History Matters', h3s: [] }
    ]
  },
  'verify-jvto/PoliceSafety.tsx': {
    h1: 'Police & Safety Proof',
    h2s: [
      { title: 'Authority and Safety Evidence', h3s: ['Founder and Police Context', 'Operational Safety Proof', 'What This Means for Guests'] },
      { title: 'Verification Path', h3s: [] }
    ]
  },
  'travel-guide/BookingInformation.tsx': {
    h1: 'Booking Information – How JVTO Private Tours Work',
    h2s: [
      { title: 'How Booking Works', h3s: ['Step 1: Inquiry', 'Step 2: Confirmation', 'Step 3: Payment'] },
      { title: 'Payment Methods', h3s: ['Bank Transfer', 'WhatsApp Payment Coordination'] },
      { title: 'Cancellation & Refunds', h3s: ['Cancellation Policy', 'Refund Timeline'] },
      { title: 'FAQ', h3s: [] }
    ]
  },
  'travel-guide/IjenHealthScreening.tsx': {
    h1: 'Ijen Health Screening – Real Checks, Digital Proof',
    h2s: [
      { title: 'Why Health Screening Matters', h3s: ['Toxic Gas Hazard', 'Medical Necessity'] },
      { title: 'What the Screening Includes', h3s: ['Pre-Trek Assessment', 'Doctor Consultation', 'Gate Verification'] },
      { title: 'How to Prepare', h3s: ['Medical Conditions to Disclose', 'Fitness Requirements'] },
      { title: 'FAQ', h3s: [] }
    ]
  },
  'travel-guide/SafetyOnTours.tsx': {
    h1: 'Safety on JVTO Tours',
    h2s: [
      { title: 'Safety Systems', h3s: ['Guide Training', 'Equipment Standards', 'Emergency Protocols'] },
      { title: 'Risk Management', h3s: ['Volcano Hazards', 'Weather Monitoring', 'Group Size Control'] },
      { title: 'Your Role', h3s: ['Following Guide Instructions', 'Physical Fitness', 'Health Disclosure'] },
      { title: 'FAQ', h3s: [] }
    ]
  },
  'travel-guide/WeatherClosures.tsx': {
    h1: 'Weather, Volcano Alerts & Closures',
    h2s: [
      { title: 'Weather Patterns', h3s: ['Dry Season (May-October)', 'Wet Season (November-April)', 'Best Time to Visit'] },
      { title: 'Volcano Alerts & Closures', h3s: ['BBKSDA Alerts', 'Real-Time Monitoring', 'Rescheduling Policy'] },
      { title: 'What to Expect', h3s: ['Visibility Conditions', 'Temperature Variations'] },
      { title: 'FAQ', h3s: [] }
    ]
  },
  'travel-guide/PackingFitness.tsx': {
    h1: 'Packing & Fitness for Bromo, Ijen & Tumpak Sewu',
    h2s: [
      { title: 'What to Pack', h3s: ['Essential Gear', 'Clothing by Season', 'Personal Items'] },
      { title: 'Fitness Requirements', h3s: ['Bromo (Moderate)', 'Ijen (Challenging)', 'Tumpak Sewu (Moderate)'] },
      { title: 'Training Tips', h3s: ['Cardiovascular Fitness', 'Altitude Acclimatization'] },
      { title: 'FAQ', h3s: [] }
    ]
  },
  'travel-guide/PoliceEscort.tsx': {
    h1: 'Traffic Police Escort for Tourist Groups in East Java',
    h2s: [
      { title: 'What Is a Police Escort?', h3s: ['Safety Benefit', 'Traffic Navigation'] },
      { title: 'When It\'s Available', h3s: ['Group Size Requirements', 'Route Eligibility'] },
      { title: 'How It Works', h3s: ['Booking Process', 'Day-of Coordination'] },
      { title: 'FAQ', h3s: [] }
    ]
  },
  'policy/Policy.tsx': {
    h1: 'JVTO Policy Pack',
    h2s: [
      { title: 'Policy Overview', h3s: ['Booking Policy', 'Cancellation & Refunds', 'Inclusions & Exclusions'] },
      { title: 'Quick Links', h3s: [] }
    ]
  },
  'policy/InclusionsExclusions.tsx': {
    h1: 'Inclusions & Exclusions',
    h2s: [
      { title: 'What\'s Included', h3s: ['Transportation', 'Guide Services', 'Health Screening'] },
      { title: 'What\'s Not Included', h3s: ['Meals', 'Accommodation', 'Personal Expenses'] },
      { title: 'Optional Add-ons', h3s: ['Photography Services', 'Extra Stops'] },
      { title: 'FAQ', h3s: [] }
    ]
  },
  'Contact.tsx': {
    h1: 'Contact JVTO',
    h2s: [
      { title: 'Get in Touch', h3s: ['Email', 'WhatsApp', 'Office Location'] },
      { title: 'Response Time', h3s: [] },
      { title: 'FAQ', h3s: [] }
    ]
  }
};

function generateH2Section(h2) {
  let html = `          <h2 className="text-2xl font-bold mb-6 mt-8">${h2.title}</h2>\n`;
  
  if (h2.h3s && h2.h3s.length > 0) {
    html += `          <div className="space-y-4 mb-8">\n`;
    h2.h3s.forEach(h3 => {
      html += `            <div className="bg-card border border-border rounded-lg p-4">\n`;
      html += `              <h3 className="font-bold mb-2">${h3}</h3>\n`;
      html += `              <p className="text-muted-foreground text-sm">Content to be added.</p>\n`;
      html += `            </div>\n`;
    });
    html += `          </div>\n`;
  } else {
    html += `          <div className="bg-card border border-border rounded-lg p-6 mb-8">\n`;
    html += `            <p className="text-muted-foreground">Content to be added.</p>\n`;
    html += `          </div>\n`;
  }
  
  return html;
}

function generatePageContent(h1, h2s, breadcrumb) {
  const breadcrumbJson = JSON.stringify(breadcrumb);
  let h2Content = '';
  
  h2s.forEach(h2 => {
    h2Content += generateH2Section(h2);
  });
  
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
${h2Content}
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
`;
}

// Populate pages
Object.entries(contentArchitecture).forEach(([filePath, config]) => {
  const fullPath = path.join(pagesDir, filePath);
  
  // Generate breadcrumb
  const parts = filePath.split('/');
  const breadcrumb = [
    { name: 'Home', url: '/' }
  ];
  
  if (parts.length > 1) {
    const cluster = parts[0];
    const clusterNames = {
      'verify-jvto': 'Verify JVTO',
      'travel-guide': 'Travel Guide',
      'policy': 'Policies'
    };
    breadcrumb.push({ name: clusterNames[cluster] || cluster, url: `/${cluster}` });
  }
  
  const pageName = config.h1.split(':')[0].trim();
  breadcrumb.push({ name: pageName, url: fullPath.replace(/\.tsx$/, '').replace(pagesDir, '') });
  
  // Generate content
  const content = generatePageContent(config.h1, config.h2s, breadcrumb);
  
  // Write file
  fs.writeFileSync(fullPath, content);
  console.log(`✓ Populated: ${filePath}`);
});

console.log(`\n✓ Successfully populated ${Object.keys(contentArchitecture).length} pages with H2/H3 structure`);
