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
      const format = data.slice(11, 15);
      if (format === 'jpeg') {
        return format;
      }
      return format.slice(0, 3);
    };
    const avatarName = v4();

    const buffer = Buffer.from(base64, 'base64');
    await fs.promises.writeFile(`${config.static}/${avatarName}.${getFormat(data)}`, buffer);

    const user = await db.user.findOne({
      where: { id: +req.user.id },
    });
    user.avatar = `${avatarName}.${getFormat(file)}`;
    db.user.save(user);

    const updatedUser = await db.user.findOne({
      where: { id: +req.user.id },
    });

    return res.status(200).json({ message: 'successfully modified', updatedUser });
  } catch (err) {
    next(err);
  }
};

export default uploadAvatar;
