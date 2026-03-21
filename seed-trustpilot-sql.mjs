import fs from 'fs';

const reviews = JSON.parse(fs.readFileSync('/home/ubuntu/jvto-nextjs/trustpilot-reviews-extracted.json', 'utf8'));

// Crew name to ID mapping (from database)
const crewMap = {
  'ahboy': 1,
  'eboy': 2,
  'ehboy': 2,
  'goyo': 3,
  'joyo': 3,
  'joy': 3,
  'rendi': 4,
  'kiki': 5,
  'nur': 6,
  'dika': 7,
  'yandi': 8,
  'boy': 9,
  'holili': 10,
  'johan': 11,
  'gufron': 12,
  'fredy': 13,
  'fredi': 13,
  'anjas': 14,
  'toufic': 15,
  'taufik': 15
};

// Generate SQL INSERT statements
let sqlStatements = [];

for (const review of reviews) {
  // Get the first crew mention if any
  let crewId = null;
  if (review.crewMentions && review.crewMentions.length > 0) {
    const firstCrew = review.crewMentions[0];
    crewId = crewMap[firstCrew.toLowerCase()] || null;
  }

  // Escape single quotes in text
  const escapedText = review.text.replace(/'/g, "''");
  const escapedTitle = review.title.replace(/'/g, "''");
  const escapedGuideNames = (review.crewMentions.join(', ')).replace(/'/g, "''");
  const escapedUrl = (review.trustpilotUrl || '').replace(/'/g, "''");

  const sql = `INSERT INTO reviews (author, text, platform, rating, date, guideNames, trustpilotUrl, crewId, sortOrder) VALUES ('${review.name}', '${escapedText}', 'Trustpilot', ${review.rating}, '${review.date}', '${escapedGuideNames}', '${escapedUrl}', ${crewId || 'NULL'}, 0);`;
  
  sqlStatements.push(sql);
}

// Save SQL file
fs.writeFileSync('/home/ubuntu/jvto-nextjs/insert-trustpilot-reviews.sql', sqlStatements.join('\n'));

console.log(`Generated ${sqlStatements.length} INSERT statements`);
console.log('Saved to: /home/ubuntu/jvto-nextjs/insert-trustpilot-reviews.sql');
console.log('\nFirst 3 statements:');
sqlStatements.slice(0, 3).forEach((sql, i) => {
  console.log(`${i + 1}. ${sql.substring(0, 100)}...`);
});
