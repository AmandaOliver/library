import React from 'react'
import renderer from 'react-test-renderer'
import Book from '.'

describe('Book', () => {
  it('matches snapshot', () => {
    const book = {
      id: 0,
      bookData: {
        name: 'mockName',
        genre: 'mockGenre',
        publishDate: new Date(),
        authorName: 'mockAuthorName',
        authorGender: 'mockAuthorGender'
      }
    }
    const component = renderer.create(
      <Book book={book} />,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
