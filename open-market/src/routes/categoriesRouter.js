import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import { deleteCategories, getCategories, postCategories, putCategories } from "../controllers/categoriesController.js"
import schema from "../schemas/categorySchema.js"

const categoriesRouter = Router()

categoriesRouter.use(validateToken)

categoriesRouter.get('/categories', getCategories)
categoriesRouter.post('/categories', validateSchema(schema), postCategories)
categoriesRouter.put('/categories/:id', validateSchema(schema), putCategories)
categoriesRouter.delete('/categories/:id', deleteCategories)

export default categoriesRouter
