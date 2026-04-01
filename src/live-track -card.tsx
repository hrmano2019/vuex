import { MapPin, Thermometer, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveTrackingCardProps {
  productName: string;
  batchId: string;
  origin: string;
  destination: string;
  currentLocation: string;
  temperature?: number;
  temperatureStatus?: "normal" | "warning" | "critical";
  eta: string;
  progress: number;
  status: "en-route" | "delivered" | "delayed" | "processing";
  index?: number;
}

const statusConfig = {
  "en-route": { label: "En transit", color: "bg-info text-info-foreground" },
  "delivered": { label: "Livré", color: "bg-success text-success-foreground" },
  "delayed": { label: "Retardé", color: "bg-warning text-warning-foreground" },
  "processing": { label: "En traitement", color: "bg-secondary text-secondary-foreground" },
};

const tempStatusConfig = {
  normal: { color: "text-success", icon: Thermometer },
  warning: { color: "text-warning", icon: AlertTriangle },
  critical: { color: "text-destructive", icon: AlertTriangle },
};

export function LiveTrackingCard({
  productName,
  batchId,
  origin,
  destination,
  currentLocation,
  temperature,
  temperatureStatus = "normal",
  eta,
  progress,
  status,
  index = 0,
}: LiveTrackingCardProps) {
  const statusInfo = statusConfig[status];
  const tempInfo = temperature ? tempStatusConfig[temperatureStatus] : null;

  return (
    <div
      className="rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:shadow-elevated animate-slide-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-card-foreground">{productName}</h4>
          <p className="text-xs text-muted-foreground">Lot: {batchId}</p>
        </div>
        <div className="flex items-center gap-2">
          {status === "en-route" && (
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-live" />
          )}
          <span className={cn("px-2 py-1 rounded-full text-xs font-medium", statusInfo.color)}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Route Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{origin}</span>
            <span>{destination}</span>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-primary rounded-full border-2 border-card shadow-sm transition-all duration-500"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-card-foreground truncate">{currentLocation}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-card-foreground">ETA: {eta}</span>
          </div>
          {temperature !== undefined && tempInfo && (
            <div className="flex items-center gap-2 text-sm col-span-2">
              <tempInfo.icon className={cn("h-4 w-4", tempInfo.color)} />
              <span className={cn("font-medium", tempInfo.color)}>{temperature}°C</span>
              <span className="text-muted-foreground text-xs">
                {temperatureStatus === "normal" ? "Température optimale" : "Attention requise"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
