import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/MetricCard";
import { InventoryTable, InventoryItem } from "@/components/InventoryTable";
import { AddItemDialog } from "@/components/AddItemDialog";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Package, DollarSign, TrendingUp, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Wireless Mouse",
    sku: "WM-001",
    quantity: 150,
    costPrice: 12.5,
    sellingPrice: 24.99,
    category: "Electronics",
    status: "In Stock",
  },
  {
    id: "2",
    name: "USB-C Cable",
    sku: "UC-002",
    quantity: 45,
    costPrice: 3.2,
    sellingPrice: 9.99,
    category: "Accessories",
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    sku: "MK-003",
    quantity: 0,
    costPrice: 45.0,
    sellingPrice: 89.99,
    category: "Electronics",
    status: "Out of Stock",
  },
  {
    id: "4",
    name: "Monitor Stand",
    sku: "MS-004",
    quantity: 78,
    costPrice: 18.0,
    sellingPrice: 39.99,
    category: "Furniture",
    status: "In Stock",
  },
];

const mockPerformanceData = [
  { month: "Jan", revenue: 45000, cost: 28000, profit: 17000 },
  { month: "Feb", revenue: 52000, cost: 31000, profit: 21000 },
  { month: "Mar", revenue: 48000, cost: 29000, profit: 19000 },
  { month: "Apr", revenue: 61000, cost: 35000, profit: 26000 },
  { month: "May", revenue: 58000, cost: 33000, profit: 25000 },
  { month: "Jun", revenue: 67000, cost: 38000, profit: 29000 },
];

const Index = () => {
  const [items, setItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();
  const { toast } = useToast();

  const totalValue = items.reduce((acc, item) => acc + item.quantity * item.costPrice, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const avgMargin =
    items.reduce((acc, item) => {
      const margin = ((item.sellingPrice - item.costPrice) / item.sellingPrice) * 100;
      return acc + margin;
    }, 0) / items.length;

  const handleSave = (itemData: Omit<InventoryItem, "id">) => {
    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? { ...itemData, id: item.id } : item)));
      toast({
        title: "Item Updated",
        description: `${itemData.name} has been updated successfully.`,
      });
    } else {
      const newItem: InventoryItem = {
        ...itemData,
        id: Date.now().toString(),
      };
      setItems([...items, newItem]);
      toast({
        title: "Item Added",
        description: `${itemData.name} has been added to inventory.`,
      });
    }
    setEditingItem(undefined);
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems(items.filter((item) => item.id !== id));
    toast({
      title: "Item Deleted",
      description: `${item?.name} has been removed from inventory.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
              Inventory Management
            </h1>
            <p className="text-muted-foreground mt-2">Track stock and analyze cost-effectiveness performance</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} size="lg" className="shadow-medium">
            <Plus className="mr-2 h-5 w-5" />
            Add Item
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <MetricCard
            title="Total Inventory Value"
            value={`$${totalValue.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: "12.5%", isPositive: true }}
            variant="primary"
          />
          <MetricCard
            title="Total Items in Stock"
            value={totalItems.toString()}
            icon={Package}
            trend={{ value: "8.2%", isPositive: true }}
            variant="accent"
          />
          <MetricCard
            title="Average Profit Margin"
            value={`${avgMargin.toFixed(1)}%`}
            icon={TrendingUp}
            trend={{ value: "3.1%", isPositive: true }}
            variant="success"
          />
        </div>

        <PerformanceChart data={mockPerformanceData} />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Inventory Items</h2>
          <InventoryTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        <AddItemDialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditingItem(undefined);
          }}
          onSave={handleSave}
          editItem={editingItem}
        />
      </div>
    </div>
  );
};

export default Index;
