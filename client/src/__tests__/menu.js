import '@testing-library/react/cleanup-after-each'
import React from 'react'
import {render as rtlRender, fireEvent} from '@testing-library/react'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../reducers/faces'

import Menu from '../components/Menu'

function render(
    ui,
    {initialState, store = createStore(reducer, initialState)} = {},
  ) {
    return {
      ...rtlRender(<Provider store={store}>{ui}</Provider>),
      store,
    }
}


describe('<Menu />', () => {
  const defaultProps = {
    display: false, 
    faces: 1,
    handleBlur: jest.fn(),
    handleClear: jest.fn(),
    handleDisplay: jest.fn()
  }

  test('it render the menu', () => {
    const { getByTestId } = render(<Menu {...defaultProps} />)

    const menu = getByTestId('menu')
    expect(menu).toBeDefined()
  })

  test('it hidding faces overlay when display prop is equal to false', () => {
    const { getByTestId } = render(<Menu {...defaultProps} />)

    const displayCheckbox = getByTestId('displayFaces')
    expect(displayCheckbox).toHaveProperty("checked", false)
  })
  
  test('it displaying faces overlay when display prop is equal to true', () => {
    const { getByTestId } = render(<Menu {...defaultProps} display={true} />)

    const displayCheckbox = getByTestId('displayFaces')
    expect(displayCheckbox).toHaveProperty("checked", true)
  })
  
  test('it displaying singular word (face) after passing number different than 1', () => {
    const { getByText } = render(<Menu {...defaultProps} />)

    const displayFaces = getByText("Display")
    expect(displayFaces.textContent).toMatch("Display face")
  })
  
  test('it displaying plural word (faces) after passing number greater than 1', () => {
    const { getByText } = render(<Menu {...defaultProps} faces={23} />)

    const displayFaces = getByText("Display")
    expect(displayFaces.textContent).toMatch(/^Display faces$/)
  })
  
  test('it should fire handleBlur', () => {
    const { getByText} = render(<Menu {...defaultProps} />)

    const blurBtn = getByText('Blur')
    fireEvent.click(blurBtn)

    expect(defaultProps.handleBlur).toHaveBeenCalledTimes(1);
  })
  
  test('it should fire handleClear', () => {
    const { getByText } = render(<Menu {...defaultProps} />)
  
    const undoBtn = getByText('Undo')
    fireEvent.click(undoBtn)
  
    expect(defaultProps.handleClear).toHaveBeenCalledTimes(1);
  })

  test('it should fire handleDisplay', () => {
    const { getByTestId } = render(<Menu {...defaultProps} />)
  
    const displayBtn = getByTestId('displayFaces')
    fireEvent.click(displayBtn)
  
    expect(defaultProps.handleDisplay).toHaveBeenCalledTimes(1);
  })
})