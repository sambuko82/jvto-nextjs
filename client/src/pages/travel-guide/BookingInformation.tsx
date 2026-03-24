'use client';

import { Link } from 'wouter';
import { JsonLd, buildBreadcrumbSchema, JVTO_ORGANIZATION_SCHEMA } from '@/components/JsonLd';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={buildBreadcrumbSchema([{"name":"Home","url":"/"},{"name":"Travel Guide","url":"/travel-guide"},{"name":"Booking Information – How JVTO Private Tours Work","url":"/travel-guide/BookingInformation"}])} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Booking Information – How JVTO Private Tours Work
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
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
  </div>
      </section>
    </div>
  );
}
