import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export interface ProductData {
  name: string;
  fixedCosts: number;
  variableCostPerUnit: number;
  sellingPrice: number;
  productionVolume: number;
}

interface ProductFormProps {
  onCalculate: (data: ProductData) => void;
}

export const ProductForm = ({ onCalculate }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductData>({
    name: "Product A",
    fixedCosts: 10000,
    variableCostPerUnit: 25,
    sellingPrice: 50,
    productionVolume: 1000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const handleChange = (field: keyof ProductData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === "name" ? e.target.value : parseFloat(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Product Data Input
        </CardTitle>
        <CardDescription>
          Enter your product costs and pricing information for optimization analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange("name")}
              placeholder="Enter product name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fixedCosts">Fixed Costs ($)</Label>
              <Input
                id="fixedCosts"
                type="number"
                step="0.01"
                value={formData.fixedCosts}
                onChange={handleChange("fixedCosts")}
                placeholder="10000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="variableCost">Variable Cost per Unit ($)</Label>
              <Input
                id="variableCost"
                type="number"
                step="0.01"
                value={formData.variableCostPerUnit}
                onChange={handleChange("variableCostPerUnit")}
                placeholder="25"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellingPrice">Selling Price per Unit ($)</Label>
              <Input
                id="sellingPrice"
                type="number"
                step="0.01"
                value={formData.sellingPrice}
                onChange={handleChange("sellingPrice")}
                placeholder="50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">Production Volume (units)</Label>
              <Input
                id="volume"
                type="number"
                value={formData.productionVolume}
                onChange={handleChange("productionVolume")}
                placeholder="1000"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Calculate Profitability
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
