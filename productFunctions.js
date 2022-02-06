import { client } from "./index.js";
import bcrypt from "bcrypt"
// import { ObjectId } from "mongodb";


async function getProducts() {
    // d.movies.find({language:"tamil"})
    // find returns cursor --> toArray
    return await client.db("rental").collection("products").find({}).toArray();
}

async function createProducts(data) {
    // db.movies.insertMany(data)
    return await client.db("rental").collection("products").insertMany(data);
}

async function genPassword(password) {
    // 10 rounds of salting
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

async function getUserByName(username) {
    // db.movies.findOne({"id":"105"})
    return client.db("rental").collection("users").findOne({ username: username });
}

async function createUser(data) {
    // db.users.insertMany(data)
    return await client.db("rental").collection("users").insertOne(data)

}

export { getProducts, createProducts, genPassword, getUserByName, createUser };