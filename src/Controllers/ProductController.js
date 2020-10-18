const Product = require("../Models/Product");

module.exports = {
  async createProduct(req, res) {
    try {
      const { description, unitValue, rebate } = req.body;
      if (!description || !unitValue) {
        return res.status(400).json({
          error:
            "Ops! Não foi possivel cadastrar seu produto. Confira se os campos de descrição e o valor estão preenchidos e tente novamente!",
        });
      }

      let product = await Product.findOne({ description });

      if (product) {
        return res
          .status(400)
          .json({ error: "Esse produto já foi cadastrado." });
      }

      product = await Product.create({ description, unitValue, rebate });
      return res.json(product);
    } catch (e) {
      console.log("Error:" + e);
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      if (products.length == 0)
        return res.json({
          message: "Nenhum produto cadastrado no sistema até o momento!",
        });
      return res.json(products);
    } catch (e) {
      console.log("Error:" + e);
    }
  },

  async getProductByName(req, res) {
    try {
      let { description } = req.body;
      const product = await Product.find({
        description: { $regex: description },
      });
      if (!product || product.length == 0) {
        return res.status(201).json({
          message: "O produto " + description + " não foi encontrado",
        });
      }

      return res.json(product);
    } catch (e) {
      console.log("Error" + e);
    }
  },

  async getByValue(req, res) {
    try {
      let { unitValue } = req.body;
      const product = await Product.find({ unitValue });
      if (!product || product.length == 0) {
        return res
          .status(201)
          .json({ message: "Não existe nenhum produto de R$ " + unitValue });
      }

      return res.json(product);
    } catch (e) {
      console.log("Error" + e);
    }
  },

  async getByRebate(req, res) {
    try {
      let { rebate } = req.body;
      const product = await Product.find({ rebate });
      if (!product || product.length == 0) {
        return res.status(404).json({
          message:
            "Não existe nenhum produto com R$ " + rebate + "de desconto.",
        });
      }
      return res.json(product);
    } catch (e) {
      console.log("Error" + e);
    }
  },

  async updateProduct(req, res) {
    try {
      let { newDescription, newUnitValue, newRebate, _id } = req.body;
      console.log(_id);
      const update = {
        description: newDescription,
        unitValue: newUnitValue,
        rebate: newRebate,
      };
      let product = await Product.findOneAndUpdate(_id, update);

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

      let product = await Product.findOneAndDelete(_id);
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
