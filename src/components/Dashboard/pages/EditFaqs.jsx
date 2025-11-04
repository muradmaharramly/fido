import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editFaq } from "../../../tools/actions/faqAct";
import { fetchFaqs } from "../../../tools/request/fetchFaqs";
import PreLoader from "../../PreLoader";
import slugify from "slugify";
import FAQForm from "../elements/FaqForm";

const EditFAQ = () => {
  const { slug } = useParams();
  const [faq, setFaq] = useState(null);
  const { faqs, loading, error } = useSelector((state) => state.faqs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (faqs.length === 0) {
      fetchFaqs();
    }
  }, [faqs.length]);

  useEffect(() => {
    if (faqs.length > 0) {
      const foundFaq = faqs.find(
        (f) => slugify(f.question, { lower: true }) === slug
      );
      setFaq(foundFaq || null);
    }
  }, [slug, faqs]);

  if (loading) return <PreLoader />;
  if (error) return <p>Xəta: {error}</p>;

  if (!faq) {
    return <div>FAQ tapılmadı</div>;
  }

  const handleEditFaq = (updatedFaq) => {
    dispatch(editFaq(updatedFaq.id, updatedFaq));
  };

  return (
    <div className="edit-faq">
      <div className="page-head">
        <h3>FAQ redaktə et</h3>
        <Link to="/administrative/faqs">FAQ siyahısına bax</Link>
      </div>
      <FAQForm
        isEditMode={true}
        existingFaq={faq}
        onSubmit={handleEditFaq}
      />
    </div>
  );
};

export default EditFAQ;
