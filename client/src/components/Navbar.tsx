import { Link, useLocation } from "wouter";
import { Moon, Sun, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/analytics", label: "Analytics" },
    { path: "/upload", label: "Upload" },
    { path: "/feed", label: "Live Feed" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary via-[hsl(190,80%,48%)] to-[hsl(180,70%,50%)] backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 text-primary-foreground hover-elevate rounded-lg px-3 py-2 cursor-pointer" data-testid="link-home">
              <Waves className="h-6 w-6" />
              <span className="text-xl font-semibold">SamundraManthan</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  className={location === item.path ? "" : "text-primary-foreground hover:text-primary-foreground"}
                  data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-primary-foreground hover:text-primary-foreground"
            data-testid="button-theme-toggle"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
