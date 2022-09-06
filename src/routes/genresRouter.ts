import express, { Router } from 'express';
import getAllGenres from '../controllers/genre/getAllGenres';

const genresRouter: Router = express.Router();

genresRouter.get('/', getAllGenres);

export default genresRouter;
