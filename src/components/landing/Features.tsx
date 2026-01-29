import { Shield, MapPin, MessageCircle, Clock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified professionals",
      description: "All therapists are licensed and credential-verified.",
    },
    {
      icon: MapPin,
      title: "Location-based matching",
      description: "Find therapists near you or choose online sessions.",
    },
    {
      icon: MessageCircle,
      title: "Secure messaging",
      description: "End-to-end encrypted conversations.",
    },
    {
      icon: Clock,
      title: "Quick access",
      description: "Connect with a therapist within 48 hours.",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container max-w-4xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl text-foreground text-center mb-16">
          Why Mend-AI
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
