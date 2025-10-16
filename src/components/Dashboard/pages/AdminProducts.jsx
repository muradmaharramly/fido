import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go'
import { IoTrashBin } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../../tools/request/fetchProducts';
import PreLoader from '../../PreLoader';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { SlRefresh } from 'react-icons/sl';
import { PiEmpty } from 'react-icons/pi';
import Swal from 'sweetalert2';
import { supabase } from '../../../services/supabaseClient';
import slugify from 'slugify';

const AdminProducts = () => {
  const { products, productCount, loading, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <PreLoader />;

  if (error) return <p>Xəta baş verdi: {error}</p>;

  if (!products) return <p>Məhsul tapılmadı!</p>;

  const filteredProducts = products.filter((product) =>
    [product.title, product.category, product.productCode].some((field) =>
      String(field || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil((filteredProducts.length !== 0 ? filteredProducts.length : productCount) / productPerPage);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);



  const resetFilter = () => {
    setSearchTerm('');
  };

  const handleDeleteProduct = async (id) => {

    Swal.fire({
      title: "Əminsiniz?",
      text: "Bu məhsulu sildikdən sonra geri qaytara bilməyəcəksiniz!",
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
          .from("products")
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
          text: "Məhsul uğurla silindi!",
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
    <div className='admin-products'>
      <div className='page-head'>
        <h3>Məhsullar <span className='count'>({filteredProducts.length > 0 ? filteredProducts.length : (filteredProducts.length === 0 ? 0 : productCount)} ədəd)</span></h3>
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
          <Link to="/administrative/products/addproduct">Əlavə et <GoPlus /></Link>
        </div>
      </div>
      { productCount === 0 ? (<div className='empty-area'>
          <div className='icon'><PiEmpty /></div>
          <p>Hal-hazırda məhsul yoxdur.</p>
        </div>) : (filteredProducts.length === 0 ? (
        <div className='empty-area'>
          <div className='icon'><PiEmpty /></div>
          <p>Uyğun məhsul tapılmadı.</p>
          <button className='reset-btn' onClick={resetFilter}><SlRefresh /> Axtarışı sıfırla</button>
        </div>
      ) : (

        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Şəkil</th>
                <th>Başlıq</th>
                <th>Qiymət</th>
                <th>Endirim</th>
                <th>Kateqoriya</th>
                <th>Reytinq</th>
                <th>Say</th>
                <th>Kod</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>

            <tbody>
              {searchTerm.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.productCode}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="image-container">
                        {[product.image1, product.image2, product.image3]
                          .filter(Boolean)
                          .map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`${product.title} ${index + 1}`}
                              className="product-image"
                            />
                          ))}
                      </div>
                    </td>

                    <td>{product.title.substring(0, 20)}...</td>
                    <td className='price'>{product.discount > 0 && <p className="old-price">{product.price}₼</p>}
                      <p className="current-price">
                        {(product.price - (product.price * product.discount) / 100).toFixed(2)}₼
                      </p></td>
                    <td>{product.discount}%</td>
                    <td>{product.category}</td>
                    <td>{product.rating}</td>
                    <td>{product.count}</td>
                    <td>{product.productCode}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/administrative/products/editproduct/${slugify(product.title, { lower: true })}`} className="edit-btn"><FiEdit /></Link>
                        <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}><IoTrashBin /></button>
                      </div>

                    </td>
                  </tr>
                ))

              ) : (
                currentProducts.map((product, index) => (
                  <tr key={product.productCode}>
                    <td>{(currentPage - 1) * 6 + index + 1}</td>
                    <td>
                      <div className="image-container">
                        {[product.image1, product.image2, product.image3]
                          .filter(Boolean)
                          .map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`${product.title} ${index + 1}`}
                              className="product-image"
                            />
                          ))}
                      </div>
                    </td>

                    <td>{product.title.substring(0, 20)}...</td>
                    <td className='price'>{product.discount > 0 && <p className="old-price">{product.price}₼</p>}
                      <p className="current-price">
                        {(product.price - (product.price * product.discount) / 100).toFixed(2)}₼
                      </p></td>
                    <td>{product.discount}%</td>
                    <td>{product.category}</td>
                    <td>{product.rating}</td>
                    <td>{product.count}</td>
                    <td>{product.productCode}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/administrative/products/editproduct/${slugify(product.title, { lower: true })}`} className="edit-btn"><FiEdit /></Link>
                        <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}><IoTrashBin /></button>
                      </div>

                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>
      ))}
      {totalPages > 1 && filteredProducts.length !== 0 && (
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

export default AdminProducts