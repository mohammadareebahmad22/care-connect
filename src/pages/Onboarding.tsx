import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SeekerOnboarding from "./SeekerOnboarding";
import ProviderOnboarding from "./ProviderOnboarding";

const Onboarding = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }
      
      // Get role from user metadata
      const userRole = user.user_metadata?.role || "seeker";
      setRole(userRole);
      setLoading(false);
    };
    
    checkUser();
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }
  
  if (role === "provider") {
    return <ProviderOnboarding />;
  }
  
  return <SeekerOnboarding />;
};

export default Onboarding;
