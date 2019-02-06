import { sortBooks, getBookPropertiesDropDown, getPropertyValues } from './utils'
describe('utils: sortBooks', () => {
  it('sorts the books correctly by id', () => {
    const books = [
      {id: 2},
      {id: 1},
      {id: 0},
    ]
    expect(sortBooks('id', books)).toEqual([{id: 0}, {id:1}, {id:2}])
  })
  it('sorts the books correctly by property', () => {
    const books = [
      {bookData: { name: 'B'}},
      {bookData: { name: 'A'}},
      {bookData:{name: '1'}}
    ]
    const expectedBooks = [
      {bookData: { name: '1'}},
      {bookData: { name: 'A'}},
      {bookData:{name: 'B'}}
    ]
    expect(sortBooks('name', books)).toEqual(expectedBooks)
  })
})

describe('utils: bookPropertiesDropDown', () => {
  it('returns the options of the property dropdown populated with the labels', () => {
    const config = { bookProperties: { genre: { label: 'label1', name: 'label2' } } }
    expect(getBookPropertiesDropDown(config)).toMatchSnapshot()
  })
})

describe('utils: getPropertyValues', () => {
  it('returns the values for the book properties', () => {
    const config = { bookProperties: { genre: { values: ['genre1', 'genre2'] } } }
    expect(getPropertyValues('genre', config)).toEqual(['genre1', 'genre2'])
  })
})
