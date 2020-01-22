import React from 'react';
import './Trailer.css';
import MyContext from '../../../MyContext';


class Trailer extends React.Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      trailer: '',
      apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08'
    };

    // This binding is necessary to make `this` work in the callback
  }
  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/${this.props.movieID}/videos?api_key=${this.state.apiKey}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length !== 0) {
          this.setState({ trailer: data.results[0].key })
          this.setState({ modal: true })
        }
        console.log(this.state.trailer)
      })
      .catch(error => console.error(error))
  }


  render() {
    return (
      <div>
        {this.state.modal ?
          <div>
            {this.state.trailer ?
              <div className='modal'>
                <div className="modal-content">
                  <span className="close" onClick={() => (this.setState({ modal: false }),this.context.conditionalTrailerRender(false))}>&times;</span>
                  <iframe
                    title='trailer'
                    style={{
                      width: "100%",
                      height: "100%"
                    }}
                    src={`https://www.youtube.com/embed/${this.state.trailer}`}
                    frameBorder="0"
                  />
                </div>
              </div>
              :
              <div className='modal'>
              <div className="modal-content">
                <span className="close" onClick={() => (this.setState({ modal: false }),this.context.conditionalTrailerRender(false))}>&times;</span>
                <div className='noTrailerFound'>'Trailer not found or not yet released.'</div>
              </div>
            </div>
            }
          </div>
          :
          null
        }

      </div>
    );
  }
}

export default Trailer;