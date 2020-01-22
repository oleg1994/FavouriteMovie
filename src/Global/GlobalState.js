import React, { Component } from 'react';

import MyContext from './../MyContext';

class GlobalState extends Component {
    state = {
        title: '',
        selectedMovie: '',
        pickedCollection: '',
        trailerCondition:false
    };

    updateTitle = title => {
        console.log('update function triggered', title)
        this.setState({ title: title });
    }

    addedToCollection = selectedMovie => {
        this.setState({ selectedMovie: selectedMovie });
        console.log('triggered', selectedMovie)
    }

    //List unique key 
    updateKey = key => {
        this.setState({ pickedCollection: key });
        console.log('triggered')
    }

    conditionalTrailerRender = (condition) => {
        this.setState(({ trailerCondition: condition }));
        console.log('conditionTrailer',condition)
    }

    render() {
        return (
            <MyContext.Provider
                value={{
                    //states
                    title: this.state.title,
                    pickedCollection: this.state.pickedCollection,
                    selectedMovie:this.state.selectedMovie,
                    trailerCondition:this.state.trailerCondition,

                    //functions
                    updateKey: this.updateKey,
                    updateTitle: this.updateTitle,
                    addedToCollection: this.addedToCollection,
                    conditionalTrailerRender: this.conditionalTrailerRender,
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default GlobalState;