import React from 'react'
import renderer from 'react-test-renderer'
import Header from '.'

jest.mock('../libraryGenerator.worker', () =>
  class Worker {
    constructor() {this.onmessage = () => {}}
    addEventListener() { return }
    postMessage(msg) {
      this.onmessage(msg)
    }
  }
)
describe('Header', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <Header />,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
