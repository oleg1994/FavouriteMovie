import React from 'react';
import './CaruselComponent.css';

class CaruselComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            movies: [],
            links: [],
            images: [],
            titles: [],
            preLoadImg: [],
            preLoadImgDisplay: [],
            preLoadTitle: [],
            animate: false,
            interval: ''
        };
        this.pause = this.pause.bind(this);
        this.unpause = this.unpause.bind(this);
        this.doStuff = this.doStuff.bind(this);
    }

    doStuff(params) {
            // this.setState({ intervalTimer: 2000 })
            this.interval = setInterval(() => {
                    let a = this.state.preLoadImg
                    let b = this.state.titles
                    var copy = a.pop()
                    var copy2 = b.pop()
                    // console.log(copy)
                    a.unshift(copy);
                    b.unshift(copy2);
                    this.setState({
                        preLoadImgDisplay: a,
                        titles: b,
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
                this.state.movies.forEach((picture) => {
                    let separateLink = `https://image.tmdb.org/t/p/w780/${picture.poster_path}`
                    linksArray.push(separateLink)
                    let separateTitle = picture.title
                    titlesArray.push(separateTitle)
                })
                this.setState({ links: linksArray })
                this.setState({ titles: titlesArray })
                let tempPreload = []
                this.state.links.forEach((picture) => {
                    const img = new Image();
                    img.src = picture;
                    this.state.preLoadImg.push(picture)
                    // console.log(this.state.preLoadImg)
                });

            })
            .catch(console.log)
            console.log(this.state.preLoadImg)
            this.doStuff()
    }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
    pause(event) {
        console.log(event.type, 'enter')
        clearInterval(this.interval);
    }
    unpause(event) {
        console.log(event.type, 'leave')
        this.doStuff()

    }





    render() {
        return (
            <div onMouseOver={(event) => this.pause(event)} onMouseOut={(event) => this.unpause(event)} className="caruselControlsWrapper">
                <button
                    type="button" className="caruselButtonPrevious"
                    onClick={() => {

                    }}
                >
                    Previous
        </button>
                <div className="carusel">

                    {
                        this.state.movies.map((movie, i) => {
                            // console.log(this.state.animate, i)
                            return (
                                <div key={i}>
                                    <div className={(this.state.animate && i === 0) ? "caruselCard cardMoveLeft" : "caruselCard"}>
                                        <img className="caruselImage" src={this.state.preLoadImgDisplay[i] ? this.state.preLoadImgDisplay[i]: 'https://i.gifer.com/XVo6.gif'} alt='poster'></img>
                                        <div className="caruselTitle">{this.state.titles[i]}</div>
                                    </div></div>)
                        }
                        )}
                </div>
                <button
                    type="button" className="caruselButtonNext"
                    onClick={() => {

                    }}
                >
                    Next
        </button>
            </div>);
    }
}

export default CaruselComponent;