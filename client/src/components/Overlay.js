import React from 'react';


const Overlay = ({object, handleUpdateState}) => {

    const { cords, isSelected} = object;

    const overlayStyle = {
        top: String(cords.y) + 'px',
        left:  String(cords.x) + 'px',
        position: 'absolute', 
        width: String(cords.w) + 'px',
        height: String(cords.h) + 'px',
        pointer: 'cursor',
        border: isSelected ? '2px solid blue' : '2px solid red',
    };

    return (
        <div 
            className="overlay" 
            style={overlayStyle} 
            onClick={() => handleUpdateState(cords)}>
        </div>
    );
}

export default Overlay;