import { Router } from "express";

const router = Router();

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    category: "Electronica",
    inStock: true,
  },
  { id: 2, name: "Mouse", price: 25.5, category: "Accesorio", inStock: true },
  {
    id: 3,
    name: "Teclado",
    price: 85.5,
    category: "Accesorio",
    inStock: false,
  },
];

let nextId = 4;

router.get("/", (req, res) => {
  const { category, minPrice, maxPrice, inStock } = req.query;

  let filteredProducts = [];

  if (category) {
    filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= parseFloat(minPrice),
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parseFloat(maxPrice),
    );
  }

  if (inStock) {
    const stockFilter = inStock === "true";
    filteredProducts = filteredProducts.filter(
      (product) => product.inStock === stockFilter,
    );
  }

  res.json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts,
  });
});

router.post("/", (req, res) => {
  const { name, price, category, inStock } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      message: "Datos incompletos",
    });
  }

  const newProduct = {
    id: nextId,
    name,
    price,
    category,
    inStock: inStock ? inStock === "true" : true,
  };

  nextId++;

  products.push(newProduct);

  res.json({
    success: true,
    data: newProduct,
  });
});

router.delete("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(
    (product) => product.id === productId,
  );

  if (productIndex === -1) {
    return res.status(400).json({
      success: false,
      message: "Id No encontrado",
    });
  }

  const productDeleted = products.find((product) => product.id === productId);
  products = products.filter((product) => product.id !== productId);

  res.json({
    success: true,
    data: productDeleted,
    productosQueQuedan: products,
  });
});

export default router;
