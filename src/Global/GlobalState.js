import React, { Component } from 'react';

import MyContext from './../MyContext';

class GlobalState extends Component {
    state = {
        title: '',
        selectedMovie: '',
        pickedCollection: '',
    };

    updateTitle = title => {
        console.log('update function triggered', title)
        this.setState({ title: title });
    }


    addedToCollection = selectedMovie => {
        this.setState({ selectedMovie: selectedMovie });
        console.log('triggered', selectedMovie)
    }


    updateKey = key => {
        this.setState({ pickedCollection: key });
        console.log('triggered')
    }

    render() {
        return (
            <MyContext.Provider
                value={{
                    title: this.state.title,
                    pickedCollection: this.state.pickedCollection,
                    selectedMovie:this.state.selectedMovie,
                    updateKey: this.updateKey,
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