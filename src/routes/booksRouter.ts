import express, { Router } from 'express';
import checkAuth from '../middlewars/checkAuth';
import getBook from '../controllers/book/getBook';

import getAllBooks from '../controllers/book/getAllBooks';
import getAllGenres from '../controllers/book/getAllGenres';
import rateBook from '../controllers/book/rateBook';

const booksRouter: Router = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/genres', getAllGenres);
booksRouter.post('/rating', checkAuth, rateBook);
booksRouter.get('/:id', getBook);

export default booksRouter;
