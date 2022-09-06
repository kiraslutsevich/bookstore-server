import express, { Router } from 'express';
import checkAuth from '../middlewars/checkAuth';
import addToFavorites from '../controllers/favorites/addToFavorites';
import getAllFavorites from '../controllers/favorites/getAllFavorites';
import deleteFromFavorites from '../controllers/favorites/deleteFromFavorites';

const favoritesRouter: Router = express.Router();

favoritesRouter.post('/:id', checkAuth, addToFavorites);
favoritesRouter.get('/', checkAuth, getAllFavorites);
favoritesRouter.delete('/:id', checkAuth, deleteFromFavorites);

export default favoritesRouter;
