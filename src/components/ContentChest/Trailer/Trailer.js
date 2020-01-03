import React from 'react';
import './Trailer.css';

class Trailer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            trailer: '',
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08'
        };

        // This binding is necessary to make `this` work in the callback
    }
    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.movieID}/videos?api_key=${this.state.apiKey}&language=en-US`)
            .then(response => response.json())
            .then(data => {
                if(data.results.length !== 0){
                this.setState({ trailer: data.results[0].key })
                }
                console.log(this.state.trailer)
            })
            .catch(error => console.error(error))
    }


    render() {
        return (
            <div>
                {this.state.trailer?
                    <div
                    className="video"
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%" /* 16:9 */,
                      paddingTop: 25,
                      height: 0
                    }}
                  >
                    <iframe
                    title='trailer'
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                      }}
                      src={`https://www.youtube.com/embed/${this.state.trailer}`}
                      frameBorder="0"
                    />
                  </div>
                    :
                    'Trailer not found or not yet released.'
                }
            </div>
        );
    }
}

export default Trailer;