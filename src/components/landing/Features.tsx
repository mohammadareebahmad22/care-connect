import { Shield, MapPin, Clock, Lock, Smartphone, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified professionals",
    description: "Every therapist's credentials are checked before they appear on the platform.",
  },
  {
    icon: MapPin,
    title: "Find nearby or online",
    description: "Filter by location for in-person sessions, or choose from therapists offering telehealth.",
  },
  {
    icon: Clock,
    title: "Real-time availability",
    description: "See when therapists have open slots and book directly through the app.",
  },
  {
    icon: Lock,
    title: "End-to-end encryption",
    description: "All messages are encrypted in transit and at rest. Your privacy is our priority.",
  },
  {
    icon: Smartphone,
    title: "Works everywhere",
    description: "Use Mend-AI on your phone, tablet, or computer — seamlessly synced.",
  },
  {
    icon: Star,
    title: "Smart matching",
    description: "Our algorithm considers specialty, language, budget, and more to find your best fit.",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Built for trust and ease
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every feature is designed to reduce friction between you and the care you need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-border hover:border-sage/30 bg-card hover:shadow-soft-lg transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-4 group-hover:bg-sage group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-sage group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              
              <h3 className="font-display text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
