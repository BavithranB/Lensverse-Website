import ScrollReveal from '@/components/ScrollReveal';
import TestimonialSlider from '@/components/TestimonialSlider';
import Image from 'next/image';
import { getContent } from '@/lib/content';

export default function About() {
  const content = getContent();

  return (
    <div className="pt-20">
      
      {/* Hero Section */}
      <section className="py-20 bg-charcoal-900 text-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              {content.about.title}
            </h1>
            <p className="text-xl md:text-2xl text-offwhite/80">
              {content.about.text}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* USP Grid */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 text-center mb-12">
              What Sets Us Apart
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.about.usps.map((usp, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="p-8 bg-white rounded-2xl shadow-soft hover:shadow-lift transition-shadow group">
                  <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-4 group-hover:text-red-600 transition-colors">
                    {usp.title}
                  </h3>
                  <p className="text-charcoal-700">{usp.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TEAM SECTION UPDATED ===================== */}
      {content.about.team.length > 0 && (
        <section className="py-20 bg-charcoal-900 text-offwhite flex flex-col items-center">
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
                Our Team
              </h2>
            </ScrollReveal>

            <div className="flex flex-wrap justify-center gap-14 text-center">
              {content.about.team.map((member, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  
                  <div className="flex flex-col items-center max-w-xs">
                    
                    {/* 🔥 Glowing Hover Effect Photo */}
                    <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 
                                    group transition-all duration-300">

                      {/* Glow Ring */}
                      <div className="absolute inset-0 rounded-full opacity-0 
                                      group-hover:opacity-100 blur-xl 
                                      transition-all duration-500 
                                      bg-red-600/40"></div>

                      {/* Image */}
                      <div className="absolute inset-0 rounded-full overflow-hidden 
                                      group-hover:scale-105 transition-transform duration-500">
                        {member.img ? (
                          <Image
                            src={member.img}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-offwhite/40">
                            Team Photo
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-display font-bold mb-1">
                      {member.name}
                    </h3>

                    {/* Role */}
                    <p className="text-red-500 mb-2 font-medium">{member.role}</p>

                    {/* Bio */}
                    <p className="text-offwhite/70 text-sm leading-relaxed max-w-xs">
                      {member.bio}
                    </p>

                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {content.about.testimonials.length > 0 && (
        <section className="py-20 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 text-center mb-12">
                What Our Clients Say
              </h2>
            </ScrollReveal>
            <TestimonialSlider testimonials={content.about.testimonials} />
          </div>
        </section>
      )}
    </div>
  );
}
