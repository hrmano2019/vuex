import { useState } from "react";
import { Bot, Briefcase, Scale, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Service {
  id: string;
  name: string;
  description: string;
}

interface Guidance {
  text: string;
}

const mockServices: Service[] = [
  { id: "SRV-01", name: "Tax Relief Program", description: "Emergency tax deferral for conflict-affected zones" },
  { id: "SRV-02", name: "Micro-Credit Access", description: "Low-interest loans for displaced entrepreneurs" },
  { id: "SRV-03", name: "Debt Moratorium", description: "Temporary suspension of debt obligations" },
  { id: "SRV-04", name: "Agricultural Aid", description: "Seed and equipment grants for returning farmers" },
];

const mockGuidanceResponses = [
  "Under the 2024 DRC Emergency Decree, residents of conflict zones may apply for a 12-month debt moratorium. File Form CTB-7 with your local registrar.",
  "Tax obligations are suspended for displaced persons under Article 14. Contact the Cognitive Tax Bot helpline for personalized assistance.",
  "Agricultural aid packages are available through the Ministry of Rural Development. Eligibility requires proof of land registration via Tuungana.",
];

export default function CognitiveTaxBotPanel() {
  const [services, setServices] = useState<Service[]>([]);
  const [applicantName, setApplicantName] = useState("");
  const [reliefType, setReliefType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");
  const [guidance, setGuidance] = useState<Guidance | null>(null);
  const [loadingGuidance, setLoadingGuidance] = useState(false);

  const loadServices = () => setServices(mockServices);

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !reliefType.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setApplicantName("");
    setReliefType("");
  };

  const fetchGuidance = () => {
    if (!query.trim()) return;
    setLoadingGuidance(true);
    setTimeout(() => {
      const randomGuidance =
        mockGuidanceResponses[Math.floor(Math.random() * mockGuidanceResponses.length)];
      setGuidance({ text: randomGuidance });
      setLoadingGuidance(false);
    }, 1200);
  };

  return (
    <div className="panel-card border-l-4 border-l-taxbot">
      <div className="panel-header">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-taxbot-light">
          <Bot className="h-5 w-5 text-taxbot" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-card-foreground">
            Cognitive Tax Bot
          </h2>
          <p className="text-sm text-muted-foreground">Public Services & Resilience</p>
        </div>
      </div>

      {/* Services */}
      <Button
        onClick={loadServices}
        size="sm"
        className="mb-4 bg-taxbot hover:bg-taxbot/90 text-accent-foreground"
      >
        <Briefcase className="mr-2 h-4 w-4" />
        Load Services
      </Button>

      {services.length > 0 && (
        <ul className="space-y-2 mb-6">
          {services.map((s) => (
            <li key={s.id} className="rounded-lg bg-taxbot-light/50 px-4 py-3">
              <p className="font-medium text-card-foreground">{s.name}</p>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Relief Application */}
      <div className="mb-6">
        <h3 className="text-sm font-heading font-semibold text-card-foreground mb-3 flex items-center gap-2">
          <Scale className="h-4 w-4 text-taxbot" />
          Apply for Relief
        </h3>
        <form onSubmit={submitApplication} className="space-y-3">
          <Input
            placeholder="Applicant Name"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            className="border-taxbot/30 focus-visible:ring-taxbot"
          />
          <Input
            placeholder="Relief Type (e.g., Tax Deferral)"
            value={reliefType}
            onChange={(e) => setReliefType(e.target.value)}
            className="border-taxbot/30 focus-visible:ring-taxbot"
          />
          <Button
            type="submit"
            size="sm"
            className="bg-taxbot hover:bg-taxbot/90 text-accent-foreground"
          >
            <Send className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </form>
        {submitted && (
          <p className="mt-2 text-sm text-primary font-medium">
            ✓ Application submitted successfully!
          </p>
        )}
      </div>

      {/* Legal Guidance */}
      <div>
        <h3 className="text-sm font-heading font-semibold text-card-foreground mb-3 flex items-center gap-2">
          <Scale className="h-4 w-4 text-taxbot" />
          Legal Guidance
        </h3>
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Ask a legal question…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-taxbot/30 focus-visible:ring-taxbot"
          />
          <Button
            onClick={fetchGuidance}
            disabled={loadingGuidance}
            size="sm"
            className="bg-taxbot hover:bg-taxbot/90 text-accent-foreground shrink-0"
          >
            {loadingGuidance ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Ask"
            )}
          </Button>
        </div>
        {guidance && (
          <div className="rounded-lg bg-taxbot-light/50 px-4 py-3">
            <p className="text-sm text-card-foreground">{guidance.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
