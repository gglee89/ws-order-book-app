import React from 'react';
import './App.scss';

// Components
import Header from './components/Header';
import OrderBook from './components/OrderBook';

class App extends React.Component {
  render() {
    return (
      <div className="App container">
        <Header />
        <OrderBook />
      </div>
    );
  }
}

export default App;
