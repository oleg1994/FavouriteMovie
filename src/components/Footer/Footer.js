import React from 'react';
import './Footer.css';


class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08'
        };

        // This binding is necessary to make `this` work in the callback
       

    }
    render() {
        return (
            <div className="footer">
            <p>The Useless Footer</p>
          </div>
        );
    }
}

export default Footer;