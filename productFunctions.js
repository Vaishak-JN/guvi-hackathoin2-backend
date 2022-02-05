import { client } from "./index.js";


async function getProducts() {
    // d.movies.find({language:"tamil"})
    // find returns cursor --> toArray
    return await client.db("rental").collection("products").find({}).toArray();
}

async function createProducts(data) {
    // db.movies.insertMany(data)
    return await client.db("rental").collection("products").insertMany(data);
}


export { getProducts, createProducts };