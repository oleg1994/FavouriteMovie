import React from 'react';
import './ContentChest.css';

class ContentChest extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: false };
        this.state = {value:''};

        // This binding is necessary to make `this` work in the callback
        this.addWaitList = this.addWaitList.bind(this);
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addWaitList() {
        this.setState(state => ({ isToggleOn: !state.isToggleOn }));
        console.log(this.state.isToggleOn)
    }
    search() {

    }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

    render() {
        return (
            <div className='ContentChest'>
                <div className='cardWrapper'>
                    <div className='card' onClick={this.addWaitList}>+</div>
                    {this.state.isToggleOn ?
                        <div className='newCard'>
                            <div className='closeNewCard' onClick={this.addWaitList}>X</div>
                            <div className='newCardContent'>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                    <input type='text' placeholder='Title' value={this.state.value} onChange={this.handleChange}></input>
                                    </label>
                                    <input type='submit' value='Search'></input>
                                </form>
                            </div>
                        </div>
                        :
                        null}
                </div>
            </div>
        );
    }
}

export default ContentChest;