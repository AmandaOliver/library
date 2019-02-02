import React from 'react'
import renderer from 'react-test-renderer';
import Book from '.'

const book = {
    name: 'mockName',
    genre: 'mockGenre',
    publishDate: new Date(),
}

const author = {
    name: 'mockName',
    gender: 'mockGenre'
}

describe('Book', () => {
  it('renders', () => {
    const component = renderer.create(
        <Book book={book} author={author}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
