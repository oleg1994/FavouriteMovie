import React from 'react';
import './ContentChest.css';
import CaruselComponent from '../CaruselComponent/CaruselComponent';
import MovieSearch from '../ContentChest/MovieSearch/MovieSearch';
import MoviePersonal from './MoviePersonal/MoviePersonal';
import MoviesSaved from './MoviesSaved/MoviesSaved';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

class ContentChest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08',
            selectedMovie: { name: '' }
        };
        this.setSelectedMovieHandler = this.setSelectedMovieHandler.bind(this);
    }

    setSelectedMovieHandler(selectedMovie) {
        this.setState({ selectedMovie })
    }

    render() {
        return (
            <div className='ContentChest'>
                <Router>
                    <CaruselComponent setSelectedMovieHandler={this.setSelectedMovieHandler} />
                    <MovieSearch selectedMovie={this.state.selectedMovie} />
                    <Route exact path='/' component={MoviePersonal} />
                    <Route path='/:id' component={MoviesSaved} />
                </Router>
            </div>
        );
    }
}

export default ContentChest;