import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X, Undo, MapPin, Globe, DollarSign, Star, MessageCircle, Clock, ChevronLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock therapist data
const mockTherapists = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    specialties: ["Anxiety", "Depression", "Trauma"],
    fee: 120,
    rating: 4.9,
    reviews: 127,
    distance: "2.3 mi",
    nextAvailable: "Tomorrow, 10:00 AM",
    languages: ["English", "Mandarin"],
    telehealth: true,
    bio: "I specialize in helping adults navigate anxiety, depression, and life transitions. My approach combines CBT with mindfulness techniques.",
    yearsExperience: 12,
  },
  {
    id: "2",
    name: "Michael Rodriguez, LMFT",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    specialties: ["Couples", "Relationship", "Family"],
    fee: 150,
    rating: 4.8,
    reviews: 89,
    distance: "4.1 mi",
    nextAvailable: "Wed, 2:00 PM",
    languages: ["English", "Spanish"],
    telehealth: true,
    bio: "I help couples and families build stronger, healthier relationships. With 15 years of experience, I use the Gottman Method and EFT.",
    yearsExperience: 15,
  },
  {
    id: "3",
    name: "Dr. Emily Watson",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    specialties: ["Addiction", "Stress", "Career"],
    fee: 100,
    rating: 4.7,
    reviews: 64,
    distance: null,
    nextAvailable: "Today, 5:00 PM",
    languages: ["English"],
    telehealth: true,
    bio: "Specializing in addiction recovery and stress management. I believe in a holistic approach that addresses mind, body, and spirit.",
    yearsExperience: 8,
  },
  {
    id: "4",
    name: "James Thompson, PhD",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    specialties: ["LGBTQ+", "Identity", "Transitions"],
    fee: 130,
    rating: 5.0,
    reviews: 42,
    distance: "1.8 mi",
    nextAvailable: "Thu, 11:00 AM",
    languages: ["English", "French"],
    telehealth: true,
    bio: "I provide affirming therapy for LGBTQ+ individuals navigating identity, relationships, and life changes. Safe space guaranteed.",
    yearsExperience: 10,
  },
];

const Browse = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState(false);
  const [swipeHistory, setSwipeHistory] = useState<{ index: number; direction: "left" | "right" }[]>([]);
  
  const currentTherapist = mockTherapists[currentIndex];
  const hasMoreTherapists = currentIndex < mockTherapists.length;
  
  const handleSwipe = (direction: "left" | "right") => {
    if (!hasMoreTherapists) return;
    
    setSwipeHistory(prev => [...prev, { index: currentIndex, direction }]);
    
    if (direction === "right") {
      toast({
        title: "Request sent!",
        description: `${currentTherapist.name} will be notified.`,
      });
    }
    
    setCurrentIndex(prev => prev + 1);
    setExpandedCard(false);
  };
  
  const handleUndo = () => {
    if (swipeHistory.length === 0) return;
    
    const lastSwipe = swipeHistory[swipeHistory.length - 1];
    setSwipeHistory(prev => prev.slice(0, -1));
    setCurrentIndex(lastSwipe.index);
    
    toast({
      title: "Undone",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container px-4 py-3 flex items-center justify-between">
          <Link to="/dashboard" className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          
          <h1 className="font-display text-lg">Find a therapist</h1>
          
          <Button variant="ghost" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </header>
      
      <main className="container px-4 py-6 max-w-sm mx-auto">
        {hasMoreTherapists ? (
          <>
            {/* Card */}
            <div
              className="relative rounded-xl overflow-hidden bg-card border border-border"
              onClick={() => setExpandedCard(!expandedCard)}
            >
              {/* Image */}
              <div className="relative h-64">
                <img
                  src={currentTherapist.photo}
                  alt={currentTherapist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Basic info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="font-display text-xl text-white mb-1">
                    {currentTherapist.name}
                  </h2>
                  
                  <div className="flex items-center gap-3 text-white/80 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>{currentTherapist.rating}</span>
                    </div>
                    
                    {currentTherapist.distance && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{currentTherapist.distance}</span>
                      </div>
                    )}
                    
                    {currentTherapist.telehealth && (
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>Online</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Details */}
              <div className="p-4 space-y-3">
                {/* Fee and availability */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>${currentTherapist.fee}/session</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{currentTherapist.nextAvailable}</span>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5">
                  {currentTherapist.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                {/* Expanded info */}
                {expandedCard && (
                  <div className="pt-3 border-t border-border space-y-3 animate-fade-in">
                    <p className="text-sm text-muted-foreground">{currentTherapist.bio}</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Experience</span>
                        <p className="font-medium text-foreground">{currentTherapist.yearsExperience} years</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Languages</span>
                        <p className="font-medium text-foreground">{currentTherapist.languages.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-center text-muted-foreground">
                  Tap to {expandedCard ? "collapse" : "see more"}
                </p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => handleSwipe("left")}
                className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Pass"
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
              
              <button
                onClick={handleUndo}
                disabled={swipeHistory.length === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                aria-label="Undo"
              >
                <Undo className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => handleSwipe("right")}
                className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors"
                aria-label="Connect"
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>
            
            {/* Card counter */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              {currentIndex + 1} of {mockTherapists.length}
            </p>
          </>
        ) : (
          /* Empty state */
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            
            <h2 className="font-display text-xl text-foreground mb-2">
              No more matches
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              You've seen all therapists. Try adjusting your filters.
            </p>
            
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentIndex(0)}>
                <Undo className="w-4 h-4 mr-1" />
                Start over
              </Button>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Adjust filters
              </Button>
            </div>
          </div>
        )}
      </main>
      
      {/* Bottom nav hint */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center">
        <Link
          to="/messages"
          className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-3 h-3" />
          View connections
        </Link>
      </div>
    </div>
  );
};

export default Browse;
