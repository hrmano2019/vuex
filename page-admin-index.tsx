import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Formatter } from "@/utils";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  images: string;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/get-products");
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data.products);
        }
      } catch (err) {
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  }

  return (
    <MainLayout title="Admin Dashboard">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="font-semibold text-lg">Product List</p>
      <table className="w-full mt-5">
        <thead>
          <tr>
            <th className="text-left">Image</th>
            <th className="text-left">Title</th>
            <th className="text-left">Daily Charges</th>
            <th className="text-left">Inventory</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const imageSrc = product.images?.length
              ? `/images/vehicles/${product.images.split(",")[0]}`
              : `/images/products/no-image.png`;

            return (
              <tr key={product.id}>
                <td>
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="w-16 h-16 mb-2"
                  />
                </td>
                <td>
                  <Link
                    href={`/admin/products/${product.slug}`}
                    className="hover:underline cursor-pointer"
                  >
                    {product.name}
                  </Link>
                </td>
                <td>{Formatter.currency(product.price)}</td>
                <td className="justify-end">{product.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default AdminDashboard;
