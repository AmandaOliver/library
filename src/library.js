import myWorker from './libraryGenerator.worker'
import config from './configuration'
const booksArray = []

export const worker = new myWorker()
export const isLibraryLoaded = () => booksArray.length === config.librarySize
export const isLibraryInitialized = () => booksArray.length > config.booksPerPage
export const getBookById = id => booksArray[id]

export const initializeLibrary = () => {

  // initialize worker
  worker.postMessage(config)

  worker.addEventListener('message', ({ data }) => {
    booksArray.push(data)
    isLibraryLoaded() && worker.terminate()
  })
}


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
