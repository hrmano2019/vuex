import { GetServerSideProps } from "next";
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import type { ProductWithImages } from "@/interfaces";

interface Props {
  product: ProductWithImages;
}

const ProductUpdatePage = ({ product }: Props) => {
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    stock: product.stock,
    brand: product.brand,
    tags: product.tags,
    type: product.type,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here (e.g., POST to /api/update-product)
    console.log("Submitting:", formData);
  };

  return (
    <MainLayout title="Product update page">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={formData.id} />
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">{formData.name}</h1>
          <button type="submit" className="bg-black mb-5 p-2 rounded text-white">
            Save Changes
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <label htmlFor="name" className="block">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="slug" className="block">Slug</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows={8}
              />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="mb-4">
                <label htmlFor="price" className="block">Daily Charges</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="stock" className="block">Inventory</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="brand" className="block">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tags" className="block">
                Tags <small className="text-gray-500">(Separate with commas)</small>
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="type" className="block">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">[ Select ]</option>
                  {[
                    "COUPE",
                    "SEDAN",
                    "SPORTS CAR",
                    "CONVERTIBLE",
                    "TRUCK",
                    "STATION WAGON",
                  ].map((type) => (
                    <option key={type} value={type} className="capitalize">
                      {type.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-product-by-slug?slug=${slug}`);
    const { product, error } = await res.json();

    if (error || !product) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};

export default ProductUpdatePage;
