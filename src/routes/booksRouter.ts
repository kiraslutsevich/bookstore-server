import express, { Router } from 'express';

import checkAuth from '../middlewars/checkAuth';
import getBook from '../controllers/book/getBook';
import getAllBooks from '../controllers/book/getAllBooks';
import rateBook from '../controllers/book/rateBook';

const booksRouter: Router = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.patch('/rating', checkAuth, rateBook);
booksRouter.get('/:id', getBook);

export default booksRouter;
