export default {
  bookProperties: {
    name: { label: 'Name'},
    genre: {
      label: 'Genre',
      values: [
        'horror',
        'finance',
        'software engineering',
        'scientific',
        'historical',
        'science fiction',
      ],
    },
    publishDate: { label: 'Publish Date' },
    authorName: { label: 'Author Name' },
    authorGender: {
      label: 'Author Gender',
      values: [
        'male',
        'female',
        'robot'
      ]
    }
  },
  oldestBookPublishDate: new Date("1990-01-01"),
  rowHeight: 70,
  booksPerPage: 30,
  librarySize: 1000,
}
