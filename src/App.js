import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ContentChest from './components/ContentChest/ContentChest';
import GlobalState from './Global/GlobalState';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {



  render() {
    return (
      <div className='App'>
        <GlobalState>
          <Router>
            <Header />
            <ContentChest />
            <Footer />
          </Router>
        </GlobalState>
      </div>
    );
  }
}

export default App;
