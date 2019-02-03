import faker from 'faker'
// eslint-disable-next-line
self.addEventListener("message", ({ data }) => generateBooksMap(data));


const generateBooksMap = ({ librarySize, bookGenres, oldestBookAge, personGenders }) =>
    new Array(librarySize).fill().map((_, index) => {
        const bookEntry = [
            index,
            {
                id: index,
                name: faker.random.words(),
                genre: faker.helpers.randomize(bookGenres),
                publishDate: faker.date.past(oldestBookAge),
                authorName: faker.name.findName(),
                authorGender: faker.helpers.randomize(personGenders),
            }
        ]
        postMessage(bookEntry)
        return bookEntry
    })

