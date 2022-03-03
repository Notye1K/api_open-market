import { Router } from 'express';
import authRouter from './authRouter.js';
import categoriesRouter from './categoriesRouter.js';
import productsRouter from './productsRouter.js';

const router = Router();

router.use(authRouter)
router.use(productsRouter)
router.use(categoriesRouter)

export default router;
