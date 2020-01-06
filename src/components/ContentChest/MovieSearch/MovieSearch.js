import React from 'react';
import './MovieSearch.css';
import Trailer from '../Trailer/Trailer'


class MovieSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            value: '',
            movies: [],
            trailer: '',
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08'
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);

    }
    toggleSearch() {
        this.setState(state => ({ isToggleOn: !state.isToggleOn }));
        console.log(this.state.isToggleOn)
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.state.apiKey}&language=en-US&query=${this.state.value}&page=1&include_adult=false`)
            .then(response => response.json())
            .then(data => {
                this.setState({ movies: data })
            })
            .catch(error => console.error(error))
        event.preventDefault();
    }

    render() {
        return (
            <div className='cardWrapper'>
                <div>My list</div>
                <div className='card' onClick={this.toggleSearch}>+</div>
                {this.state.isToggleOn ?
                    <div className='newCard'>
                        <div className='closeNewCard' onClick={this.toggleSearch}>X</div>
                        <div className='newCardContent'>
                            <form onSubmit={this.handleSubmit} className='searchForm'>
                                <label>
                                    <input type='text' placeholder='Title' value={this.state.value} onChange={this.handleChange}></input>
                                </label>
                                <input type='submit' value='Search'></input>
                            </form>
                            <div className='moviesFound'>
                                {this.state.movies.results ?
                                    this.state.movies.results.map((movie, i) => {
                                        return (
                                            <div key={i} className='movieBlockWrapper'>
                                                <div key={i} className='movieBlock'>
                                                    <div className='movieTitle'>
                                                        {movie.title}
                                                        <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt='poster' className='poster'></img>
                                                    </div>
                                                    <div className='movieDescription'>
                                                        <div className='movieScore'>Rating: {movie.vote_average ? movie.vote_average : 'unknown'}</div>
                                                        <div className='movieRelease'>Release date: {movie.release_date ? movie.release_date : 'unknown'}</div>
                                                        <div className='movieOverview'>{movie.overview ? movie.overview : 'unknown'}</div>
                                                        <div className='movieblockButtons'>
                                                            <div className='movieButton' onClick={() => this.setState({ trailer: movie.id })}>Watch trailer</div>
                                                            <div className='movieButton'>Save&Wait</div>
                                                            <div className='movieButton'>Add to watch list</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {movie.id === this.state.trailer? <Trailer movieID={this.state.trailer}/> : null}
                                            </div>
                                        )
                                    })
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

export default MovieSearch;