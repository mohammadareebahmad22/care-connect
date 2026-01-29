import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Heart className="w-4 h-4 text-background" />
            </div>
            <span className="font-display text-lg text-foreground">Mend-AI</span>
          </Link>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
            <Link
              to="/auth"
              className="text-sm px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Get started
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <Link
                to="/auth"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/auth"
                className="text-sm px-4 py-2.5 bg-foreground text-background rounded-lg text-center"
                onClick={() => setIsOpen(false)}
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
