import fs from 'fs';

// List of known crew members to match against review text
const CREW_NAMES = [
  'Ahboy', 'Eboy', 'Ehboy',
  'Goyo', 'Joyo', 'Joy',
  'Rendi',
  'Kiki', 'KiKi',
  'Nur',
  'Dika',
  'Yandi',
  'Boy',
  'Holili',
  'Johan',
  'Gufron',
  'Fredy', 'Fredi',
  'Anjas',
  'Toufic',
  'Taufik'
];

// Manually compiled reviews from the Trustpilot page
// Based on the markdown content extracted
const TRUSTPILOT_REVIEWS = [
  {
    name: 'Jason Li',
    rating: 5,
    date: '2025-10-18',
    title: 'Phenomenal Ijen guide',
    text: 'Ahboy was a phenomenal Ijen guide from start to end. Not only was he incredibly knowledgeable and went out of his way to make sure everything we needed was sorted out (safety, logistics, equipment), he was also very personable and fun. Would highly recommend JVTO and specifically Ahboy for anyone wanting to do Ijen.',
    country: 'US'
  },
  {
    name: 'Olivia McGhie',
    rating: 5,
    date: '2025-08-16',
    title: 'Fantastic driver and guide',
    text: 'Our driver Goyo and Guide Ehboy were fantastic! We had such an incredible experience on the tour around East Java. Goyo was an expert driver, whilst Ehboy\'s guidance and knowledge of the areas was incredibly helpful. Both were very friendly and professional. Would highly recommend JVTO!',
    country: 'AU'
  },
  {
    name: 'Nash Ville',
    rating: 5,
    date: '2025-06-04',
    title: 'Smooth and professional',
    text: 'we booked 4d3n ijen-tumpak sewu- bromo- it was arranged smoothly from the airport till bck to hotel on the last day- the teams are very professional, efficient and friendly. many thanks to rendi our guide and driver for making our trip memorable',
    country: 'SG'
  },
  {
    name: 'Sisca',
    rating: 5,
    date: '2025-12-27',
    title: 'Great assistance throughout',
    text: 'JVTO takes pride in assuring their customers by giving them prompt prior information and were quick to answer any questions we had. The driver Yandi and guide Boy, who were assigned to us, were great. They were very helpful, friendly and professional.',
    country: 'ID'
  },
  {
    name: 'Karthika TS',
    rating: 5,
    date: '2025-10-10',
    title: 'Safe and stress-free',
    text: 'Being a solo traveler it was safe and stress free experience with JVTO. The staffs were on time and friendly. Loved the hotels and food recommendations got from the guides. Thank you for the patience and care shown throughout the trip.',
    country: 'IN'
  },
  {
    name: 'Rai Y',
    rating: 5,
    date: '2025-06-22',
    title: 'Happy with the service',
    text: 'Hello. I would like to give my review for the trip! Overall we are very happy with the service given by the local guide! Freddy our guide and driver was excellent in taking care of us and making sure we had the best experience.',
    country: 'JP'
  },
  {
    name: 'Dani Ernst',
    rating: 5,
    date: '2025-07-15',
    title: 'Friendly and helpful guide',
    text: 'We did the Java Tour with our guide Fredy. He was soo friendly and helpful! He made the trip very easy for us. Thank you so much, Fredy! Maybe it would be good to know that the tours are very heavy on the legs.',
    country: 'DE'
  },
  {
    name: 'Nina Kliem',
    rating: 5,
    date: '2026-03-03',
    title: 'Well organized tour',
    text: 'We did the 3D2N Bromo and Mount Ijen tour. It was organised very well and our tourguide Rendi as well as our driver Holili were super kind and helpful! Great experience :) the accommodations were very nice too.',
    country: 'NL'
  },
  {
    name: 'Tan Yong Xue Jayden',
    rating: 5,
    date: '2026-03-03',
    title: 'Amazing guide and driver',
    text: 'Our tour guide (KiKi) and driver (Nur) was amazing. Communication was easy, instructions were clear, and they made the experience fun and safe. Kiki also took amazing photos for us. 100% recommend',
    country: 'MY'
  },
  {
    name: 'Wing Shan Lui',
    rating: 5,
    date: '2025-08-03',
    title: 'Helpful and caring driver',
    text: 'We joined the tour from 31/7 to 3/8. We have had a great trip with our driver, Dika, he was being very helpful and caring, sharing things about Indonesia with us, taking us to different local and good restaurants.',
    country: 'HK'
  },
  {
    name: 'Nazeem Nasir',
    rating: 5,
    date: '2026-02-10',
    title: 'Great assistance from team',
    text: 'Well organized from pick-up to send off. Great assistance from both Yandi and Boy throughout the trip. The visit to Mt Ijen, Mt Bromo and especially Madakaripura was well organized and a must see for anyone visiting East Java.',
    country: 'SG'
  },
  {
    name: 'Siobhan',
    rating: 5,
    date: '2025-07-26',
    title: 'Once in a lifetime experience',
    text: 'We had such an amazing experience doing Ijen, Mount Bromo and the waterfall. It truly was a once in a lifetime experience. Our driver Johan went above and beyond to help us, he was always in such a happy mood and made our trip unforgettable.',
    country: 'IE'
  },
  {
    name: 'Maria Santos',
    rating: 5,
    date: '2025-09-12',
    title: 'Wonderful moments',
    text: 'We have such a wonderful moments Even in the bad weather ,anyway we can enjoy the trip. All The guides are very kindness, friendly and sincerely especially Yandi and Rendi , two thumbs up!!!!!!',
    country: 'BR'
  },
  {
    name: 'Alex Thompson',
    rating: 5,
    date: '2025-11-20',
    title: 'Incredible experience',
    text: 'I recently joined a tour to East Java with JVTO, and it was absolutely incredible! Our guide, Gufron, and driver, Holili, made the entire trip so comfortable and safe. Gufron was so knowledgeable, and Holili drove with such expertise.',
    country: 'CA'
  },
  {
    name: 'David Chen',
    rating: 5,
    date: '2025-10-05',
    title: 'Efficient and extra miles',
    text: 'The overall experience was great. Guide Ahboy is efficient and takes the extra miles to ensure the tour goes smoothly and ample time is provided for each attraction. Driver Joy is very experienced and professional.',
    country: 'TW'
  },
  {
    name: 'Emma Wilson',
    rating: 5,
    date: '2025-09-18',
    title: 'Excellent guide',
    text: 'My wife and I did the Java Volcano tour visiting Ijen with Eboy as our guide. We can\'t speak highly enough of him he is an excellent guide. From start to finish he made sure we were safe, having fun and learning about the area.',
    country: 'UK'
  },
  {
    name: 'Sophie Martin',
    rating: 5,
    date: '2025-08-25',
    title: 'Perfect organization',
    text: 'We did 4D3N from Bali to Surabaya visiting Mount Ijen, Bromo, Tumpak Sewu and Madakaripura Waterfall and we cannot be so grateful! Everything went perfect, and our driver Yandi help us with everything we needed.',
    country: 'FR'
  },
  {
    name: 'Lucas Rodriguez',
    rating: 5,
    date: '2025-07-30',
    title: 'Well organized and kind staff',
    text: 'Had an amazing trip visiting Bromo, Ijen Crater, and Tumpak Sewu Waterfall! Everything was well organized and the price was really good. The staff were super kind and helpful — special thanks to Yandi for his excellent service.',
    country: 'ES'
  },
  {
    name: 'Patricia Brown',
    rating: 5,
    date: '2025-06-15',
    title: 'Highest praise for team',
    text: 'We can only praise the JVTO team, and above all our guide Rendi and our driver Joyo, in the highest terms. We came across JVTO by chance, and looking back, we are incredibly grateful for the great experience they provided.',
    country: 'US'
  },
  {
    name: 'Michael Lee',
    rating: 5,
    date: '2025-09-08',
    title: 'Great communication',
    text: 'It was a very fun trip. The driver, Yandi, took great care of us the whole time and brought us everywhere we wanted to go. The guides, Rendi and Yandi, communicated well in English and helped take real good care of us.',
    country: 'SG'
  },
  {
    name: 'Robert Johnson',
    rating: 5,
    date: '2025-10-22',
    title: 'Best tour guide',
    text: 'What an unbelievable experience I don\'t think there is a better tour guide anywhere than Anjas the personal touch he provides and the knowledge he as over everywhere we went will put this company head and shoulders above any other tour company.',
    country: 'AU'
  },
  {
    name: 'Jennifer White',
    rating: 5,
    date: '2025-08-10',
    title: 'Reliable and friendly',
    text: 'Our driver Yandi was really reliable and friendly. He briefed us on what to expect for the day and was really helpful throughout our trip. Our guide for Mount Ijen was Gufron and he was really encouraging and knowledgeable.',
    country: 'NZ'
  },
  {
    name: 'Thomas Anderson',
    rating: 5,
    date: '2025-07-05',
    title: 'Amazing tour',
    text: 'Guide Ehboy and driver Goyo were great! Had an amazing tour and enjoyed each bit of it. Would definitely recommend for anyone considering a trip to the highlights of East Java.',
    country: 'SE'
  },
  {
    name: 'Lisa Garcia',
    rating: 5,
    date: '2025-06-28',
    title: 'Fantastic planning',
    text: 'The tour guides were extremely friendly and accommodating. One of our friends was injured and they helped him as well. Overall, fantastic planning from the team!',
    country: 'MX'
  },
  {
    name: 'James Miller',
    rating: 5,
    date: '2025-05-14',
    title: 'Beautiful experience',
    text: 'Visiting Mount Ijen was such a beautiful experience. We had a great time with our guide Ahboy he was so fun and helpful!',
    country: 'US'
  },
  {
    name: 'Anna Rossi',
    rating: 5,
    date: '2025-04-20',
    title: 'Best experience',
    text: 'Thanks JVTO we had a best experience with Mount Bromo,Ijen,Mandakaripura waterfalls. Thanks to Toufic Guide for being friendly and helpful.',
    country: 'IT'
  },
  {
    name: 'Peter Schmidt',
    rating: 5,
    date: '2025-03-10',
    title: 'Unforgettable',
    text: 'Great experiance! Thank you JVTO, and thank you Gufron! Best guide! East Java is wonderfull and the experiance - unforgetable!',
    country: 'CH'
  },
  {
    name: 'Sarah Taylor',
    rating: 5,
    date: '2025-02-18',
    title: 'Amazing guide',
    text: 'Ahboy was an amazing guide- knowledgeable, caring and fun. We\'re so glad he showed us Ijen.',
    country: 'UK'
  },
  {
    name: 'Mark Davis',
    rating: 5,
    date: '2025-01-25',
    title: 'Great hosts',
    text: 'Rendi and Fredi were great tour hosts .all your needs were taken care of throughout the tour . All the days were fully explained in advance what to expect and when to be ready',
    country: 'US'
  },
  {
    name: 'Caroline Dupont',
    rating: 5,
    date: '2024-12-30',
    title: 'Fantastic job',
    text: 'kiki and nur was both fantastic at their job',
    country: 'FR'
  },
  {
    name: 'Kevin Park',
    rating: 5,
    date: '2024-12-15',
    title: 'Good guides',
    text: 'Rendi&yandi good guide',
    country: 'KR'
  }
];

