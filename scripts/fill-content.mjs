#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '../client/src/pages');

// Content templates for Verify JVTO pages
const verifyJVTOContent = {
  'verify-jvto/PressRecognition.tsx': `
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
  `,

  'verify-jvto/HistoryArtifacts.tsx': `
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
  `,

  'verify-jvto/PoliceSafety.tsx': `
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
  `
};

// Content templates for Travel Guide pages
const travelGuideContent = {
  'travel-guide/BookingInformation.tsx': `
          <h2 className="text-3xl font-bold mb-8 mt-8">How Booking Works</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-blue-900">Step 1: Inquiry</h3>
              <p className="text-blue-800 text-sm mb-3">
                Contact JVTO via WhatsApp, email, or the contact form with your tour preferences: dates, group size, route (Bromo, Ijen, Tumpak Sewu), and any special requirements.
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Response time:</strong> Usually within 2 hours during business hours (8am-6pm East Java time).
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">Step 2: Confirmation</h3>
              <p className="text-green-800 text-sm mb-3">
                JVTO confirms availability, provides a detailed itinerary, and sends a booking agreement with pricing, inclusions, and terms.
              </p>
              <p className="text-green-800 text-sm">
                <strong>What to expect:</strong> Clear pricing breakdown, no hidden fees, cancellation policy, and health screening requirements if Ijen is included.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-orange-900">Step 3: Payment</h3>
              <p className="text-orange-800 text-sm mb-3">
                Payment is made via bank transfer or coordinated via WhatsApp. A deposit secures your dates; final payment is due 7 days before the tour.
              </p>
              <p className="text-orange-800 text-sm">
                <strong>Security:</strong> All payments go to PT Java Volcano Rendezvous, a registered business entity. You receive an invoice and payment confirmation.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">Payment Methods</h2>
          
          <div className="space-y-4 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">Bank Transfer</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Direct transfer to JVTO's registered business bank account. Most secure and traceable option.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">WhatsApp Payment Coordination</h3>
              <p className="text-muted-foreground text-sm mb-4">
                JVTO can coordinate payment details via WhatsApp for convenience. All payments still go to the registered business account.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">Cancellation & Refunds</h2>
          
          <div className="space-y-4 mb-12">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-bold mb-3">Cancellation Policy</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>More than 30 days before:</strong> Full refund minus 10% administrative fee</li>
                <li><strong>15-30 days before:</strong> 50% refund</li>
                <li><strong>Less than 15 days before:</strong> No refund (tour date held for rescheduling)</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-bold mb-3">Refund Timeline</h3>
              <p className="text-sm text-slate-700 mb-2">
                Refunds are processed within 5-7 business days after cancellation confirmation.
              </p>
              <p className="text-sm text-slate-700">
                <strong>Note:</strong> Volcano closures or government restrictions may result in automatic rescheduling or full refund at guest's choice.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">FAQ</h2>
          
          <div className="space-y-4 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">Can I book last-minute?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, if availability exists. Contact JVTO directly via WhatsApp for immediate response.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">What if I need to reschedule?</h3>
              <p className="text-muted-foreground text-sm">
                Rescheduling is free if done more than 15 days before your tour date. Contact JVTO to arrange new dates.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">Is the deposit refundable?</h3>
              <p className="text-muted-foreground text-sm">
                The deposit is refundable according to the cancellation policy. If the volcano closes, you can reschedule or request a full refund.
              </p>
            </div>
          </div>
  `,

  'travel-guide/IjenHealthScreening.tsx': `
          <h2 className="text-3xl font-bold mb-8 mt-8">Why Health Screening Matters</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-red-900">Toxic Gas Hazard</h3>
              <p className="text-red-800 text-sm mb-3">
                <strong>What it is:</strong> Mount Ijen contains sulfuric gas vents. Exposure to high concentrations can cause respiratory distress, especially in people with asthma, heart conditions, or respiratory illness.
              </p>
              <p className="text-red-800 text-sm">
                <strong>Why it matters:</strong> Not everyone can safely climb Ijen. Health screening ensures you know your fitness level and any risks before committing to the tour.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-orange-900">Medical Necessity</h3>
              <p className="text-orange-800 text-sm mb-3">
                <strong>What it is:</strong> JVTO requires a real medical check before Ijen tours, not just a questionnaire.
              </p>
              <p className="text-orange-800 text-sm">
                <strong>Why it matters:</strong> This is not bureaucracy. It is guest safety. A doctor's assessment is the only way to know if Ijen is safe for you.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">What the Screening Includes</h2>
          
          <div className="space-y-4 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">Pre-Trek Assessment</h3>
              <p className="text-muted-foreground text-sm mb-4">
                JVTO asks about medical history, current medications, respiratory conditions, heart conditions, and fitness level.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">Doctor Consultation</h3>
              <p className="text-muted-foreground text-sm mb-4">
                A licensed medical doctor reviews your health history and determines if Ijen is safe for you. This is a real medical assessment, not a form.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">Gate Verification</h3>
              <p className="text-muted-foreground text-sm mb-4">
                At the Ijen gate, your health clearance is verified before entry. This is a requirement by the park authority.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">How to Prepare</h2>
          
          <div className="space-y-4 mb-12">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-bold mb-3">Medical Conditions to Disclose</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Asthma or respiratory conditions</li>
                <li>• Heart conditions or high blood pressure</li>
                <li>• Pregnancy</li>
                <li>• Recent surgery or injury</li>
                <li>• Medications that affect breathing or heart rate</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-bold mb-3">Fitness Requirements</h3>
              <p className="text-sm text-slate-700 mb-2">
                Ijen requires moderate fitness. You should be able to walk 2-3 hours at a steady pace with elevation changes.
              </p>
              <p className="text-sm text-slate-700">
                <strong>Tip:</strong> If you have not exercised in months, consider light training before the trek.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-12">FAQ</h2>
          
          <div className="space-y-4 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">What if I don't pass the health screening?</h3>
              <p className="text-muted-foreground text-sm">
                If the doctor determines Ijen is not safe for you, JVTO can offer alternative tours (Bromo, Tumpak Sewu) or a full refund.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">Can I skip the health screening?</h3>
              <p className="text-muted-foreground text-sm">
                No. Health screening is mandatory for Ijen tours. It is a park requirement and a safety requirement.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-2">How much does the health screening cost?</h3>
              <p className="text-muted-foreground text-sm">
                The screening is included in the tour price. No additional cost.
              </p>
            </div>
          </div>
  `
};

