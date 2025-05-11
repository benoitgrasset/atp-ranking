import Link from "next/link";
import { AuthButton } from "../auth/auth-button";
import { ModeToggle } from "../theme/theme-mode-toggle";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="flex gap-4 items-center justify-between px-4 py-2 border-b border-accent">
      <Link href="/" className="flex items-center gap-2">
        <Button variant="ghost" className="text-lg font-bold">
          <span className="hidden md:inline">ATP Ranking</span>
        </Button>
      </Link>
      <Link href="/stats">
        <Button>Stats</Button>
      </Link>
      <div className="flex-1"></div>
      <nav className="flex items-center gap-4">
        <Link href="/api/v1/openapi" className="text-sm font-medium">
          API
        </Link>
      </nav>
      <AuthButton />
      <ModeToggle />
    </header>
  );
}
