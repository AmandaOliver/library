import React from 'react'
import renderer from 'react-test-renderer';
import Catalog from '.'

const booksArray = [
    {
        name: 'mockName',
        genre: 'mockGenre',
        publishDate: new Date(),
        authorId: 0
    },
    {
        name: 'mockName1',
        genre: 'mockGenre1',
        publishDate: Date.now(),
        authorId: 1,
    }
]

const authorsMap = new Map([
    [0, {
        name: 'mockName',
        gender: 'mockGenre'
    }],
    [1, {
        name: 'mockName1',
        gender: 'mockGenre1'
    }]
])

describe('Catalog', () => {
  it('renders', () => {
    const component = renderer.create(
        <Catalog booksArray={booksArray} authorsMap={authorsMap}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
