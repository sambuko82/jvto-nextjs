import { GlobalLayout } from "@/components/GlobalLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight, Star, MapPin, Users, Shield, Lock, Fingerprint, Heart, FileText, Home as HomeIcon, Zap, Award, TrendingUp } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState<"IDR" | "USD" | "EUR" | "AUD" | "SGD">("IDR");
  
  // Fetch data from tRPC
  const { data: destinations } = trpc.destinations.list.useQuery();
  const { data: tours } = trpc.tours.list.useQuery({ departure: undefined });
  const { data: crew } = trpc.crew.list.useQuery(void 0);
  const { data: reviews } = trpc.reviews.list.useQuery({ featured: undefined });
  const { data: press } = trpc.press.list.useQuery(void 0);
  const { data: proofVault } = trpc.proofVault.list.useQuery({ section: undefined });
  const { data: faq } = trpc.faq.list.useQuery(void 0);

  // Featured tours (first 6)
  const featuredTours = tours?.slice(0, 6) || [];
  
  // Featured destinations (all 5)
  const allDestinations = destinations || [];
  
  // Featured crew (first 3)
  const featuredCrew = crew?.slice(0, 3) || [];
  
  // Featured reviews (first 3)
  const featuredReviews = reviews?.filter(r => r.isFeatured)?.slice(0, 3) || [];

  const exchangeRates = {
    USD: 0.0063,
    EUR: 0.0058,
    AUD: 0.0097,
    SGD: 0.0084,
  };

  const convertPrice = (idr: number, currency: string) => {
    if (currency === "IDR") return `IDR ${(idr / 1000000).toFixed(1)}M`;
    const rate = exchangeRates[currency as keyof typeof exchangeRates];
    return `≈ ${currency} ${(idr * rate).toFixed(0)}`;
  };

  return (
    <GlobalLayout>
      <div className="w-full">
        {/* SECTION B — HERO */}
        <section className="relative h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
          {/* Background image or video placeholder */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200')] bg-cover bg-center opacity-30" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            {/* Eyebrow */}
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-orange-500/50 bg-orange-500/10">
              <span className="text-orange-400 text-sm font-semibold tracking-widest">TOURIST POLICE-LED · 100% PRIVATE · VERIFIABLE</span>
            </div>

            {/* H1 */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Tourist Police-Led <span className="text-orange-500">Private Volcano Tours</span> in East Java
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Private Bromo, Ijen & Tumpak Sewu tours from Surabaya or Bali.
              Licensed operator (NIB: 1102230032918), led by an active Tourist Police officer.
              Your group. Your vehicle. Your guide. No strangers. Ever.
            </p>

            {/* Trust Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-sm text-slate-300">
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-400">✓</span> Licensed · NIB & TDUP No. 1102230032918
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-400">✓</span> Trustpilot 4.8★ · 47 verified reviews
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-400">✓</span> TripAdvisor 5.0★
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-400">✓</span> ISIC Partner · Student discount available
              </div>
            </div>

            {/* Hero CTA Row */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/tours">
                <a className="px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                  Browse Private Tours
                </a>
              </Link>
              <Link href="/verify-jvto">
                <a className="px-8 py-4 border-2 border-slate-400 text-white font-bold rounded-lg hover:bg-slate-700 transition">
                  Verify Our Credentials
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION C — ENTITY ANCHOR / DIRECT-ANSWER INTRO */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">What Is Java Volcano Tour Operator?</h2>
            
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Java Volcano Tour Operator (JVTO) — operating as PT Java Volcano Rendezvous
              (NIB: 1102230032918) — is a licensed private tour operator based in Bondowoso,
              East Java. Led by an active Tourist Police officer, JVTO runs 100% private Bromo,
              Ijen, and Tumpak Sewu expeditions from Surabaya or Bali, with mandatory health
              screening, verifiable credentials, and transparent written trip rules.
            </p>

            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              JVTO does not run shared buses or mixed-group tours. Every journey is
              dedicated to your group — your own vehicle, your own guide, your own pace.
              We are based in Bondowoso, the closest city to Ijen Crater, not a distant
              aggregator. Our credentials are publicly verifiable. Our policies are published
              before you pay a deposit.
            </p>

            <Link href="/verify-jvto">
              <a className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700">
                How to Verify JVTO <ChevronRight size={20} />
              </a>
            </Link>
          </div>
        </section>

        {/* SECTION D — WHAT MAKES JVTO DIFFERENT */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-orange-600 font-semibold tracking-widest mb-2">WHY TRAVELERS CHOOSE JVTO</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Duty First, Business Second</h2>
              <p className="text-xl text-slate-600">Six reasons that change when you read the evidence behind them.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
                <Shield className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Operations led by an active Tourist Police officer</h3>
                <p className="text-slate-700 mb-4">
                  Our founder holds active rank in Ditpamobvit East Java. This is not a marketing credential — it is a public record. Every route decision and safety protocol is shaped by institutional police discipline, not by sales targets.
                </p>
                <Link href="/verify-jvto">
                  <a className="text-orange-600 font-bold text-sm hover:text-orange-700">Verify police credentials →</a>
                </Link>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
                <Lock className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Your group only — no strangers, no shared buses, no exceptions</h3>
                <p className="text-slate-700 mb-4">
                  JVTO has never run a shared tour. Every package gives your group exclusive access to your vehicle, your driver, and your guide. "Private" is not a pricing tier here — it is the only mode we operate.
                </p>
                <Link href="/why-jvto">
                  <a className="text-orange-600 font-bold text-sm hover:text-orange-700">See what private means in practice →</a>
                </Link>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
                <Fingerprint className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">14 credentials, all independently verifiable</h3>
                <p className="text-slate-700 mb-4">
                  NIB registration, TDUP license, HPWKI guide licenses, police coordination documents, press coverage, and medical staff credentials — each with a direct URL to the issuing authority or a SHA-256 hash for integrity checks.
                </p>
                <Link href="/verify-jvto">
                  <a className="text-orange-600 font-bold text-sm hover:text-orange-700">Open the Proof Library →</a>
                </Link>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
                <Heart className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Mandatory health screening handled before every Ijen hike</h3>
                <p className="text-slate-700 mb-4">
                  Ijen Crater requires a pre-ascent medical check by law. JVTO includes this in every applicable package — conducted the evening before by a licensed physician (dr. Ahmad Irwandanu, SIP verified). No surprise payments at the gate.
                </p>
                <Link href="/travel-guide/ijen-health-screening">
                  <a className="text-orange-600 font-bold text-sm hover:text-orange-700">Health screening details →</a>
                </Link>
              </div>

              {/* Card 5 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
                <FileText className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Clear inclusions, exclusions, and cancellation terms — before you commit</h3>
                <p className="text-slate-700 mb-4">
                  Private transport, accommodation with breakfast, entrance fees, Bromo jeep, Ijen gear, and health screening are written down before you decide. No hidden "local payments." Cancel 48+ hours before Day 1: 100% JVTO Travel Credit, no expiry, transferable.
                </p>
                <Link href="/policy/booking-payment-cancellation">
                  <a className="text-orange-600 font-bold text-sm hover:text-orange-700">Read the full policy →</a>
                </Link>
              </div>

              {/* Card 6 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
                <MapPin className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Operating from Bondowoso — the closest city to Ijen Crater</h3>
                <p className="text-slate-700 mb-4">
                  JVTO grew from a local guesthouse in Bondowoso in 2010. Our guides hold HPWKI-recognized Ijen climbing licenses — not generic mountain guide certificates. We are not a Bali-based reseller or aggregator. We are 35 km from the Ijen trailhead.
                </p>
                <Link href="/why-jvto">
                  <a className="text-orange-600 font-bold text-sm hover:text-orange-700">Our story and team →</a>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
              <Link href="/why-jvto">
                <a className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">
                  Why We Are Different →
                </a>
              </Link>
              <Link href="/verify-jvto">
                <a className="px-6 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition">
                  Open the Verification Library →
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION E — DESTINATIONS WE OPERATE */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-orange-600 font-semibold tracking-widest mb-2">WHERE WE OPERATE</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">East Java Destinations</h2>
              <p className="text-xl text-slate-600">Every destination below has a dedicated route page — geology, logistics, difficulty, best season, and JVTO-specific operating notes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {allDestinations.map((dest) => (
                <Link key={dest.id} href={`/destinations/${dest.slug}`}>
                  <a className="group">
                    <div className="bg-slate-100 rounded-lg overflow-hidden mb-4 h-48 group-hover:shadow-lg transition">
                      <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <p className="text-sm text-orange-600 font-semibold mb-2">{dest.category} · {dest.altitude}m</p>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{dest.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{dest.description?.substring(0, 100)}...</p>
                    <span className="text-orange-600 font-bold text-sm group-hover:text-orange-700">{dest.title} Routes →</span>
                  </a>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/destinations">
                <a className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">
                  All Destinations →
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION F — CHOOSE YOUR DEPARTURE CITY */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Where Are You Starting From?</h2>
            <p className="text-xl text-slate-600 text-center mb-12">Every JVTO tour is structured around your departure city. Choose your starting point below to see the right packages.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Surabaya Card */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">From Surabaya</h3>
                <div className="space-y-3 mb-6 text-slate-700">
                  <p><strong>12 private tour packages</strong></p>
                  <p>Duration range: 1 day to 6 days</p>
                  <p>Destinations: Bromo, Ijen, Tumpak Sewu, Madakaripura, Malang, Papuma</p>
                  <p>Nearest airport: Juanda International (SUB)</p>
                  <p className="text-orange-600 font-bold">Starting from: IDR 1,000,000/pax (group rate, 1-day Bromo)</p>
                </div>
                <p className="text-slate-600 mb-6">Best for: travelers arriving into East Java directly, or starting an overland route from Surabaya before connecting to Bali.</p>
                <Link href="/tours">
                  <a className="inline-block px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                    Browse Surabaya Tours →
                  </a>
                </Link>
              </div>

              {/* Bali Card */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">From Bali</h3>
                <div className="space-y-3 mb-6 text-slate-700">
                  <p><strong>4 private tour packages</strong></p>
                  <p>Duration range: 3 days to 5 days</p>
                  <p>Destinations: Ijen, Bromo, Tumpak Sewu, Papuma, Madakaripura</p>
                  <p>Nearest airport: Ngurah Rai (DPS) — ferry crossing to Java included</p>
                  <p className="text-orange-600 font-bold">Starting from: IDR 2,850,000/pax (group rate)</p>
                </div>
                <p className="text-slate-600 mb-6">Best for: travelers already in Bali who want a connected East Java route without arranging transfers separately.</p>
                <Link href="/tours">
                  <a className="inline-block px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                    Browse Bali Tours →
                  </a>
                </Link>
              </div>
            </div>

            {/* Pricing Transparency Note */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-sm text-slate-700">
                <strong>ⓘ Pricing shown is per-person, group-scaled.</strong> The rate decreases with more travelers in your group. For 2 people on a 3-day tour: from IDR 3,570,000/pax. Full pricing table is shown on every individual tour page.
              </p>
              <Link href="/policy/booking-payment-cancellation">
                <a className="text-blue-600 font-bold text-sm hover:text-blue-700">How pricing works →</a>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION G — FEATURED PRIVATE TOURS */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div>
                <p className="text-orange-600 font-semibold tracking-widest mb-2">PRIVATE TOUR PACKAGES</p>
                <h2 className="text-4xl font-bold text-slate-900">Featured Tours</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-700">Show prices in:</span>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value as any)}
                  className="px-4 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="IDR">IDR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="AUD">AUD</option>
                  <option value="SGD">SGD</option>
                </select>
              </div>
            </div>

            <p className="text-xl text-slate-600 mb-12">All tours below are 100% private. Your group only. Duration, inclusions, and day-by-day itinerary are documented on each tour page.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour, idx) => (
                <Link key={tour.id} href={`/tours/${tour.slug}`}>
                  <a className="group">
                    <div className="bg-slate-100 rounded-lg overflow-hidden mb-4 h-48 group-hover:shadow-lg transition relative">
                      <img src={tour.image || ''} alt={tour.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                      {idx === 2 && <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">Most Popular</div>}
                    </div>
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">{tour.duration}</span>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">{tour.departureFrom}</span>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">{tour.physicality}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{tour.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{tour.description?.substring(0, 80)}...</p>
                    <p className="text-orange-600 font-bold mb-2">{convertPrice(tour.pricePerPerson, selectedCurrency)}</p>
                    <span className="text-orange-600 font-bold text-sm group-hover:text-orange-700">View Tour Details →</span>
                  </a>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/tours">
                <a className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">
                  View All 16 Tour Packages →
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION H — OUR STORY */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <p className="text-orange-600 font-semibold tracking-widest mb-2">OUR STORY</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-8">From Local Host to Police-Led Operator</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <p className="text-slate-700 leading-relaxed mb-6">
                  JVTO began in 2010 in Bondowoso — not as a travel agency, but as a local family guesthouse that happened to be the closest accommodation to Ijen Crater. Our founder, Bripka Agung "Mr. Sam" Sambuko, worked as a Tourist Police officer while hosting travelers who arrived without guides, without health checks, and without realistic information about what Ijen actually involves.
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  What he saw repeatedly — unprepared visitors, rushed itineraries, minimal safety infrastructure — shaped a decision. In 2013, he formalized operations under PT Java Volcano Rendezvous and rebuilt the tour model from the ground up: private only, health screening included, written policies before payment, transparent pricing.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  By 2015, JVTO had received a Booking.com Guest Review Award. By 2018, the operation had been cited in the Stefan Loose Indonesia guidebook (4th Edition, page 287) as a named Ijen tour operator. By 2023, full NIB and TDUP licensing formalized the legal structure. Trustpilot shows the ongoing guest record.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="mb-6">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Founder" className="w-full h-64 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-bold text-slate-900">Bripka Agung "Mr. Sam" Sambuko</h3>
                  <p className="text-sm text-slate-600 mb-4">Founder · Active Tourist Police, Ditpamobvit East Java</p>
                  <p className="text-sm text-slate-600 mb-6">Credentials: SPRIN POLPAR · HPWKI Partner · NIB 1102230032918</p>
                  <blockquote className="border-l-4 border-orange-500 pl-4 italic text-slate-700">
                    "We saw the gaps in safety standards first-hand and decided to build something different."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="font-bold text-orange-600 min-w-fit">2010</span>
                  <span className="text-slate-700">Local guesthouse in Bondowoso begins hosting Ijen visitors</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-orange-600 min-w-fit">2013</span>
                  <span className="text-slate-700">PT Java Volcano Rendezvous formally established</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-orange-600 min-w-fit">2015</span>
                  <span className="text-slate-700">Booking.com Guest Review Award</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-orange-600 min-w-fit">2018</span>
                  <span className="text-slate-700">Cited in Stefan Loose Indonesia guidebook, page 287</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-orange-600 min-w-fit">2023</span>
                  <span className="text-slate-700">Full NIB + TDUP licensing · HPWKI formal membership</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/our-story">
                <a className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">
                  Read the Full Story →
                </a>
              </Link>
              <Link href="/team">
                <a className="px-6 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition">
                  Meet the 14-Person Team →
                </a>
              </Link>
              <Link href="/verify-jvto">
                <a className="px-6 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition">
                  How to Verify Us →
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION I — MANDATORY REQUIREMENT */}
        <section className="py-20 px-6 bg-blue-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Mandatory Requirement for Kawah Ijen Hikers</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <p className="text-slate-700 mb-6">
                Kawah Ijen is a high-altitude volcano with active sulfur gas. Indonesian law requires a health certificate before ascending.
              </p>
              <p className="font-bold text-slate-900 mb-4">JVTO includes this in every applicable Ijen package:</p>
              <ul className="space-y-3 text-slate-700 mb-6">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Medical screening conducted by dr. Ahmad Irwandanu (SIP verified at satusehat.kemkes.go.id)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Checks: SpO2, blood pressure, heart rate, respiratory history</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Screening conducted the evening before the hike at your Bondowoso hotel — not at the trailhead</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Cost included in your tour package</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Digital QR verification accepted at Ijen gate</span>
                </li>
              </ul>
              <p className="text-slate-700 mb-2"><strong>Age requirement:</strong> 10–60 years old</p>
              <p className="text-slate-700 mb-2"><strong>No extra payment required at the gate.</strong></p>
              <p className="text-slate-700"><strong>No self-printed letters accepted.</strong></p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Student? ISIC Cardholders Get a Discount.</h3>
              <p className="text-slate-700 mb-4">
                JVTO is an official ISIC partner. If you hold a valid ISIC card, you qualify for a student rate on selected packages.
              </p>
              <Link href="/isic">
                <a className="inline-block px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                  Check ISIC Eligibility →
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION J — INTERNATIONAL GUESTS */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Serving International Travelers in East Java</h2>
            
            <div className="bg-slate-50 p-8 rounded-lg mb-8">
              <p className="text-slate-700 mb-6">
                <strong>JVTO serves independent international travelers from:</strong>
              </p>
              <p className="text-slate-700 mb-6 text-lg">
                Singapore · Malaysia · Hong Kong · Taiwan · Australia · Netherlands · Germany · France · United Kingdom · United States
              </p>
              <p className="text-slate-700 mb-6">
                <strong>All tours are conducted in English.</strong> All written trip rules, policies, and health guidance are in English.
              </p>
              <p className="text-slate-700 mb-6">
                <strong>Pickup is available from:</strong>
              </p>
              <ul className="space-y-2 text-slate-700 mb-6">
                <li>→ Surabaya Juanda International Airport (SUB) and surrounding hotels</li>
                <li>→ Bali Ngurah Rai Airport (DPS) and surrounding hotels</li>
              </ul>
              <p className="text-slate-700">
                <strong>First time in East Java?</strong> Our Travel Guide covers everything: driving distances, volcanic risk levels, what to pack, and what to expect from a private guided expedition.
              </p>
            </div>

            <Link href="/travel-guide">
              <a className="inline-block px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">
                Open Travel Guide →
              </a>
            </Link>
          </div>
        </section>

        {/* SECTION K — INDEPENDENT REVIEW SOURCES */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-orange-600 font-semibold tracking-widest mb-2">GUEST REVIEWS</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Guests Say — At the Source</h2>
              <p className="text-xl text-slate-600">We encourage you to read reviews where they were written — not just where we display them. The platforms below are independently managed.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Trustpilot */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Trustpilot</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-slate-900">4.8</span>
                  <div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className={i < 5 ? "fill-orange-500 text-orange-500" : "text-slate-300"} />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">47 verified reviews</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-6">Independent, open to any customer</p>
                <a href="https://www.trustpilot.com/review/javavolcano-touroperator.com" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                  Open Trustpilot Profile ↗
                </a>
              </div>

              {/* TripAdvisor */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">TripAdvisor</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-slate-900">5.0</span>
                  <div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="fill-orange-500 text-orange-500" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">Independent review platform</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-6">Trusted travel review source</p>
                <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                  Open TripAdvisor Profile ↗
                </a>
              </div>

              {/* Google Maps */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Google Maps</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-slate-900">4.9</span>
                  <div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className={i < 5 ? "fill-orange-500 text-orange-500" : "text-slate-300"} />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">Google Business Profile</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-6">Verified business listing</p>
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                  Open Google Maps ↗
                </a>
              </div>
            </div>

            <div className="text-center">
              <Link href="/reviews">
                <a className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition mr-4">
                  Full Reviews Registry →
                </a>
              </Link>
              <a href="https://indecon.id" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition">
                JVTO on Indecon →
              </a>
            </div>
          </div>
        </section>

        {/* SECTION L — VERIFY JVTO INDEPENDENTLY */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-orange-600 font-semibold tracking-widest mb-2">PROOF LIBRARY</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Verify JVTO Before You Book</h2>
              <p className="text-xl text-slate-600">We do not ask travelers to take our word for anything. Every credential below links to a verification page with documents, external registry URLs, or cryptographic proofs for those who want to go deeper.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Legal Identity */}
              <div className="bg-slate-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Legal Identity</h3>
                <ul className="text-slate-700 space-y-2 mb-6">
                  <li>· NIB (Nomor Induk Berusaha): 1102230032918</li>
                  <li>· TDUP (Tourism Business License)</li>
                  <li>· PT registration at ahu.go.id</li>
                </ul>
                <Link href="/verify-jvto">
                  <a className="text-orange-600 font-bold hover:text-orange-700">Verify Legal Identity →</a>
                </Link>
              </div>

              {/* Police & Safety */}
              <div className="bg-slate-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Police & Safety</h3>
                <ul className="text-slate-700 space-y-2 mb-6">
                  <li>· SPRIN POLPAR (Tourist Police assignment order)</li>
                  <li>· BBKSDA SAR and First Aid training records</li>
                  <li>· Ijen guide licenses (HPWKI-issued)</li>
                </ul>
                <Link href="/verify-jvto">
                  <a className="text-orange-600 font-bold hover:text-orange-700">Verify Police & Safety →</a>
                </Link>
              </div>

              {/* Press & Recognition */}
              <div className="bg-slate-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Press & Recognition</h3>
                <ul className="text-slate-700 space-y-2 mb-6">
                  <li>· Detik.com feature article</li>
                  <li>· Radar Jember coverage</li>
                  <li>· Stefan Loose Indonesia guidebook (p. 287, 4th Ed.)</li>
                  <li>· Booking.com Guest Review Award (2015)</li>
                </ul>
                <Link href="/verify-jvto">
                  <a className="text-orange-600 font-bold hover:text-orange-700">Verify Press & Recognition →</a>
                </Link>
              </div>
            </div>

            <div className="text-center">
              <Link href="/verify-jvto">
                <a className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">
                  Open the Full Verification Hub →
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION M — PLAN BEFORE YOU BOOK */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Plan First, Then Decide</h2>
            <p className="text-xl text-slate-600 text-center mb-12">
              Read the rulebook before you book. JVTO publishes its travel guide — health requirements, weather risks, packing lists, and the exact booking flow — before you pay a deposit. Informed guests have better experiences. That is the point.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Card 1 */}
              <Link href="/travel-guide/booking-information">
                <a className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Booking & Payments</h3>
                  <p className="text-slate-700 text-sm mb-4">What to expect: deposit flow, payment methods, balance deadlines.</p>
                  <span className="text-orange-600 font-bold text-sm">Read →</span>
                </a>
              </Link>

              {/* Card 2 */}
              <Link href="/travel-guide/ijen-health-screening">
                <a className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Ijen Health Screening</h3>
                  <p className="text-slate-700 text-sm mb-4">What to expect: who is checked, what is measured, what disqualifies.</p>
                  <span className="text-orange-600 font-bold text-sm">Read →</span>
                </a>
              </Link>

              {/* Card 3 */}
              <Link href="/travel-guide/weather-and-closures">
                <a className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Weather & Volcanic Closures</h3>
                  <p className="text-slate-700 text-sm mb-4">What to expect: seasonal access, JVTO's alternative route SOP.</p>
                  <span className="text-orange-600 font-bold text-sm">Read →</span>
                </a>
              </Link>

              {/* Card 4 */}
              <Link href="/travel-guide/packing-and-fitness">
                <a className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Packing & Fitness</h3>
                  <p className="text-slate-700 text-sm mb-4">What to expect: gear list, fitness expectations per route, age guidelines.</p>
                  <span className="text-orange-600 font-bold text-sm">Read →</span>
                </a>
              </Link>
            </div>

            <div className="text-center">
              <Link href="/travel-guide">
                <a className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">
                  Open the Full Travel Guide →
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION N — FAQ */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions About JVTO Tours</h2>

            <div className="space-y-8">
              {faq?.map((item, idx) => (
                <div key={item.id} className="border-b border-slate-200 pb-8 last:border-b-0">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.question}</h3>
                  <p className="text-slate-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </GlobalLayout>
  );
}
