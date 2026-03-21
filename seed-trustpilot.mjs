import fs from 'fs';
import mysql from 'mysql2/promise';

const reviews = JSON.parse(fs.readFileSync('/home/ubuntu/jvto-nextjs/trustpilot-reviews-extracted.json', 'utf8'));

async function seedTrustpilotReviews() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'jvto'
  });

  try {
    // First, get all crew members to map names to IDs
    const [crewRows] = await connection.query('SELECT id, name FROM crew');
    const crewMap = {};
    
    crewRows.forEach(row => {
      crewMap[row.name.toLowerCase()] = row.id;
    });

    console.log('Crew map:', crewMap);

    let insertedCount = 0;
    let skippedCount = 0;

    // Insert each review
    for (const review of reviews) {
      try {
        // Get the first crew mention if any
        let crewId = null;
        if (review.crewMentions && review.crewMentions.length > 0) {
          const firstCrew = review.crewMentions[0];
          crewId = crewMap[firstCrew.toLowerCase()] || null;
        }

        // Prepare the insert query
        const query = `
          INSERT INTO reviews (
            author, 
            text, 
            platform, 
            rating, 
            date, 
            guideNames,
            trustpilotUrl,
            crewId,
            sortOrder
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          review.name,
          review.text,
          'Trustpilot',
          review.rating,
          review.date,
          review.crewMentions.join(', '),
          review.trustpilotUrl,
          crewId,
          0
        ];

        await connection.query(query, values);
        insertedCount++;
        
        console.log(`✓ Inserted: ${review.name} (${review.rating}★, crew: ${review.crewMentions.join(', ') || 'none'})`);
      } catch (error) {
        console.error(`✗ Failed to insert ${review.name}:`, error.message);
        skippedCount++;
      }
    }

    console.log(`\n✓ Seeding complete: ${insertedCount} reviews inserted, ${skippedCount} skipped`);

    // Show crew mention statistics
    const [stats] = await connection.query(`
      SELECT guideNames, COUNT(*) as count 
      FROM reviews 
      WHERE platform = 'Trustpilot' 
      GROUP BY guideNames 
      ORDER BY count DESC
    `);

    console.log('\nCrew mention statistics:');
    stats.forEach(row => {
      console.log(`  ${row.guideNames || 'None'}: ${row.count} reviews`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await connection.end();
  }
}

seedTrustpilotReviews().catch(console.error);
