import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search, MessageCircle, Clock, CheckCheck } from "lucide-react";

// Mock conversations
const mockConversations = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    lastMessage: "Looking forward to our first session!",
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
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container px-4 py-3 flex items-center gap-4">
          <Link to="/dashboard" className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          
          <h1 className="font-display text-lg flex-1">Messages</h1>
        </div>
        
        {/* Search */}
        <div className="container px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
      </header>
      
      <main className="container px-4 py-4 max-w-lg mx-auto">
        {filteredConversations.length > 0 ? (
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <Link
                key={conversation.id}
                to={`/chat/${conversation.id}`}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  conversation.unread
                    ? "bg-muted"
                    : "hover:bg-muted border border-border"
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={conversation.photo}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.status === "pending" && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-muted-foreground rounded-full flex items-center justify-center">
                      <Clock className="w-2.5 h-2.5 text-background" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="font-medium text-sm truncate text-foreground">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {conversation.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    {conversation.status === "accepted" && (
                      <CheckCheck className="w-3 h-3 text-muted-foreground shrink-0" />
                    )}
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  
                  {conversation.status === "pending" && (
                    <span className="inline-flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      Awaiting response
                    </span>
                  )}
                </div>
                
                {/* Unread indicator */}
                {conversation.unread && (
                  <div className="w-2 h-2 bg-foreground rounded-full shrink-0" />
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            
            <h2 className="font-display text-lg text-foreground mb-2">
              No conversations yet
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              When you connect with therapists, your conversations will appear here.
            </p>
            
            <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/browse">
                <Search className="w-4 h-4 mr-1" />
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
