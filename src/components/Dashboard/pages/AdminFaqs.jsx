import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { IoTrashBin } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFaqs } from "../../../tools/request/fetchFaqs";
import PreLoader from "../../PreLoader";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { SlRefresh } from "react-icons/sl";
import { PiEmpty } from "react-icons/pi";
import Swal from "sweetalert2";
import { supabase } from "../../../services/supabaseClient";
import slugify from "slugify";

const AdminFAQs = () => {
  const { faqs, faqCount, loading, error } = useSelector((state) => state.faqs);
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 8;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFaqs();
  }, []);

  if (loading) return <PreLoader />;
  if (error) return <p>Xəta baş verdi: {error}</p>;
  if (!faqs) return <p>FAQ tapılmadı!</p>;

  const filteredFaqs = faqs.filter((faq) =>
    [faq.question, faq.answer].some((field) =>
      String(field || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(
    (filteredFaqs.length !== 0 ? filteredFaqs.length : faqCount) / faqsPerPage
  );

  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = faqs.slice(indexOfFirstFaq, indexOfLastFaq);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const resetFilter = () => setSearchTerm("");

  const handleDeleteFaq = async (id) => {
    Swal.fire({
      title: "Əminsiniz?",
      text: "Bu FAQ silinəcək və geri qaytarmaq mümkün olmayacaq!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "Ləğv et",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        content: "custom-swal-text",
        confirmButton: "custom-swal-confirm",
        cancelButton: "custom-swal-cancel",
        icon: "custom-swal-icon"
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase.from("FAQS").delete().eq("id", id).single();

        if (error) {
          Swal.fire({
            title: "Xəta!",
            text: "Silmə zamanı xəta baş verdi!",
            icon: "error",
          });
          return;
        }

        Swal.fire({
          title: "Uğur!",
          text: "FAQ uğurla silindi!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            content: "custom-swal-text"
          }
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  const generatePaginationNumbers = (totalPages, currentPage) => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      if (currentPage > 3 && currentPage < totalPages - 2)
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      else if (currentPage <= 4) pages.push(3, 4, 5);
      else pages.push(totalPages - 4, totalPages - 3, totalPages - 2);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return pages;
  };

  return (
    <div className="admin-faqs">
      <div className="page-head">
        <h3>
          FAQ-lar{" "}
          <span className="count">
            ({filteredFaqs.length > 0
              ? filteredFaqs.length
              : filteredFaqs.length === 0
              ? 0
              : faqCount}{" "}
            ədəd)
          </span>
        </h3>

        <div className="procces">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-icon">
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </div>
          <Link to="/administrative/faqs/addfaq">
            Əlavə et <GoPlus />
          </Link>
        </div>
      </div>

      {faqCount === 0 ? (
        <div className="empty-area">
          <div className="icon">
            <PiEmpty />
          </div>
          <p>Hal-hazırda FAQ yoxdur.</p>
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="empty-area">
          <div className="icon">
            <PiEmpty />
          </div>
          <p>Uyğun FAQ tapılmadı.</p>
          <button className="reset-btn" onClick={resetFilter}>
            <SlRefresh /> Axtarışı sıfırla
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="faq-table">
            <thead>
              <tr>
                <th className="index">#</th>
                <th>Sual</th>
                <th>Cavab</th>
                <th className="faq-actions">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {(searchTerm.length > 0 ? filteredFaqs : currentFaqs).map(
                (faq, index) => (
                  <tr key={faq.id}>
                    <td>{(currentPage - 1) * faqsPerPage + index + 1}</td>
                    <td>{faq.question.length > 50 ? faq.question.slice(0, 50) + "..." : faq.question}</td>
                    <td>{faq.answer.length > 150 ? faq.answer.slice(0, 150) + "..." : faq.answer}</td>
                    <td>
                      <div className="actions">
                        <Link
                          to={`/administrative/faqs/editfaq/${slugify(faq.question, { lower: true })}`}
                          className="edit-btn"
                        >
                          <FiEdit />
                        </Link>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteFaq(faq.id)}
                        >
                          <IoTrashBin />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && filteredFaqs.length !== 0 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <MdOutlineKeyboardArrowLeft />
          </button>

          <div className="numbers">
            {generatePaginationNumbers(totalPages, currentPage).map(
              (page, index) =>
                page === "..." ? (
                  <span key={index} className="dots">
                    ...
                  </span>
                ) : (
                  <span
                    key={index}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </span>
                )
            )}
          </div>

          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminFAQs;
