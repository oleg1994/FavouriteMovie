import React from 'react';
import './CaruselComponent.css';

class CaruselComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            movies: []
        };
        this.container = null
        // This binding is necessary to make `this` work in the callback
        // this.addWaitList = this.addWaitList.bind(this);
        // this.search = this.search.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        // event.preventDefault()
        console.log(this.state.value)
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bc4ef851ecf12182fb8bcef42dc17d08&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ movies: data.results })
                console.log(this.state.movies)
                return
            })
            .catch(console.log)
    }
    scrollContainerBy(distance) {
        this.container.scrollBy({ left: distance, behavior: 'smooth' })
        console.log(this.container.scrollWidth / 20)
    }



    render() {
        return (
            <div className="caruselControlsWrapper">
                <button
                    type="button" className="caruselButtonPrevious"
                    onClick={() => {
                        this.scrollContainerBy(-(this.container.scrollWidth / 20))
                    }}
                >
                    Previous
        </button>
                <div className="carusel" ref={node => { this.container = node }}>


                    {this.state.movies.map((movie, i) =>
                        <div className="caruselCard" key={i}>
                                <img className="caruselImage" src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt='poster'></img>
                                <div>{movie.title}</div>
                        </div>
                    )}
                </div>
                <button
                    type="button" className="caruselButtonNext"
                    onClick={() => {
                        this.scrollContainerBy((this.container.scrollWidth / 20))
                    }}
                >
                    Next
        </button>
        </div>);
    }
}

export default CaruselComponent;