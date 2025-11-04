import React, { useEffect, useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchFaqs } from "../tools/request/fetchFaqs";
import { CgDanger } from "react-icons/cg";
import ErrorPage from "../components/ErrorPage";
import PreLoader from "../components/PreLoader";

const FAQPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedIndex2, setSelectedIndex2] = useState(null);
  const { faqs, loading, error } = useSelector((state) => state.faqs);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };
  const toggleFAQ2 = (index) => {
    setSelectedIndex2(selectedIndex2 === index ? null : index);
  };

  if (loading) return <PreLoader />;;
  if (error) return <ErrorPage error={error} />;
  if (!faqs || faqs.length === 0) return <div className="item-not-found">
    <div className="empty-icon"><CgDanger /></div>
    <p>FAQ tapılmadı</p>
    <span className="desc">Zəhmət olmasa daha sonra yenidən ziyarət edin!</span>
    <Link to="/" className="back-home">Ana səhifə</Link>
  </div>;;

  const mid = Math.ceil(faqs.length / 2);
  const faqColumn1 = faqs.slice(0, mid);
  const faqColumn2 = faqs.slice(mid);

  return (
    <div className="faq-container">
      <div className="breadcrumb">
        <Link to="/">Ana səhifə</Link>
        <RiArrowRightDoubleFill />
        <span>FAQ</span>
      </div>

      <div className="faq-header">
        <div>
          <h3>Hər hansı bir sualınız var?</h3>
          <p>Cavablandırmaq üçün hazırıq.</p>
        </div>
        <Link to="tel:+994558759382" className="intro-call-button">
          Zəng Edin
        </Link>
      </div>

      <div className="faq-content">
        <div className="faq-list">
          {faqColumn1.map((item, index) => (
            <div
              key={item.id}
              className={`faq-item ${selectedIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="faq-icon">{selectedIndex === index ? "-" : "+"}</span>
              </div>
              {selectedIndex === index && (
                <div
                  className="faq-answer"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-list">
          {faqColumn2.map((item, index) => (
            <div
              key={item.id}
              className={`faq-item ${selectedIndex2 === index ? "active" : ""}`}
              onClick={() => toggleFAQ2(index)}
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="faq-icon">{selectedIndex2 === index ? "-" : "+"}</span>
              </div>
              {selectedIndex2 === index && (
                <div
                  className="faq-answer"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
