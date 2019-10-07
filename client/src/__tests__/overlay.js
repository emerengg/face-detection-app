import '@testing-library/react/cleanup-after-each'
import React from 'react'
import {render} from '@testing-library/react'

import Overlay from '../components/Overlay'


describe('<Overlay />', () => {
  const defaultProps = {
    object: {
      cords: [],
      isSelected: false
    },
    handleUpdateState: jest.fn(),
  };

  test('it render the overlay', () => {
    const { container } = render(<Overlay {...defaultProps} />);
    const overlay = container.firstChild;

    expect(overlay).toBeDefined();
  })

  test('it has red border style after passing false value to prop', () => {
    const { container } = render(<Overlay {...defaultProps} />);
    const overlay = container.firstChild;
  
    expect(overlay.style.border).toEqual('2px solid red')
  })

  test('it has blue border style after passing true value to prop', async () => {
    const object = {cords: [], isSelected: true}
    const { container } = render(<Overlay {...defaultProps} object={object} />);
    const overlay = container.firstChild;

    expect(overlay.style.border).toEqual('2px solid blue')

  })
})



