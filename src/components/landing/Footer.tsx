import { Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-sage flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl text-foreground">Mend-AI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-4">
              Fast access to trusted mental-health support. Connect with verified therapists, understand your needs, and begin your healing journey.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>All data encrypted. Privacy-first design.</span>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/auth?role=provider" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  For therapists
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/crisis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Crisis resources
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mend-AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Not a crisis service. If you're in immediate danger, please call emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
