"use client"; // For potential future auth state, keep client for now

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock authentication state
  const isAuthenticated = false; 

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {item.title}
            </Link>
          ))}
          {isAuthenticated ? (
            <Button variant="outline" size="sm">Logout</Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40">
          <nav className="flex flex-col items-start space-y-2 p-4">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="w-full rounded-md p-2 text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Separator className="my-2" />
             {isAuthenticated ? (
                <Button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>Logout</Button>
              ) : (
                <>
                  <Button variant="ghost" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
          </nav>
        </div>
      )}
    </header>
  );
}

// Placeholder, actual component might be more complex
function Separator({ className }: { className?: string }) {
  return <hr className={cn("border-border/40", className)} />;
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}
