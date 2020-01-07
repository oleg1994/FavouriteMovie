import React from 'react';
import './ContentChest.css';
import CaruselComponent from '../CaruselComponent/CaruselComponent';
import MovieSearch from '../ContentChest/MovieSearch/MovieSearch';
import MoviesSaved from '../ContentChest/MoviesSaved/MoviesSaved';

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
                <h1 style={{color:'white'}}>{this.state.selectedMovie.name}</h1>
                <MoviesSaved/>
            </div>
        );
    }
}

export default ContentChest;