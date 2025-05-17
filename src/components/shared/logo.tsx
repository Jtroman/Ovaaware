import { HeartPulse } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <HeartPulse className="h-8 w-8 text-primary" />
      <span className="font-bold text-xl text-foreground">
        OvaAware
      </span>
    </Link>
  );
}
