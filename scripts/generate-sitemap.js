const fs = require('fs');
const { glob } = require('glob');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
const PAGES_DIR = 'app';
const IGNORED_PATHS = ['api', '_next', '404', '500'];

async function generateSitemap() {
  try {
    // Find all page files
    const pages = await glob('**/*.tsx', { cwd: PAGES_DIR });
    
    // Filter and map pages to URLs
    const pageUrls = pages
      .filter(
        (page) =>
          !IGNORED_PATHS.some((ignored) => page.includes(ignored)) &&
          !page.startsWith('_') &&
          !page.includes('[') &&
          !page.includes(']') &&
          page.endsWith('page.tsx')
      )
      .map((page) => {
        const path = page
          .replace(/^\//, '')
          .replace(/\/page\.tsx$/, '')
          .replace(/\.tsx$/, '');
        return {
          url: `/${path}`,
          changefreq: 'daily',
          priority: 0.7,
        };
      });

    // Add static pages
    const staticPages = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/about', changefreq: 'weekly', priority: 0.8 },
      { url: '/services', changefreq: 'weekly', priority: 0.8 },
      { url: '/gallery', changefreq: 'weekly', priority: 0.8 },
      { url: '/contact', changefreq: 'weekly', priority: 0.8 },
    ];

    const sitemap = [...staticPages, ...pageUrls];

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: SITE_URL });
    
    // Return a promise that resolves with the XML string
    const data = await streamToPromise(
      Readable.from(sitemap).pipe(stream)
    ).then((data) => data.toString());

    // Write sitemap to public directory
    fs.writeFileSync('public/sitemap.xml', data);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
