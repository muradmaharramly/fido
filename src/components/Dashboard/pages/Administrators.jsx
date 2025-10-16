import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go'
import { IoTrashBin } from 'react-icons/io5';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import PreLoader from '../../PreLoader';
import { PiEmpty } from 'react-icons/pi';
import { SlRefresh } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { fetchAdministrators } from '../../../tools/request/fetchAdministrators';
import slugify from 'slugify';
import { supabase } from '../../../services/supabaseClient';

const Administrators = () => {
  const { administrators, administratorCount, loading, error } = useSelector((state) => state.administrators);
  const [currentPage, setCurrentPage] = useState(1);
  const adminPerPage = 8;
  const [searchTerm, setSearchTerm] = useState("");
  const loggedInEmail = localStorage.getItem("administratorEmail");
  const loggedInAdmin = administrators.find(admin => admin.email === loggedInEmail);
  const loggedInRole = loggedInAdmin ? loggedInAdmin.role : null;

  useEffect(() => {
    fetchAdministrators();
  }, []);

  if (loading) return <PreLoader />;

  if (error) return <p>Xəta baş verdi: {error}</p>;

  if (!administrators) return <p>Administrator tapılmadı!</p>;

  const filteredAdministrators = administrators
    .filter(admin => admin.email !== loggedInEmail)
    .filter(administrator =>
      loggedInRole === "Admin"
        ? administrator.role === "Moderator"
        : loggedInRole === "Superadmin"
          ? true
          : administrator.role !== "Superadmin"
    )
    .filter(administrator =>
      [administrator.firstName, administrator.lastName, administrator.email, administrator.fin, administrator.phoneNumber]
        .some((field) => String(field || "").toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const sortedAdmins = [...filteredAdministrators].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const totalPages = Math.ceil((filteredAdministrators.length !== 0 ? filteredAdministrators.length : administratorCount) / adminPerPage);

  const indexOfLastUser = currentPage * adminPerPage;
  const indexOfFirstUser = indexOfLastUser - adminPerPage;
  const currentAdmins = sortedAdmins.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const resetFilter = () => {
    setSearchTerm('');
  };

  const handleDeleteAdmin = async (id) => {

    Swal.fire({
      title: "Əminsiniz?",
      text: "Bu administratoru sildikdən sonra geri qaytara bilməyəcəksiniz!",
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
          .from("administrators")
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
          text: "Administrator uğurla silindi!",
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
    <div className='administrators'>
      <div className='page-head'>
        <h3>Administrasiya</h3>
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
          <Link to="/administrative/administrators/addadministrator">Əlavə et <GoPlus /></Link>
        </div>
      </div>
      {filteredAdministrators.length === 0 ? (
        <div className='empty-area'>
          <div className='icon'><PiEmpty /></div>
          <p>Uyğun administrator tapılmadı.</p>
          <button className='reset-btn' onClick={resetFilter}><SlRefresh /> Axtarışı sıfırla</button>
        </div>
      ) : (
        <div className="table-container">
          <table className="administrator-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Rol</th>
                <th>Email</th>
                <th>Tel</th>
                <th>Fin</th>
                <th>Yaradılma tarixi</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {currentAdmins.map((administrator, index) => (
                <tr key={administrator.id}>
                  <td>{(currentPage - 1) * 8 + index + 1}</td>
                  <td>{administrator.firstName}</td>
                  <td>{administrator.lastName}</td>
                  <td>
                    <span className={`role ${administrator.role === "Moderator" ? "moderator" : administrator.role === "Superadmin" ? "superadmin" : "admin"}`}>
                      {administrator.role}
                    </span>
                  </td>
                  <td>{administrator.email}</td>
                  <td>{administrator.phoneNumber}</td>
                  <td>{administrator.fin}</td>
                  <td>{administrator.created_at.slice(0, 10)}<span className='create-hour'>{administrator.created_at.slice(11, 16)}</span></td>
                  <td>
                    <div className="actions">
                      <Link to={`/administrative/administrators/editadministrator/${slugify(administrator.email, { lower: true })}`} className="edit-btn"><FiEdit /></Link>
                      <button className="delete-btn" onClick={() => handleDeleteAdmin(administrator.id)}><IoTrashBin /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}
      {totalPages > 1 && filteredAdministrators.length !== 0 && (
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
  );
}

export default Administrators
