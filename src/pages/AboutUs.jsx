import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="about">
    <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Haqqımızda</span></div>
      <div className="about__container">
        <div className="about__content">
          <h2 className="about__title">Haqqımızda</h2>
          <p className="about__text">
            <strong>Fido Parfum & Fido Accessories</strong> — qadınların gündəlik
            həyatına zövq və özünəinam əlavə edən brenddir. Bizim parfümlərimiz
            qalıcı, fərqli notlarla seçilir və hər anınıza xüsusi bir toxunuş
            qatır. Aksessuarlarımız isə həm zövqlü, həm də hər gün rahatlıqla
            istifadə edə biləcəyiniz keyfiyyətdədir. İstər özünüz üçün, istərsə
            də sevdikləriniz üçün — <strong>Fido</strong> ilə hər an özünüzü
            xüsusi hiss edin.
          </p>

          <Link to="/products" className="about__btn">
            Məhsullara bax <IoIosArrowForward />
          </Link>
        </div>
        <div className="about__images">
          <div className="about__card about__card--main">
            <img src="https://i.pinimg.com/736x/12/8f/94/128f940217ef4498d44fca10d10c7b6c.jpg" alt="Fido perfume" />
          </div>
          <div className="about__card about__card--small">
            <img src="https://i.pinimg.com/736x/cb/bf/7a/cbbf7ac2b4cdde8366dc1e0a322346fc.jpg" alt="Fido accessory" />
          </div>
          <div className="about__stats">
            <h3>200+</h3>
            <p>Məmnun müştəri</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
