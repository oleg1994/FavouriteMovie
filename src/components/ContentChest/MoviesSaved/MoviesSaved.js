import React from 'react';
import './MoviesSaved.css';

import movies from './mockMovies.js';
const moviesID = movies.getMovies();

class ContentChest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08',
            savedMovies: [],
            username: 'spongebob'
        };

        // This binding is necessary to make `this` work in the callback

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
        function randomID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

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



    render() {
        return (
            <div className='savedMovieWrapper'>
                <h1>My saved movies</h1>
                <input type='text' placeholder='username'></input>
                <div className='savedMovieList'>
                    {this.state.savedMovies.map((movie, i) => {
                        return (
                            <div key={i}>
                                <div className='savedMovieBlock'>
                                    <img className='savedMoviePoster' draggable="false" src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}></img>
                                    <div className='savedMovieTitle' >{movie.title}</div>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default ContentChest;