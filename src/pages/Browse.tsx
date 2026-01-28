import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X, Undo, MapPin, Globe, DollarSign, Star, MessageCircle, Clock, ChevronLeft, Settings, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock therapist data
const mockTherapists = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    specialties: ["Anxiety", "Depression", "Trauma / PTSD"],
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
    specialties: ["Couples Therapy", "Relationship Issues", "Family Therapy"],
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
    specialties: ["Addiction", "Stress Management", "Career Counseling"],
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
    specialties: ["LGBTQ+", "Identity", "Life Transitions"],
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
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  
  const currentTherapist = mockTherapists[currentIndex];
  const hasMoreTherapists = currentIndex < mockTherapists.length;
  
  const handleSwipe = (direction: "left" | "right") => {
    if (!hasMoreTherapists) return;
    
    setSwipeDirection(direction);
    setSwipeHistory(prev => [...prev, { index: currentIndex, direction }]);
    
    if (direction === "right") {
      toast({
        title: "Request sent!",
        description: `${currentTherapist.name} will be notified of your interest.`,
      });
    }
    
    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentIndex(prev => prev + 1);
      setExpandedCard(false);
    }, 300);
  };
  
  const handleUndo = () => {
    if (swipeHistory.length === 0) return;
    
    const lastSwipe = swipeHistory[swipeHistory.length - 1];
    setSwipeHistory(prev => prev.slice(0, -1));
    setCurrentIndex(lastSwipe.index);
    
    toast({
      title: "Undone",
      description: "Previous action has been reversed.",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          
          <h1 className="font-display text-xl">Find a therapist</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Filter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container px-4 py-6 max-w-lg mx-auto">
        {hasMoreTherapists ? (
          <>
            {/* Card */}
            <div
              className={`relative rounded-3xl overflow-hidden bg-card shadow-soft-lg transition-transform duration-300 ${
                swipeDirection === "left" ? "animate-slide-left" : ""
              } ${swipeDirection === "right" ? "animate-slide-right" : ""}`}
              onClick={() => setExpandedCard(!expandedCard)}
            >
              {/* Image */}
              <div className="relative h-80 md:h-96">
                <img
                  src={currentTherapist.photo}
                  alt={currentTherapist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Basic info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-display text-2xl text-white mb-1">
                    {currentTherapist.name}
                  </h2>
                  
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-gentle-amber text-gentle-amber" />
                      <span>{currentTherapist.rating}</span>
                      <span className="text-white/60">({currentTherapist.reviews})</span>
                    </div>
                    
                    {currentTherapist.distance && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{currentTherapist.distance}</span>
                      </div>
                    )}
                    
                    {currentTherapist.telehealth && (
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>Online</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Details */}
              <div className="p-6 space-y-4">
                {/* Fee and availability */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-foreground">
                    <DollarSign className="w-5 h-5 text-sage" />
                    <span className="font-medium">${currentTherapist.fee}/session</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{currentTherapist.nextAvailable}</span>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {currentTherapist.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-sage-light text-sage-dark rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                {/* Expanded info */}
                {expandedCard && (
                  <div className="pt-4 border-t border-border space-y-4 animate-fade-in">
                    <p className="text-muted-foreground">{currentTherapist.bio}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
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
            <div className="flex items-center justify-center gap-6 mt-8">
              <Button
                variant="swipe-decline"
                onClick={() => handleSwipe("left")}
                aria-label="Pass"
              >
                <X className="w-6 h-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12"
                onClick={handleUndo}
                disabled={swipeHistory.length === 0}
                aria-label="Undo"
              >
                <Undo className="w-5 h-5" />
              </Button>
              
              <Button
                variant="swipe"
                onClick={() => handleSwipe("right")}
                aria-label="Connect"
              >
                <Heart className="w-6 h-6" />
              </Button>
            </div>
            
            {/* Card counter */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              {currentIndex + 1} of {mockTherapists.length} matches
            </p>
          </>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            
            <h2 className="font-display text-2xl text-foreground mb-2">
              No more matches
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
              You've seen all therapists matching your current filters. Try adjusting your preferences.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button variant="outline" onClick={() => setCurrentIndex(0)}>
                <Undo className="w-4 h-4 mr-2" />
                Start over
              </Button>
              <Button variant="ghost">
                <Filter className="w-4 h-4 mr-2" />
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
          className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          View pending connections
        </Link>
      </div>
    </div>
  );
};

export default Browse;
