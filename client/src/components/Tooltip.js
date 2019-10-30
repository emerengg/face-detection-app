import React from 'react';
import PropTypes from 'prop-types'


const Tooltip = ({display, handleTooltip}) => {
    const visibility = display ? 'visible' : 'hidden';

    return(
        <div className="tooltip" style={{visibility}}>
            <p className="tip">Click on one of the <span>red squares</span> to select it.</p>
            <div className="close">
                <i className="material-icons" onClick={handleTooltip}>close</i>
            </div>
        </div>
    );
}

Tooltip.propTypes = {
    display: PropTypes.bool.isRequired,
    handleTooltip: PropTypes.func.isRequired
}

export default Tooltip;