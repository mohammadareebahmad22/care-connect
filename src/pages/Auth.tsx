import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowLeft, User, Stethoscope, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Role = "seeker" | "provider";
type Mode = "signin" | "signup";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [role, setRole] = useState<Role | null>(
    (searchParams.get("role") as Role) || null
  );
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // Redirect based on profile role
        navigate("/onboarding");
      }
    });
  }, [navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      toast({
        title: "Please select a role",
        description: "Are you looking for support or are you a therapist?",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              role: role,
            },
          },
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Let's set up your profile.",
        });
        
        navigate("/onboarding");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
        });
        
        navigate("/dashboard");
      }
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
    <div className="min-h-screen bg-background flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-sage p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
        
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl text-primary-foreground">Mend-AI</span>
        </Link>
        
        <div className="relative z-10">
          <h2 className="font-display text-4xl text-primary-foreground mb-4">
            Your journey to better mental health starts here.
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Connect with verified therapists who understand your needs.
          </p>
        </div>
        
        <div className="relative z-10 text-primary-foreground/60 text-sm">
          Secure. Private. Trusted by thousands.
        </div>
      </div>
      
      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-sage flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl text-foreground">Mend-AI</span>
          </div>
          
          <h1 className="font-display text-3xl text-foreground mb-2">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {mode === "signup"
              ? "Start your journey to better mental health"
              : "Sign in to continue your journey"}
          </p>
          
          {/* Role selection */}
          {mode === "signup" && (
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">I am...</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("seeker")}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    role === "seeker"
                      ? "border-sage bg-sage-light"
                      : "border-border hover:border-sage/50"
                  }`}
                >
                  <User className={`w-6 h-6 mb-2 ${role === "seeker" ? "text-sage" : "text-muted-foreground"}`} />
                  <div className="font-medium text-foreground">Looking for support</div>
                  <div className="text-xs text-muted-foreground">Find a therapist</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRole("provider")}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    role === "provider"
                      ? "border-sage bg-sage-light"
                      : "border-border hover:border-sage/50"
                  }`}
                >
                  <Stethoscope className={`w-6 h-6 mb-2 ${role === "provider" ? "text-sage" : "text-muted-foreground"}`} />
                  <div className="font-medium text-foreground">Therapist</div>
                  <div className="text-xs text-muted-foreground">Help others heal</div>
                </button>
              </div>
            </div>
          )}
          
          {/* Auth form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Loading..." : mode === "signup" ? "Create account" : "Sign in"}
            </Button>
          </form>
          
          {/* Toggle mode */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="text-sage hover:text-sage-dark font-medium"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-sage hover:text-sage-dark font-medium"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
