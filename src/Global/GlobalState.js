import React, { Component } from 'react';

import MyContext from './../MyContext';

class GlobalState extends Component {
    state = {
        title: '',
        selectedMovie: '',
        pickedCollection: '',
        trailerCondition:false,
        conditionalMovieSavedRender:'',
        browsedHistory:''
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
    conditionalMovieSavedRender = (condition) => {
        this.setState(({ movieSavedCondition: condition }));
        console.log('movieSavedCondition',condition)
    }
    passingHistory = (history) => {
        this.setState(({ browsedHistory: history }));
        console.log('movieSavedCondition',history)
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
                    movieSavedCondition:this.state.movieSavedCondition,
                    browsedHistory:this.state.browsedHistory,

                    //functions
                    updateKey: this.updateKey,
                    updateTitle: this.updateTitle,
                    addedToCollection: this.addedToCollection,
                    conditionalTrailerRender: this.conditionalTrailerRender,
                    conditionalMovieSavedRender: this.conditionalMovieSavedRender,
                    passingHistory: this.passingHistory,
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default GlobalState;