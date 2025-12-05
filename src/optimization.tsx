import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Zap } from "lucide-react";
import { ProductData } from "./ProductForm";

interface OptimizationRecommendationsProps {
  data: ProductData | null;
}

export const OptimizationRecommendations = ({ data }: OptimizationRecommendationsProps) => {
  if (!data) return null;

  const contributionMargin = data.sellingPrice - data.variableCostPerUnit;
  const totalProfit =
    data.sellingPrice * data.productionVolume -
    (data.fixedCosts + data.variableCostPerUnit * data.productionVolume);
  const profitMargin = (totalProfit / (data.sellingPrice * data.productionVolume)) * 100;

  // Calculate optimization scenarios
  const priceIncrease5 = data.sellingPrice * 1.05;
  const newProfitWithPriceIncrease =
    priceIncrease5 * data.productionVolume -
    (data.fixedCosts + data.variableCostPerUnit * data.productionVolume);
  const priceIncreaseProfit = newProfitWithPriceIncrease - totalProfit;

  const volumeIncrease20 = data.productionVolume * 1.2;
  const newProfitWithVolumeIncrease =
    data.sellingPrice * volumeIncrease20 -
    (data.fixedCosts + data.variableCostPerUnit * volumeIncrease20);
  const volumeIncreaseProfit = newProfitWithVolumeIncrease - totalProfit;

  const costReduction10 = data.variableCostPerUnit * 0.9;
  const newProfitWithCostReduction =
    data.sellingPrice * data.productionVolume -
    (data.fixedCosts + costReduction10 * data.productionVolume);
  const costReductionProfit = newProfitWithCostReduction - totalProfit;

  const recommendations = [
    {
      title: "Increase Selling Price by 5%",
      description: `Raising price to $${priceIncrease5.toFixed(
        2
      )} per unit could increase profit by $${priceIncreaseProfit.toFixed(0)}`,
      impact: priceIncreaseProfit,
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Increase Production Volume by 20%",
      description: `Producing ${Math.ceil(
        volumeIncrease20
      )} units could increase profit by $${volumeIncreaseProfit.toFixed(0)}`,
      impact: volumeIncreaseProfit,
      icon: Zap,
      color: "text-chart-2",
    },
    {
      title: "Reduce Variable Costs by 10%",
      description: `Lowering cost to $${costReduction10.toFixed(
        2
      )} per unit could increase profit by $${costReductionProfit.toFixed(0)}`,
      impact: costReductionProfit,
      icon: Lightbulb,
      color: "text-warning",
    },
  ];

  // Sort by impact
  recommendations.sort((a, b) => b.impact - a.impact);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Optimization Recommendations</CardTitle>
        <CardDescription>
          Strategic suggestions to improve profitability for {data.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className={`${rec.color} mt-1`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{rec.title}</h4>
                    {index === 0 && (
                      <Badge variant="default" className="text-xs">
                        Best Impact
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-success">
                    +${Math.abs(rec.impact).toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground">profit increase</div>
                </div>
              </div>
            );
          })}
        </div>

        {profitMargin < 20 && (
          <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <h4 className="font-semibold text-warning-foreground mb-1">
                  Low Profit Margin Alert
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your current profit margin is {profitMargin.toFixed(2)}%. Consider implementing
                  multiple optimization strategies simultaneously for better results.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
