import express from "express"
import { getProducts, createProducts, } from "../productFunctions.js"

const router = express.Router()


router
    .route('/')
    .get(async (req, res) => {

        const products = await getProducts()

        products ? res.send(products) : res.status(404).send({ msg: "Product not found" })
    })
    .post(async (req, res) => {
        const data = req.body
        console.log(data)
        const products = await createProducts(data)
        res.send(products)
    })


export const productsRouter = router