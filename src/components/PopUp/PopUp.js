import React from 'react';
import './PopUp.css';




class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className='popUpWrapper'>
                <div className='popUpTriangle'></div>
                <div className='popUp'>{this.props.popUpErrorText}</div>
            </div>
        );
    }
}

export default PopUp;