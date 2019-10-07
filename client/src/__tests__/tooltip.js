import '@testing-library/react/cleanup-after-each'
import React from 'react'
import {render as rtlRender, fireEvent} from '@testing-library/react'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../reducers/faces'

import Tooltip from '../components/Tooltip'

function render(
    ui,
    {initialState, store = createStore(reducer, initialState)} = {},
  ) {
    return {
      ...rtlRender(<Provider store={store}>{ui}</Provider>),
      store,
    }
}

describe('<Tooltip />', () => {
    test('it render the tooltip', () => {
        const tooltipMockfn = jest.fn()
        const { getByText } = render(<Tooltip display={false} handleTooltip={tooltipMockfn} />)
        const tooltip = getByText('Click on one of the red squares to select it.')
    
        expect(tooltip.parentElement).toBeDefined()
    })

    test('it gives tooltip a style of <visibility: visible> after receiving true value as display prop', () => {
        const tooltipMockfn = jest.fn()
        const { getByText } = render(<Tooltip display={true} handleTooltip={tooltipMockfn} />)
        const tooltip = getByText('Click on one of the red squares to select it.')
    
        expect(tooltip.parentElement.style.visibility).toEqual('visible')
    })
    
    test('it gives tooltip a style of <visibility: hidden> after receiving false value as display prop', () => {
        const tooltipMockfn = jest.fn()
        const { getByText } = render(<Tooltip display={false} handleTooltip={tooltipMockfn} />)
        const tooltip = getByText('Click on one of the red squares to select it.')
    
        expect(tooltip.parentElement.style.visibility).toEqual('hidden')
    })
    
    test('it changes tooltip visibility to hidden after close button click', () => {
        const tooltipMockfn = jest.fn()
        const { getByText } = render(<Tooltip display={false} handleTooltip={tooltipMockfn} />)
        const tooltip = getByText('close')
    
        fireEvent.click(tooltip)
        
        expect(tooltipMockfn).toBeCalledTimes(1)
        expect(tooltip.parentElement.style.visibility).toEqual('hidden')
    })
})

