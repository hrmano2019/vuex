import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "primary" | "accent" | "success";
}

export const MetricCard = ({ title, value, icon: Icon, trend, variant = "primary" }: MetricCardProps) => {
  const variantStyles = {
    primary: "from-primary to-primary/80",
    accent: "from-accent to-accent/80",
    success: "from-success to-success/80",
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                <span>{trend.isPositive ? "↑" : "↓"}</span>
                <span>{trend.value}</span>
              </div>
            )}
          </div>
          <div className={cn(
            "rounded-lg bg-gradient-to-br p-3 shadow-soft",
            variantStyles[variant]
          )}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
      <div className={cn(
        "h-1 bg-gradient-to-r",
        variantStyles[variant]
      )} />
    </Card>
  );
};
