import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Welcome to AIDA!", {
      description: "You've been added to our newsletter.",
      position: "top-center",
    });
    
    setEmail("");
    setLoading(false);
  };

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center aida-fade-up">
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase opacity-70 mb-4">
            Action
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Join Our Community
          </h2>
          <p className="text-lg opacity-80 mb-10">
            Subscribe to receive exclusive offers, early access to new arrivals, 
            and curated design inspiration.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/50"
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
          
          <p className="text-xs opacity-50 mt-6">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
};
