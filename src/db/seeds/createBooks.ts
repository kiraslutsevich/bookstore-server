import { DeepPartial } from 'typeorm';
import db from '../index';
import { connect } from '../dataSource';
import { Genre } from '../entity/Genre';
import { Book } from '../entity/Book';

(async () => {
  await connect();
  const genres = await db.genre.find();

  type BookType = {
    name: string;
    author: string;
    description: string;
    price: number;
    paperPrice: number;
    cover: string;
    genres: string[];
  };

  const books: BookType[] = [
    {
      name: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1699,
      paperPrice: 1399,
      cover: 'cover01.png',
      genres: ['Fiction', 'Science-fiction', 'Satire'],
    },
    {
      name: 'The Psychlogy of Money',
      author: 'Morgan Housel',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat.`,
      price: 1999,
      paperPrice: 1599,
      cover: 'cover02.png',
      genres: ['Fantasy', 'Light fiction'],
    },
    {
      name: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1899,
      paperPrice: 1499,
      cover: 'cover03.png',
      genres: ['Politics', 'History'],
    },
    {
      name: 'The Subtle art of not giving a fuck',
      author: 'Mark Manson',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1299,
      paperPrice: 899,
      cover: 'cover04.png',
      genres: ['History', 'Light fiction', 'Health'],
    },
    {
      name: 'The Two towers',
      author: 'J. R. R. Tolkien',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 2999,
      paperPrice: 1199,
      cover: 'cover02.png',
      genres: ['Health', 'Encyclopedia'],
    },
    {
      name: 'Book of Fairy Tales',
      author: 'Morgan Housel',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 3899,
      paperPrice: 2199,
      cover: 'cover01.png',
      genres: ['Encyclopedia', 'Science-fiction', 'Satire'],
    },
    {
      name: 'The Picture of Money',
      author: 'Mark Manson',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1299,
      paperPrice: 1199,
      cover: 'cover05.png',
      genres: ['Health', 'Encyclopedia', 'Science-fiction'],
    },
    {
      name: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 2499,
      paperPrice: 2199,
      cover: 'cover06.png',
      genres: ['Children`s books', 'Encyclopedia', 'Politics'],
    },
    {
      name: 'Moby Dick',
      author: 'Morgan Housel',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Lorem ipsum dolor sit amet consectetur.`,
      price: 3899,
      paperPrice: 2799,
      cover: 'cover01.png',
      genres: ['Politics', 'Fantasy', 'Horror'],
    },
    {
      name: 'The Chronicles of Topol',
      author: 'Morgan Black',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1999,
      paperPrice: 1899,
      cover: 'cover05.png',
      genres: ['Horror', 'Romance', 'Autobiography', 'Travel books'],
    },
    {
      name: 'The Crying book',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1699,
      paperPrice: 1399,
      cover: 'cover04.png',
      genres: ['History', 'Thriller'],
    },
    {
      name: 'The Funny book',
      author: 'C. S. Stanford',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi`,
      price: 2299,
      paperPrice: 1199,
      cover: '',
      genres: ['History', 'Thriller', 'Romance'],
    },
    {
      name: 'The Kill',
      author: 'Cisco Gomez',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Dignissimos rerum!`,
      price: 2699,
      paperPrice: 2299,
      cover: 'cover01.png',
      genres: ['Light fiction', 'Science-fiction'],
    },
    {
      name: 'How to stop worrying and start living',
      author: 'Dale Carnegie',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1899,
      paperPrice: 1599,
      cover: 'cover09.png',
      genres: ['History', 'Thriller', 'Romance', 'Travel books'],
    },
    {
      name: 'Don’t sweat the Small Stuuff',
      author: 'Cisco Gomez',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Lorem ipsum dolor sit amet consectetur, 
        orem ipsum dolor sit amet consectetur`,
      price: 1299,
      paperPrice: 1199,
      cover: 'cover06.png',
      genres: ['History', 'Thriller', 'Encyclopedia', 'Autobiography'],
    },
    {
      name: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1699,
      paperPrice: 1399,
      cover: 'cover01.png',
      genres: ['Health', 'Encyclopedia'],
    },
    {
      name: 'The Weight of Things',
      author: 'Herman Melville',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 3199,
      paperPrice: 2799,
      cover: 'cover05.png',
      genres: ['Health', 'Encyclopedia', 'Non—fiction'],
    },
  ];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const bookInst = db.book.create({
      ...book,
      genres: book.genres.map((genre) => {
        return genres.find((g) => g.name === genre);
      }),
    });
    // eslint-disable-next-line no-await-in-loop
    await db.book.save(bookInst);
  }
})();
