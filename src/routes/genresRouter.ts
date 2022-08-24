import express, { Router } from 'express';
import getAllGenres from '../controllers/book/getAllGenres';

const genresRouter: Router = express.Router();

genresRouter.get('/', getAllGenres);

export default genresRouter;
