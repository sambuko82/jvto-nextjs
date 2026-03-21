import puppeteer from 'puppeteer';
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

// Normalize crew name for matching
function normalizeName(name) {
  return name.toLowerCase().trim();
}

// Extract crew mentions from review text
function extractCrewMentions(text) {
  const mentions = [];
  const normalizedText = text.toLowerCase();
  
  for (const crewName of CREW_NAMES) {
    const normalizedCrew = normalizeName(crewName);
    // Match whole words only using word boundaries
    const regex = new RegExp(`\\b${normalizedCrew}\\b`, 'gi');
    if (regex.test(normalizedText)) {
      mentions.push(crewName);
    }
  }
  
  return [...new Set(mentions)]; // Remove duplicates
}

async function scrapeTrustpilot() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);
  
  const reviews = [];
  const baseUrl = 'https://www.trustpilot.com/review/javavolcano-touroperator.com';
  
  try {
    // Navigate to the page
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    
    // Wait for reviews to load
    await page.waitForSelector('[data-review-id]', { timeout: 10000 }).catch(() => {
      console.log('Review selector not found, trying alternative...');
    });
    
    // Get total number of reviews from the page
    const totalReviewsText = await page.evaluate(() => {
      const elem = document.querySelector('[data-test-id="reviews-count"]') || 
                   document.body.innerText.match(/Reviews? (\d+)/)?.[1];
      return elem ? elem.textContent : null;
    });
    
    console.log('Total reviews text:', totalReviewsText);
    
    // Scroll and load all reviews
    let previousHeight = 0;
    let loadedReviews = 0;
    
    for (let i = 0; i < 10; i++) {
      // Scroll to bottom
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      
      // Wait for new reviews to load
      await page.waitForTimeout(1000);
      
      // Check if we've loaded new reviews
      const currentReviewCount = await page.evaluate(() => {
        return document.querySelectorAll('[data-review-id], [class*="review"]').length;
      });
      
      if (currentReviewCount === loadedReviews) {
        break; // No new reviews loaded, we've reached the end
      }
      
      loadedReviews = currentReviewCount;
      console.log(`Loaded ${loadedReviews} reviews...`);
    }
    
    // Extract all visible reviews
    const reviewElements = await page.evaluate(() => {
      const reviews = [];
      
      // Try multiple selectors to find reviews
      const reviewContainers = document.querySelectorAll(
        '[data-review-id], ' +
        '[class*="review"][class*="card"], ' +
        'article, ' +
        'div[class*="ReviewCard"]'
      );
      
      reviewContainers.forEach((container, index) => {
        try {
          // Extract reviewer name
          const nameElem = container.querySelector(
            '[class*="author"], ' +
            '[class*="reviewer"], ' +
            'a[href*="/user/"]'
          );
          const name = nameElem?.textContent?.trim() || `Reviewer ${index}`;
          
          // Extract rating
          const ratingElem = container.querySelector(
            '[class*="rating"], ' +
            '[class*="stars"], ' +
            'svg[class*="star"]'
          );
          const ratingText = ratingElem?.getAttribute('aria-label') || 
                            ratingElem?.textContent || '5';
          const rating = parseInt(ratingText.match(/\d/)?.[0]) || 5;
          
          // Extract date
          const dateElem = container.querySelector(
            'time, ' +
            '[class*="date"], ' +
            '[class*="published"]'
          );
          const date = dateElem?.textContent?.trim() || 
                      dateElem?.getAttribute('datetime') || 
                      new Date().toISOString().split('T')[0];
          
          // Extract title
          const titleElem = container.querySelector(
            '[class*="title"], ' +
            'h2, h3'
          );
          const title = titleElem?.textContent?.trim() || '';
          
          // Extract review text
          const textElem = container.querySelector(
            '[class*="review-text"], ' +
            '[class*="body"], ' +
            'p'
          );
          const text = textElem?.textContent?.trim() || '';
          
          // Extract review URL
          const linkElem = container.querySelector('a[href*="/reviews/"]');
          const url = linkElem?.href || '';
          
          if (text || title) {
            reviews.push({
              name,
              rating,
              date,
              title,
              text,
              url,
              country: '' // Will be extracted from page if available
            });
          }
        } catch (e) {
          console.error('Error extracting review:', e.message);
        }
      });
      
      return reviews;
    });
    
    console.log(`\nExtracted ${reviewElements.length} reviews from page`);
    
    // Process each review and extract crew mentions
    for (const review of reviewElements) {
      const crewMentions = extractCrewMentions(review.text + ' ' + review.title);
      
      reviews.push({
        ...review,
        crewMentions,
        extractedAt: new Date().toISOString()
      });
    }
    
    // Save to file
    fs.writeFileSync(
      '/home/ubuntu/jvto-nextjs/trustpilot-reviews.json',
      JSON.stringify(reviews, null, 2)
    );
    
    console.log(`\nSaved ${reviews.length} reviews to trustpilot-reviews.json`);
    console.log('\nSample reviews:');
    reviews.slice(0, 3).forEach((review, i) => {
      console.log(`\n${i + 1}. ${review.name} - ${review.rating}★`);
      console.log(`   Date: ${review.date}`);
      console.log(`   Title: ${review.title}`);
      console.log(`   Crew mentions: ${review.crewMentions.join(', ') || 'None'}`);
      console.log(`   Text preview: ${review.text.substring(0, 100)}...`);
    });
    
  } catch (error) {
    console.error('Scraping error:', error);
  } finally {
    await browser.close();
  }
}

scrapeTrustpilot().catch(console.error);
