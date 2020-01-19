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
        <div className='popUp'>{this.props.popUpErrorText}</div>
        );
    }
}

export default PopUp;