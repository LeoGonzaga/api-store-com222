const Product = require("../Models/Product");
const Cart = require("../Models/Cart");
module.exports = {
  async addCart(req, res) {
    try {
      const { _id, amount } = req.body;
      if (!_id || !amount) {
        return res.status(400).json({
          error:
            "Ops! Não foi possivel adicionar seu produto. Confira se os campos de produto e o quantidade estão preenchidos e tente novamente!",
        });
      }

      let product = await Product.findOne({ _id });

      if (!product) {
        return res.status(400).json({ error: "Esse produto não existe!" });
      }

      cart = await Cart.create({ product, amount });
      return res.json(cart);
    } catch (e) {
      console.log("Error:" + e);
    }
  },

  async showCart(req, res) {
    try {
      const products = await Cart.find();
      if (products.length == 0)
        return res.json({
          message: "Nenhum produto cadastrado no sistema até o momento!",
        });
      return res.json(products);
    } catch (e) {
      console.log("Error:" + e);
    }
  },

  async updateItem(req, res) {
    try {
      let { amount, _id } = req.body;
      console.log(_id, amount);

      let product = await Cart.findByIdAndUpdate(_id, {amount});

      if (!product)
        return res
          .status(404)
          .json("Você esta tentando atualizar um produto que não existe!");

      return res.json({ message: "Atualizado!" });
    } catch (e) {
      console.log("Error" + e);
    }
  },
  async removeProduct(req, res) {
    try {
      let { _id } = req.body;

      let product = await Cart.findByIdAndDelete(_id);
      console.log(product);
      if (!product)
        return res
          .status(404)
          .json("Você esta tentando deletar um produto que não existe");

      return res.json({ message: "Deletado!" });
    } catch (e) {
      console.log("Error" + e);
    }
  },
};
