import express, { Router } from 'express';
import deleteUser from '../controllers/user/deleteUser';
import updateUser from '../controllers/user/updateUser';
import getUser from '../controllers/user/getUser';
import getAllUsers from '../controllers/user/getAllUsers';
import createValidateMiddleware from '../middlewars/createValidateMiddleware';
import { deleteUserSchema, updateUserSchema, getUserSchema } from '../validation/userSchemas';

const userRouter: Router = express.Router();
userRouter.get('/', getAllUsers);
userRouter.get('/:id', createValidateMiddleware(getUserSchema), getUser);
userRouter.delete('/:id', createValidateMiddleware(deleteUserSchema), deleteUser);
userRouter.patch('/:id', createValidateMiddleware(updateUserSchema), updateUser);

export default userRouter;
