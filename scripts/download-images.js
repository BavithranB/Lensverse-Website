const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash Source API - no API key needed for basic usage
const UNSPLASH_SOURCE = 'https://source.unsplash.com';

// Image mappings with search terms for relevant photography
const imageMap = {
  // Hero images
  'hero1.jpg': { width: 1920, height: 1080, search: 'cinematic-photography' },
  'hero2.mp4': { width: 1920, height: 1080, search: 'videography' },
  
  // Team images
  'team-rhea.jpg': { width: 400, height: 400, search: 'professional-woman-portrait' },
  'team-arun.jpg': { width: 400, height: 400, search: 'professional-man-portrait' },
  
  // Gallery - Wedding
  'wed1.jpg': { width: 1200, height: 800, search: 'wedding-photography' },
  'wed2.jpg': { width: 1200, height: 800, search: 'wedding-ceremony' },
  'wed3.jpg': { width: 1200, height: 800, search: 'wedding-couple' },
  
  // Gallery - Product
  'prod1.jpg': { width: 1200, height: 800, search: 'product-photography' },
  'prod2.jpg': { width: 1200, height: 800, search: 'commercial-product' },
  'prod3.jpg': { width: 1200, height: 800, search: 'luxury-product' },
  
  // Gallery - Fashion
  'fashion1.jpg': { width: 1200, height: 800, search: 'fashion-photography' },
  'fashion2.jpg': { width: 1200, height: 800, search: 'editorial-fashion' },
  
  // Gallery - Events
  'event1.jpg': { width: 1200, height: 800, search: 'corporate-event' },
  'event2.jpg': { width: 1200, height: 800, search: 'event-photography' },
};

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download function
function downloadImage(filename, config) {
  return new Promise((resolve, reject) => {
    // Use a placeholder service that provides actual images
    // Using picsum.photos as a fallback since Unsplash Source is deprecated
    const url = `https://picsum.photos/${config.width}/${config.height}?random=${Math.random()}`;
    
    const filepath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${filename}`);
          resolve();
        });
      } else {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

// Create placeholder SVG for videos
function createVideoPlaceholder(filename) {
  const filepath = path.join(imagesDir, filename);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#grad)"/>
  <circle cx="960" cy="540" r="60" fill="#d4af37" opacity="0.8"/>
  <polygon points="940,520 940,560 980,540" fill="#1a1a1a"/>
  <text x="960" y="600" font-family="Arial, sans-serif" font-size="24" fill="#fafafa" text-anchor="middle">Video Placeholder</text>
</svg>`;
  
  fs.writeFileSync(filepath, svg);
  console.log(`✓ Created placeholder: ${filename}`);
}

// Main function
async function main() {
  console.log('Downloading placeholder images...\n');
  
  // Download all images
  const imagePromises = Object.entries(imageMap).map(([filename, config]) => {
    if (filename.endsWith('.mp4')) {
      createVideoPlaceholder(filename.replace('.mp4', '.svg'));
      return Promise.resolve();
    }
    return downloadImage(filename, config).catch((err) => {
      console.error(`✗ Error downloading ${filename}:`, err.message);
    });
  });
  
  await Promise.all(imagePromises);
  
  console.log('\n✓ Image download complete!');
  console.log('\nNote: These are placeholder images. Please replace them with your actual photography work.');
  console.log('For videos, replace the .svg files with actual .mp4 video files.');
}

main().catch(console.error);
















