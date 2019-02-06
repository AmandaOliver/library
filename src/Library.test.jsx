import React from 'react'
import renderer from 'react-test-renderer'
import Library from './Library'

jest.mock('./libraryGenerator.worker', () =>
  class Worker {
    constructor() {this.onmessage = () => {}}
    addEventListener() { return }
    postMessage(msg) {
      this.onmessage(msg)
    }
  }
)
describe('Library', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <Library />,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
