import express, { Router } from 'express';
import getCartItems from '../controllers/book/getCartItems';
import checkAuth from '../middlewars/checkAuth';
import getBook from '../controllers/book/getBook';

import getAllBooks from '../controllers/book/getAllBooks';

import rateBook from '../controllers/book/rateBook';
import addToCart from '../controllers/book/addToCart';

const booksRouter: Router = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.patch('/rating', checkAuth, rateBook);
booksRouter.post('/to-cart', checkAuth, addToCart);
booksRouter.get('/cart', checkAuth, getCartItems);
booksRouter.get('/:id', getBook);

export default booksRouter;
