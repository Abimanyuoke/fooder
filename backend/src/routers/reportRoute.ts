import express from "express"
import { getDashboard, getFavourite } from "../controllers/reportController"
import { verifyRole, verifyToken } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/dashboard`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getDashboard)
app.get(`/favorite`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getFavourite)

export default app