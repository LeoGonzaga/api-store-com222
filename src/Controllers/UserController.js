const User = require("../Models/Users");

module.exports = {
  async createUser(req, res) {
    try {
      const { name, cpf } = req.body;
      if (!name || !cpf) {
        return res.status(400).json({ error: "Preencha todos os campos!" });
      }

      let user = await User.findOne({ cpf });

      if (user) {
        return res.status(400).json({ error: "Esse CPF já foi cadastrado." });
      }

      user = await User.create({ name, cpf });
      return res.json(user);
    } catch (e) {
      console.log("Error:" + e);
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      if (users.length == 0)
        return res.json({ message: "Nenhum usuário cadastrado!" });
      return res.json(users);
    } catch (e) {
      console.log("Error:" + e);
    }
  },

  async getUserByName(req, res) {
    try {
      let { name } = req.body;
      const user = await User.find({ name });
      if (!user) {
        return res
          .status(404)
          .json("Usuário não encontrado com o nome de: " + name);
      }

      return res.json(user);
    } catch (e) {
      console.log("Error" + e);
    }
  },

  async getUserByCPF(req, res) {
    try {
      let { cpf } = req.body;
      const user = await User.findOne({ cpf });
      if (!user) {
        return res
          .status(404)
          .json("Usuário não encontrado com o CPF numero: " + cpf);
      }
      return res.json(user);
    } catch (e) {
      console.log("Error" + e);
    }
  },

  async updateUser(req, res) {
    try {
      let { name, cpf, newName, newCpf } = req.body;
      const filter = { name, cpf };
      const update = { name: newName, cpf: newCpf };
      let user = await User.findOneAndUpdate(filter, update);
      console.log(user, update);
      if (!user)
        return res
          .status(404)
          .json("Você esta tentando atualizar um usuário que não existe");

      return res.json({ message: "Atualizado!" });
    } catch (e) {
      console.log("Error" + e);
    }
  },
  async deleteUser(req, res) {
    try {
      let { cpf } = req.body;
      const filter = { cpf };
      let user = await User.findOneAndDelete(filter);
      console.log(user);
      if (!user)
        return res
          .status(404)
          .json("Você esta tentando deletar um usuário que não existe");

      return res.json({ message: "Deletado!" });
    } catch (e) {
      console.log("Error" + e);
    }
  },
};
