import express, { Router } from 'express';
import getCartItems from '../controllers/book/getCartItems';
import addToCart from '../controllers/book/addToCart';
import checkAuth from '../middlewars/checkAuth';

const cartRouter: Router = express.Router();

cartRouter.post('/add', checkAuth, addToCart);
cartRouter.get('/', checkAuth, getCartItems);

export default cartRouter;
