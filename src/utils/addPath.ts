import config from '../config';

const addPath = (avatar: string) => {
  return `http://localhost:4000/static/${avatar}`;
};

export default addPath;
