import React, { useState } from 'react'
import HeroSlider from "../components/sliders/HeroSlider"
import { PiHandPeace } from 'react-icons/pi'
import { MdOutlineCloudDone } from 'react-icons/md'
import { LuClipboardList } from 'react-icons/lu'
import { BsCalendar4Week } from 'react-icons/bs'
import NewsSlider from '../components/sliders/NewsSlider'
import ProductList from '../components/ProductList'
import FilteredProductList from '../components/FilteredProductList'
import { Link } from 'react-router-dom'
import { FaCheck, FaHeart, FaShoppingCart, FaWhatsapp } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'

const Home = () => {
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
                {[ "Yeni", "Xüsusi", "Seçim", "Endirim", "Gözəl", "Yeni", "Xüsusi", "Seçim", "Endirim"].map((w, i) => (
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
      <div className='why-us'>
        <div className='card'>
          <div><PiHandPeace /></div>
          <h2>Arxayın al!</h2>
          <p>30 gün müddətində istər dəyiş, istər geri qaytar.</p>
        </div>
        <div className='card'>
          <div><MdOutlineCloudDone /></div>
          <h2>Sürətli çatdırılma</h2>
          <p>24 saat ərzində çatdırılma</p>
        </div>
        <div className='card'>
          <div><LuClipboardList /></div>
          <h2>Qapıda ödəmə</h2>
          <p>Qapıda ödəmə rahatlığı ilə sifariş imkanı</p>
        </div>
        <div className='card'>
          <div><BsCalendar4Week /></div>
          <h2>Hissə-hissə ödəniş</h2>
          <p>Endirimli qiymətə indi al, 3 aya böl, hissə-hissə ödə!.</p>
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