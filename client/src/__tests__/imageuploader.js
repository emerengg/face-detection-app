import '@testing-library/react/cleanup-after-each'
import React from 'react'
import {render as rtlRender, fireEvent, waitForElement} from '@testing-library/react'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../reducers/faces'

import ImageUploader from '../components/ImageUploader'

function render(
    ui,
    {initialState, store = createStore(reducer, initialState)} = {},
  ) {
    return {
      ...rtlRender(<Provider store={store}>{ui}</Provider>),
      store,
    }
}

describe('<ImageUploader />', () => { 
  test('it should contain the name', () => {
    const { getByTestId } = render(<ImageUploader />,{
          initialState: {faces: {uploadError: null}}
      }
    )
    const uploadForm = getByTestId('image-upload-form')
    expect(uploadForm).toBeDefined()
  })
})

test('it shoud containt upload input', () => {
  const {getByTestId, getByLabelText, getByText, container, debug } = render(<ImageUploader />,{
        initialState: {faces: {uploadError: "XDDD"}}
    }
  )
 
  const uploadInput = getByText('Choose a file...')
  expect(uploadInput).toBeDefined();
})

test('show the uploaded file name after the user uploads a image', () => {
  const {getByTestId, getByText } = render(<ImageUploader />,{
        initialState: {faces: {uploadError: "XDDD"}}
    }
  )
  const imageUpload = getByTestId('imageUpload')
  const fileName = 'error.png'

  const file = new File(['(⌐□_□)'], fileName, {
    type: 'image/png',
  })

  fireEvent.change(imageUpload, {target: {files: [file]}})
  expect(getByText(file.name).textContent).toMatch(fileName)
})

test('show the error after wrong file upload', () => {
  const { getByTestId, getByText } = render(<ImageUploader />, {
        initialState: {faces: {uploadError: "XDDD"}},
    }
  )
  const imageUpload = getByTestId('imageUpload')

  const file = new File(['zxc'], 'lol.txt', {
    type: 'text/plain',
  })

  fireEvent.change(imageUpload, {target: {files: [file]}})

  expect(getByText('Only jpg/jpeg and png files are allowed!').textContent).toMatch('Only jpg/jpeg and png files are allowed!')
})


test('checking if upload button is defined', () => {
  const { getByTestId, getByText, debug } = render(<ImageUploader />,{
    initialState: {faces: {uploadError: "Couldn't upload the image! Try again!"}}
    }
  )

  const imageUpload = getByTestId('imageUpload')

  const file = new File(['(⌐□_□)'], 'error.png', {
    type: 'image/png',
  })

  fireEvent.change(imageUpload, {target: {files: [file]}})

  const uploadButton = getByText('Upload')

  expect(uploadButton).toBeDefined()
})

