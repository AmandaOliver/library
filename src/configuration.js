export default {
  bookGenres: [
    'horror',
    'finance',
    'software engineering',
    'scientific',
    'historical',
    'science fiction',
  ],
  bookProperties: [
    'Name',
    'Genre',
    'Publish Date',
    'Author Name',
    'Author Gender'
  ],
  personGenders: [
    'male',
    'female',
    'robot'
  ],
  propertyEnumMap: {
    'Genre': 'bookGenres',
    'Author Gender': 'personGenders'
  },
  oldestBookPublishDate: new Date("1990-01-01"),
  booksPerPage: 20,
  librarySize: 1000000,
}
