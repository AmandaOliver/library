// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", ({ data }) => generateBooksArray(data))

const getRandomValue = (array) => array[Math.floor((Math.random() * array.length))]
const getRandomDate = (startDate) => new Date(+startDate + Math.random() * (Date.now() - startDate))

const generateBooksArray = ({ librarySize, bookGenres, personGenders, oldestBookPublishDate }) =>
  new Array(librarySize).fill().forEach((_, index) => {
    const bookId = index + 1
    postMessage({
      id: bookId,
      name: `Name of Book ${bookId}`,
      genre: getRandomValue(bookGenres),
      publishDate: getRandomDate(oldestBookPublishDate),
      authorName: `Author Name of book ${bookId}`,
      authorGender: getRandomValue(personGenders),
    })
  })
