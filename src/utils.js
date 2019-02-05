export const sortBooks = (property, books) => {
  if (property === 'id') {
    books.sort((bookA, bookB) => bookA.id - bookB.id)
  }
  books.sort((bookA, bookB) => bookA.bookData[property] < bookB.bookData[property] ? -1 : 1)
}
