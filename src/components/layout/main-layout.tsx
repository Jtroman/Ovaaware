import type { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { Toaster } from "@/components/ui/toaster";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
