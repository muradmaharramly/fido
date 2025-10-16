import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import slugify from "slugify";


function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next`}
      onClick={onClick}
    ><IoIosArrowRoundForward /></div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev`}
      onClick={onClick}
    ><IoIosArrowRoundBack /></div>
  );
}

function NewsPageSlider({ news }) {
  const settings = {
    dots: true,  
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <div className="custom-dot"></div>  
    ),
    appendDots: dots => (
      <div className="custom-dots-container">
        <ul> {dots} </ul>
      </div>
    )
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {news.slice(0, 8).map((item) => (
          <div className="slide" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="info-div">
              <span>{item.date.slice(0, 10)}</span>
              <h1>{item.title.substring(0, 35)}...</h1>
              <Link to={`/news/${slugify(item.title, { lower: true })}`}>Ətraflı bax</Link>
            </div>
          </div>
        ))}
      </Slider>

    </div>
  );
}

export default NewsPageSlider;