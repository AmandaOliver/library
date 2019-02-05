import conf from './configuration'
import myWorker from './libraryGenerator.worker';

export const worker = new myWorker();
export const booksArray = []
worker.postMessage(conf);
worker.addEventListener('message', event => {
    booksArray.push(event.data)
});


export const isLibraryLoaded = () => booksArray.length === conf.librarySize
export const isLibraryInitialized = () => booksArray.length > conf.booksPerPage
export const getBookById = id => {
    let book = undefined
    if (booksArray.length > id -1) {
         book = booksArray[id]
    }
    return book
}
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
