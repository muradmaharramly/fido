import React from "react";
import { Link } from "react-router-dom";
import FAQForm from "../elements/FaqForm";
import { addFaq } from "../../../tools/actions/faqactions";

const AddFAQ = () => {

  const handleAddFaq = (faqData) => {
    addFaq(faqData);
  };

  return (
    <div className="add-faq">
      <div className="page-head">
        <h3>FAQ əlavə et</h3>
        <Link to="/administrative/faqs">FAQ siyahısına bax</Link>
      </div>
      <FAQForm isEditMode={false} onSubmit={handleAddFaq} />
    </div>
  );
};

export default AddFAQ;
