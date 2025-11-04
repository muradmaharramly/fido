import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";
import Swal from "sweetalert2";
import { GoQuestion } from "react-icons/go";
import { MdOutlineTextsms } from "react-icons/md";

const FAQForm = ({ existingFaq, isEditMode }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [questionError, setQuestionError] = useState("");
    const [answerError, setAnswerError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && existingFaq) {
            setQuestion(existingFaq.question);
            setAnswer(existingFaq.answer);
        }
    }, [isEditMode, existingFaq]);

    const validateForm = () => {
        let isValid = true;
        setQuestionError("");
        setAnswerError("");

        if (!question.trim()) {
            setQuestionError("Sual boş ola bilməz");
            isValid = false;
        }
        if (!answer.trim()) {
            setAnswerError("Cavab boş ola bilməz");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const faqData = { question, answer };
        let result;

        if (isEditMode) {
            const { error } = await supabase
                .from("FAQS")
                .update(faqData)
                .eq("id", existingFaq.id);
            result = error
                ? { success: false, message: error.message }
                : { success: true };
        } else {
            const { error } = await supabase.from("FAQS").insert([faqData]);
            result = error
                ? { success: false, message: error.message }
                : { success: true };
        }

        if (result.success) {
            Swal.fire({
                title: isEditMode ? "FAQ yeniləndi!" : "FAQ əlavə olundu!",
                text: "Əməliyyat uğurla başa çatdı.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: "custom-swal-popup",
                    title: "custom-swal-title",
                    content: "custom-swal-text",
                },
            }).then(() => navigate("/administrative/faqs"));
        } else {
            Swal.fire({
                icon: "error",
                title: "Xəta!",
                text: result.message,
                customClass: {
                    popup: "custom-swal-popup",
                    title: "custom-swal-title",
                    content: "custom-swal-text",
                },
            });
        }
    };

    const handleCancel = () => navigate("/administrative/faqs");

    return (
        <div className="faq-form">
            <form onSubmit={handleSubmit}>
                <div className="form-double">
                    <div className="form-group">
                        <label>Sual</label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <GoQuestion />
                        {questionError && <span className="error-message">{questionError}</span>}
                    </div>

                    <div className="form-group">
                        <label>Cavab</label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <MdOutlineTextsms />
                        {answerError && <span className="error-message">{answerError}</span>}
                    </div>
                </div>

                <div className="btns">
                    <button type="button" className="cancel-btn" onClick={handleCancel}>
                        Ləğv et
                    </button>
                    <button type="submit" className="submit-btn">
                        {isEditMode ? "Yenilə" : "Göndər"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FAQForm;
