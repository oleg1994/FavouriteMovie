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
        };
        this.container = null
    }


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
                for (let i = 0; i < this.state.movies.length; i++) {
                    let separateLink = `https://image.tmdb.org/t/p/w780/${this.state.movies[i].poster_path}`
                    linksArray.push(separateLink)
                    let separateTitle = this.state.movies[i].title
                    titlesArray.push(separateTitle)
                }
                this.setState({ links: linksArray })
                this.setState({ titles: titlesArray })

                let tempPreload = []
                this.state.links.forEach((picture) => {
                    const img = new Image();
                    img.src = picture;
                    tempPreload.push(picture)
                    this.setState({ preLoadImg: tempPreload })
                    // console.log(this.state.preLoadImg)
                });
                return
            })
            .catch(console.log)

        this.interval = setInterval(() => {

            // this.scrollContainerBy(this.scrollContainerBy((this.container.scrollWidth / 20)))
            if (this.state.preLoadImg[0]) {
                console.log("yes")
                let a = this.state.preLoadImg
                let b = this.state.titles
                var copy = a.pop()
                var copy2 = b.pop()
                console.log(copy)
                a.unshift(copy);
                b.unshift(copy2);
                this.setState({
                    preLoadImgDisplay: a,
                    titles: b,
                    animate: true
                })
                console.log(this.state.preLoadImgDisplay);
                setTimeout(() => {
                    this.setState({ animate: false })
                }, 3000)

            }
        }, 2000);
    }
    scrollContainerBy(distance) {
        this.container.scrollBy({ left: distance, behavior: 'smooth' })
        console.log(this.container.scrollWidth / 20)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

                    {
                        this.state.movies.map((movie, i) => {
                            console.log(this.state.animate, i)
                            return (
                                <div className={(this.state.animate && i === 0) ? "caruselCardWrapper newCard3" : "caruselCardWrapper"} key={i}>
                                    <div className={(this.state.animate && i === 0) ? "caruselCard newCard2" : "caruselCard"}>
                                        <img className="caruselImage" src={this.state.preLoadImgDisplay[i]} alt='poster'></img>
                                        <div className="caruselTitle">{this.state.titles[i]}</div>
                                    </div></div>)
                        }
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