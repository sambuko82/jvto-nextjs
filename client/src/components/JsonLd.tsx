/**
 * JsonLd — injects JSON-LD structured data into the document head.
 * Usage: <JsonLd data={schemaObject} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(Array.isArray(data) ? data : data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

// ─── Pre-built schema factories ──────────────────────────────────────────────

export const JVTO_ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://javavolcano-touroperator.com/#organization",
  "name": "Java Volcano Tour Operator",
  "alternateName": "JVTO",
  "legalName": "PT Java Volcano Rendezvous",
  "url": "https://javavolcano-touroperator.com",
  "logo": "https://javavolcano-touroperator.com/logo.png",
  "description": "Licensed private tour operator specialising in volcano and nature expeditions in East Java, Indonesia. Founded and led by active East Java Tourist Police officer Bripka Agung Sambuko.",
  "foundingDate": "2010",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Kapten Piere Tendean, Kec. Bondowoso",
    "addressLocality": "Bondowoso",
    "addressRegion": "East Java",
    "postalCode": "68211",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -7.9148,
    "longitude": 113.8200
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "telephone": "+62-822-4478-8833",
    "availableLanguage": ["English", "Indonesian"]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "44",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.trustpilot.com/review/javavolcano-touroperator.com",
    "https://isic.org/discounts/?providerId=259268",
    "https://indecon.id/spotlight-networks/java-volcano-tour-operator"
  ]
};

export const JVTO_WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://javavolcano-touroperator.com/#website",
  "url": "https://javavolcano-touroperator.com",
  "name": "Java Volcano Tour Operator",
  "description": "Private volcano tours in East Java — Mount Bromo, Ijen Crater, Tumpak Sewu, Madakaripura. Tourist Police-led. 100% private.",
  "publisher": {
    "@id": "https://javavolcano-touroperator.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://javavolcano-touroperator.com/tours?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export function buildTourSchema(tour: {
  name: string;
  slug: string;
  description: string;
  pricePerPerson: number;
  duration: string;
  departure?: string;
  departureFrom?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.name,
    "description": tour.description,
    "url": `https://javavolcano-touroperator.com/tours/${tour.slug}`,
    "provider": {
      "@id": "https://javavolcano-touroperator.com/#organization"
    },
    "touristType": "Adventure tourists, nature travellers",
    "itinerary": {
      "@type": "ItemList",
      "name": tour.name
    },
    "offers": {
      "@type": "Offer",
      "price": tour.pricePerPerson,
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01"
    }
  };
}

export function buildDestinationSchema(dest: {
  title: string;
  slug: string;
  description: string;
  altitude?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": dest.title,
    "description": dest.description,
    "url": `https://javavolcano-touroperator.com/destinations/${dest.slug}`,
    "touristType": "Adventure tourists, nature travellers",
    "containedInPlace": {
      "@type": "Place",
      "name": "East Java, Indonesia"
    }
  };
}

export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
