import React, { Component } from 'react';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isDesktop: false
     }
  }

updateWindowDisplay = () => {
  this.setState ({
    isDesktop: window.innerWidth > 1024
  })
}

  componentDidMount() {
    this.updateWindowDisplay()
    window.addEventListener('resize', this.updateWindowDisplay)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDisplay)
  }


  render() { 
    return (  
      <>
      {this.state.isDesktop ? (
        <h1>Welcome to the App!!! Desktop Version </h1>
      ) : (
        <h1>Welcome to the App!!! Tablet/Mobile Version</h1>
      )}
      </>
    );
  }
}

export default App;
