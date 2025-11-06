import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { fetchCampaigns } from "../../tools/request/fetchCampaigns";
import { useSelector } from "react-redux";
import PreLoader from "../PreLoader";
import { Link } from "react-router-dom";
import slugify from "slugify";
import ErrorPage from "../ErrorPage";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next`} onClick={onClick}>
      <IoIosArrowForward />
    </div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow prev`} onClick={onClick}>
      <IoIosArrowBack />
    </div>
  );
}

function HeroSlider() {
  const { campaigns, loading, error } = useSelector((state) => state.campaigns);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) return <PreLoader />;
  if (error) return <p><ErrorPage error={error} /></p>;

  const now = new Date();
  const sortedCampaigns = [...campaigns]
    .filter((campaign) => new Date(campaign.endDate) > now && campaign.status !== false)
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {sortedCampaigns.map((campaign) => (
          <Link to={`/campaigns/${slugify(campaign.title, { lower: true })}`}>
            <div key={campaign.id} className="slide">
              <img src={campaign.image} alt={campaign.title} />
              <Link className="slide-btn" to={`/campaigns/${slugify(campaign.title, { lower: true })}`}>Kampaniyaya bax<IoIosArrowForward /></Link>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSlider;
