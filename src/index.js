import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Book from './Book'
import faker from 'faker'
import content from './conf'
import Catalog from './Catalog';


const { bookGenres, librarySize, booksPerAuthorRatio } = content

const numberOfAuthors = librarySize / booksPerAuthorRatio

const getRandomAuthor = () => {
    return Math.floor(Math.random() * numberOfAuthors)
}

console.time()

const booksArray = new Array(librarySize).fill().map(e => ({
    name: faker.lorem.words(),
    genre: faker.helpers.randomize(bookGenres),
    publishDate: faker.date.past(),
    author: getRandomAuthor(),
}))

const authorsMap = new Map([...new Array(numberOfAuthors).fill().map(e => [
    getRandomAuthor(),
    {
        name: faker.name.findName(),
        gender: faker.helpers.randomize(['male', 'female', 'robot']),
    }
])])


console.timeEnd()
console.log(booksArray)
console.log(authorsMap)

const App = () => (
    <Fragment>
        <Header />
        <Catalog books={booksArray}/>
    </Fragment>

)
ReactDOM.render(<App/>, document.getElementById('root'));