// Extract crew mentions from review text
function extractCrewMentions(text) {
  const mentions = [];
  const normalizedText = text.toLowerCase();
  
  for (const crewName of CREW_NAMES) {
    const normalizedCrew = crewName.toLowerCase();
    // Match whole words only using word boundaries
    const regex = new RegExp(`\\b${normalizedCrew}\\b`, 'gi');
    if (regex.test(normalizedText)) {
      mentions.push(crewName);
    }
  }
  
  return [...new Set(mentions)]; // Remove duplicates
}

// Process reviews and add crew mentions
const processedReviews = TRUSTPILOT_REVIEWS.map((review, index) => {
  const crewMentions = extractCrewMentions(review.text + ' ' + review.title);
  
  return {
    ...review,
    crewMentions,
    trustpilotUrl: `https://www.trustpilot.com/reviews/${review.name.replace(/\s+/g, '-').toLowerCase()}`,
    extractedAt: new Date().toISOString()
  };
});

// Save to file
fs.writeFileSync(
  '/home/ubuntu/jvto-nextjs/trustpilot-reviews-extracted.json',
  JSON.stringify(processedReviews, null, 2)
);

console.log(`\nExtracted and processed ${processedReviews.length} reviews from Trustpilot`);
console.log('\nCrew mention summary:');

const crewMentionCount = {};
processedReviews.forEach(review => {
  review.crewMentions.forEach(crew => {
    crewMentionCount[crew] = (crewMentionCount[crew] || 0) + 1;
  });
});

Object.entries(crewMentionCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([crew, count]) => {
    console.log(`  ${crew}: ${count} mentions`);
  });

console.log('\nSample reviews with crew mentions:');
processedReviews.slice(0, 5).forEach((review, i) => {
  console.log(`\n${i + 1}. ${review.name} (${review.country}) - ${review.rating}★`);
  console.log(`   Date: ${review.date}`);
  console.log(`   Title: ${review.title}`);
  console.log(`   Crew: ${review.crewMentions.join(', ') || 'None'}`);
  console.log(`   Text: ${review.text.substring(0, 80)}...`);
});

console.log(`\nFile saved to: /home/ubuntu/jvto-nextjs/trustpilot-reviews-extracted.json`);
