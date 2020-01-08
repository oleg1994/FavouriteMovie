import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ContentChest from './components/ContentChest/ContentChest';
import { MyProvider } from './MyContext';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MyProvider: this.value
    };
  }

  

  render() {
    return (
      <div className='App'>
        <MyProvider value={this.state}>
          <Header />
          <ContentChest />
          <Footer></Footer>
        </MyProvider>
      </div>
    );
  }
}

export default App;
