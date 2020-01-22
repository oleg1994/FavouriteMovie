import React from 'react';
import './Header.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className='Header'>
         
          <Link to="/"> <div className='Logo'>Save & wait</div></Link>
          <div>button</div>
          <div>button</div>
          <div>button</div>
      </div>
    );
  }
}

export default Header;