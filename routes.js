const express = require("express");
const Product = require("./src/Controllers/ProductController");
const Cart = require("./src/Controllers/CartController");
const routes = express.Router();

// Produtos
routes.get("/all", Product.getAllProducts);
routes.post("/create", Product.createProduct);
routes.post("/getProductByName", Product.getProductByName);
routes.post("/getByRebate", Product.getByRebate);
routes.post("/getByValue", Product.getByValue);
routes.put("/update", Product.updateProduct);
routes.delete("/delete", Product.removeProduct);

// Carrinho
routes.get("/cart", Cart.showCart);
routes.post("/addItem", Cart.addCart);
routes.put("/updateItem", Cart.updateItem);
routes.delete("/removeItem", Cart.removeProduct);

module.exports = routes;
