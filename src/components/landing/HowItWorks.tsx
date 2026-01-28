import { UserPlus, Search, MessageCircle, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign up in minutes",
    description: "Answer a few questions about your needs, preferences, and availability. We'll use this to find you the best matches.",
  },
  {
    icon: Search,
    title: "Browse verified therapists",
    description: "See therapists matched to your needs — by specialty, language, budget, and location. All credentials are verified.",
  },
  {
    icon: MessageCircle,
    title: "Connect securely",
    description: "Swipe to express interest. When a therapist accepts, you can message them directly through our encrypted chat.",
  },
  {
    icon: HeartHandshake,
    title: "Begin your journey",
    description: "Book your first session and start your path to better mental health with a trusted professional.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 gradient-warm">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            How Mend-AI works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From signup to your first session — we've made it simple.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-6 mb-8 last:mb-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Step number and line */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl gradient-sage flex items-center justify-center text-primary-foreground shadow-soft">
                  <step.icon className="w-6 h-6" />
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border my-3" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
                  <span className="text-xs font-medium text-sage uppercase tracking-wide">
                    Step {index + 1}
                  </span>
                  <h3 className="font-display text-xl text-foreground mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
