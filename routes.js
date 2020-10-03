const express = require("express");
const User = require("./src/Controllers/UserController");

const routes = express.Router();

routes.get("/all", User.getAllUsers);
routes.post("/userByName", User.getUserByName);
routes.post("/userByCPF", User.getUserByCPF);
routes.post("/create", User.createUser);
routes.put("/update", User.updateUser);
routes.delete("/deleteByCPF", User.deleteUser);

module.exports = routes;
