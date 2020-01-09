import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ContentChest from './components/ContentChest/ContentChest';
import GlobalState from './Global/GlobalState';

class App extends React.Component {



  render() {
    return (
      <div className='App'>
        <GlobalState>
          <Header/>
          <ContentChest/>
          <Footer></Footer>
        </GlobalState>
      </div>
    );
  }
}

export default App;
