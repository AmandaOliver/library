// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", ({ data }) => generateBooksArray(data));

const getRandomDate = () => {
    const startDate = new Date("2000-01-01")
    const endDate = Date.now()
    return new Date(+startDate + Math.random() * (endDate - startDate))
}

const generateBooksArray = ({ librarySize, bookGenres, oldestBookAge, personGenders }) =>
    new Array(librarySize).fill().map((_, index) => {
        const bookId = index + 1
        const bookGenre = bookGenres[Math.floor((Math.random() * bookGenres.length))]
        const authorGender= personGenders[Math.floor(Math.random()*personGenders.length)]
        const bookEntry =
            {
                id: bookId,
                name: `Name of Book ${bookId}`,
                genre: bookGenre,
                publishDate: getRandomDate(),
                authorName: `Author Name for book ${bookId}`,
                authorGender: authorGender,
            }
        postMessage(bookEntry)
        return bookEntry
    })
