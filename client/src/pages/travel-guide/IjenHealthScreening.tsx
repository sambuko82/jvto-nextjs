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
  </div>
      </section>
    </div>
  );
}
