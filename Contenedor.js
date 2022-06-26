const Knex = require("knex").default

class Contenedor {
    constructor(table, options) {
        this.table = table;
        this.knex = Knex(options);
    }

async getAll() {
    try {
        const datos = await this.knex.from(this.table).select("*");
        return datos;
    } catch (error) {
        throw error;
    } /* finally {
        this.knex.destroy();*/
}

//Obtener item por su ID

async getById(id) {
    try {
        const datos = await this.knex
        .from(this.table)
        .select("*")
        .where("id", "=", id);
        return datos;
    } catch (error) {
        throw error;
    } /* finally {
        this.knex.destroy()}*/
}

async addItem(datos) {
    try {
        await this.knex(this.table).insert(datos);
    } catch (error) {
        throw error
    } /* finally{
        this.knex.destroy()}*/
}

async updateItem(id, datos) {
    try {
        await this.knex(this.table)
        .where("id", "=", id)
        .update(datos)
    } catch (error) {
        throw error
    } /*finally {
        this.knex.destroy()}*/
}

async deleteItem(id) {
    try {
        await this.knex(this.table).where("id", "=", id).del();
    } catch (error) {
        throw error;
    } /*finally{
        this.knex.destroy()}*/
}
}

module.exports = Contenedor