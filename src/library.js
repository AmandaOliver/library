import conf from './configuration'
import myWorker from './libraryGenerator.worker';

export const worker = new myWorker();
const booksArray = []
worker.postMessage(conf);
worker.addEventListener('message', event => {
    booksArray.push(event.data)
});

export const isLibraryLoaded = () => booksArray.length === conf.librarySize
export const isFirstPageLoaded = () => booksArray.length > conf.booksPerPage
export const getBookById = id => booksArray[id]
window.sortByProperty = property =>
    booksArray.sort((a,b) => {
        return a[property] < b[property]  ? -1 : 1
    })

window.filterByProperties = (paramsArray) =>
    booksArray.filter(book => paramsArray.every(({ property, value }) =>{
        if (property === 'publishDate') {
            return book[property].getTime() === value.getTime()
        } else {
            return book[property] === value
        }
    }))
