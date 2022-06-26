(async () => {
    const path = require("path");
    const Knex = require("knex").default;
    const knex_sqlite = Knex({
        client: "sqlite3",
        connection: {
            filename: path.join(process.cwd(), "db", "ecommerce.sqlite"),
        },
        useNullAsDefault: true,
    });
    const knex_maria = Knex ({
        client: "mysql2",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "ecommerce",
        },
        useNullAsDefault: true,
    })
    // CHAT

try {
        await knex_sqlite.schema.createTable("chats", (table) =>{
            table.increments("id").primary();
            table.string("user", 20).notNullable();
            table.string("message").notNullable();
            table.timestamp("timestamp").defaultTo(Date.now());
        });
    } catch (error) {
        console.log(error)
    } finally {
        console.log("tabla creada");
        knex_sqlite.destroy();
    }


    // PRODUCTS
try {
    await knex_maria.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.float("price").notNullable();
        table.string("thumbnail").notNullable();
    })
} catch (error) {
    console.log(error);
} finally {
    console.log("tabla creada");
    knex_sqlite.destroy();
}
})();