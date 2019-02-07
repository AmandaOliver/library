import generationWorker from './libraryGenerator.worker'
import config from './configuration'
import { sortBooks } from './utils'

const booksArray = []
export const worker = new generationWorker()

export const isLibraryInitialized = () => booksArray.length > config.booksPerPage
export const isLibraryLoaded = () => booksArray.length === config.librarySize
export const getBookById = id => booksArray[id]
export const sortArrayBooks = property => sortBooks(property, booksArray)

export const weekDayIsLastOfTheMonth = (date, weekDay) => {
  if (date.getDay() !== weekDay) {
    return false
  }
  const lastWeek = []
  for (let dayNumber = 0; dayNumber > -config.weekDays.length; dayNumber--) {
    lastWeek.push(new Date(date.getFullYear(), date.getMonth() + 1, dayNumber))
  }
  for (let dayNumber = 0; dayNumber < config.weekDays.length; dayNumber++){
    if (lastWeek[dayNumber].getDate() === date.getDate()) {
      return true
    }
  }
  return false
}

export const compareStringProperties = (bookProperty, formProperty) => {
  const { exact, value } = formProperty
  if (exact) {
    return bookProperty.toLowerCase() === value.toLowerCase()
  }
  return bookProperty.toLowerCase().includes(value.toLowerCase())
}

export const isPublishDateValid = (bookPublishDate, { day, month, year, weekDay, isLast }) => {
  const dayIsValid =  !day || day === bookPublishDate.getDate()
  const monthIsValid =  !month || month === (bookPublishDate.getMonth() + 1)
  const yearIsValid =  !year || year === bookPublishDate.getFullYear()
  const weekDayIsValid = (!weekDay && weekDay !==0) || weekDay === bookPublishDate.getDay()
  const isLastWeekDayIsValid = !isLast || weekDayIsLastOfTheMonth(bookPublishDate, weekDay)
  return dayIsValid && monthIsValid && yearIsValid && weekDayIsValid && isLastWeekDayIsValid
}

export const filterArrayBooks = ({ name, genre, authorName, authorGender, publishDate }) => {
  return booksArray.filter(({ bookData }) => {
    const nameIsValid = !name.value || compareStringProperties(bookData.name, name)
    const genreIsValid = !genre || bookData.genre === genre
    const authorNameIsValid = !authorName.value || compareStringProperties(bookData.authorName, authorName)
    const authorGenderIsValid = !authorGender || bookData.authorGender === authorGender
    const publishDateIsValid = isPublishDateValid(bookData.publishDate, publishDate)
    return nameIsValid && genreIsValid && authorNameIsValid && authorGenderIsValid && publishDateIsValid
  })
}

export const initializeLibrary = () => {
  // initialize worker
  worker.postMessage(config)

  worker.addEventListener('message', ({ data }) => {
    booksArray.push(data)
    isLibraryLoaded() && worker.terminate()
  })
}
