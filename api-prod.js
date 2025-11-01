import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "@/lib/prisma"; // Adjust path to your Prisma client

const slugSchema = z.string();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const slug = req.query.slug;

  const result = slugSchema.safeParse(slug);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid slug" });
  }

  try {
    const product = await prisma.product.findFirst({
      where: { slug: result.data },
    });

    if (!product) {
      return res.status(404).json({ error: `Product with slug ${result.data} not found.` });
    }

    const images = await prisma.productImage.findMany({
      where: { productId: product.id },
    });

    return res.status(200).json({ product, images });
  } catch (err) {
    console.error("Error fetching product:", err);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
}
