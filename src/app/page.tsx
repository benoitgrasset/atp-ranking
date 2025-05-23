import PlayersContainer from "@/components/player/PlayersContainer";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main>
        <PlayersContainer />
      </main>
      <Toaster />
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
