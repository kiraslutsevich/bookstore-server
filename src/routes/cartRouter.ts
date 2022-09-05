import express, { Router } from 'express';
import changeAmount from '../controllers/cart/changeAmount';
import getCartItems from '../controllers/cart/getCartItems';
import addToCart from '../controllers/cart/addToCart';
import checkAuth from '../middlewars/checkAuth';
import removeItem from '../controllers/cart/removeItem';

const cartRouter: Router = express.Router();

cartRouter.post('/add', checkAuth, addToCart);
cartRouter.get('/', checkAuth, getCartItems);
cartRouter.patch('/', checkAuth, changeAmount);
cartRouter.delete('/:id', checkAuth, removeItem);

export default cartRouter;
