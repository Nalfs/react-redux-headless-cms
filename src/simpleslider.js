import React, { Component } from 'react';
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true,
      slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>
            <div className="slider-img">
                 <img src="images/mushrooms.jpg" />
            </div>
            <div className="slider-img">
                <img src="images/slider1.jpg" />
            </div>
             <div className="slider-img">
                <img src="images/slider2.jpg" />
            </div>
        </Slider>
      );
  }
}
