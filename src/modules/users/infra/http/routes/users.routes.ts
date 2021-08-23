import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate'


import UsersController from '@modules/users/infra/controllers/UsersController'
import UserAvatarController from '@modules/users/infra/controllers/UserAvatarController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersControllers = new UsersController()
const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig.multer);

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), usersControllers.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update);


export default usersRouter;
