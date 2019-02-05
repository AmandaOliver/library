import React from 'react'
import renderer from 'react-test-renderer'
import Book from '.'

const book = {
  name: 'mockName',
  genre: 'mockGenre',
  publishDate: new Date(),
  authorName: 'mockAuthorName',
  authorGender: 'mockAuthorGender'
}

describe('Book', () => {
  it('renders', () => {
    const component = renderer.create(
      <Book book={book}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
