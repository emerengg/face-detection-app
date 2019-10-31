import React from 'react';


const Main = (props) => {
    return ( 
        <div className="start-screen">
            <div className="title"><h1>Face Detection App</h1></div>

            {props.children}

            <div className="reference">
                <div className="ref-item">
                    <a href="https://github.com/emerengg/face-detection-app"><i className="icons fab fa-github fa-lg"></i></a>
                    <small>GitHub</small>
                </div>
            </div>
            <div className="wave">
                <svg width="1920" height="477" viewBox="0 0 1920 477" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1621 82.0001C1749.02 0.539482 1920 0.65332 1920 0.65332V477H0V74.5C0 74.5 256.5 160.092 415 160.092C573.5 160.092 611 77.6485 802 118C993 158.351 1131 199 1293 188.633C1455 178.266 1505 155.813 1621 82.0001Z" fill="black"/>
                </svg>
            </div>
        </div>
     );
}
 
export default Main;