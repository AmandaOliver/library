import React from 'react'
import renderer from 'react-test-renderer';
import Header from '.'

describe('Header', () => {
  it('renders', () => {
    const component = renderer.create(
      <Header/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
