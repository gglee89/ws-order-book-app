import React, { Component } from 'react';
import { Alignment, Navbar, Button } from '@blueprintjs/core';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar className="bp3-dark">
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Blueprint</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="home" text="Home" />
            <Button className="bp3-minimal" icon="document" text="Files" />
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

export default App;
