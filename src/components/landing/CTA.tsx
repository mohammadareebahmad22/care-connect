import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 md:py-28 gradient-sage">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
            Ready to take the first step?
          </h2>
          
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Join thousands who've found the support they need through Mend-AI. Your journey to better mental health starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              className="bg-background text-foreground hover:bg-background/90 shadow-soft-lg"
              asChild
            >
              <Link to="/auth?role=seeker">
                Find a therapist
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button
              size="xl"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <Link to="/auth?role=provider">
                Register as a therapist
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
