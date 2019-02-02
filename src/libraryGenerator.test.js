import generateLibrary from './libraryGenerator'

const conf = {
    bookGenres: [
        'mockGenre',
    ],
    personGenders: [
        'mockGender'
    ],
    librarySize: 1,
    booksPerAuthorRatio: 1,
    oldestBookAge: 1,
}
const numberOfAuthors = conf.librarySize / conf.booksPerAuthorRatio

describe('generateLibrary', () => {
    it('returns an object containing an array of books and a Map of authors', () => {
        const { booksArray, authorsMap } = generateLibrary(conf)
        expect(booksArray instanceof Array).toBeTruthy()
        expect(authorsMap instanceof Map).toBeTruthy()
    })
    it('returns the booksArray and authorsMap with right dimensions', () => {
        const { booksArray, authorsMap } = generateLibrary(conf)
        expect(booksArray.length).toBe(conf.librarySize)
        expect(authorsMap.size).toBe(numberOfAuthors)
    })
})
