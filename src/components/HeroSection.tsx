import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-hero-gradient pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="aida-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-accent mb-6">
              Curated Collection
            </span>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6">
              Elevate Your
              <br />
              <span className="text-gradient">Living Space</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md mb-10 font-body leading-relaxed">
              Discover thoughtfully designed home essentials that blend 
              functionality with modern aesthetics. Each piece tells a story.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="h-14 px-8 text-sm font-medium"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 text-sm font-medium"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Our Story
              </Button>
            </div>
          </div>
          
          {/* Hero Image Grid */}
          <div className="relative aida-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden shadow-elevated">
                  <img 
                    src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80" 
                    alt="Modern living room decor"
                    className="w-full h-full object-cover image-reveal"
                  />
                </div>
                <div className="aspect-square bg-secondary rounded-sm overflow-hidden shadow-soft">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" 
                    alt="Minimalist lamp design"
                    className="w-full h-full object-cover image-reveal"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
              <div className="pt-12 space-y-4">
                <div className="aspect-square bg-secondary rounded-sm overflow-hidden shadow-soft">
                  <img 
                    src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80" 
                    alt="Contemporary interior"
                    className="w-full h-full object-cover image-reveal"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
                <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden shadow-elevated">
                  <img 
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" 
                    alt="Elegant home accessories"
                    className="w-full h-full object-cover image-reveal"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              </div>
            </div>
            
            {/* Floating accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
