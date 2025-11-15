# Lensverse Website

A modern, high-performance, fully responsive website for Lensverse - a photography, videography, and editing studio. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Modern Design**: Cinematic, premium, editorial design with minimal-but-bold aesthetics
- 🎬 **Smooth Animations**: Framer Motion powered animations with parallax effects and scroll reveals
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🖼️ **Gallery**: Filterable gallery with lightbox and keyboard navigation
- 📝 **Content Management**: Easy-to-edit JSON-based content system
- 📧 **Email Integration**: Booking form sends emails via Resend API
- ♿ **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- 🔍 **SEO Optimized**: Meta tags, Open Graph, structured data, and sitemap
- ⚡ **Performance**: Optimized images, lazy loading, and code splitting

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email**: Resend API
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Resend API key (for email functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Lensverse Website"
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
RESEND_API_KEY=your_resend_api_key_here
BOOKING_EMAIL=your_email@example.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

All content is managed through the `/content/site.json` file. You can edit text, images, services, gallery items, and more without touching any code.

### Editing Content

1. Open `/content/site.json` in your editor
2. Modify the content as needed
3. Save the file - changes will be reflected immediately (hot reload)

### Content Structure

The `site.json` file contains the following sections:

- **brand**: Brand name and tagline
- **hero**: Hero slider slides and CTAs
- **highlights**: Statistics (Projects, Years, Clients, Awards)
- **about**: About section content, USPs, team, and testimonials
- **services**: Service categories and items
- **addons**: Add-on services
- **gallery**: Gallery filters and items
- **booking**: Booking form configuration
- **contact**: Contact information
- **socials**: Social media links

### Adding Images

1. Place your images in the `/public/images/` directory
2. Update the image paths in `site.json` (e.g., `/images/hero1.jpg`)
3. Images will be automatically optimized by Next.js

### Example: Adding a New Service

```json
{
  "category": "Photography",
  "items": [
    {
      "title": "New Service",
      "desc": "Service description",
      "highlights": ["Feature 1", "Feature 2"],
      "price": "From ₹X,XXX"
    }
  ]
}
```

### Example: Adding a Gallery Item

```json
{
  "src": "/images/new-image.jpg",
  "title": "Image Title",
  "category": "Wedding",
  "type": "image"
}
```

## Email Configuration

### Setting Up Resend

1. Sign up for a [Resend](https://resend.com) account
2. Get your API key from the dashboard
3. Add it to `.env.local` as `RESEND_API_KEY`
4. Set your email address as `BOOKING_EMAIL`

### Email Template

The booking form sends emails with all submitted details. The email template is defined in `/lib/email.ts` and can be customized.

### Changing Email Service

To use a different email service (e.g., SendGrid, Nodemailer):

1. Update `/lib/email.ts` with your email service
2. Update the API route in `/app/api/book/route.ts` if needed
3. Update environment variables accordingly

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `RESEND_API_KEY`
   - `BOOKING_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

Make sure to set the environment variables in your deployment platform.

## Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── gallery/           # Gallery page
│   ├── booking/           # Booking page
│   ├── api/               # API routes
│   │   └── book/          # Booking API
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx           # Hero section
│   ├── Gallery.tsx        # Gallery component
│   ├── BookingForm.tsx    # Booking form
│   └── ...
├── content/               # Content management
│   └── site.json          # All editable content
├── lib/                   # Utilities
│   ├── content.ts         # Content loader
│   └── email.ts           # Email utility
├── public/                # Static assets
│   └── images/            # Image assets
└── data/                  # Data files (auto-generated)
    └── leads.json         # Booking leads (auto-generated)
```

## Customization

### Colors

Edit colors in `tailwind.config.ts`:

```typescript
colors: {
  charcoal: { ... },
  gold: { ... },
  teal: { ... },
  offwhite: "#fafafa",
}
```

### Fonts

Update fonts in `app/layout.tsx` and `app/globals.css`:

```typescript
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
```

### Animations

Animations are configured in component files using Framer Motion. Adjust animation durations, delays, and effects in the respective component files.

## Performance Optimization

- Images are automatically optimized by Next.js
- Lazy loading is implemented for gallery images
- Code splitting is handled by Next.js
- Animations use GPU-accelerated properties
- Fonts are optimized with next/font

## Accessibility

- Semantic HTML throughout
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus states on all interactive elements
- Alt text for all images

## SEO

- Meta tags for all pages
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.

## Changelog

### v1.0.0
- Initial release
- All core features implemented
- Content management system
- Email integration
- Gallery with lightbox
- Booking form
- Responsive design
- Animations and interactions
















