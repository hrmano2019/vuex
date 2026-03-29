import { Globe } from "lucide-react";
import TuunganaPanel from "@/components/TuunganaPanel";
import MasisiPrimePanel from "@/components/MasisiPrimePanel";
import CognitiveTaxBotPanel from "@/components/CognitiveTaxBotPanel";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-5">
        <div className="mx-auto max-w-7xl flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Globe className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-card-foreground">
              Community AI Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Land Rights · Health Monitoring · Public Services
            </p>
          </div>
        </div>
      </header>

      {/* Panels */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <TuunganaPanel />
          <MasisiPrimePanel />
          <CognitiveTaxBotPanel />
        </div>
      </main>
    </div>
  );
}
