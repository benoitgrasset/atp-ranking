import { AuthButton } from "../auth/auth-button";
import { ModeToggle } from "../theme/theme-mode-toggle";

export function Header() {
  return (
    <header className="flex gap-4 items-center justify-between px-4 py-2 border-b border-accent">
      <p>ATP Ranking</p>
      <div className="flex-1"></div>
      <AuthButton />
      <ModeToggle />
    </header>
  );
}
