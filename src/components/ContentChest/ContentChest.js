import React from 'react';
import './ContentChest.css';
import CaruselComponent from '../CaruselComponent/CaruselComponent';
import MovieSearch from '../ContentChest/MovieSearch/MovieSearch';
import MoviePersonal from './MoviePersonal/MoviePersonal';

class ContentChest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08',
            selectedMovie:{name:''}
        };
        this.setSelectedMovieHandler = this.setSelectedMovieHandler.bind(this);
    }
    
      setSelectedMovieHandler(selectedMovie){
        this.setState({selectedMovie})
      }
 
    render() {
        return (
            <div className='ContentChest'>
                <CaruselComponent setSelectedMovieHandler={this.setSelectedMovieHandler} />
                <MovieSearch selectedMovie={this.state.selectedMovie}/>
                <MoviePersonal></MoviePersonal>
            </div>
        );
    }
}

export default ContentChest;