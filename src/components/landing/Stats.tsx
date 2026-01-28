import { Users, TrendingUp, AlertTriangle, Search } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "~1 billion",
    label: "people live with a mental disorder worldwide",
    source: "WHO",
  },
  {
    icon: TrendingUp,
    value: "280 million",
    label: "people are affected by depression globally — a leading cause of disability",
    source: "WHO",
  },
  {
    icon: AlertTriangle,
    value: "727,000",
    label: "people died by suicide in 2021; it's a leading cause of death among young people",
    source: "WHO",
  },
  {
    icon: Search,
    value: "Rising demand",
    label: "for mental health information — online searches and help-seeking continue to increase",
    source: "Research trends",
  },
];

const Stats = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Why this matters
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Mental health is a global priority. The need for accessible, trustworthy care has never been greater.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group p-6 rounded-2xl bg-background border border-border hover:border-sage/30 transition-all duration-300 hover:shadow-soft-lg animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-sage" />
              </div>
              
              <div className="text-2xl md:text-3xl font-display text-foreground mb-2">
                {stat.value}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.label}
              </p>
              
              <span className="text-xs text-muted-foreground/60 mt-3 block">
                Source: {stat.source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
