import React from "react";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
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
                <Link to='/' className="footer-logo">
                    Fido
                </Link>

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
                            <Link to="#" target="_blank"><FaInstagram /></Link>
                            <Link to="#" target="_blank"><FaTiktok /></Link>
                            <Link to="#" target="_blank"><FaTelegramPlane /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p>
                    Copyright © {currentYear} <strong>Fido Parfum & Accessories</strong>. <span>Bütün hüquqlar qorunur.</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
