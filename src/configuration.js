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
    booksPerPage: 10,
    librarySize: 1000000,
    oldestBookAge: 25,
}
