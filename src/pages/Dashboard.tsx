import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Search, MessageCircle, User, LogOut, Users, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type UserRole = "seeker" | "provider";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<{ full_name: string } | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      
      // Get role from database
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();
      
      if (roleData?.role) {
        setRole(roleData.role as UserRole);
      }
      
      // Get profile from database
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", session.user.id)
        .maybeSingle();
      
      if (profileData) {
        setProfile(profileData);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out successfully" });
    navigate("/");
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }
  
  const isSeeker = role === "seeker";
  const firstName = profile?.full_name?.split(" ")[0] || "there";
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Heart className="w-4 h-4 text-background" />
            </div>
            <span className="font-display text-lg text-foreground">Mend-AI</span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>
      
      <main className="container px-4 py-8 max-w-lg mx-auto">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-2xl font-display text-foreground mb-1">
            Hello, {firstName}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isSeeker
              ? "Continue your journey to better mental health."
              : "Manage your practice and connect with clients."}
          </p>
        </div>
        
        {isSeeker ? (
          /* Seeker Dashboard */
          <div className="space-y-6">
            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/browse"
                className="p-5 rounded-lg bg-foreground text-background"
              >
                <Search className="w-5 h-5 mb-3" />
                <h3 className="font-medium text-sm mb-0.5">Find therapists</h3>
                <p className="text-xs opacity-70">Browse and connect</p>
              </Link>
              
              <Link
                to="/messages"
                className="p-5 rounded-lg border border-border hover:border-foreground/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5 mb-3 text-muted-foreground" />
                <h3 className="font-medium text-sm text-foreground mb-0.5">Messages</h3>
                <p className="text-xs text-muted-foreground">Chat with therapists</p>
              </Link>
            </div>
            
            {/* Pending connections */}
            <div>
              <h2 className="font-medium text-foreground text-sm mb-3">Pending connections</h2>
              <div className="rounded-lg border border-border p-6 text-center">
                <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No pending connections yet.</p>
                <Button variant="link" size="sm" asChild className="mt-1 h-auto p-0">
                  <Link to="/browse">Browse therapists →</Link>
                </Button>
              </div>
            </div>
            
            {/* Your therapists */}
            <div>
              <h2 className="font-medium text-foreground text-sm mb-3">Your therapists</h2>
              <div className="rounded-lg border border-border p-6 text-center">
                <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">You haven't connected with any therapists yet.</p>
              </div>
            </div>
          </div>
        ) : (
          /* Provider Dashboard */
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-lg border border-border text-center">
                <div className="text-xl font-display text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
              <div className="p-4 rounded-lg border border-border text-center">
                <div className="text-xl font-display text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Clients</div>
              </div>
              <div className="p-4 rounded-lg border border-border text-center">
                <div className="text-xl font-display text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Sessions</div>
              </div>
            </div>
            
            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/messages"
                className="p-5 rounded-lg border border-border hover:border-foreground/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5 mb-3 text-muted-foreground" />
                <h3 className="font-medium text-sm text-foreground mb-0.5">Messages</h3>
                <p className="text-xs text-muted-foreground">Chat with clients</p>
              </Link>
              
              <Link
                to="/schedule"
                className="p-5 rounded-lg border border-border hover:border-foreground/30 transition-colors"
              >
                <Calendar className="w-5 h-5 mb-3 text-muted-foreground" />
                <h3 className="font-medium text-sm text-foreground mb-0.5">Schedule</h3>
                <p className="text-xs text-muted-foreground">Manage availability</p>
              </Link>
            </div>
            
            {/* Pending requests */}
            <div>
              <h2 className="font-medium text-foreground text-sm mb-3">Connection requests</h2>
              <div className="rounded-lg border border-border p-6 text-center">
                <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No pending requests at the moment.</p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="container px-4 flex justify-around py-3 max-w-lg mx-auto">
          <Link to="/dashboard" className="flex flex-col items-center gap-1 text-foreground">
            <Heart className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          
          {isSeeker && (
            <Link to="/browse" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <Search className="w-5 h-5" />
              <span className="text-xs">Browse</span>
            </Link>
          )}
          
          <Link to="/messages" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">Messages</span>
          </Link>
          
          <Link to="/profile" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
