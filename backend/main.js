const express = require("express");
const { GetAllProducts, GetProduct, ProductPurchased } = require("./src/CRUD");
const app = express();
const port = process.env.PORT ?? 4444;
const path = require("path");

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
  next();
});

app.get("/api/read/allproducts", async (req, res) => {
  try {
    const prods = await GetAllProducts();
    console.log(prods);
    res.status(200).json({ prods });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao obter produtos" });
  }
});

app.get("/api/read/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const prod = await GetProduct(id);
    res.status(200).json({ prod });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao obter produto" });
  }
});

app.delete("/api/delete/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const prod = await ProductPurchased(id);
    res.status(200).json({ prod });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use("/assets", express.static(path.join(__dirname, "assets")));
