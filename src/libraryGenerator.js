import faker from 'faker'

export default ({ bookGenres, librarySize, booksPerAuthorRatio, oldestBookAge, personGenders }) => {

    const numberOfAuthors = librarySize / booksPerAuthorRatio

    const getRandomAuthor = () => {
        return Math.floor(Math.random() * numberOfAuthors)
    }

    const generateBooksArray = () => new Array(librarySize).fill().map(e => ({
        name: faker.random.words(),
        genre: faker.helpers.randomize(bookGenres),
        publishDate: faker.date.past(oldestBookAge),
        authorId: getRandomAuthor(numberOfAuthors),
    }))

    const generateAuthorsMap = () => new Map(new Array(numberOfAuthors).fill().map((_, index) => [
        index,
        {
            name: faker.name.findName(),
            gender: faker.helpers.randomize(personGenders),
        }
    ]))

    return ({
        booksArray: generateBooksArray(),
        authorsMap: generateAuthorsMap(),
    })
}
