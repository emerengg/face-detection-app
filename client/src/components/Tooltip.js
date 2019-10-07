import React from 'react';
import PropTypes from 'prop-types'


const Tooltip = ({display, handleTooltip}) => {

    let tooltip = {
        position: 'absolute',
        top: 10,
        left: 10,
    }

    display ? tooltip.visibility = 'visible' : tooltip.visibility = 'hidden'

    return(
        <div className="tooltip" style={tooltip}>
            <p className="tip">Click on one of the <span>red squares</span> to select it.</p>
            <i className="material-icons" onClick={handleTooltip}>close</i>
        </div>
    )
}

Tooltip.propTypes = {
    display: PropTypes.bool.isRequired,
    handleTooltip: PropTypes.func.isRequired
}

export default Tooltip;