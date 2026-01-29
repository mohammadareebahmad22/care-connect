import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 md:px-6">
      <div className="container max-w-3xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-6">
          connect, understand,
          <br />
          <span className="text-muted-foreground">heal.</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          Fast access to trusted mental-health support. Find verified therapists near you and message them securely.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8">
            <Link to="/auth?role=seeker">I need support</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8">
            <Link to="/auth?role=provider">I'm a therapist</Link>
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-8">
          All conversations encrypted. Privacy by default.
        </p>
      </div>
    </section>
  );
};

export default Hero;
