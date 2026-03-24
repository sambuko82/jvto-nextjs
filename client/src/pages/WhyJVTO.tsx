import React from 'react';
import { Link } from 'wouter';
import { ExternalLink, CheckCircle } from 'lucide-react';

export default function WhyJVTO() {
  const reasons = [
    {
      title: 'Active Tourist Police Leadership',
      description: 'Our founder and operational head, Bripka Agung Sambuko (NRP: 87040755), is an active member of Indonesia\'s Ditpamobvit Tourist Police unit — the division specifically assigned to protect tourists at national destinations. This is not a honorary title or past career. He is on duty and your safety is his legal mandate.',
      proof: 'Tourist Police ID',
      proofLink: '/verify-jvto/'
    },
    {
      title: 'Licensed by the Indonesian Government',
      description: 'JVTO operates under NIB license number 1102230032918, issued under PT Java Volcano Rendezvous — a formal perseroan terbatas (limited liability company) registered with Indonesia\'s Online Single Submission system. This is the only legally required business license for tour operators in Indonesia.',
      proof: 'NIB certificate',
      proofLink: '/verify-jvto/'
    },
    {
      title: 'Official Ijen Climbing Permits',
      description: 'Every JVTO guide carries an official BBKSDA Jatim climbing permit — the regional conservation authority permit legally required to operate inside Kawah Ijen\'s restricted zone. Operators without these permits are legally prohibited from leading tours inside the crater area.',
      proof: 'Climbing permit documents',
      proofLink: '/verify-jvto/'
    },
    {
      title: 'HPWKI-Certified Guide Team',
      description: 'All guides are members of HPWKI (Himpunan Pelaku Wisata Khusus Ijen) — the official special-interest tourism association for Ijen operators. HPWKI membership requires passing BBKSDA safety training covering Search & Rescue, toxic gas protocols, and volcanic emergency procedures. Your guide is not a freelancer.',
      proof: 'HPWKI approval document',
      proofLink: '/verify-jvto/'
    },
    {
      title: 'SHA-256 Forensic Document Verification',
      description: 'Every critical JVTO document — licenses, police credentials, guide certificates — has a publicly available SHA-256 cryptographic hash. This means you can mathematically verify that any document we show you has not been altered or fabricated. No other East Java tour operator offers this.',
      proof: 'Forensic Evidence Locker',
      proofLink: '/verify-jvto/#evidence-locker'
    },
    {
      title: '5.0/5 on TripAdvisor',
      description: 'JVTO holds a 5.0/5 rating on TripAdvisor — the maximum possible score — across all independent reviews. TripAdvisor\'s algorithm removes suspicious reviews automatically. This rating reflects genuine guest experience, not paid placements.',
      proof: 'TripAdvisor Reviews',
      proofLink: 'https://www.tripadvisor.com',
      external: true
    },
    {
      title: '4.8/5 on Trustpilot',
      description: 'Trustpilot is a European-standard review platform that requires verified purchase history. JVTO\'s 4.8/5 Trustpilot score (44+ verified reviews) places us in the top tier of boutique adventure operators globally.',
      proof: 'Trustpilot Reviews',
      proofLink: 'https://www.trustpilot.com/review/javavolcano-touroperator.com',
      external: true
    },
    {
      title: 'Ijen Health Screening — Real, Not Rubber-Stamp',
      description: 'JVTO is the only operator that conducts a physician-supervised pre-trek health screening at Kawah Ijen, performed by dr. Ahmad Irwandanu (STR: QN00001073380217). Results are digitally recorded and accessible via QR code at health.mountijen.com. This is not a waiver form — it is a medical checkpoint.',
      proof: 'Health screening details',
      proofLink: '/travel-guide/ijen-health-screening/'
    },
    {
      title: 'Mentioned in Stefan Loose Travel Guide (2018)',
      description: 'JVTO (operating as Ijen Bondowoso Homestay) is listed in the Stefan Loose Reiseführer Indonesien, 4th Edition (ISBN-13: 978-3-7701-7881-0, published DuMont Reiseverlag, 2018). Stefan Loose is Germany\'s most trusted independent travel guidebook series — inclusion requires editorial vetting, not payment.',
      proof: 'Press documentation',
      proofLink: '/verify-jvto/#press'
    },
    {
      title: 'Booking.com Traveller Review Award — 9.4/10 (2015)',
      description: 'Before we were JVTO, we operated as Ijen Bondowoso Homestay. In 2015, Booking.com awarded us a 9.4/10 score — documented by the physical award plaque at our Bondowoso office. This proves over a decade of verified hospitality excellence at the same address.',
      proof: 'Historical proof',
      proofLink: '/verify-jvto/#history'
    },
    {
      title: 'ISIC Partner — Student Discount Available',
      description: 'JVTO is an official ISIC (International Student Identity Card) benefit provider — the only internationally recognised student card accepted in 130 countries. Students booking with a valid ISIC card receive a verified discount. ISIC only partners with vetted, quality-assured operators.',
      proof: 'ISIC student discount details',
      proofLink: '/isic/'
    },
    {
      title: 'INDECON Member — Sustainable Ecotourism',
      description: 'JVTO is affiliated with INDECON (Indonesian Ecotourism Network), Indonesia\'s national sustainable tourism body. This membership is not self-declared — it reflects adherence to community-based tourism principles, environmental responsibility, and local economic empowerment.',
      proof: null,
      proofLink: null
    },
    {
      title: '100% Private Tours — No Strangers, No Shared Vans',
      description: 'Every JVTO tour is exclusively private. Your group — and no one else\'s — in your vehicle, with your dedicated guide. We have never, and will never, mix client groups to fill seats. This is operational policy, not a premium upsell.',
      proof: null,
      proofLink: null
    },
    {
      title: 'Detik.com & Radar Jember Press Coverage',
      description: 'Our founder\'s work has been independently covered by Detik.com (Indonesia\'s largest digital news platform) and Radar Jember, both documenting his Tourist Police service during COVID-19 tourist protection operations and his role in establishing Ijen Geopark safety protocols.',
      proof: 'Press coverage',
      proofLink: '/verify-jvto/#press'
    }
  ];

  const faqs = [
    {
      question: 'Is JVTO a legitimate, legally registered tour operator?',
      answer: 'Yes. Java Volcano Tour Operator is registered as PT Java Volcano Rendezvous under Indonesian business law, with NIB license number 1102230032918 issued via the Online Single Submission (OSS) portal. This registration is publicly verifiable at oss.go.id. The company has operated continuously since 2015 under the same ownership and at the same registered address in Bondowoso, East Java.'
    },
    {
      question: 'Does JVTO mix strangers in the same tour group?',
      answer: 'No. JVTO operates exclusively private tours. Your booking is for your group only — regardless of group size, from 1 to 11+ people. We do not combine bookings from different parties into shared vehicles or shared guide assignments under any circumstance.'
    },
    {
      question: 'Who leads JVTO tours — are guides professionally qualified?',
      answer: 'All JVTO guides are members of HPWKI (Himpunan Pelaku Wisata Khusus Ijen), which requires passing official BBKSDA Jatim safety training. Additionally, all guides hold official Ijen climbing permits from the conservation authority. Our operational head, Bripka Agung Sambuko, is an active Tourist Police officer with over a decade of operational service at Kawah Ijen.'
    },
    {
      question: 'How do I verify JVTO\'s credentials myself?',
      answer: 'Visit our Forensic Evidence Locker at /verify-jvto/ where every document — NIB license, police credentials, HPWKI approval, guide permits — is displayed with its SHA-256 cryptographic hash. You can download each document and verify the hash yourself using any free SHA-256 checker tool. This is an open, mathematically verifiable proof system.'
    },
    {
      question: 'What happens if I need to cancel my tour?',
      answer: 'Cancellations made 48 hours or more before departure receive a JVTO Travel Credit equal to 100% of your deposit — valid for 12 months. Cancellations within 48 hours or no-shows forfeit the deposit. We do not issue cash refunds under any circumstance; our Travel Credit policy is our commitment to rescheduling flexibility over punitive loss.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="py-12 px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Travel With Java Volcano Tour Operator?</h1>
          <p className="text-xl text-slate-200">
            JVTO is a fully licensed East Java tour operator (NIB: 1102230032918) led by Bripka Agung Sambuko, an active Tourist Police officer. Every guide holds an official Ijen climbing permit and HPWKI certification. Our credentials are SHA-256 cryptographically verified and independently reviewed on Trustpilot (4.8/5) and TripAdvisor (5.0/5).
          </p>
        </div>
      </section>

      {/* Section A — AEO Answer Block */}
      <section className="py-12 px-6 bg-blue-50 border-l-4 border-blue-500">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What makes Java Volcano Tour Operator different?</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            Java Volcano Tour Operator (JVTO) is a fully licensed East Java tour operator (NIB: 1102230032918) led by Bripka Agung Sambuko, an active Tourist Police officer. Every guide holds an official Ijen climbing permit and HPWKI certification. Our credentials are SHA-256 cryptographically verified and independently reviewed on Trustpilot (4.8/5) and TripAdvisor (5.0/5).
          </p>
          <p className="text-sm text-slate-600 mt-4 italic">
            This 55-word block is optimized for AI Overview and featured snippet extraction.
          </p>
        </div>
      </section>

      {/* Section B — 14 Verified Reasons */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">14 Reasons — Verified, Not Claimed</h2>
          <p className="text-lg text-slate-700 mb-12">
            Every operator promises a "best experience." We show our work. Below are 14 reasons to book with JVTO — each backed by a document, a number, or a third-party source you can verify independently.
          </p>

          <ol className="space-y-8 list-decimal list-inside">
            {reasons.map((reason, index) => (
              <li key={index} className="text-slate-700">
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{reason.title}</h3>
                  <p className="mb-3">{reason.description}</p>
                  {reason.proof && (
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-orange-500 flex-shrink-0" />
                      {reason.external ? (
                        <a
                          href={reason.proofLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 font-bold hover:text-orange-700 inline-flex items-center gap-1"
                        >
                          {reason.proof}
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <Link href={reason.proofLink}>
                          <span className="text-orange-600 font-bold hover:text-orange-700 cursor-pointer">
                            {reason.proof}
                          </span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Section C — FAQ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Common Questions Before Booking</h2>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{faq.question}</h3>
                <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D — CTA Block */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to verify everything yourself?</h2>
          <p className="text-xl mb-12 text-orange-100">
            Our complete credential library is open to the public — documents, hashes, press clippings, and legal filings.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/verify-jvto">
              <button className="px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-slate-100 transition">
                Explore the Evidence Locker →
              </button>
            </Link>
            <Link href="/tours">
              <button className="px-8 py-3 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition border-2 border-white">
                See all tours & pricing →
              </button>
            </Link>
            <a
              href="https://wa.me/6282244788833"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-slate-100 transition inline-flex items-center justify-center gap-2"
            >
              WhatsApp Mr. Sam directly →
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
