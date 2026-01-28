import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, ChevronLeft, Search, MessageCircle, Clock, Check, CheckCheck } from "lucide-react";

// Mock conversations
const mockConversations = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    lastMessage: "Looking forward to our first session! Let me know if you have any questions.",
    timestamp: "2 hours ago",
    unread: true,
    status: "accepted",
  },
  {
    id: "2",
    name: "Michael Rodriguez, LMFT",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    lastMessage: "You sent a connection request",
    timestamp: "Yesterday",
    unread: false,
    status: "pending",
  },
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container px-4 py-4 flex items-center gap-4">
          <Link to="/dashboard" className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          
          <h1 className="font-display text-xl flex-1">Messages</h1>
        </div>
        
        {/* Search */}
        <div className="container px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>
      
      <main className="container px-4 py-4">
        {filteredConversations.length > 0 ? (
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <Link
                key={conversation.id}
                to={`/chat/${conversation.id}`}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${
                  conversation.unread
                    ? "bg-sage-light hover:bg-sage-light/80"
                    : "bg-card hover:bg-muted border border-border"
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={conversation.photo}
                    alt={conversation.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {conversation.status === "pending" && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gentle-amber rounded-full flex items-center justify-center">
                      <Clock className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`font-medium truncate ${conversation.unread ? "text-foreground" : "text-foreground"}`}>
                      {conversation.name}
                    </h3>
                    <span className={`text-xs whitespace-nowrap ${conversation.unread ? "text-sage-dark font-medium" : "text-muted-foreground"}`}>
                      {conversation.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {conversation.status === "accepted" && (
                      <CheckCheck className="w-4 h-4 text-sage shrink-0" />
                    )}
                    <p className={`text-sm truncate ${conversation.unread ? "text-foreground" : "text-muted-foreground"}`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                  
                  {conversation.status === "pending" && (
                    <span className="inline-flex items-center gap-1 mt-2 text-xs text-gentle-amber font-medium">
                      <Clock className="w-3 h-3" />
                      Awaiting response
                    </span>
                  )}
                </div>
                
                {/* Unread indicator */}
                {conversation.unread && (
                  <div className="w-3 h-3 bg-sage rounded-full shrink-0" />
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            
            <h2 className="font-display text-xl text-foreground mb-2">
              No conversations yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
              When you connect with therapists, your conversations will appear here.
            </p>
            
            <Button asChild>
              <Link to="/browse">
                <Search className="w-4 h-4 mr-2" />
                Browse therapists
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
