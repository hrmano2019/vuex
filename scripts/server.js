import express from "express";
import bodyParser from "body-parser";
import { ref, push } from "firebase/database";
import { db } from "./firebaseConfig.js";

const app = express();
app.use(bodyParser.json());

// Example webhook: supplier sends stock updates
app.post("/webhook/inventory-update", async (req, res) => {
  const { name, sku, quantity, costPrice, sellingPrice, category } = req.body;

  await push(ref(db, "inventory"), {
    name,
    sku,
    quantity,
    costPrice,
    sellingPrice,
    category,
    status: quantity > 0 ? "In Stock" : "Out of Stock",
  });

  res.status(200).send({ success: true });
});

app.listen(4000, () => console.log("Webhook server running on port 4000"));
