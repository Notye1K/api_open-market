import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.js"
import { register, login } from "../controllers/authController.js"
import registerSchema from "../schemas/registerSchema.js"
import loginSchema from "../schemas/loginSchema.js"

const authRouter = Router()

authRouter.post('/users/register', validateSchema(registerSchema), register)
authRouter.post('/users/login', validateSchema(loginSchema), login)

export default authRouter
