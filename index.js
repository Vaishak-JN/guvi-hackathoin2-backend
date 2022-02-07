import express from "express"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import { productsRouter } from "./routes/products.js"
import { usersRouter } from "./routes/users.js"
// import cors from "cors"


// getting all env keys
dotenv.config();

const app = express()

// app.use(cors())


// const MONGO_URL = "mongodb://localhost"
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log("MongoDB connected")
    return client
}


export const client = await createConnection()


app.get('/', (req, res) => {
    res.send('Rental App')
})

app.use('/products', productsRouter)

app.use('/user/', usersRouter)
// port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("The server is started", PORT))