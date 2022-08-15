const addPath = (img: string) => {
  if (img.startsWith('avatar')) {
    return `http://localhost:4000/static/${img}`;
  }
  return `http://localhost:4000/static/books/${img}`;
};

export default addPath;