// Function to update file with new content
function updatePageContent(filePath, newContent) {
  const fullPath = path.join(pagesDir, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  try {
    let fileContent = fs.readFileSync(fullPath, 'utf-8');
    
    // Find and replace the content section
    const contentStart = fileContent.indexOf('<div className="max-w-3xl mx-auto">');
    const contentEnd = fileContent.lastIndexOf('</div>\n      </section>');
    
    if (contentStart === -1 || contentEnd === -1) {
      console.log(`⚠️  Could not find content section in ${filePath}`);
      return false;
    }

    const beforeContent = fileContent.substring(0, contentStart + '<div className="max-w-3xl mx-auto">'.length);
    const afterContent = fileContent.substring(contentEnd);
    
    const updatedContent = beforeContent + newContent + afterContent;
    
    fs.writeFileSync(fullPath, updatedContent);
    console.log(`✓ Updated: ${filePath}`);
    return true;
  } catch (error) {
    console.log(`✗ Error updating ${filePath}: ${error.message}`);
    return false;
  }
}

// Update all Verify JVTO pages
let verifyCount = 0;
Object.entries(verifyJVTOContent).forEach(([filePath, content]) => {
  if (updatePageContent(filePath, content)) {
    verifyCount++;
  }
});

// Update all Travel Guide pages
let guideCount = 0;
Object.entries(travelGuideContent).forEach(([filePath, content]) => {
  if (updatePageContent(filePath, content)) {
    guideCount++;
  }
});

console.log(`\n✓ Successfully updated ${verifyCount} Verify JVTO pages`);
console.log(`✓ Successfully updated ${guideCount} Travel Guide pages`);
console.log(`✓ Total: ${verifyCount + guideCount} pages filled with content`);
