import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowLeft, ArrowRight, MapPin, AlertTriangle, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const concerns = [
  "Depression", "Anxiety", "Stress", "Trauma / PTSD",
  "Relationship issues", "Addiction", "Grief", "Other"
];

const severityLevels = [
  { value: "mild", label: "Mild", description: "I can manage day-to-day but want support" },
  { value: "moderate", label: "Moderate", description: "It's affecting my daily life" },
  { value: "severe", label: "Severe", description: "I'm struggling significantly" },
];

const sessionModes = [
  { value: "online", label: "Online", description: "Video or phone sessions" },
  { value: "in-person", label: "In-person", description: "Face-to-face at their office" },
  { value: "either", label: "Either", description: "I'm flexible" },
];

const budgets = [
  { value: "free", label: "Free / Subsidized" },
  { value: "low", label: "Under $50 / session" },
  { value: "medium", label: "$50 – $100 / session" },
  { value: "high", label: "$100+ / session" },
  { value: "any", label: "No preference" },
];

const ageGroups = [
  "Under 18", "18–25", "26–40", "41–60", "60+"
];

const SeekerOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [primaryConcerns, setPrimaryConcerns] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [sessionMode, setSessionMode] = useState("");
  const [budget, setBudget] = useState("");
  const [languages, setLanguages] = useState("English");
  const [location, setLocation] = useState("");
  const [urgentRisk, setUrgentRisk] = useState(false);
  
  const totalSteps = 4;
  
  const toggleConcern = (concern: string) => {
    setPrimaryConcerns(prev =>
      prev.includes(concern)
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };
  
  const canProceed = () => {
    switch (step) {
      case 1: return name.trim() && ageGroup;
      case 2: return primaryConcerns.length > 0 && severity;
      case 3: return sessionMode && budget;
      case 4: return languages.trim();
      default: return false;
    }
  };
  
  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("Not authenticated");
      
      // For now, store in localStorage since we haven't created the profiles table yet
      const profile = {
        user_id: user.id,
        role: "seeker",
        name,
        age_group: ageGroup,
        primary_concerns: primaryConcerns,
        severity,
        session_mode: sessionMode,
        budget,
        languages: languages.split(",").map(l => l.trim()),
        location,
        urgent_risk: urgentRisk,
      };
      
      localStorage.setItem("mend_profile", JSON.stringify(profile));
      
      toast({
        title: "Profile complete!",
        description: "Let's find you the right therapist.",
      });
      
      navigate("/browse");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Crisis intervention check
  if (urgentRisk) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          
          <h1 className="font-display text-2xl text-foreground mb-4">
            We're here for you
          </h1>
          
          <p className="text-muted-foreground mb-8">
            If you're having thoughts of harming yourself or others, please reach out to a crisis service immediately. You're not alone, and help is available right now.
          </p>
          
          <div className="space-y-4 mb-8">
            <a
              href="tel:988"
              className="flex items-center gap-3 p-4 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">988 Suicide & Crisis Lifeline</div>
                <div className="text-sm opacity-80">Call or text 988 (US)</div>
              </div>
            </a>
            
            <a
              href="https://findahelpline.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors"
            >
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div className="text-left">
                <div className="font-medium text-foreground">Find a helpline in your country</div>
                <div className="text-sm text-muted-foreground">International resources</div>
              </div>
            </a>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setUrgentRisk(false)}
            className="text-muted-foreground"
          >
            I'm not in immediate crisis — continue setup
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-sage flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl text-foreground">Mend-AI</span>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full transition-colors ${
                  i + 1 <= step ? "bg-sage" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </header>
      
      <main className="container px-4 md:px-6 py-12 max-w-xl mx-auto">
        {/* Step 1: Basic info */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl text-foreground mb-2">
              Let's start with the basics
            </h1>
            <p className="text-muted-foreground mb-8">
              This helps us personalize your experience.
            </p>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">What should we call you?</Label>
                <Input
                  id="name"
                  placeholder="Your name or a pseudonym"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can use a nickname if you prefer
                </p>
              </div>
              
              <div>
                <Label>Age group</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {ageGroups.map((age) => (
                    <button
                      key={age}
                      type="button"
                      onClick={() => setAgeGroup(age)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        ageGroup === age
                          ? "border-sage bg-sage-light text-foreground"
                          : "border-border hover:border-sage/50 text-muted-foreground"
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Concerns */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl text-foreground mb-2">
              What brings you here?
            </h1>
            <p className="text-muted-foreground mb-8">
              Select all that apply. This helps us match you with the right specialist.
            </p>
            
            <div className="space-y-6">
              <div>
                <Label>Primary concerns</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {concerns.map((concern) => (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => toggleConcern(concern)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        primaryConcerns.includes(concern)
                          ? "border-sage bg-sage-light text-foreground"
                          : "border-border hover:border-sage/50 text-muted-foreground"
                      }`}
                    >
                      {concern}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>How are you feeling overall?</Label>
                <div className="space-y-3 mt-2">
                  {severityLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setSeverity(level.value)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        severity === level.value
                          ? "border-sage bg-sage-light"
                          : "border-border hover:border-sage/50"
                      }`}
                    >
                      <div className="font-medium text-foreground">{level.label}</div>
                      <div className="text-sm text-muted-foreground">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Urgent risk check */}
              <div className="p-4 rounded-xl bg-coral-light border border-coral/20">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={urgentRisk}
                    onChange={(e) => setUrgentRisk(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      I'm having thoughts of harming myself or others
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Check this if you need immediate support — we'll show you crisis resources
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Preferences */}
        {step === 3 && (
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl text-foreground mb-2">
              Your preferences
            </h1>
            <p className="text-muted-foreground mb-8">
              Help us find therapists that fit your needs.
            </p>
            
            <div className="space-y-6">
              <div>
                <Label>Session mode</Label>
                <div className="space-y-3 mt-2">
                  {sessionModes.map((mode) => (
                    <button
                      key={mode.value}
                      type="button"
                      onClick={() => setSessionMode(mode.value)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        sessionMode === mode.value
                          ? "border-sage bg-sage-light"
                          : "border-border hover:border-sage/50"
                      }`}
                    >
                      <div className="font-medium text-foreground">{mode.label}</div>
                      <div className="text-sm text-muted-foreground">{mode.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Budget per session</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {budgets.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() => setBudget(b.value)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        budget === b.value
                          ? "border-sage bg-sage-light text-foreground"
                          : "border-border hover:border-sage/50 text-muted-foreground"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Location & Languages */}
        {step === 4 && (
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl text-foreground mb-2">
              Almost there!
            </h1>
            <p className="text-muted-foreground mb-8">
              Help us find therapists near you.
            </p>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="languages">Preferred languages</Label>
                <Input
                  id="languages"
                  placeholder="e.g., English, Spanish"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Your location (optional)</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, state or ZIP code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Helps us find in-person therapists near you
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button
            variant="ghost"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          {step < totalSteps ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isLoading}
            >
              {isLoading ? "Saving..." : "Find therapists"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default SeekerOnboarding;
