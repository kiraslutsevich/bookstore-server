import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';
import fs from 'fs';
import config from '../../config';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

const uploadAvatar = async (req, res, next) => {
  try {
    const file = await req.body.file;

    const [data, base64] = file.split(',');
    const getFormat = (data: string) => {
      return data.slice(11, 14);
    };

    const avatarName = v4();

    const buffer = Buffer.from(base64, 'base64');

    await fs.promises.writeFile(`${config.static}/${avatarName}.${getFormat(data)}`, buffer);

    const user = await db.user.findOne({
      where: { id: +req.user.id },
    });

    if (user.avatar) {
      const name = user.avatar.slice(29);
      await fs.promises.unlink(`${config.static}/${name}`);
    }

    user.avatar = `${avatarName}.${getFormat(file)}`;
    await db.user.save(user);

    const updatedUser = await db.user.findOne({
      where: { id: +req.user.id },
    });

    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export default uploadAvatar;
