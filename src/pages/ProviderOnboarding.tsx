import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, ArrowLeft, ArrowRight, Upload, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const specialties = [
  "Depression", "Anxiety", "Trauma / PTSD", "Relationship Therapy",
  "Family Therapy", "Addiction", "Grief Counseling", "Career Counseling",
  "Child & Adolescent", "Couples Therapy", "Eating Disorders", "LGBTQ+",
  "Stress Management", "Life Transitions", "Anger Management", "Other"
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ProviderOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [telehealth, setTelehealth] = useState<boolean | null>(null);
  const [clinicAddress, setClinicAddress] = useState("");
  const [languages, setLanguages] = useState("English");
  const [feePerSession, setFeePerSession] = useState("");
  const [acceptedInsurance, setAcceptedInsurance] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  
  const totalSteps = 4;
  
  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };
  
  const toggleDay = (day: string) => {
    setAvailableDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };
  
  const canProceed = () => {
    switch (step) {
      case 1: return name.trim() && licenseNumber.trim();
      case 2: return selectedSpecialties.length > 0 && telehealth !== null;
      case 3: return feePerSession.trim() && languages.trim();
      case 4: return bio.trim().length >= 50 && availableDays.length > 0;
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
        role: "provider",
        name,
        practice_name: practiceName,
        license_number: licenseNumber,
        specialties: selectedSpecialties,
        telehealth,
        clinic_address: clinicAddress,
        languages: languages.split(",").map(l => l.trim()),
        fee_per_session: parseFloat(feePerSession),
        accepted_insurance: acceptedInsurance.split(",").map(i => i.trim()).filter(Boolean),
        available_days: availableDays,
        bio,
      };
      
      localStorage.setItem("mend_profile", JSON.stringify(profile));
      
      toast({
        title: "Profile complete!",
        description: "Your profile is now visible to seekers.",
      });
      
      navigate("/provider-dashboard");
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
        {/* Step 1: Credentials */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl text-foreground mb-2">
              Your credentials
            </h1>
            <p className="text-muted-foreground mb-8">
              We verify all credentials to ensure trust and safety.
            </p>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  placeholder="Dr. Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="practiceName">Practice name (optional)</Label>
                <Input
                  id="practiceName"
                  placeholder="e.g., Wellness Therapy Center"
                  value={practiceName}
                  onChange={(e) => setPracticeName(e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="licenseNumber">License number</Label>
                <Input
                  id="licenseNumber"
                  placeholder="e.g., PSY12345"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>License document</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-sage/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload your license (PDF, JPG, PNG)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Practice details */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl text-foreground mb-2">
              Your practice
            </h1>
            <p className="text-muted-foreground mb-8">
              Tell us about your specialties and how you work.
            </p>
            
            <div className="space-y-6">
              <div>
                <Label>Specialties</Label>
                <p className="text-xs text-muted-foreground mb-2">Select all that apply</p>
                <div className="grid grid-cols-2 gap-3">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => toggleSpecialty(specialty)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        selectedSpecialties.includes(specialty)
                          ? "border-sage bg-sage-light text-foreground"
                          : "border-border hover:border-sage/50 text-muted-foreground"
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Do you offer telehealth?</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setTelehealth(true)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      telehealth === true
                        ? "border-sage bg-sage-light"
                        : "border-border hover:border-sage/50"
                    }`}
                  >
                    <div className="font-medium text-foreground">Yes</div>
                    <div className="text-xs text-muted-foreground">Online sessions available</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTelehealth(false)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      telehealth === false
                        ? "border-sage bg-sage-light"
                        : "border-border hover:border-sage/50"
                    }`}
                  >
                    <div className="font-medium text-foreground">No</div>
                    <div className="text-xs text-muted-foreground">In-person only</div>
                  </button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="clinicAddress">Clinic address (optional)</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="clinicAddress"
                    placeholder="123 Main St, City, State"
                    value={clinicAddress}
                    onChange={(e) => setClinicAddress(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Fees & Languages */}
        {step === 3 && (
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl text-foreground mb-2">
              Fees & languages
            </h1>
            <p className="text-muted-foreground mb-8">
              Help clients understand your rates.
            </p>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="feePerSession">Fee per session ($)</Label>
                <Input
                  id="feePerSession"
                  type="number"
                  placeholder="e.g., 100"
                  value={feePerSession}
                  onChange={(e) => setFeePerSession(e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="acceptedInsurance">Accepted insurance (optional)</Label>
                <Input
                  id="acceptedInsurance"
                  placeholder="e.g., Aetna, Blue Cross, United"
                  value={acceptedInsurance}
                  onChange={(e) => setAcceptedInsurance(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate multiple with commas
                </p>
              </div>
              
              <div>
                <Label htmlFor="languages">Languages spoken</Label>
                <Input
                  id="languages"
                  placeholder="e.g., English, Spanish"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Bio & Availability */}
        {step === 4 && (
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl text-foreground mb-2">
              Your profile
            </h1>
            <p className="text-muted-foreground mb-8">
              Help clients get to know you.
            </p>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="bio">About you</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell potential clients about your approach, experience, and what makes you unique..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-2 min-h-32"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {bio.length}/50 characters minimum
                </p>
              </div>
              
              <div>
                <Label>Availability</Label>
                <p className="text-xs text-muted-foreground mb-2">Select days you're typically available</p>
                <div className="flex flex-wrap gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        availableDays.includes(day)
                          ? "border-sage bg-sage text-primary-foreground"
                          : "border-border hover:border-sage/50 text-muted-foreground"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Profile photo</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-sage/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Upload a professional photo
                  </p>
                </div>
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
              {isLoading ? "Saving..." : "Complete profile"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProviderOnboarding;
