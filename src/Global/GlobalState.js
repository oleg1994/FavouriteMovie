import React, { Component } from 'react';

import MyContext from './../MyContext';

class GlobalState extends Component {
    state = {
        title: '',
        addedToCollection: '',
        pickedCollection: '',
    };

    updateTitle = title => {
        console.log('update function triggered', title)
        this.setState({ title: title });
    }
    addedToCollection = addedToCollection => {
        this.setState({ addedToCollection: addedToCollection });
        console.log('triggered', addedToCollection)
    }
    verypickedCollection = pickedCollection => {
        this.setState({ pickedCollection: pickedCollection });
        console.log('triggered')
    }

    render() {
        return (
            <MyContext.Provider
                value={{
                    title: this.state.title,
                    pickedCollection: this.state.pickedCollection,
                    verypickedCollection: this.verypickedCollection,
                    updateTitle: this.updateTitle,
                    addedToCollection: this.addedToCollection,
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default GlobalState;