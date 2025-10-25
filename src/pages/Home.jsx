import React, { useEffect, useState } from 'react'
import HeroSlider from "../components/sliders/HeroSlider"
import { PiSealPercent } from 'react-icons/pi'
import NewsSlider from '../components/sliders/NewsSlider'
import ProductList from '../components/ProductList'
import FilteredProductList from '../components/FilteredProductList'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { HiOutlineCalendarDateRange } from 'react-icons/hi2'
import { IoHappyOutline } from 'react-icons/io5'
import { TbBrandAppgallery } from 'react-icons/tb'

const Home = () => {
  const [counts, setCounts] = useState({
    brands: 0,
    customers: 0,
    years: 0,
    guarantee: 0,
  });

  useEffect(() => {
    const targets = { brands: 10, customers: 200, years: 2, guarantee: 100 };
    const duration = 1500;
    const frameRate = 30;
    const steps = duration / frameRate;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounts({
        brands: Math.min(Math.floor((targets.brands / steps) * currentStep), targets.brands),
        customers: Math.min(Math.floor((targets.customers / steps) * currentStep), targets.customers),
        years: Math.min(Math.floor((targets.years / steps) * currentStep), targets.years),
        guarantee: Math.min(Math.floor((targets.guarantee / steps) * currentStep), targets.guarantee),
      });
      if (currentStep >= steps) clearInterval(timer);
    }, frameRate);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className='home-container'>
      <div className='hero-div'>
        <div className='hero-text-area'>
          <h1>Fido Parfum & Accessories</h1>
          <div className="sliding-box">

            <div className="marquee">
              <div className="marquee-track" style={{ animationDuration: "16s" }}>
                {["Parfum", "Elegance", "Scent", "Luxury", "Fresh", "Parfum", "Elegance", "Scent", "Luxury", "Fresh"].map((w, i) => (
                  <div className="marquee-item" key={i}>{w}</div>
                ))}
              </div>
            </div>

            <div className="marquee">
              <div className="marquee-track" style={{ animationDuration: "10s" }}>
                {["Yeni", "Xüsusi", "Seçim", "Endirim", "Gözəl", "Yeni", "Xüsusi", "Seçim", "Endirim"].map((w, i) => (
                  <div className="marquee-item" key={i}>{w}</div>
                ))}
              </div>
            </div>

            <div className="marquee">
              <div className="marquee-track" style={{ animationDuration: "20s" }}>
                {["Original", "Premium", "Hədiyyə", "Trend", "Sevimli", "Original", "Premium", "Hədiyyə", "Trend", "Sevimli"].map((w, i) => (
                  <div className="marquee-item" key={i}>{w}</div>
                ))}
              </div>
            </div>
          </div>

          <Link to='/products' className='hero-cta-btn'>Məhsullara bax<IoIosArrowForward /></Link>
        </div>
        <HeroSlider />
      </div>
      <div className="why-us">
        <div className="card">
          <h2>{counts.brands}+</h2>
          <p>Marka</p>
          <div className='back-ils'><TbBrandAppgallery /></div>
          <div className='icn'><TbBrandAppgallery /></div>
        </div>
        <div className="card">
          <h2>{counts.customers}+</h2>
          <p>Müştəri</p>
          <div className='back-ils'><IoHappyOutline /></div>
          <div className='icn'><IoHappyOutline /></div>
        </div>
        <div className="card">
          <h2>{counts.years}+ </h2>
          <p>İl fəaliyyət</p>
          <div className='back-ils'><HiOutlineCalendarDateRange /></div>
          <div className='icn'><HiOutlineCalendarDateRange /></div>
        </div>
        <div className="card">
          <h2>{counts.guarantee}% </h2>
          <p>Zəmanət</p>
          <div className='back-ils'><PiSealPercent /></div>
          <div className='icn'><PiSealPercent /></div>
        </div>
      </div>
      <div className="products-container">
        <div className="area-head">
          <p>Ən çox satılanlar</p>
          <h3>Ən çox satılanlar</h3>
        </div>
        <ProductList />
      </div>
      <FilteredProductList />
      <NewsSlider />
    </div>
  )
}

export default Home