import React, { Component } from "react";
class Carousel extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    );
  }
}

export default Carousel;
