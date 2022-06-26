const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const chatController = require("./Controllers/chat.controller");
const productController = require("./Controllers/product.controller");
const app = express();
const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

ioServer.on("connection", async (socket) => {
  console.log("new connection");
  socket.emit("init", await productController.getAll());
  socket.emit("chat_init", await chatController.getAll());
  socket.on("new_product", async (new_product) => {
    await productController.addItem(new_product);
    const products = await productController.getAll();
    socket.emit("product_update", products);
  });
  socket.on("new_message", async (new_message) => {
    await chatController.addItem(new_message);
    socket.emit("chat_update", await chatController.getAll());
  });
});

httpServer.listen(8080, () => {
  console.log("Servidor escuchando...");
});
