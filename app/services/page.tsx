import ScrollReveal from '@/components/ScrollReveal';
import ServiceCard from '@/components/ServiceCard';
import { getContent } from '@/lib/content';

export default function Services() {
  const content = getContent();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-charcoal-900 text-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-offwhite/80">
              From photography to videography to editing, we offer comprehensive
              creative services to bring your vision to life.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {content.services.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16 last:mb-0">
              <ScrollReveal>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-12 text-center">
                  {category.category}
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((service, serviceIndex) => (
                  <ServiceCard
                    key={serviceIndex}
                    service={service}
                    category={category.category}
                    index={serviceIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons Section */}
      {content.addons.length > 0 && (
        <section className="py-20 bg-charcoal-900 text-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
                Add-On Services
              </h2>
              <p className="text-xl text-offwhite/80 text-center mb-12 max-w-2xl mx-auto">
                Enhance your package with these additional services
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.addons.map((addon, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-charcoal-800 rounded-2xl p-6 hover:bg-charcoal-700 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-display font-bold text-red-500">
                        {addon.title}
                      </h3>
                      <span className="text-lg font-semibold text-offwhite">
                        {addon.price}
                      </span>
                    </div>
                    <p className="text-offwhite/70 text-sm">{addon.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customizable Packages Note */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8">
              <h3 className="text-3xl font-display font-bold text-charcoal-900 mb-4">
                Packages are Customizable
              </h3>
              <p className="text-lg text-charcoal-700 mb-6">
                All our packages can be tailored to your specific needs and
                budget. Contact us to discuss your project and get a custom
                quote.
              </p>
              <a
                href="/booking"
                className="inline-block px-8 py-4 bg-charcoal-900 text-offwhite rounded-full font-semibold hover:bg-charcoal-800 hover:scale-105 transition-transform"
              >
                Get a Custom Quote
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}


