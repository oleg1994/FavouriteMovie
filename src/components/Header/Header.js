import React from 'react';
import './Header.css';
import {MyConsumer} from '../../MyContext'

class Header extends React.Component {
  render() {
    return (
      <div className='Header'>
          <div className='Logo'>Save & wait</div>
          <div>button</div>
          <div>button</div>
          <div>button</div>
      </div>
    );
  }
}

export default Header;