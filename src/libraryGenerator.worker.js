// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', ({ data }) => generateBooksArray(data))

const getRandomValue = (array) => array[Math.floor((Math.random() * array.length))]
const getRandomDate = (startDate) => new Date(+startDate + Math.random() * (Date.now() - startDate))

const generateBooksArray = ({bookProperties, librarySize, oldestBookPublishDate }) =>
  new Array(librarySize).fill().forEach((_, index) => {
    const bookId = index + 1
    postMessage({
      id: bookId,
      bookData: {
        name: `Name of Book ${bookId}`,
        genre: getRandomValue(bookProperties.genre.values),
        publishDate: getRandomDate(oldestBookPublishDate),
        authorName: `Author Name of book ${bookId}`,
        authorGender: getRandomValue(bookProperties.authorGender.values),
      }
    })
  })
