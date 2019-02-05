import faker from 'faker'

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", ({ data }) => generateBooksArray(data));

const generateBooksArray = ({ librarySize, bookGenres, oldestBookAge, personGenders }) =>
    new Array(librarySize).fill().map((_, index) => {
        const bookEntry =
            {
                id: index+1,
                name: faker.random.words(),
                genre: faker.helpers.randomize(bookGenres),
                publishDate: faker.date.past(oldestBookAge),
                authorName: faker.name.findName(),
                authorGender: faker.helpers.randomize(personGenders),
            }
        postMessage(bookEntry)
        return bookEntry
    })
