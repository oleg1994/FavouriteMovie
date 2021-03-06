import React from 'react';
import './MovieSearch.css';
import Trailer from '../Trailer/Trailer'
import searchIcon from '../../../images/magnifying-glass.svg'
import MyContext from '../../../MyContext';
import PopUp from '../../PopUp/PopUp';

let name;
class MovieSearch extends React.Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            popUpToggle: false,
            popUpErrorText: '',
            popUpID: '',
            value: '',
            movies: [],
            selectedMovie: '',
            trailer: '',
            animate: false,
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08'
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleCaruselSubmit = this.handleCaruselSubmit.bind(this);
        this.addToCollection = this.addToCollection.bind(this);
    }


    toggleSearch() {
        this.setState(state => ({ isToggleOn: !state.isToggleOn }));
    }


    addToCollection(movieId) {
        //popUpID saves to state the movie id to compare it with movie id from map in dom making the pop up show only at selected element(cycle)
        this.setState({popUpID:movieId})
        // sets pop up to false before checking anything, basically closes the previous open popups before creating new one
        this.setState(({ popUpToggle: false }));

        //checks if user has collection(unique key) registered
        if (this.context.pickedCollection) {
            this.context.addedToCollection(movieId);
            fetch('/addMovie', {
                method: 'POST',
                body: JSON.stringify({ movieID: movieId, collectionID: this.context.pickedCollection }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.exist) {
                        this.setState(state => ({ popUpToggle: !state.popUpToggle }));
                        this.setState({ popUpErrorText: data.exist });
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            //shows error message cus user has no collection(unique key)
            this.setState(state => ({ popUpToggle: !state.popUpToggle }));
            this.setState({ popUpErrorText: 'Please register a new list' });
        }
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        //search for movies
        event.preventDefault();
        this.setState({ animate: true });
        setTimeout(() => {
            this.setState({ animate: false })
        }, 1000)
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.state.apiKey}&language=en-US&query=${this.state.value}&page=1&include_adult=false`)
            .then(response => response.json())
            .then(data => {
                if (!data.errors) {
                    this.setState({ movies: data })
                    let divScrolling = document.getElementsByClassName('moviesFound')
                    divScrolling[0].style.overflowY = "scroll"
                    divScrolling[0].style.height = "400px"
                    divScrolling[0].style.border = '2px solid white';
                }
            })
            .catch(error => console.error(error))
    }

    handleCaruselSubmit() {
        //handles the received movie id from carusel component
        console.log(this.state.selectedMovie)
        // fetch(`https://api.themoviedb.org/3/find/movie?api_key=${this.state.apiKey}&language=en-US&query=${this.state.selectedMovie}&page=1&include_adult=false`)
        if (this.state.selectedMovie) {
            fetch(`https://api.themoviedb.org/3/movie/${this.state.selectedMovie}?api_key=${this.state.apiKey}&language=en-US`)
                .then(response => response.json())
                .then(data => {
                    if (!data.errors || !data.status_code) {
                        this.setState({ movies: { results: [data] } })
                        this.setState({ value: this.state.movies.results[0].title });
                        let divScrolling = document.getElementsByClassName('moviesFound')
                        divScrolling[0].style.overflowY = "scroll"
                        divScrolling[0].style.height = "400px"
                        divScrolling[0].style.border = '2px solid white';
                    }
                })
                .catch(error => console.error(error))
        }
    }





    componentDidMount(event) {
        //part of clickoutside detector
        document.addEventListener('mousedown', this.handleClickOutside);
    }



    // Calls after component updated
    // has access of previous state and props with snapshot
    // Can call methods here
    // setState inside this will cause infinite loop

    componentDidUpdate(prevProps, prevState) {
        //searches for a movie by id received from carusel component 
        if (prevState.selectedMovie !== this.context.title) {
            this.setState({ selectedMovie: this.context.title });
            this.handleCaruselSubmit();
            this.setState({ animate: false })
        }
    }


    componentWillUnmount() {
        //part of clickoutside detector
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && event.target.className !== "caruselImage" && event.target.className !== "caruselTitle") {
            let divScrolling = document.getElementsByClassName('moviesFound')
            divScrolling[0].style.overflowY = "none"
            divScrolling[0].style.height = 0
            divScrolling[0].style.border = 'none';
            this.setState({ value: '' });
        }
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ popUpToggle: false });
        }
    }

    render() {
        return (
            <div className='cardWrapper' ref={this.setWrapperRef} >
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
                                        <div key={i} className={this.state.animate ? "movieBlockWrapper" : "movieBlockWrapperReset"} >
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
                                                        <div className='movieButton' onClick={() => (this.setState({ trailer: movie.id }),this.context.conditionalTrailerRender(true))}>Watch trailer</div>
                                                        <div className='movieButton'  onClick={() => this.addToCollection(movie.id)}>Add to watch list</div>

                                                        {this.state.popUpID === movie.id && this.state.popUpToggle ? <PopUp popUpErrorText={this.state.popUpErrorText} /> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            {movie.id === this.state.trailer && this.context.trailerCondition ? <Trailer movieID={this.state.trailer} /> : null}
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