import { TrendingUp, TrendingDown, Package, Truck, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItemProps {
  label: string;
  value: string | number;
  trend?: { value: number; positive: boolean };
  icon: React.ElementType;
  iconColor?: string;
}

function StatItem({ label, value, trend, icon: Icon, iconColor = "text-primary" }: StatItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
      <div className={cn("p-2 rounded-lg bg-background", iconColor)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold text-foreground">{value}</p>
          {trend && (
            <span className={cn("text-xs font-medium flex items-center gap-0.5", trend.positive ? "text-success" : "text-destructive")}>
              {trend.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {trend.value}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function CommodityStats() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card animate-slide-up">
      <h3 className="font-semibold text-card-foreground mb-4">Vue d'ensemble</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatItem
          label="Total Produits"
          value="2,847"
          trend={{ value: 12, positive: true }}
          icon={Package}
          iconColor="text-primary"
        />
        <StatItem
          label="En Transit"
          value="156"
          trend={{ value: 8, positive: true }}
          icon={Truck}
          iconColor="text-info"
        />
        <StatItem
          label="Livrés (7j)"
          value="423"
          trend={{ value: 15, positive: true }}
          icon={CheckCircle}
          iconColor="text-success"
        />
        <StatItem
          label="Alertes"
          value="3"
          trend={{ value: 25, positive: false }}
          icon={AlertCircle}
          iconColor="text-warning"
        />
      </div>
    </div>
  );
}
