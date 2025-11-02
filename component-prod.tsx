import type { ProductWithImages } from "@/interfaces";
import { Formatter } from "@/utils";
import { useState } from "react";
import Link from "next/link";

interface Props {
  product: ProductWithImages;
}

const ProductCard = ({ product }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const images = product.images.split(",").map((img) =>
    img.startsWith("http")
      ? img
      : `${baseUrl}/images/vehicles/${img}`
  );

  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <Link href={`/products/${product.slug}`} className="block">
      <img
        src={currentImage}
        alt={product.name}
        className="h-[350px] w-[300px] object-cover"
        onMouseEnter={() => setCurrentImage(images[1] ?? images[0])}
        onMouseLeave={() => setCurrentImage(images[0])}
      />
      <div className="space-y-1 mt-2">
        <h4>{product.name}</h4>
        <p className="font-medium">
          Charges:{" "}
          <span className="font-bold">
            {Formatter.currency(product.price)}
          </span>{" "}
          per day
        </p>
        <p className="font-medium">
          Brand: <span>{product.brand}</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {(Array.isArray(product.tags)
            ? product.tags
            : product.tags.split(",")
          ).map((tag, index) => (
            <span
              key={index}
              className="bg-black text-white text-sm py-1.5 px-2 capitalize rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
