import React from 'react';
import './MoviesSaved.css';
import editImage from './../../../images/edit.svg'
import backImage from './../../../images/back.svg'
import MyContext from '../../../MyContext'



class MoviesSaved extends React.Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08',
            savedMovies: [],
            editMode: false,
            uniqueKey: this.props.match.url.substr(1),
            newMovie: "",
            noExistentList: '',
            listName: ''
        };
        // This binding is necessary to make `this` work in the callback
        this.editingMode = this.editingMode.bind(this);
        this.removeMovie = this.removeMovie.bind(this);
    }
    componentDidMount(event, match) {
        this.context.passingHistory(this.props.history)
        console.log(this.context.movieSavedCondition)
        fetch('/moviesData', {
            method: 'POST',
            body: JSON.stringify({ key: this.state.uniqueKey }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (data.fail) {
                    console.log(data.fail)
                    this.setState({ noExistentList: data.fail })
                }
                if (data.success) {
                    console.log(data.result[0].listname)
                    this.setState({ listName: data.result[0].listname })
                    data.result[0].movies.forEach(movie => {
                        fetch(` https://api.themoviedb.org/3/movie/${movie.ID}?api_key=${this.state.apiKey}&language=en-US`)
                            .then(response => response.json())
                            .then(data => {
                                if (!data.errors) {
                                    this.setState({ savedMovies: [...this.state.savedMovies, data] })
                                }
                            })
                            .catch(error => console.error(error))
                    });
                }
            })
            .catch(error => console.error('Error:', error));
    }

    editingMode() {
        this.setState(state => ({ editMode: !state.editMode }))
    }
    removeMovie(movie) {
        console.log(movie)
        fetch('/removeMovie', {
            method: 'POST',
            body: JSON.stringify({ key: this.state.uniqueKey, removeID: movie }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    const removefromDom = this.state.savedMovies.filter(item => item.id !== movie)
                    this.setState({ savedMovies: removefromDom })
                }

            })
            .catch(error => console.error('Error:', error));
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.newMovie !== this.context.selectedMovie) {
            this.setState({ newMovie: this.context.selectedMovie })
            fetch(` https://api.themoviedb.org/3/movie/${this.context.selectedMovie}?api_key=${this.state.apiKey}&language=en-US`)
                .then(response => response.json())
                .then(dataApi => {
                    let checkifDup = this.state.savedMovies.filter(function (item) {
                        return item.id === dataApi.id
                    });
                    if (checkifDup.length === 0) {
                        this.setState({ savedMovies: [...this.state.savedMovies, dataApi] })
                    }
                })
                .catch(error => console.error(error))
        }

    }





    render() {
        return (
            <div className='savedMovieWrapper'>
                <div className='savedMovieListName'>{this.state.listName}</div>
                <div className='savedMovieSelectionMenu'>
                    <img className='savedMovieBacktoMenu' src={backImage} draggable="false" onClick={() => this.props.history.push('/')} alt='backImage'></img>
                    <div onClick={() => this.editingMode()} className='savedMovieEditMode'>Toggle edit mode <img src={editImage} className='savedMovieEdit'></img></div>
                </div>
                {this.context.movieSavedCondition === undefined && !this.state.noExistentList ?
                    <div className='savedMovieList'>
                        {this.state.savedMovies.map((movie, i) => {
                            return (
                                <div key={i}>
                                    <div className={this.state.editMode ? 'savedMovieBlock' : 'savedMovieBlocknoAnimation'} >
                                        {this.state.editMode ? <div className='savedMovieDelete' onClick={() => this.removeMovie(movie.id)}>&times;</div> : null}
                                        <img className='savedMoviePoster' id={this.state.savedMovies[i].id} onClick={(event) => { this.context.updateTitle(event.target.id) }} draggable="false" src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt='poster'></img>
                                        <div className='savedMovieTitle' id={this.state.savedMovies[i].id} onClick={(event) => { this.context.updateTitle(event.target.id) }} draggable="false" src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}>{movie.title}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    : null
                }
                {this.state.noExistentList ?
                    <div className='savedMovieList'>
                        <h1 className='savedMovieAddFirst'>{this.state.noExistentList}</h1>
                    </div>
                    : null
                }
                {this.context.movieSavedCondition === 'newList' ?
                    <div className='savedMovieList'>
                        {this.state.savedMovies.length ?
                            this.state.savedMovies.map((movie, i) => {
                                return (
                                    <div key={i}>
                                        <div className={this.state.editMode ? 'savedMovieBlock' : 'savedMovieBlocknoAnimation'} >
                                            {this.state.editMode ? <div className='savedMovieDelete' onClick={() => this.removeMovie(movie.id)}>&times;</div> : null}
                                            <img className='savedMoviePoster' id={this.state.savedMovies[i].id} onClick={(event) => { this.context.updateTitle(event.target.id) }} draggable="false" src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt='poster'></img>
                                            <div className='savedMovieTitle' id={this.state.savedMovies[i].id} onClick={(event) => { this.context.updateTitle(event.target.id) }} draggable="false" src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}>{movie.title}</div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <h1 className='savedMovieAddFirst'>Start by adding your first movie &uarr;</h1>
                        }

                    </div>
                    : null
                }
            </div>
        );
    }
}

export default MoviesSaved;