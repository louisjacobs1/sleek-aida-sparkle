import { Award, Leaf, Heart, Truck } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Every product undergoes rigorous quality checks to ensure excellence.",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Committed to eco-friendly materials and responsible manufacturing.",
  },
  {
    icon: Heart,
    title: "Crafted with Care",
    description: "Designed with attention to detail and a passion for perfection.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $50.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="aida-fade-up">
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
              Desire
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Why Choose Klyvo
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              We believe that beautiful design should be accessible to everyone. 
              Our curated collection brings together exceptional craftsmanship, 
              sustainable practices, and timeless aesthetics.
            </p>
            
            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title} 
                  className="aida-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-sm bg-background flex items-center justify-center mb-4 shadow-card">
                    <value.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-medium mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <div className="relative aida-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="aspect-[4/5] bg-secondary rounded-sm overflow-hidden shadow-elevated">
              <img 
                src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80" 
                alt="Klyvo brand craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Stats overlay */}
            <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-sm shadow-elevated">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-display text-3xl font-semibold text-accent">10K+</p>
                  <p className="text-xs text-muted-foreground mt-1">Happy Customers</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold">500+</p>
                  <p className="text-xs text-muted-foreground mt-1">Products Sold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
