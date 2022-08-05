import express, { Router } from 'express';
import uploadAvatar from '../controllers/user/uploadAvatar';
import deleteUser from '../controllers/user/deleteUser';
import updateUser from '../controllers/user/updateUser';
import getUser from '../controllers/user/getUser';
import getAllUsers from '../controllers/user/getAllUsers';
import createValidateMiddleware from '../middlewars/createValidateMiddleware';
import { updateUserSchema, changePasswordSchema, paramsSchema, uploadAvatarSchema } from '../validation/userSchemas';
import changePassword from '../controllers/user/changePassword';
import checkAuth from '../middlewars/checkAuth';

const userRouter: Router = express.Router();
userRouter.use(checkAuth);

userRouter.get('/all', getAllUsers);
userRouter.patch('/password', createValidateMiddleware(changePasswordSchema), changePassword);
userRouter.patch('/avatar', createValidateMiddleware(uploadAvatarSchema), uploadAvatar);
userRouter.get('/:id', createValidateMiddleware(paramsSchema), getUser);
userRouter.delete('/:id', createValidateMiddleware(paramsSchema), deleteUser);
userRouter.patch('/:id', createValidateMiddleware(updateUserSchema), updateUser);

export default userRouter;
