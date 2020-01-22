import React from 'react';
import './MoviePersonal.css';
import backImage from './../../../images/back.svg'
import MoviesSaved from '../MoviesSaved/MoviesSaved';
import MyContext from '../../../MyContext';



class MoviePersonal extends React.Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08',
            savedMovies: [],
            newList: false,
            existingList: false,
            menu: true,
            listShow: false,
            createList: false,
            newName: '',
            newPassword: '',
            oldPassword: '',
            error: ''

        };
        // This binding is necessary to make `this` work in the callback
        this.toggleOptions = this.toggleOptions.bind(this);
        this.backtoMenu = this.backtoMenu.bind(this);
        this.retrieveList = this.retrieveList.bind(this);
        this.createList = this.createList.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeOldName = this.handleChangeOldName.bind(this);
        this.handleChangeOldPassword = this.handleChangeOldPassword.bind(this);
    }

    handleChangeName(event) {
        this.setState({
            newName: event.target.value
        });
    }
    handleChangePassword(event) {
        this.setState({
            newPassword: event.target.value
        });
    }
    handleChangeOldName(event) {
        this.setState({
            oldName: event.target.value
        });
    }
    handleChangeOldPassword(event) {
        this.setState({
            oldPassword: event.target.value
        });
    }

    toggleOptions(e) {
        if (e.target.id === 'personalCreateList') {
            this.setState({ newList: true })
            this.setState({ menu: false })
        }
        if (e.target.id === 'personalOpenExisting') {
            this.setState({ existingList: true })
            this.setState({ menu: false })
        }
    }

    backtoMenu(e) {
        this.setState({ newList: false })
        this.setState({ existingList: false })
        this.setState({ menu: true })
        this.setState({ error: null })

    }

    //Existing user
    retrieveList(e) {
        fetch('http://localhost:4000/userData', {
            method: 'POST',
            body: JSON.stringify({ password: this.state.oldPassword }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (data.fail) {
                    console.log(data.fail)
                    this.setState({ error: data.fail })
                }
                if (data.success) {
                    this.context.updateKey(this.state.oldPassword)
                    console.log(this.context)
                    this.setState({ error: null })
                    this.setState({ newList: false })
                    this.setState({ existingList: false })
                    this.setState({ menu: false })
                    this.setState({ createList: false })
                    this.setState({ listShow: true })
                }

            })
            .catch(error => console.error('Error:', error));
    }

    //NEW USER
    createList(e) {
        fetch('http://localhost:4000/userData', {
            method: 'POST',
            body: JSON.stringify({ listname: this.state.newName, password: this.state.newPassword, newList: true }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (data.fail) {
                    console.log(data.fail)
                    this.setState({ error: data.fail })
                }
                if (data.success) {
                    this.context.updateKey(this.state.newPassword)
                    this.setState({ error: null })
                    this.setState({ newList: false })
                    this.setState({ existingList: false })
                    this.setState({ menu: false })
                    this.setState({ listShow: false })
                    this.setState({ createList: true })
                }

            })
            .catch(error => console.error('Error:', error));
    }



    render() {
        return (
            <div className='savedMovieWrapper'>
                {this.state.menu ?
                    <div className='personalMenu'>
                        <div onClick={(e) => this.toggleOptions(e)} id='personalCreateList' className='personalButton'>Create List</div>
                        <div onClick={(e) => this.toggleOptions(e)} id='personalOpenExisting' className='personalButton'>Open Existing</div>
                    </div>
                    : null
                }
                {this.state.existingList ?
                    <form className='savedMovieForm'>
                        <img className='personalBackButton' src={backImage} onClick={() => this.backtoMenu()}></img>
                        <label htmlFor="Password" className='savedMovieFormLabel'>Unique key</label>
                        <input type="text" onChange={this.handleChangeOldPassword} value={this.state.oldPassword} className="savedMovieFormInput" id="Password" placeholder="unique key" />
                        {this.state.error ? <div>{this.state.error}</div> : null}
                        <div className='personalContinueButton' onClick={() => this.retrieveList()}>Continue</div>
                    </form>
                    :
                    null
                }
                {this.state.newList ?
                    <form className='savedMovieForm'>
                        <img className='personalBackButton' src={backImage} onClick={() => this.backtoMenu()}></img>
                        <label htmlFor="List name" className='savedMovieFormLabel'>List name</label>
                        <input type="text" onChange={this.handleChangeName} value={this.state.newName} className="savedMovieFormInput" id="List name" placeholder="list name" />
                        <label htmlFor="Password" className='savedMovieFormLabel'>Unique key</label>
                        <input type="text" onChange={this.handleChangePassword} value={this.state.newPassword} className="savedMovieFormInput" id="Password" placeholder="unique key" />
                        {this.state.error ? <div>{this.state.error}</div> : null}
                        <div className='personalContinueButton' onClick={() => this.createList()}>Continue</div>
                    </form>
                    :
                    null
                }
                {this.state.listShow ?
                    <MoviesSaved existing={this.state.listShow} uniqKey={this.state.oldPassword} ></MoviesSaved>
                    : null
                }
                {this.state.createList ?
                    <MoviesSaved newList={this.state.createList} uniqKey={this.state.newPassword}></MoviesSaved>
                    : null
                }
            </div>
        );
    }
}

export default MoviePersonal;