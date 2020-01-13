import React from 'react';
import './MoviesSaved.css';
import editImage from './../../../images/edit.svg'
import backImage from './../../../images/back.svg'

import movies from './mockMovies.js';
const moviesID = movies.getMovies();

class MoviesSaved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08',
            savedMovies: [],
            username: 'spongebob',
            editMode: false
        };

        // This binding is necessary to make `this` work in the callback
        this.editingMode = this.editingMode.bind(this);

    }
    componentDidMount(event) {
        moviesID.forEach(movie => {
            console.log(movie.ID)
            fetch(` https://api.themoviedb.org/3/movie/${movie.ID}?api_key=${this.state.apiKey}&language=en-US`)
                .then(response => response.json())
                .then(data => {
                    if (!data.errors) {
                        this.setState({ savedMovies: [...this.state.savedMovies, data] })
                        // console.log(this.state.savedMovies)
                    }
                })
                .catch(error => console.error(error))
        });

        fetch('http://localhost:4000/userList', {
            method: 'POST',
            body: JSON.stringify({ username: this.state.username, movies: moviesID }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
    }

    editingMode() {
        this.setState(state => ({ editMode: !state.editMode }))
    }



    render() {
        return (
            <div className='savedMovieWrapper'>
                <div className='savedMovieSelectionMenu'>
                    <img className='savedMovieBacktoMenu' src={backImage} onClick={() => this.backtoMenu()}></img>
                    <div onClick={() => this.editingMode()} className='savedMovieEditMode'>Toggle edit mode <img src={editImage} className='savedMovieEdit'></img></div>
                </div>
                {this.props.existing ?
                    <div className='savedMovieList'>
                        {this.state.savedMovies.map((movie, i) => {
                            return (
                                <div key={i}>
                                    <div className={this.state.editMode ? 'savedMovieBlock' : 'savedMovieBlocknoAnimation'} >
                                        {this.state.editMode ? <div className='savedMovieDelete'>&times;</div> : null}
                                        <img className='savedMoviePoster' draggable="false" src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}></img>
                                        <div className='savedMovieTitle' >{movie.title}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    : null
                }
                {this.props.newList ?
                    <div className='savedMovieList'>
                       <div>Start by adding your first movie.</div>
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default MoviesSaved;