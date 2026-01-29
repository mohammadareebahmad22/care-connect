import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-foreground">
      <div className="container max-w-2xl mx-auto text-center">
        <h2 className="font-display text-2xl md:text-3xl text-background mb-4">
          Ready to start your journey?
        </h2>
        <p className="text-background/70 mb-8">
          Join thousands finding better mental health support.
        </p>
        <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 h-12 px-8">
          <Link to="/auth">Get started free</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTA;
