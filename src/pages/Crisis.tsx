import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Phone, Globe, ArrowLeft, MessageCircle, AlertTriangle } from "lucide-react";

const crisisResources = [
  {
    name: "988 Suicide & Crisis Lifeline",
    description: "Free, 24/7 support for people in distress",
    phone: "988",
    region: "United States",
    primary: true,
  },
  {
    name: "Crisis Text Line",
    description: "Text HOME to 741741",
    phone: null,
    textLine: "741741",
    region: "United States",
  },
  {
    name: "International Association for Suicide Prevention",
    description: "Find crisis centers worldwide",
    url: "https://www.iasp.info/resources/Crisis_Centres/",
    region: "International",
  },
  {
    name: "Samaritans",
    description: "24/7 emotional support",
    phone: "116 123",
    region: "United Kingdom & Ireland",
  },
  {
    name: "Lifeline",
    description: "Crisis support and suicide prevention",
    phone: "13 11 14",
    region: "Australia",
  },
  {
    name: "Talk Suicide Canada",
    description: "24/7 crisis support",
    phone: "1-833-456-4566",
    region: "Canada",
  },
];

const Crisis = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-destructive/10 border-b border-destructive/20">
        <div className="container px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 -ml-2 hover:bg-destructive/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <span className="font-display text-xl text-foreground">Crisis Resources</span>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-2xl mx-auto">
        {/* Important notice */}
        <div className="bg-coral-light border border-coral/20 rounded-2xl p-6 mb-8">
          <h1 className="font-display text-2xl text-foreground mb-3">
            If you're in immediate danger
          </h1>
          <p className="text-muted-foreground mb-4">
            Please call emergency services (911 in the US) or go to your nearest emergency room. You are not alone, and help is available.
          </p>
          <p className="text-sm text-muted-foreground">
            Mend-AI is not an emergency service. The resources below can provide immediate support.
          </p>
        </div>

        {/* Primary resource */}
        {crisisResources.filter(r => r.primary).map((resource) => (
          <a
            key={resource.name}
            href={`tel:${resource.phone}`}
            className="flex items-center gap-4 p-6 rounded-2xl bg-destructive text-destructive-foreground mb-6 hover:bg-destructive/90 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-destructive-foreground/20 flex items-center justify-center shrink-0">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-display text-xl mb-1">{resource.name}</h2>
              <p className="text-destructive-foreground/80 text-sm">{resource.description}</p>
              <p className="text-lg font-bold mt-2">Call {resource.phone}</p>
            </div>
          </a>
        ))}

        {/* Other resources */}
        <h2 className="font-display text-xl text-foreground mb-4">More resources</h2>

        <div className="space-y-4">
          {crisisResources.filter(r => !r.primary).map((resource) => (
            <div
              key={resource.name}
              className="p-5 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-foreground mb-1">{resource.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {resource.region}
                  </span>
                </div>

                <div className="flex gap-2">
                  {resource.phone && (
                    <a
                      href={`tel:${resource.phone}`}
                      className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center hover:bg-sage hover:text-primary-foreground transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  )}
                  {resource.textLine && (
                    <a
                      href={`sms:${resource.textLine}`}
                      className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center hover:bg-sage hover:text-primary-foreground transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  )}
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center hover:bg-sage hover:text-primary-foreground transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Find more */}
        <div className="mt-8 p-6 rounded-2xl bg-muted text-center">
          <Globe className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-display text-lg text-foreground mb-2">
            Find a helpline in your country
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            The International Association for Suicide Prevention maintains a directory of crisis centers worldwide.
          </p>
          <Button variant="outline" asChild>
            <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer">
              Visit findahelpline.com
            </a>
          </Button>
        </div>

        {/* Back to app */}
        <div className="mt-8 text-center">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Mend-AI
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Crisis;
