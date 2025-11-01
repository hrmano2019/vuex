CREATE DATABASE inventory_db;

CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  sku VARCHAR(100),
  quantity INT,
  costPrice DECIMAL(10,2),
  sellingPrice DECIMAL(10,2),
  category VARCHAR(100),
  status VARCHAR(50)
);
