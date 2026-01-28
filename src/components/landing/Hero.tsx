import { Button } from "@/components/ui/button";
import { Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-sage-light rounded-full blur-3xl opacity-60 animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral-light rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="container relative z-10 px-4 md:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sage-light text-sage-dark px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-up">
            <Heart className="w-4 h-4" />
            <span>Privacy-first mental health support</span>
          </div>
          
          {/* Main headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Mend-AI — connect,{" "}
            <span className="text-gradient">understand</span>, heal.
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Learn why mental health matters, find verified therapists near you (online or in-person), and message them securely — all in one app.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" asChild>
              <Link to="/auth?role=seeker">
                Get started — I need support
              </Link>
            </Button>
            <Button variant="hero-outline" asChild>
              <Link to="/auth?role=provider">
                I'm a therapist — register
              </Link>
            </Button>
          </div>
          
          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 mt-12 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Shield className="w-4 h-4 text-sage" />
            <span>All conversations are encrypted in transit and at rest</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
