model Role {
  id   String @id
  name String
  users User[]
}

model User {
  id       String @id
  name     String
  email    String @unique
  password String
  roleId   String
  role     Role @relation(fields: [roleId], references: [id])
  products Product[]
}

model Product {
  id       String @id
  name     String
  description String
  price    Float
  brand    String
  slug     String
  stock    Int
  tags     String
  type     String
  userId   String
  user     User @relation(fields: [userId], references: [id])
  images   ProductImage[]
}

model ProductImage {
  id        String @id
  image     String
  productId String
  product   Product @relation(fields: [productId], references: [id])
}
