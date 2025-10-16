import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-logo">
                    <img src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/0fef33f15554b0a71a7e14c0bed45243~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=5de4fbda&x-expires=1760731200&x-signature=6UYxk2FL3%2B586n0eN6E8hZ4loOQ%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=maliva"></img>
                </div>
                
                <div className="footer-links">
                    <div>
                        <h5>Alıcılara</h5>
                        <ul>
                            <li><Link to="/delivery-and-billing">Çatdırılma və ödəniş</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Məlumat</h5>
                        <ul>
                            <li><Link to="/campaigns">Kampaniyalar</Link></li>
                            <li><Link to="/brands">Brendlər</Link></li>
                            <li><Link to="/news">Bloq və xəbərlər</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Haqqımızda</h5>
                        <ul>
                            <li><Link to="/about-us">Haqqımızda</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-social">
                    <div className="social">
                        <p>Bizi sosial mediada izləyin:</p>
                        <div className="footer-icons">
                            <Link to="https://www.facebook.com/bakuelectronics.mmc" target="_blank"><FaFacebookF /></Link>
                            <Link to="https://t.me/baku_electronics" target="_blank"><FaTelegramPlane /></Link>
                            <Link to="https://www.linkedin.com/company/bakuelectronics/" target="_blank"><FaLinkedinIn /></Link>
                            <Link to="https://www.instagram.com/bakuelectronics.az/" target="_blank"><FaInstagram /></Link>
                            <Link to="https://www.youtube.com/user/BakuElectronicsMMC" target="_blank"><FaYoutube /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p>
                    Copyright © {currentYear} <strong>Baku Electronics</strong>. <span>Bütün hüquqlar qorunur.</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
