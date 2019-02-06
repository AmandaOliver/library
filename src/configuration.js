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
  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dateFormat: { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' },
  oldestBookPublishDate: new Date('1990-01-01'),
  rowHeight: 70,
  booksPerPage: 10,
  librarySize: 1000,
}
