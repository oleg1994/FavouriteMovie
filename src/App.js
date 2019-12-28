import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import ContentChest from './components/ContentChest/ContentChest';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Header/>
        <ContentChest/>
      </div>
    );
  }
}

export default App;
