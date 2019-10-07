import '@testing-library/react/cleanup-after-each'
import React from 'react'
import {render as rtlRender, fireEvent, getAllByTestId} from '@testing-library/react'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../reducers/faces'

import Canvas from '../components/Canvas'


function render(
    ui,
    {initState, store = createStore(reducer, initState)} = {},
  ) {
    return {
      ...rtlRender(<Provider store={store}>{ui}</Provider>),
      store,
    }
}

describe('<Canvas />', () => {
  test('it should render ', () => {
    const { container } = render(
      <Canvas />,
      {
          initState: {
              faces: {
                  data: {
                      cords: [1,2,3,4,5,6,7,8,9],
                      image: new Image()
                  },
                  uploadError: "error"
              }
          }
      },
    )
    expect(container.firstChild).toBeDefined()
  })
  
  test('it should display after passing empty prop (cords)', () => {
    const { getByText } = render(
      <Canvas />,
      {
          initState: {
              faces: {
                  data: {
                      cords: [],
                      image: new Image()
                  },
                  uploadError: "error"
              }
          }
      },
    )
    expect(getByText('No faces found!')).toBeDefined()
    expect(getByText('Upload new image')).toBeDefined()
  })
})

