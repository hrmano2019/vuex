import { useState } from "react";
import { Activity, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Prediction {
  id: string;
  region: string;
  risk: "high" | "medium" | "low";
  expectedCases: number;
}

const mockPredictions: Prediction[] = [
  { id: "MP-001", region: "Masisi Centre", risk: "high", expectedCases: 342 },
  { id: "MP-002", region: "Kitchanga", risk: "medium", expectedCases: 128 },
  { id: "MP-003", region: "Mweso", risk: "high", expectedCases: 267 },
  { id: "MP-004", region: "Walikale", risk: "low", expectedCases: 45 },
];

const riskStyles: Record<string, string> = {
  high: "status-risk-high",
  medium: "status-risk-medium",
  low: "status-risk-low",
};

export default function MasisiPrimePanel() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPredictions = () => {
    setLoading(true);
    setTimeout(() => {
      setPredictions(mockPredictions);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="panel-card border-l-4 border-l-masisi">
      <div className="panel-header">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-masisi-light">
          <Activity className="h-5 w-5 text-masisi" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-card-foreground">
            Masisi-Prime Predictions
          </h2>
          <p className="text-sm text-muted-foreground">Health & Nutrition Risk Monitor</p>
        </div>
      </div>

      <Button
        onClick={loadPredictions}
        disabled={loading}
        size="sm"
        className="mb-4 bg-masisi hover:bg-masisi/90 text-secondary-foreground"
      >
        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        {loading ? "Loading…" : "Refresh Predictions"}
      </Button>

      {predictions.length > 0 && (
        <ul className="space-y-3">
          {predictions.map((pred) => (
            <li
              key={pred.id}
              className="flex items-center justify-between rounded-lg bg-masisi-light/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-masisi" />
                <div>
                  <p className="font-medium text-card-foreground">{pred.region}</p>
                  <p className="text-sm text-muted-foreground">
                    Expected Cases: {pred.expectedCases}
                  </p>
                </div>
              </div>
              <span className={`panel-badge ${riskStyles[pred.risk]}`}>
                {pred.risk} risk
              </span>
            </li>
          ))}
        </ul>
      )}

      {predictions.length === 0 && !loading && (
        <p className="text-sm text-muted-foreground italic">
          Click refresh to load predictions.
        </p>
      )}
    </div>
  );
}
