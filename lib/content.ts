import siteContent from '@/content/site.json';

export interface Brand {
  name: string;
  tagline: string;
  logo?: string;
}

export interface HeroSlide {
  type: 'image' | 'video';
  src: string;
  headline: string;
  sub: string;
}

export interface HeroCTA {
  label: string;
  href: string;
}

export interface Hero {
  slides: HeroSlide[];
  ctas: HeroCTA[];
}

export interface Highlight {
  label: string;
  value: string;
}

export interface USP {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  img: string;
  bio: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  service?: string;
}

export interface About {
  title: string;
  text: string;
  usps: USP[];
  team: TeamMember[];
  testimonials: Testimonial[];
}

export interface ServiceItem {
  title: string;
  desc: string;
  highlights: string[];
  price: string;
}

export interface ServiceCategory {
  category: string;
  items: ServiceItem[];
}

export interface Addon {
  title: string;
  desc: string;
  price: string;
}

export interface GalleryItem {
  src: string;
  title: string;
  category: string;
  type: 'image' | 'video';
}

export interface Gallery {
  filters: string[];
  items: GalleryItem[];
}

export interface Booking {
  email_to: string;
  phone_required: boolean;
}

export interface Contact {
  email: string;
  phone: string;
  address: string;
}

export interface Social {
  label: string;
  href: string;
  icon: string;
}

export interface SiteContent {
  brand: Brand;
  hero: Hero;
  highlights: Highlight[];
  about: About;
  services: ServiceCategory[];
  addons: Addon[];
  gallery: Gallery;
  booking: Booking;
  contact: Contact;
  socials: Social[];
}

export function getContent(): SiteContent {
  return siteContent as SiteContent;
}

export function getServiceNames(): string[] {
  const content = getContent();
  const serviceNames: string[] = [];
  
  content.services.forEach(category => {
    category.items.forEach(item => {
      serviceNames.push(`${category.category} - ${item.title}`);
    });
  });
  
  return serviceNames;
}
















