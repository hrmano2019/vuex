import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "@/lib/prisma"; // Adjust to your DB client
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"; // Adjust path as needed
import { v4 as uuidv4 } from "uuid";

// Validation schema
const updateProductSchema = z.object({
  id: z.string().optional(),
  description: z.string(),
  price: z.number(),
  brand: z.string(),
  slug: z.string(),
  stock: z.number(),
  tags: z.string(),
  name: z.string(),
  type: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Authenticate user
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;

  if (!user || !user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Validate input
  const parsed = updateProductSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
  }

  try {
    const { id = uuidv4(), ...rest } = parsed.data;
    const slug = rest.slug.toLowerCase().replace(/\s+/g, "_").trim();

    const updatedProduct = await prisma.product.upsert({
      where: { id },
      update: {
        ...rest,
        slug,
        userId: user.id,
      },
      create: {
        id,
        ...rest,
        slug,
        userId: user.id,
      },
    });

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Update failed:", err);
    return res.status(500).json({ error: "Failed to update product" });
  }
}
