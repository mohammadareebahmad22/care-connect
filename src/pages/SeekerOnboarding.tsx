import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowLeft, ArrowRight, MapPin, AlertTriangle, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const concerns = [
  "Depression", "Anxiety", "Stress", "Trauma",
  "Relationship", "Addiction", "Grief", "Other"
];

const severityLevels = [
  { value: "mild", label: "Mild", description: "I can manage but want support" },
  { value: "moderate", label: "Moderate", description: "Affecting my daily life" },
  { value: "severe", label: "Severe", description: "Struggling significantly" },
];

const sessionModes = [
  { value: "online", label: "Online" },
  { value: "in-person", label: "In-person" },
  { value: "either", label: "Either" },
];

const budgets = [
  { value: "free", label: "Free" },
  { value: "low", label: "< $50" },
  { value: "medium", label: "$50–100" },
  { value: "high", label: "$100+" },
];

const SeekerOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [name, setName] = useState("");
  const [primaryConcerns, setPrimaryConcerns] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [sessionMode, setSessionMode] = useState("");
  const [budget, setBudget] = useState("");
  const [urgentRisk, setUrgentRisk] = useState(false);
  
  const totalSteps = 3;
  
  const toggleConcern = (concern: string) => {
    setPrimaryConcerns(prev =>
      prev.includes(concern)
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };
  
  const canProceed = () => {
    switch (step) {
      case 1: return name.trim();
      case 2: return primaryConcerns.length > 0 && severity;
      case 3: return sessionMode && budget;
      default: return false;
    }
  };
  
  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("Not authenticated");
      
      // Update profile in database
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: name,
        })
        .eq("user_id", user.id);
      
      if (error) throw error;
      
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
        <div className="max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          
          <h1 className="text-xl font-display text-foreground mb-3">
            We're here for you
          </h1>
          
          <p className="text-muted-foreground text-sm mb-6">
            If you're having thoughts of harming yourself or others, please reach out to a crisis service immediately.
          </p>
          
          <div className="space-y-3 mb-6">
            <a
              href="tel:988"
              className="flex items-center gap-3 p-4 rounded-lg bg-destructive text-destructive-foreground"
            >
              <Phone className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium text-sm">988 Suicide & Crisis Lifeline</div>
                <div className="text-xs opacity-80">Call or text 988 (US)</div>
              </div>
            </a>
            
            <a
              href="https://findahelpline.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border"
            >
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div className="text-left">
                <div className="font-medium text-sm text-foreground">Find a helpline</div>
                <div className="text-xs text-muted-foreground">International resources</div>
              </div>
            </a>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setUrgentRisk(false)}
            className="text-muted-foreground"
          >
            I'm not in immediate crisis — continue
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Heart className="w-4 h-4 text-background" />
            </div>
            <span className="font-display text-lg text-foreground">Mend-AI</span>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i + 1 <= step ? "bg-foreground" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </header>
      
      <main className="container px-4 py-10 max-w-sm mx-auto">
        {/* Step 1: Basic info */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-display text-foreground mb-2">
              Let's start
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              What should we call you?
            </p>
            
            <div>
              <Label htmlFor="name" className="text-muted-foreground">Name or nickname</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 h-11"
              />
            </div>
          </div>
        )}
        
        {/* Step 2: Concerns */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-display text-foreground mb-2">
              What brings you here?
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Select all that apply
            </p>
            
            <div className="space-y-6">
              <div>
                <Label className="text-muted-foreground">Primary concerns</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {concerns.map((concern) => (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => toggleConcern(concern)}
                      className={`p-3 rounded-lg border text-sm transition-all ${
                        primaryConcerns.includes(concern)
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      {concern}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">How are you feeling?</Label>
                <div className="space-y-2 mt-2">
                  {severityLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setSeverity(level.value)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        severity === level.value
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground text-sm">{level.label}</div>
                      <div className="text-xs text-muted-foreground">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Urgent risk check */}
              <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={urgentRisk}
                    onChange={(e) => setUrgentRisk(e.target.checked)}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      I'm having thoughts of harming myself or others
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      We'll show you crisis resources
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Preferences */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-display text-foreground mb-2">
              Preferences
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Help us find the right match
            </p>
            
            <div className="space-y-6">
              <div>
                <Label className="text-muted-foreground">Session mode</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {sessionModes.map((mode) => (
                    <button
                      key={mode.value}
                      type="button"
                      onClick={() => setSessionMode(mode.value)}
                      className={`p-3 rounded-lg border text-sm transition-all ${
                        sessionMode === mode.value
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Budget per session</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {budgets.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() => setBudget(b.value)}
                      className={`p-3 rounded-lg border text-sm transition-all ${
                        budget === b.value
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-foreground/30"
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
        
        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          {step < totalSteps ? (
            <Button
              size="sm"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!canProceed() || isLoading}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              {isLoading ? "Saving..." : "Find therapists"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default SeekerOnboarding;
