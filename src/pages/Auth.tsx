import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowLeft, User, Stethoscope, Eye, EyeOff } from "lucide-react";
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
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if user has a role
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle();
        
        if (roleData?.role) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }
    };
    
    checkExistingSession();
  }, [navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "signup" && !role) {
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
              pending_role: role, // Store temporarily in metadata
            },
          },
        });
        
        if (error) throw error;
        
        if (data.user) {
          // Create profile
          const { error: profileError } = await supabase
            .from("profiles")
            .insert({
              user_id: data.user.id,
              full_name: "",
            });
          
          if (profileError) throw profileError;
          
          // Create role
          const { error: roleError } = await supabase
            .from("user_roles")
            .insert({
              user_id: data.user.id,
              role: role as Role,
            });
          
          if (roleError) throw roleError;
        }
        
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
        
        // Get user role from database
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .maybeSingle();
        
        toast({
          title: "Welcome back!",
        });
        
        // Check if onboarding is complete (profile has name)
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("user_id", data.user.id)
          .maybeSingle();
        
        if (!profileData?.full_name) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
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
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
            <Heart className="w-5 h-5 text-background" />
          </div>
          <span className="font-display text-2xl text-foreground">Mend-AI</span>
        </div>
        
        <h1 className="text-3xl font-display text-foreground mb-2">
          {mode === "signup" ? "Create account" : "Welcome back"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {mode === "signup"
            ? "Start your journey to better mental health"
            : "Sign in to continue"}
        </p>
        
        {/* Role selection - only show on signup */}
        {mode === "signup" && (
          <div className="mb-8">
            <Label className="text-sm text-muted-foreground mb-3 block">I am a...</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("seeker")}
                className={`p-4 rounded-lg border text-left transition-all ${
                  role === "seeker"
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/30"
                }`}
              >
                <User className={`w-5 h-5 mb-2 ${role === "seeker" ? "text-foreground" : "text-muted-foreground"}`} />
                <div className="font-medium text-foreground text-sm">Seeker</div>
                <div className="text-xs text-muted-foreground">Find support</div>
              </button>
              
              <button
                type="button"
                onClick={() => setRole("provider")}
                className={`p-4 rounded-lg border text-left transition-all ${
                  role === "provider"
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/30"
                }`}
              >
                <Stethoscope className={`w-5 h-5 mb-2 ${role === "provider" ? "text-foreground" : "text-muted-foreground"}`} />
                <div className="font-medium text-foreground text-sm">Therapist</div>
                <div className="text-xs text-muted-foreground">Help others</div>
              </button>
            </div>
          </div>
        )}
        
        {/* Auth form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-muted-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 h-11"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-muted-foreground">Password</Label>
            <div className="relative mt-1.5">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-11 bg-foreground text-background hover:bg-foreground/90" 
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : mode === "signup" ? "Create account" : "Sign in"}
          </Button>
        </form>
        
        {/* Toggle mode */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-foreground hover:underline font-medium"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-foreground hover:underline font-medium"
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
