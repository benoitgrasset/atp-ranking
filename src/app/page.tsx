import { Toaster } from "sonner";
import Players from "../components/player/Players";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main>
        <Players />
      </main>
      <Toaster />
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
