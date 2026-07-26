interface IMockData {
  id: string;
  image: string;
  rotationDeg?: string;
}

const BOOKS: IMockData[] = [
  {
    id: 'steal-like-an-artist',
    image:
      'https://austinkleon.com/wp-content/uploads/2015/04/9780761185680-e1430396575277.jpg',
    rotationDeg: '-3deg',
  },
  {
    id: 'atomic-habits',
    image:
      'https://m.media-amazon.com/images/I/71YF1hHLw7L._AC_UF1000,1000_QL80_.jpg',
    rotationDeg: '2.5deg',
  },
  {
    id: 'book-of-five-rings',
    image: 'https://cdn2.penguin.com.au/covers/original/9781529921533.jpg',
    rotationDeg: '3deg',
  },
  {
    id: 'one',
    image:
      'https://m.media-amazon.com/images/I/91frsIteI8L._AC_UF1000,1000_QL80_.jpg',
    rotationDeg: '-2deg',
  },
  {
    id: 'meredith',
    image:
      'https://m.media-amazon.com/images/I/71I28IWIeoL._UF1000,1000_QL80_.jpg',
    rotationDeg: '4deg',
  },
  {
    id: 'transference',
    image:
      'https://m.media-amazon.com/images/I/61ctJ32xlAL._UF1000,1000_QL80_.jpg',
    rotationDeg: '-4deg',
  },
];

const PROFILE_PICTURE: string = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTicB9ZRIoQEQu5XDVo3idMPYL4nMK5qTLoBgmdsLgPaeVR3sp0YlG4Av0&s=10`;
export { BOOKS, PROFILE_PICTURE };
export type { IMockData };
