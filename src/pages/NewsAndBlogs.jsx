import React, { useEffect, useState } from 'react';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNews } from '../tools/request/fetchNews';
import NewsCard from '../components/NewsCard';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import PreLoader from '../components/PreLoader';
import NewsPageSlider from '../components/sliders/NewsPageSlider';
import { CgDanger } from 'react-icons/cg';

const NewsAndBlogs = () => {
    const { news, newsCount, loading, error } = useSelector((state) => state.news);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 6;

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <PreLoader />;
    if (error) return <p>Xəta: {error}</p>;

    const totalPages = Math.ceil(newsCount / newsPerPage);

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

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
        <div className="news-and-blogs-page">
  <div className="breadcrumb">
    <Link to="/">Ana səhifə</Link>
    <RiArrowRightDoubleFill />
    <span>Xəbərlər və bloqlar</span>
  </div>

  <h2>Bloq və xəbərlər</h2>

  {newsCount === 0 ? (
    <div className="blog-empty">
                    <div className="empty-icon"><CgDanger /></div>
                    <p>Hal-hazırda aktiv xəbər və ya bloq yoxdur.</p>
                    <span className="desc">Məhsullara baxmaq üçün ana səhifəyə keçid edə bilərsiniz.</span>
                    <Link to="/" className="back-home">Ana səhifə</Link>
                </div>
  ) : (
    <>
      <NewsPageSlider key={news.id} news={news} />

      <div className="news-list-con">
        <div className="area-head">
          <p>Xəbərlər</p>
          <h3>Ən son yeniliklər</h3>
        </div>

        <div className="page">
          <div className="news-list">
            {currentNews.map((singlenews) => (
              <NewsCard key={singlenews.id} singlenews={singlenews} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                <MdOutlineKeyboardArrowLeft />
              </button>

              <div className="numbers">
                {generatePaginationNumbers(totalPages, currentPage).map((page, index) =>
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
      </div>
    </>
  )}
</div>

    );
};

export default NewsAndBlogs;
