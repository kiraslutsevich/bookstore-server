import { Router } from 'express';
import express from 'express';
import deleteUser from '../controllers/user/deleteUser';
import updateUser from '../controllers/user/updateUser';
import getUser from '../controllers/user/getUser';
import getAllUsers from '../controllers/user/getAllUsers';
import { validateUser, userSchema } from '../middlewars/validateUser';

const userRouter: Router = express.Router();
userRouter.get('/', getAllUsers);
userRouter.get('/:id', validateUser(userSchema), getUser);
userRouter.delete('/:id', validateUser(userSchema), deleteUser);
userRouter.patch('/:id', validateUser(userSchema), updateUser);

export default userRouter;