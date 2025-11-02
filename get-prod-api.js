import type { NextApiRequest, NextApiResponse } from "next";
import type { ProductWithImages } from "@/interfaces";
import { db } from "@/lib/db"; // Replace with your actual DB connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const query = `
      SELECT a.*,
        (
          SELECT GROUP_CONCAT(image SEPARATOR ',')
          FROM ProductImage
          WHERE productId = a.id
        ) AS images
      FROM Product a;
    `;

    const [rows] = await db.query(query); // Adjust for your DB client

    const products = (rows as any[]).map((product) => ({
      ...product,
      images: product.images || "no-image.png",
    })) as ProductWithImages[];

    return res.status(200).json({ products });
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}
