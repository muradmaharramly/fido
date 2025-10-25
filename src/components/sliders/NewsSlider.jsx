import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../tools/request/fetchNews";
import PreLoader from "../PreLoader";
import slugify from "slugify";
import ErrorPage from "../ErrorPage";

function NewsSlider() {
    const { news, loading, error } = useSelector((state) => state.news);
    useEffect(() => {
        fetchNews();
    }, [])
    if (loading) return <PreLoader />;
    if (error) return <p><ErrorPage error={error} /></p>;

    const settings = {
        dots: false,
        infinite: news.length > 1,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };


    return (
        <div className="news roll-area">
            <div className="area-head">
                <div className="text">
                    <p>Bloq və xəbərlər</p>
                    <h3>Ən son yeniliklərdən xəbərdar ol!</h3>
                </div>
                <Link to="/news">Xəbərlərə keçid et</Link>
            </div>
            <div className="slider-container">
                <Slider {...settings}>
                    {news
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 8)
                        .map((item) => (
                            <Link key={item.id} to={`/news/${slugify(item.title, { lower: true })}`}>
                                <div className="slide">
                                    <div className="img-div">
                                        <img src={item.image} alt={item.title} />
                                        <div className="overlay">
                                            <Link to={`/news/${slugify(item.title, { lower: true })}`}>
                                                Ətraflı
                                            </Link>
                                        </div>
                                    </div>
                                    <h4>
                                        {item.title.length > 30
                                            ? item.title.substring(0, 30) + "..."
                                            : item.title}
                                    </h4>

                                </div>
                            </Link>
                        ))}
                </Slider>

            </div>
            <Link className="mobile-href-btn" to="/news" target="_blank">Xəbərlərə keçid et</Link>
        </div>
    );
}

export default NewsSlider;