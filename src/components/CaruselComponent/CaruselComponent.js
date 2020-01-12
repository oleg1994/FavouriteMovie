import React from 'react';
import './CaruselComponent.css';
import loading from '../../images/loading.gif'
import MyContext from '../../MyContext';

class CaruselComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            movies: [],
            movieIds: [],
            links: [],
            images: [],
            titles: [],
            preLoadImg: [],
            preLoadImgDisplay: [],
            preLoadTitle: [],
            animate: false,
            interval: '',
            targeted: ""
        };
        this.pause = this.pause.bind(this);
        this.unpause = this.unpause.bind(this);
        this.doStuff = this.doStuff.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    doStuff(params) {
        // this.setState({ intervalTimer: 2000 })
        this.interval = setInterval(() => {
            let a = this.state.preLoadImg
            let b = this.state.titles
            let c = this.state.movieIds
            var copy = a.pop()
            var copy2 = b.pop()
            var copy3 = c.pop()
            // console.log(copy)
            a.unshift(copy);
            b.unshift(copy2);
            c.unshift(copy3);
            this.setState({
                preLoadImgDisplay: a,
                titles: b,
                movieIds: c,
                animate: true
            })
            // console.log(this.state.preLoadImgDisplay);
            setTimeout(() => {
                this.setState({ animate: false })
            }, 1000)

        }, 2000);
    }

    // `${this.state.intervalTimer}`
    componentDidMount() {
        // event.preventDefault()
        // console.log(this.state.value)
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bc4ef851ecf12182fb8bcef42dc17d08&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ movies: data.results })
                console.log(this.state.movies)
                let linksArray = []
                let titlesArray = []
                let idsArray = []
                this.state.movies.forEach((picture) => {
                    let separateLink = `https://image.tmdb.org/t/p/w780/${picture.poster_path}`
                    linksArray.push(separateLink)
                    let separateTitle = picture.title
                    titlesArray.push(separateTitle)
                    let separateId = picture.id
                    idsArray.push(separateId)
                })
                this.setState({
                    links: linksArray,
                    titles: titlesArray,
                    movieIds: idsArray
                })
                let tempPreload = []
                this.state.links.forEach((picture) => {
                    const img = new Image();
                    img.src = picture;
                    this.state.preLoadImg.push(picture)
                    // console.log(this.state.preLoadImg)
                });

            })
            .catch(console.log)
        this.doStuff()
    }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
    pause(event) {
        clearInterval(this.interval);
    }
    unpause(event) {
        this.doStuff()

    }
    
    //THIS IS NOT IN USE ANYMORE AFTER GLOBAL STATE WAS IMPLEMENTED then why is it even here??
    onSearch(event) {
        // event.preventDefault();
        console.log(event.target.id)
        let pointedValue = event.target.id
        // console.dir(event.target.id)
        this.props.setSelectedMovieHandler({ name: pointedValue });
        this.setState({ targeted: pointedValue });
        console.log(this.state.targeted);
    }




    render() {
        return (
            <MyContext.Consumer>
                {context => (
                    <div onMouseOver={(event) => this.pause(event)} onMouseOut={(event) => this.unpause(event)} className="caruselControlsWrapper">
                        <div className="carusel">
                            {
                                this.state.movies.map((movie, i) => {
                                    return (
                                        <div onClick={(event) => {context.updateTitle(event.target.id) }} key={i}>
                                            <div className={(this.state.animate && i === 0) ? "caruselCard cardMoveLeft" : "caruselCard"}>
                                                {
                                                    this.state.preLoadImgDisplay[i] ?
                                                        <img className="caruselImage" id={this.state.movieIds[i]} src={this.state.preLoadImgDisplay[i]} alt='poster'></img>
                                                        :
                                                        <img className="LoadingPlaceHolder" src={loading} alt='poster'></img>
                                                }
                                                <div className="caruselTitle" id={this.state.movieIds[i]}>{this.state.titles[i]}</div>
                                            </div>

                                        </div>)
                                }
                                )}
                        </div>
                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}

export default CaruselComponent;