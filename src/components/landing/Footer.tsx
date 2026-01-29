import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-6 border-t border-border">
      <div className="container max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-background" />
            </div>
            <span className="font-display text-foreground">Mend-AI</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/crisis" className="hover:text-foreground transition-colors">
              Crisis Resources
            </Link>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © 2025 Mend-AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
