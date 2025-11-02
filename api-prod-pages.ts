// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ProductWithImages } from '@/types/product';

export default function handler(req: NextApiRequest, res: NextApiResponse<ProductWithImages[]>) {
  const products: ProductWithImages[] = [
    {
      id: '1',
      description: 'A great car',
      images: '/images/car.jpg',
      price: 19999,
      brand: 'Toyota',
      slug: 'toyota-corolla',
      stock: 5,
      tags: 'sedan,compact',
      name: 'Toyota Corolla',
      type: 'vehicle',
      user: 'admin',
    },
  ];

  res.status(200).json(products);
}
