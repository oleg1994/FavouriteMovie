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
            uniqueKey:this.props.uniqKey,
            newMovie: ""
        };

        // This binding is necessary to make `this` work in the callback
        this.editingMode = this.editingMode.bind(this);

    }
    componentDidMount(event) {
        fetch('http://localhost:4000/moviesData', {
            method: 'POST',
            body: JSON.stringify({ key:this.props.uniqKey}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (data.fail) {
                    console.log(data.fail)
                }
                if (data.success) {
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

    componentDidUpdate(prevProps, prevState) {
        this.setState({ newMovie: this.context.addedToCollection })
        if (prevState.newMovie !== this.context.addedToCollection) {
            // this.setState({ newMovie: this.context.addedToCollection })
            console.log('tuftA')
            console.log(prevState.newMovie)
        fetch('http://localhost:4000/moviesData', {
            method: 'POST',
            body: JSON.stringify({ key:this.props.uniqKey}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (data.fail) {
                    console.log(data.fail)
                }
                if (data.success) {
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
    }}


    render() {
        return (
            <div className='savedMovieWrapper'>
                <div className='savedMovieSelectionMenu'>
                    <img className='savedMovieBacktoMenu' src={backImage} draggable="false" onClick={() => this.backtoMenu()} alt='backImage'></img>
                    <div onClick={() => this.editingMode()} className='savedMovieEditMode'>Toggle edit mode <img src={editImage} className='savedMovieEdit'></img></div>
                </div>
                {this.props.existing ?
                    <div className='savedMovieList'>
                        {this.state.savedMovies.map((movie, i) => {
                            return (
                                <div key={i}>
                                    <div className={this.state.editMode ? 'savedMovieBlock' : 'savedMovieBlocknoAnimation'} >
                                        {this.state.editMode ? <div className='savedMovieDelete'>&times;</div> : null}
                                        <img className='savedMoviePoster' draggable="false" src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt='poster'></img>
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