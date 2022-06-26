const Contenedor = require("../Contenedor");
//const path = require("path");

const options = {
    client: "sqlite3",
    connection: {
        filename: "./db/ecommerce.sqlite"
    },
    useNullAsDefault: true,
};

const chatController = new Contenedor("chats", options);

module.exports = chatController;