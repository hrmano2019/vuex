import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  category: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

export const InventoryTable = ({ items, onEdit, onDelete }: InventoryTableProps) => {
  const getStatusVariant = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock":
        return "default";
      case "Low Stock":
        return "secondary";
      case "Out of Stock":
        return "destructive";
    }
  };

  const calculateProfit = (item: InventoryItem) => {
    const profit = item.sellingPrice - item.costPrice;
    const margin = ((profit / item.sellingPrice) * 100).toFixed(1);
    return { profit, margin };
  };

  return (
    <div className="rounded-lg border bg-card shadow-soft">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Cost Price</TableHead>
            <TableHead className="text-right">Selling Price</TableHead>
            <TableHead className="text-right">Profit Margin</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { profit, margin } = calculateProfit(item);
            return (
              <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right font-mono">{item.quantity}</TableCell>
                <TableCell className="text-right font-mono">${item.costPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right font-mono">${item.sellingPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <span className={profit > 0 ? "text-success font-semibold" : "text-destructive font-semibold"}>
                    {margin}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
