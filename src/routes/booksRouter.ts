import express, { Router } from 'express';

import getAllBooks from '../controllers/book/getAllBooks';
import getAllGenres from '../controllers/book/getAllGenres';

const booksRouter: Router = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/genres', getAllGenres);

export default booksRouter;
