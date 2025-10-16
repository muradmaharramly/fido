import React, { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "Baku Electronics mağazalarından necə sifariş edə bilərəm?",
    answer: "Baku Electronics saytına daxil olaraq məhsulu seçib, səbətə əlavə edin və ödəniş səhifəsinə keçin. Sifarişinizi evə çatdırılma və ya mağazadan götürmə variantı ilə tamamlaya bilərsiniz.",
  },
  {
    question: "Baku Electronics hansı ödəniş üsullarını qəbul edir?",
    answer: "Mağazalarımızda və onlayn platformada nağd ödəniş, kredit kartı, və taksitlə ödəniş mövcuddur.",
  },
  {
    question: "Zəmanət haqqında necə məlumat əldə edə bilərəm?",
    answer: "Hər bir məhsulun zəmanət şərtləri məhsul səhifəsində və zəmanət sənədində qeyd olunur. Adətən, məişət texnikası və elektronika məhsullarına 1-3 il zəmanət verilir.",
  },
  {
    question: "Sifarişimi nə qədər müddətə çatdırırsınız?",
    answer: "Sifarişlər Bakı və ətraf ərazilərdə 1-3 iş günü ərzində çatdırılır. Rayonlara çatdırılma müddəti fərqli ola bilər.",
  },
  {
    question: "Baku Electronics-də kampaniyalar haqqında necə xəbərdar ola bilərəm?",
    answer: "Saytımıza daxil olaraq 'Kampaniyalar' bölməsinə baxa və ya sosial media hesablarımızı izləyərək yeniliklərdən xəbərdar ola bilərsiniz.",
  },
];

const faqData2 = [
    {
      question: "Baku Electronics-dən alınan məhsulların geri qaytarılması mümkündürmü?",
      answer: "Bəli, məhsulu 14 gün ərzində qaytarmaq mümkündür. Məhsul istifadəsiz, orijinal qutusunda və bütün aksessuarları ilə birlikdə olmalıdır.",
    },
    {
      question: "Onlayn sifariş zamanı məhsulun vəziyyətini necə izləyə bilərəm?",
      answer: "Sifariş etdiyiniz zaman qeyd etdiyiniz e-poçt və ya telefon nömrəsinə sifariş izləmə linki göndərilir. Buradan məhsulun harada olduğunu izləyə bilərsiniz.",
    },
    {
      question: "Məhsulun çatdırılma xərcləri nə qədərdir?",
      answer: "Bakı daxilində müəyyən alış-veriş məbləğindən yuxarı sifarişlər üçün çatdırılma pulsuzdur. Digər hallarda çatdırılma qiymətləri sifariş zamanı göstərilir.",
    },
    {
      question: "Baku Electronics-dən kreditlə alış mümkündürmü?",
      answer: "Bəli, mağazalarımızda və onlayn platformada müxtəlif banklarla əməkdaşlıq edərək kreditlə alış imkanı təklif edirik. Təkliflərimizi kampaniyalar bölməsindən də izləyə bilərsiniz.",
    },
    {
      question: "Mağaza saatları və ünvanlarını haradan öyrənə bilərəm?",
      answer: "Bütün Baku Electronics mağazalarının ünvanları və iş saatları saytımızın 'Mağazalar' bölməsində qeyd olunub.",
    },
  ];
  

const FAQPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedIndex2, setSelectedIndex2] = useState(null);

  const toggleFAQ = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };
  const toggleFAQ2 = (index) => {
    setSelectedIndex2(selectedIndex2 === index ? null : index);
  };

  return (
    <div className="faq-container">
    <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>FAQ</span></div>
      <div className="faq-header">
        <div><h3>Hər hansı bir sualınız var?</h3>
        <p>Cavablandırmaq üçün hazırıq.</p></div>
        <Link to="tel:143" className="intro-call-button">Zəng Edin</Link>
      </div>

      <div className="faq-content">
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${selectedIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="faq-icon">{selectedIndex === index ? "-" : "+"}</span>
              </div>
              {selectedIndex === index && <div className="faq-answer">{item.answer}</div>}
            </div>
          ))}
        </div>
        <div className="faq-list">
          {faqData2.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${selectedIndex2 === index ? "active" : ""}`}
              onClick={() => toggleFAQ2(index)}
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="faq-icon">{selectedIndex2 === index ? "-" : "+"}</span>
              </div>
              {selectedIndex2 === index && <div className="faq-answer">{item.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
