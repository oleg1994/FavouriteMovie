import React from 'react';
import './MovieSearch.css';
import Trailer from '../Trailer/Trailer'
import searchIcon from '../../../images/magnifying-glass.svg'


class MovieSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            value: '',
            movies: [],
            trailer: '',
            animate: false,
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08'
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);

    }
    toggleSearch() {
        this.setState(state => ({ isToggleOn: !state.isToggleOn }));
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ animate: true });
        setTimeout(() => {
            this.setState({ animate: false })
        }, 1000)
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.state.apiKey}&language=en-US&query=${this.state.value}&page=1&include_adult=false`)
            .then(response => response.json())
            .then(data => {
                this.setState({ movies: data })
            })
            .catch(error => console.error(error))
           let divScrolling = document.getElementsByClassName('moviesFound')
           divScrolling[0].style.overflowY = "scroll"
           divScrolling[0].style.height = "400px"
        event.preventDefault();
    }
   

    render() {
        return (
            <div className='cardWrapper'>
                    <div className='newCard'>
                        <div className='newCardContent'>
                            <form onSubmit={this.handleSubmit} className='searchForm'>
                                    <input type='text' placeholder='Search' value={this.state.value} onChange={this.handleChange} className='inputSearch'></input>
                                <button type='submit' value='Search' className='submitSearch'>
                                    <img src={searchIcon} alt='search icon' width='25px' height='25x'></img>
                                </button>
                            </form>
                            <div className='moviesFound'>
                                {this.state.movies.results ?
                                    this.state.movies.results.map((movie, i) => {
                                        return (
                                            <div key={i} className={this.state.animate ? "movieBlockWrapper" : null} >
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
            </div>
        );
    }
}

export default MovieSearch;