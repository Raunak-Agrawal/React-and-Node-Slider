import React, { Component } from "react";
import "./App.css";

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      imgUrls: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/hello")
      .then(res => res.json())
      .then(imgUrls => this.setState({ imgUrls }, () => console.log(imgUrls)));
  }

  previousSlide = () => {
    const lastIndex = this.state.imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? 0 : currentImageIndex - 1;

    this.setState({
      currentImageIndex: index
    });
  };

  nextSlide = () => {
    const lastIndex = this.state.imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    if (currentImageIndex != lastIndex) {
      this.setState({
        currentImageIndex: index
      });
    }
  };

  render() {
    return (
      <div className="carousel">
        <Arrow
          direction="left"
          clickFunction={this.previousSlide}
          glyph="&#9664;"
        />
        <div style={{ textAlign: "center" }}>
          <h3>Hello Kitty</h3>
        </div>
        <ImageSlide url={this.state.imgUrls[this.state.currentImageIndex]} />
        <ImageSlide
          url={this.state.imgUrls[this.state.currentImageIndex + 1]}
        />
        <ImageSlide
          url={this.state.imgUrls[this.state.currentImageIndex + 2]}
        />
        <Arrow
          direction="right"
          clickFunction={this.nextSlide}
          glyph="&#9654;"
        />
      </div>
    );
  }
}

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
    {glyph}
  </div>
);

const ImageSlide = ({ url }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover"
  };

  return <div className="image-slide" style={styles} />;
};

export default Carousel;
