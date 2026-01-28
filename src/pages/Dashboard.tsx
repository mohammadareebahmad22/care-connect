import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Search, MessageCircle, User, Bell, LogOut, Users, Calendar, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      
      // Get profile from localStorage (temporary)
      const savedProfile = localStorage.getItem("mend_profile");
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("mend_profile");
    toast({ title: "Signed out successfully" });
    navigate("/");
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }
  
  const isSeeker = profile?.role === "seeker";
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-sage flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl text-foreground">Mend-AI</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container px-4 py-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-2xl text-foreground mb-1">
            Welcome back, {profile?.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-muted-foreground">
            {isSeeker
              ? "Continue your journey to better mental health."
              : "Manage your practice and connect with clients."}
          </p>
        </div>
        
        {isSeeker ? (
          /* Seeker Dashboard */
          <>
            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Link
                to="/browse"
                className="p-6 rounded-2xl gradient-sage text-primary-foreground shadow-soft-lg hover:shadow-glow transition-shadow"
              >
                <Search className="w-8 h-8 mb-3" />
                <h3 className="font-display text-lg mb-1">Find therapists</h3>
                <p className="text-sm text-primary-foreground/80">Browse and connect</p>
              </Link>
              
              <Link
                to="/messages"
                className="p-6 rounded-2xl bg-card border border-border hover:border-sage/30 transition-colors shadow-soft"
              >
                <MessageCircle className="w-8 h-8 mb-3 text-sage" />
                <h3 className="font-display text-lg text-foreground mb-1">Messages</h3>
                <p className="text-sm text-muted-foreground">Chat with therapists</p>
              </Link>
            </div>
            
            {/* Pending connections */}
            <div className="mb-8">
              <h2 className="font-display text-lg text-foreground mb-4">Pending connections</h2>
              <div className="bg-card rounded-2xl border border-border p-6 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No pending connections yet.</p>
                <Button variant="link" asChild className="mt-2">
                  <Link to="/browse">Browse therapists →</Link>
                </Button>
              </div>
            </div>
            
            {/* Your therapists */}
            <div>
              <h2 className="font-display text-lg text-foreground mb-4">Your therapists</h2>
              <div className="bg-card rounded-2xl border border-border p-6 text-center">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">You haven't connected with any therapists yet.</p>
              </div>
            </div>
          </>
        ) : (
          /* Provider Dashboard */
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="text-2xl font-display text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Pending requests</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="text-2xl font-display text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Active clients</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="text-2xl font-display text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Sessions this week</div>
              </div>
            </div>
            
            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Link
                to="/messages"
                className="p-6 rounded-2xl bg-card border border-border hover:border-sage/30 transition-colors shadow-soft"
              >
                <MessageCircle className="w-8 h-8 mb-3 text-sage" />
                <h3 className="font-display text-lg text-foreground mb-1">Messages</h3>
                <p className="text-sm text-muted-foreground">Chat with clients</p>
              </Link>
              
              <Link
                to="/schedule"
                className="p-6 rounded-2xl bg-card border border-border hover:border-sage/30 transition-colors shadow-soft"
              >
                <Calendar className="w-8 h-8 mb-3 text-sage" />
                <h3 className="font-display text-lg text-foreground mb-1">Schedule</h3>
                <p className="text-sm text-muted-foreground">Manage availability</p>
              </Link>
            </div>
            
            {/* Pending requests */}
            <div className="mb-8">
              <h2 className="font-display text-lg text-foreground mb-4">Connection requests</h2>
              <div className="bg-card rounded-2xl border border-border p-6 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No pending requests at the moment.</p>
              </div>
            </div>
          </>
        )}
      </main>
      
      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container px-4 flex justify-around py-3">
          <Link to="/dashboard" className="flex flex-col items-center gap-1 text-sage">
            <Heart className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          
          {isSeeker && (
            <Link to="/browse" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <Search className="w-6 h-6" />
              <span className="text-xs">Browse</span>
            </Link>
          )}
          
          <Link to="/messages" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Messages</span>
          </Link>
          
          <Link to="/profile" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
