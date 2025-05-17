import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary-foreground">
          Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
