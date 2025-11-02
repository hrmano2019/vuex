import React from "react";
import MainLayout from "@/layouts/MainLayout"; // Adjust path as needed
import ProductList from "@/components/ProductList"; // Adjust path as needed
import type { ProductWithImages } from "@/interfaces";

type Props = {
  products: ProductWithImages[];
};

const LuxuryCarsPage = ({ products }: Props) => {
  return (
    <MainLayout>
      <h1 className="text-3xl text-center my-4">Luxury Cars</h1>
      <ProductList products={products} />
    </MainLayout>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-products`);
    const { products } = await res.json();

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default LuxuryCarsPage;
