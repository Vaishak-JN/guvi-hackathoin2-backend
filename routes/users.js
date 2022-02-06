import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createUser, genPassword, getUserByName } from "../productFunctions.js";

const router = express.Router()

router
    .route("/signup")
    .post(async (req, res) => {
        const { username, password } = req.body
        const hashedPassword = await genPassword(password)
        const userExist = await getUserByName(username)
        console.log(userExist)

        // console.log(user)
        if (userExist) {
            res.status(400).send({ message: "User name already exists" })
            return
        }

        // if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)) {
        //     res.status(400).send({ message: "Password pattern did not match" })
        //     return
        // }
        const user = await createUser({
            username: username,
            password: hashedPassword
        })
        res.send(user)
    })


router
    .route('/login')
    .post(async (req, res) => {
        const { username, password } = req.body
        const hashedPassword = await genPassword(password)
        const userFromDb = await getUserByName(username)
        console.log(userFromDb)

        // console.log(user)
        if (!userFromDb) {
            res.status(401).send({ message: "Invalid credentials" })
            return
        }

        const storedPassword = userFromDb.password
        console.log(storedPassword)

        const isPasswordMatch = await bcrypt.compare(password, storedPassword)

        if (isPasswordMatch) {
            // issue token
            const token = jwt.sign({ id: userFromDb._id }, process.env.SECRET_KEY)
            res.send({ message: "Successful Login", token: token })

        } else {
            res.status(401).send({ message: "Invalid credentials" })
            return
        }

    })


export const usersRouter = router