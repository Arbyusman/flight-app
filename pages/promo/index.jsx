import React, { Component } from "react";
import { NavbarComponent, SlideShow, Footer } from "../../components";

class App extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />,
        <SlideShow />,
        <Footer />
      </div>
    );
  }
}

export default App;
