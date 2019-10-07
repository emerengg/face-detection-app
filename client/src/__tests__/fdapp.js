import '@testing-library/react/cleanup-after-each'
import React from 'react'
import {render as rtlRender, fireEvent} from '@testing-library/react'

import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../reducers/faces'

import FaceDetectionApp from '../components/FaceDetectionApp'


function render(
    ui,
    {initState, store = createStore(reducer, initState)} = {},
  ) {
    return {
      ...rtlRender(<Provider store={store}>{ui}</Provider>),
      store,
    }
}

describe('<FaceDetectionApp />', () => {
    test('it rendered the app after prop passing', () => {
        const { container } = render(<FaceDetectionApp />, {
                initState: {
                    faces: {
                        data: {
                            image: new Image(),
                            cords: [1,2,3]
                        },
                    }
                }
            }
        )
        expect(container.firstChild.className).toMatch('app')
    })
    
    test('it should have rendered upload from if there is no porp', () => {
        const { getByText } = render(<FaceDetectionApp />, {
                initState: {
                    faces: {
                        data: {
                            image: null
                        },
                    }
                }
            }
        )
        expect(getByText('Face Detection App')).toBeTruthy()
    })
})