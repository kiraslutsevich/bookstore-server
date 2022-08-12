import db from '../index';
import { connect } from '../dataSource';

const genres = [
  'Fiction',
  'Non—fiction',
  'Light fiction',
  'Science-fiction',
  'Fantasy',
  'Business & Finance',
  'Politics',
  'Travel books',
  'Autobiography',
  'History',
  'Thriller',
  'Mystery',
  'Romance',
  'Satire',
  'Horror',
  'Health',
  'Children`s books',
  'Encyclopedia',
];

(async () => {
  await connect();

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const genreInst = db.genre.create({ name: genre });
    // eslint-disable-next-line no-await-in-loop
    await db.genre.save(genreInst);
  }
})();
