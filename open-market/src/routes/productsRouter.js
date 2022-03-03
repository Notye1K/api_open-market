import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import { deleteProducts, getProducts, postProducts, putProducts } from "../controllers/productsController.js"
import schema from "../schemas/productSchema.js"

const productsRouter = Router()

productsRouter.use(validateToken)

productsRouter.get('/products', getProducts)
productsRouter.post('/products', validateSchema(schema), postProducts)
productsRouter.put('/products/:id', validateSchema(schema), putProducts)
productsRouter.delete('/products/:id', deleteProducts)

export default productsRouter
