import React, { Component } from 'react'
import Navbar from '../../components/navbar'
import SlideShow from '../../components/slideshow'
import Footer from '../../components/footer'

class App extends Component {
  render() {
    return (
        <div>
            <Navbar/>,
            <SlideShow/>,
            <Footer/>
        </div>
      
    
      
    );
  }
}

export default App;