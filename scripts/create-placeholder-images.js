const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create professional-looking SVG placeholders
function createSVGPlaceholder(filename, width, height, title, category) {
  const colors = {
    wedding: { primary: '#d4af37', secondary: '#f5e6d3' },
    product: { primary: '#1a1a1a', secondary: '#666666' },
    fashion: { primary: '#d4af37', secondary: '#1a1a1a' },
    events: { primary: '#00d9ff', secondary: '#1a1a1a' },
    default: { primary: '#d4af37', secondary: '#1a1a1a' }
  };
  
  const color = colors[category.toLowerCase()] || colors.default;
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${filename}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#333333;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
    <pattern id="grid-${filename}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${color.primary}" stroke-width="0.5" opacity="0.1"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad-${filename})"/>
  <rect width="${width}" height="${height}" fill="url(#grid-${filename})"/>
  <circle cx="${width/2}" cy="${height/2 - 40}" r="50" fill="${color.primary}" opacity="0.3"/>
  <rect x="${width/2 - 25}" y="${height/2 - 25}" width="50" height="50" fill="${color.primary}" opacity="0.2" rx="4"/>
  <text x="${width/2}" y="${height/2 + 60}" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="${color.primary}" text-anchor="middle" opacity="0.8">${title}</text>
  <text x="${width/2}" y="${height/2 + 100}" font-family="Arial, sans-serif" font-size="18" fill="#fafafa" text-anchor="middle" opacity="0.6">${category} Photography</text>
  <text x="${width/2}" y="${height - 40}" font-family="Arial, sans-serif" font-size="14" fill="#999999" text-anchor="middle" opacity="0.5">Replace with your image</text>
</svg>`;
  
  const filepath = path.join(imagesDir, filename);
  fs.writeFileSync(filepath, svg);
  console.log(`✓ Created: ${filename}`);
}

// Create video placeholder
function createVideoPlaceholder(filename, width, height, title) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-vid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad-vid)"/>
  <circle cx="${width/2}" cy="${height/2}" r="80" fill="#d4af37" opacity="0.9"/>
  <polygon points="${width/2 - 30},${height/2 - 50} ${width/2 - 30},${height/2 + 50} ${width/2 + 50},${height/2}" fill="#1a1a1a"/>
  <text x="${width/2}" y="${height/2 + 140}" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#d4af37" text-anchor="middle">${title}</text>
  <text x="${width/2}" y="${height/2 + 180}" font-family="Arial, sans-serif" font-size="16" fill="#fafafa" text-anchor="middle" opacity="0.7">Video Placeholder</text>
  <text x="${width/2}" y="${height - 40}" font-family="Arial, sans-serif" font-size="14" fill="#999999" text-anchor="middle" opacity="0.5">Replace with your .mp4 video file</text>
</svg>`;
  
  const filepath = path.join(imagesDir, filename.replace('.mp4', '.svg'));
  fs.writeFileSync(filepath, svg);
  console.log(`✓ Created: ${filename.replace('.mp4', '.svg')} (video placeholder)`);
}

// Image configurations
const images = [
  // Hero
  { filename: 'hero1.jpg', width: 1920, height: 1080, title: 'Cinematic', category: 'default' },
  { filename: 'hero2.mp4', width: 1920, height: 1080, title: 'Stories in Motion' },
  
  // Team
  { filename: 'team-rhea.jpg', width: 400, height: 400, title: 'Rhea', category: 'default' },
  { filename: 'team-arun.jpg', width: 400, height: 400, title: 'Arun', category: 'default' },
  
  // Gallery - Wedding
  { filename: 'wed1.jpg', width: 1200, height: 800, title: 'A moment in gold', category: 'wedding' },
  { filename: 'wed2.jpg', width: 1200, height: 800, title: 'Timeless love', category: 'wedding' },
  { filename: 'wed3.jpg', width: 1200, height: 800, title: 'Golden hour', category: 'wedding' },
  
  // Gallery - Product
  { filename: 'prod1.jpg', width: 1200, height: 800, title: 'Shadows & shine', category: 'product' },
  { filename: 'prod2.jpg', width: 1200, height: 800, title: 'Minimalist beauty', category: 'product' },
  { filename: 'prod3.jpg', width: 1200, height: 800, title: 'Luxury showcase', category: 'product' },
  
  // Gallery - Fashion
  { filename: 'fashion1.jpg', width: 1200, height: 800, title: 'Editorial elegance', category: 'fashion' },
  { filename: 'fashion2.jpg', width: 1200, height: 800, title: 'Urban style', category: 'fashion' },
  
  // Gallery - Events
  { filename: 'event1.jpg', width: 1200, height: 800, title: 'Corporate excellence', category: 'events' },
  { filename: 'event2.jpg', width: 1200, height: 800, title: 'Celebration vibes', category: 'events' },
  
  // Gallery - Videos
  { filename: 'reel1.mp4', width: 1200, height: 800, title: 'Social media magic' },
  { filename: 'film1.mp4', width: 1200, height: 800, title: 'Short film preview' },
];

console.log('Creating placeholder images...\n');

// Create all placeholders
images.forEach(img => {
  if (img.filename.endsWith('.mp4')) {
    createVideoPlaceholder(img.filename, img.width, img.height, img.title);
  } else {
    createSVGPlaceholder(img.filename, img.width, img.height, img.title, img.category);
  }
});

console.log('\n✓ All placeholder images created!');
console.log('\nNote: These are SVG placeholders. Please replace them with your actual:');
console.log('  - JPG/PNG images for photo placeholders');
console.log('  - MP4 video files for video placeholders');
console.log('\nYou can also use the download script to get actual photo placeholders:');
console.log('  node scripts/download-images.js');

