import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go'
import { IoTrashBin } from 'react-icons/io5';
import { Link } from 'react-router-dom'
import { fetchNews } from '../../../tools/request/fetchNews';
import PreLoader from '../../PreLoader';
import { useSelector } from 'react-redux';
import { PiEmpty } from 'react-icons/pi';
import { SlRefresh } from 'react-icons/sl';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { supabase } from '../../../services/supabaseClient';
import Swal from 'sweetalert2';
import slugify from 'slugify';

const AdminNews = () => {
  const { news, newsCount, loading, error } = useSelector((state) => state.news);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <PreLoader />;

  if (error) return <p>Xəta baş verdi: {error}</p>;

  if (!news) return <p>Xəbər tapılmadı!</p>;

  const filteredNews = news.filter((singlenews) =>
    [singlenews.title, singlenews.category, singlenews.description].some((field) =>
      String(field || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil((filteredNews.length !== 0 ? filteredNews.length : newsCount) / newsPerPage);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const resetFilter = () => {
    setSearchTerm('');
  };

  const handleDeleteNews = async (id) => {

    Swal.fire({
      title: "Əminsiniz?",
      text: "Bu xəbəri sildikdən sonra geri qaytara bilməyəcəksiniz!",
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
        const { data, error } = await supabase
          .from("news")
          .delete()
          .eq("id", id)
          .single();

        if (error) {
          Swal.fire({
            title: "Xəta!",
            text: "Silinmə zamanı xəta baş verdi!",
            icon: "error",
            customClass: {
              popup: "custom-swal-popup",
              title: "custom-swal-title",
              content: "custom-swal-text",
              confirmButton: "custom-swal-confirm"
            }
          });
          return;
        }

        Swal.fire({
          title: "Uğur!",
          text: "Xəbər uğurla silindi!",
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
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2);

      if (currentPage > 4) {
        pages.push("...");
      }
      if (currentPage > 3 && currentPage < totalPages - 2) {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      } else if (currentPage <= 4) {
        pages.push(3, 4, 5);
      } else {
        pages.push(totalPages - 4, totalPages - 3, totalPages - 2);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages - 1, totalPages);
    }

    return pages;
  };
  return (
    <div className='admin-news'>
      <div className='page-head'>
        <h3>Xəbərlər <span className='count'>({filteredNews.length > 0 ? filteredNews.length : (filteredNews.length === 0 ? 0 : newsCount)} ədəd)</span></h3>
        <div className='procces'>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Axtar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-icon">
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </div>
          <Link to="/administrative/news/addnews">Əlavə et <GoPlus /></Link>
        </div>
      </div>
      { newsCount === 0 ? ( <div><div className='empty-area'>
          <div className='icon'><PiEmpty /></div>
          <p>Hal-hazırda xəbər yoxdur.</p>
        </div></div>) : (filteredNews.length === 0 ? (
        <div className='empty-area'>
          <div className='icon'><PiEmpty /></div>
          <p>Uyğun xəbər tapılmadı.</p>
          <button className='reset-btn' onClick={resetFilter}><SlRefresh /> Axtarışı sıfırla</button>
        </div>
      ) : (
        <div className="table-container">
          <table className="news-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Şəkil</th>
                <th>Başlıq</th>
                <th>Açıqlama</th>
                <th>Kateqoriya</th>
                <th>Baxış sayı</th>
                <th>Yaradılma tarixi</th>
                <th>Redaktə tarixi</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {searchTerm.length > 0 ? (
                filteredNews.map((singlenews, index) => (
                  <tr key={singlenews.id}>
                    <td>{index + 1}</td>
                    <td >
                      <div className="image-container"><img src={singlenews.image} alt={singlenews.title} className="news-image" /></div>

                    </td>
                    <td>{singlenews.title.substring(0, 25)}...</td>
                    <td>{singlenews.description.substring(0, 40)}...</td>
                    <td>{singlenews.category}</td>
                    <td>{singlenews.viewCount}</td>
                    <td>{singlenews.date.slice(0, 10)}</td>
                    <td>{singlenews.editDate === null ? "Redakə edilməyib" : <span> {singlenews.editDate.slice(0, 10)} <span className='create-hour'>{singlenews.editDate.slice(11, 16)}</span></span>}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/administrative/news/editnews/${slugify(singlenews.title, { lower: true })}`} className="edit-btn"><FiEdit /></Link>
                        <button className="delete-btn" onClick={() => handleDeleteNews(singlenews.id)}><IoTrashBin /></button>
                      </div>

                    </td>
                  </tr>
                ))
              ) : (
                currentNews.map((singlenews, index) => (
                  <tr key={singlenews.id}>
                    <td>{(currentPage - 1) * 6 + index + 1}</td>
                    <td >
                      <div className="image-container"><img src={singlenews.image} alt={singlenews.title} className="news-image" /></div>

                    </td>
                    <td>{singlenews.title.substring(0, 25)}...</td>
                    <td>{singlenews.description.substring(0, 40)}...</td>
                    <td>{singlenews.category}</td>
                    <td>{singlenews.viewCount}</td>
                    <td>{singlenews.date.slice(0, 10)}</td>
                    <td>{singlenews.editDate === null ? "Redakə edilməyib" : <span> {singlenews.editDate.slice(0, 10)} <span className='create-hour'>{singlenews.editDate.slice(11, 16)}</span></span>}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/administrative/news/editnews/${slugify(singlenews.title, { lower: true })}`} className="edit-btn"><FiEdit /></Link>
                        <button className="delete-btn" onClick={() => handleDeleteNews(singlenews.id)}><IoTrashBin /></button>
                      </div>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>))}
      {totalPages > 1 && filteredNews.length !== 0 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <MdOutlineKeyboardArrowLeft />
          </button>

          <div className="numbers">
            {generatePaginationNumbers(totalPages, currentPage).map((page, index) => (
              page === "..." ? (
                <span key={index} className="dots">...</span>
              ) : (
                <span
                  key={index}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </span>
              )
            ))}
          </div>

          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminNews