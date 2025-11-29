import { useState, useEffect } from "react";
import { ref, onValue, push, update, remove } from "firebase/database";
import { db } from "./firebaseConfig"; // adjust path
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/MetricCard";
import { InventoryTable, InventoryItem } from "@/components/InventoryTable";
import { AddItemDialog } from "@/components/AddItemDialog";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Package, DollarSign, TrendingUp, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockPerformanceData = [
  { month: "Jan", revenue: 45000, cost: 28000, profit: 17000 },
  { month: "Feb", revenue: 52000, cost: 31000, profit: 21000 },
  { month: "Mar", revenue: 48000, cost: 29000, profit: 19000 },
  { month: "Apr", revenue: 61000, cost: 35000, profit: 26000 },
  { month: "May", revenue: 58000, cost: 33000, profit: 25000 },
  { month: "Jun", revenue: 67000, cost: 38000, profit: 29000 },
];

const Index = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();
  const { toast } = useToast();

  // ✅ Load items from Firebase in real time
  useEffect(() => {
    const itemsRef = ref(db, "inventory");
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedItems = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setItems(loadedItems);
      } else {
        setItems([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const totalValue = items.reduce((acc, item) => acc + item.quantity * item.costPrice, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const avgMargin =
    items.reduce((acc, item) => {
      const margin = ((item.sellingPrice - item.costPrice) / item.sellingPrice) * 100;
      return acc + margin;
    }, 0) / (items.length || 1);

  // ✅ Save item to Firebase
  const handleSave = (itemData: Omit<InventoryItem, "id">) => {
    if (editingItem) {
      const itemRef = ref(db, `inventory/${editingItem.id}`);
      update(itemRef, itemData);
      toast({
        title: "Item Updated",
        description: `${itemData.name} has been updated successfully.`,
      });
    } else {
      const itemsRef = ref(db, "inventory");
      push(itemsRef, itemData);
      toast({
        title: "Item Added",
        description: `${itemData.name} has been added to inventory.`,
      });
    }
    setEditingItem(undefined);
  };

  // ✅ Edit item
  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  // ✅ Delete item from Firebase
  const handleDelete = (id: string) => {
    const itemRef = ref(db, `inventory/${id}`);
    remove(itemRef);
    toast({
      title: "Item Deleted",
      description: `Item has been removed from inventory.`,
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
            <p className="text-muted-foreground mt-2">
              Track stock and analyze cost-effectiveness performance
            </p>
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
