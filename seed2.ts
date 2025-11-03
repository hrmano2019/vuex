// File: scripts/seed.ts (or /lib/seed.ts depending on your structure)

import { db, Role, User, Product, ProductImage } from "@/db"; // Adjust path as needed
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { seedVehicles } from "./seed-data";

export default async function seed() {
  // Seed roles
  const roles = [
    { id: "admin", name: "Administrator" },
    { id: "user", name: "User" },
  ];
  await db.insert(Role).values(roles);

  // Seed user
  const hermanoTechUser = {
    id: "01-2019-HERMANO",
    name: "HermanoTech",
    email: "hermanovigos@gmail.com",
    password: bcrypt.hashSync("password", 10),
    role: "admin",
  };
  await db.insert(User).values(hermanoTechUser);

  // Seed products and images
  const queries: any[] = [];

  seedVehicles.forEach((vehicle) => {
    const productId = uuidv4();
    const product = {
      id: productId,
      name: vehicle.name,
      description: vehicle.description,
      price: vehicle.price,
      brand: vehicle.brand,
      slug: vehicle.slug,
      stock: vehicle.stock,
      tags: vehicle.tags.join(","),
      type: vehicle.type,
      userId: hermanoTechUser.id, // assuming foreign key is userId
    };
    queries.push(db.insert(Product).values(product));

    vehicle.images.forEach((img) => {
      const image = {
        id: uuidv4(),
        image: img,
        productId: productId,
      };
      queries.push(db.insert(ProductImage).values(image));
    });
  });

  await db.batch(queries);
  console.log("✅ Database seeded successfully.");
}
