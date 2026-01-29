import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SeekerOnboarding from "./SeekerOnboarding";
import ProviderOnboarding from "./ProviderOnboarding";

type UserRole = "seeker" | "provider";

const Onboarding = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }
      
      // Get role from database
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (roleData?.role) {
        setRole(roleData.role as UserRole);
      } else {
        // No role found, redirect to auth
        navigate("/auth");
        return;
      }
      
      setLoading(false);
    };
    
    checkUser();
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }
  
  if (role === "provider") {
    return <ProviderOnboarding />;
  }
  
  return <SeekerOnboarding />;
};

export default Onboarding;
