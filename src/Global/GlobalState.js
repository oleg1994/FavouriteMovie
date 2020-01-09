import React, { Component } from 'react';

import MyContext from './../MyContext';

class GlobalState extends Component {
    state = {
        title: '',
    };

    updateTitle = title => {
        console.log('update function triggered', title)
        this.setState({ title: title });
    }

    render() {
        return (
            <MyContext.Provider
                value={{
                    title: this.state.title,
                    updateTitle: this.updateTitle
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default GlobalState;