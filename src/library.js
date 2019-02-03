import conf from './configuration'
import myWorker from './libraryGenerator.worker';

export const worker = new myWorker();
const booksArray = []
worker.postMessage(conf);
worker.addEventListener('message', event => {
    booksArray.push(event.data)
});

export const isLibraryLoaded = () => booksArray.length === conf.librarySize
export const isLibraryInitialized = () => booksArray.length > 10
export const getBookById = id => booksArray[id]
export const getBookProperties = () => Object.keys(booksArray[0])
window.sortByProperty = property =>
    booksArray.sort((a,b) => {
        if (a[property] < b[property]) {
            return -1
        }
        if (a[property] > b[property]) {
            return 1
        }
        return 0
    })

window.filterByProperty = (paramsArray) =>
    booksArray.filter(book => paramsArray.every(({ property, value }) =>{
        if (property === 'publishDate') {
            return book[property].getTime() === value.getTime()
        } else {
            return book[property] === value
        }
    }))
