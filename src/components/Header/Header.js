import React from 'react';
import './Header.css';
import MyContext from '../../MyContext';


class Header extends React.Component {
  static contextType = MyContext;
  constructor(props) {
      super(props);
      this.state = {
      };

      // This binding is necessary to make `this` work in the callback
  }
  render() {
    return (
      <div className='Header'>
          <div className='Logo' onClick={()=>(console.log(this.context.browsedHistory.push('/')))}>My Favourite movies</div>
      </div>
    );
  }
}

export default Header;