import myWorker from './libraryGenerator.worker'
import config from './configuration'
import { sortBooks } from './utils'

const worker = new myWorker()

const booksArray = []
const isLibraryInitialized = () => booksArray.length > config.booksPerPage
const isLibraryLoaded = () => booksArray.length === config.librarySize
const getBookById = id => booksArray[id]

const sortByProperty = property => sortBooks(property, booksArray)
const compareDates = (bookPublishDate, publishDate) => {
  const { publishDay, publishMonth, publishYear, publishWeekDay } = publishDate
  const dayComparison =  (!publishDay || publishDay === bookPublishDate.getDate().toString())
  const monthComparison = (!publishMonth || publishMonth === bookPublishDate.getMonth().toString())
  const yearComparison = (!publishYear || publishYear === bookPublishDate.getFullYear().toString())
  const weekDayComparison = (!publishWeekDay || publishWeekDay === bookPublishDate.getDay().toString())
  
  return dayComparison && monthComparison && yearComparison && weekDayComparison
}
const filterByProperties = paramsArray =>
  booksArray.filter(({ bookData }) =>
    paramsArray.every(({ property, value, exact, publishDate }) => {
      if (property === 'publishDate') {
        return compareDates(bookData[property], publishDate)
      }
      if (exact) {
        return bookData[property].toLowerCase() === value.toLowerCase()
      }
      return bookData[property].toLowerCase().includes(value.toLowerCase())
    }))

const initializeLibrary = () => {
  // initialize worker
  worker.postMessage(config)

  worker.addEventListener('message', ({ data }) => {
    booksArray.push(data)
    isLibraryLoaded() && worker.terminate()
  })
}

export default {
  worker,
  getBookById,
  isLibraryInitialized,
  isLibraryLoaded,
  sortByProperty,
  filterByProperties,
  initializeLibrary
}
