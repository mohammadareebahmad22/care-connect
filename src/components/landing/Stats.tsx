const Stats = () => {
  const stats = [
    { value: "1B+", label: "People affected by mental disorders globally" },
    { value: "280M", label: "Living with depression worldwide" },
    { value: "48h", label: "Target time to first therapist connection" },
  ];

  return (
    <section className="py-20 px-4 md:px-6 border-t border-border">
      <div className="container max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl md:text-4xl font-display text-foreground mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
