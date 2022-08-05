import config from '../config';

const addPath = (avatar: string) => {
  return `${config.static}/${avatar}`;
};

export default addPath;
