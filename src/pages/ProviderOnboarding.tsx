import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const specialties = [
  "Depression", "Anxiety", "Trauma", "Relationship",
  "Family", "Addiction", "Grief", "Career",
  "Child/Adolescent", "Couples", "LGBTQ+", "Other"
];

const ProviderOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [telehealth, setTelehealth] = useState<boolean | null>(null);
  const [feePerSession, setFeePerSession] = useState("");
  const [bio, setBio] = useState("");
  
  const totalSteps = 3;
  
  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };
  
  const canProceed = () => {
    switch (step) {
      case 1: return name.trim() && licenseNumber.trim();
      case 2: return selectedSpecialties.length > 0 && telehealth !== null;
      case 3: return feePerSession.trim() && bio.trim().length >= 20;
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
        description: "Your profile is now visible to seekers.",
      });
      
      navigate("/dashboard");
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
        {/* Step 1: Credentials */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-display text-foreground mb-2">
              Your credentials
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              We verify all credentials for trust and safety
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-muted-foreground">Full name</Label>
                <Input
                  id="name"
                  placeholder="Dr. Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="licenseNumber" className="text-muted-foreground">License number</Label>
                <Input
                  id="licenseNumber"
                  placeholder="e.g., PSY12345"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="mt-1.5 h-11"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Practice details */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-display text-foreground mb-2">
              Your practice
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Tell us about your specialties
            </p>
            
            <div className="space-y-6">
              <div>
                <Label className="text-muted-foreground">Specialties</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => toggleSpecialty(specialty)}
                      className={`p-2 rounded-lg border text-xs transition-all ${
                        selectedSpecialties.includes(specialty)
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Offer telehealth?</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setTelehealth(true)}
                    className={`p-3 rounded-lg border transition-all ${
                      telehealth === true
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <div className="font-medium text-foreground text-sm">Yes</div>
                    <div className="text-xs text-muted-foreground">Online available</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTelehealth(false)}
                    className={`p-3 rounded-lg border transition-all ${
                      telehealth === false
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <div className="font-medium text-foreground text-sm">No</div>
                    <div className="text-xs text-muted-foreground">In-person only</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Bio & Fee */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-display text-foreground mb-2">
              Final details
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Help clients get to know you
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="feePerSession" className="text-muted-foreground">Fee per session ($)</Label>
                <Input
                  id="feePerSession"
                  type="number"
                  placeholder="e.g., 100"
                  value={feePerSession}
                  onChange={(e) => setFeePerSession(e.target.value)}
                  className="mt-1.5 h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="bio" className="text-muted-foreground">About you</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell clients about your approach..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1.5 min-h-24"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {bio.length}/20 characters minimum
                </p>
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
              {isLoading ? "Saving..." : "Complete profile"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProviderOnboarding;
