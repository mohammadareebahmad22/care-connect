const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create your profile",
      description: "Quick intake to understand your needs and preferences.",
    },
    {
      number: "02",
      title: "Browse therapists",
      description: "Find verified professionals filtered by specialty, location, and budget.",
    },
    {
      number: "03",
      title: "Connect securely",
      description: "Message therapists directly and schedule your first session.",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-muted/50">
      <div className="container max-w-4xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl text-foreground text-center mb-16">
          How it works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-muted-foreground mb-3">{step.number}</div>
              <h3 className="font-medium text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
