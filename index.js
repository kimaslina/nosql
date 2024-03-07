const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/clothes_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const productScheme = new mongoose.Schema({
    name: String,
    size: String,
    color: String,
    price: String,
});

const Product = mongoose.model("Product", productScheme);


app.get("/products", (req, res) => {
    Product.find({})
     .then((products) => {
        res.json(products);
     })
     .catch((err) => {
        console.error(err);
        res.status(500).send("Something wrong");
     });
});

app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
     .then((product) => {
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Not found");
        }
     })
     .catch((err) => {
        console.error(err);
        res.status(500).send("Something wrong");
     });
});

app.post('/products', (req, res) => {
    const { name, size, color, price, quantity } = req.body;
  
    const newProduct = new Product({
        name, 
        size, 
        color, 
        price
    });
  
    newProduct.save()
      .then(savedProduct => {
        res.json(savedProduct);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Something wrong");
      });
});

app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    Product.findByIdAndUpdate(productId, updatedProduct)
        .then(() => {
            res.send("Product updated successfully");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Something wrong");
        });
});

app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then(() => {
            res.send("Product deleted successfully");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Something wrong");
        });
});

app.listen(8000, () => {
    console.log("Server started in: http://localhost:8000")
})