import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go'
import { IoTrashBin } from 'react-icons/io5';
import { Link } from 'react-router-dom'
import { fetchCampaigns } from '../../../tools/request/fetchCampaigns';
import { useSelector } from 'react-redux';
import PreLoader from '../../PreLoader';
import { PiEmpty } from 'react-icons/pi';
import { SlRefresh } from 'react-icons/sl';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { supabase } from '../../../services/supabaseClient';
import Swal from 'sweetalert2';
import slugify from 'slugify';

const AdminCampaigns = () => {
  const { campaigns, campaignCount, loading, error } = useSelector((state) => state.campaigns);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) return <PreLoader />;

  if (error) return <p>Xəta baş verdi: {error}</p>;

  if (!campaigns) return <p>Kampaniya tapılmadı!</p>;

  const getStatus = (startDate, endDate, status) => {
    const currentDate = new Date();

    if (new Date(endDate) >= currentDate && !status) {
      return <span className='campaign-deactive'>Deaktiv edilib</span>;
    }

    return new Date(endDate) >= currentDate
      ? <span className='campaign-active'>Aktiv</span>
      : <span className='campaign-ended'>Müddəti bitib</span>;
  };


  const currentDate = new Date();

  const activeCampaigns = campaigns.filter((campaign) => {
    const endDate = new Date(campaign.endDate);
    return endDate >= currentDate && campaign.status === true;
  });

  const expiredCampaigns = campaigns.filter((campaign) => {
    const endDate = new Date(campaign.endDate);
    return endDate < currentDate || campaign.status === false;
  });

  const sortedActiveCampaigns = [...activeCampaigns].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

  const sortedExpiredCampaigns = [...expiredCampaigns].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));


  const sortedCampaigns = [
    ...sortedActiveCampaigns,
    ...sortedExpiredCampaigns
  ];

  const filteredCampaigns = campaigns.filter((campaign) =>
    [campaign.title, campaign.startDate, campaign.endDate, campaign.description].some((field) =>
      String(field || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil((filteredCampaigns.length !== 0 ? filteredCampaigns.length : campaignCount) / campaignPerPage);

  const indexOfLastCampaign = currentPage * campaignPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignPerPage;
  const currentCampaigns = sortedCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const resetFilter = () => {
    setSearchTerm('');
  };

  const handleDeleteCampaign = async (id) => {

    Swal.fire({
      title: "Əminsiniz?",
      text: "Bu kampaniyanı sildikdən sonra geri qaytara bilməyəcəksiniz!",
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
          .from("campaigns")
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
          text: "Kampaniya uğurla silindi!",
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
    <div className='admin-campaigns'>
      <div className='page-head'>
        <h3>Kampaniyalar <span className='count'>({filteredCampaigns.length > 0 ? filteredCampaigns.length : (filteredCampaigns.length === 0 ? 0 : campaignCount)} ədəd)</span></h3>
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
          <Link to="/administrative/campaigns/addcampaign" >Əlavə et <GoPlus /></Link>
        </div>
      </div>
      { campaignCount === 0 ? ( <div className='empty-area'>
          <div className='icon'><PiEmpty /></div>
          <p>Hal-hazırda kampaniya yoxdur.</p>
        </div>) : (filteredCampaigns.length === 0 ? (
        <div className='empty-area'>
          <div className='icon'><PiEmpty /></div>
          <p>Uyğun kampaniya tapılmadı.</p>
          <button className='reset-btn' onClick={resetFilter}><SlRefresh /> Axtarışı sıfırla</button>
        </div>
      ) : (
        <div className="table-container">
          <table className="campaign-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Şəkil</th>
                <th>Başlıq</th>
                <th>Açıqlama</th>
                <th>Başlama tarixi</th>
                <th>Bitiş tarixi</th>
                <th>Status</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {searchTerm.length > 0 ? (
                filteredCampaigns.map((campaign, index) => (
                  <tr key={campaign.id}>
                    <td>{index + 1}</td>
                    <td >
                      <div className="image-container"><img src={campaign.image} alt={campaign.title} className="campaign-image" /></div>

                    </td>
                    <td>{campaign.title.substring(0, 25)}...</td>
                    <td>
                      {campaign.description && campaign.description.trim() !== ""
                        ? `${campaign.description.substring(0, 40)}...`
                        : <span className='desc-none'>Başlıq yoxdur</span>}
                    </td>

                    <td>{campaign.startDate.slice(0, 10)}</td>
                    <td>{campaign.endDate.slice(0, 10)}</td>
                    <td>{getStatus(campaign.startDate, campaign.endDate, campaign.status)}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/administrative/campaigns/editcampaign/${slugify(campaign.title, { lower: true })}`} className="edit-btn"><FiEdit /></Link>
                        <button className="delete-btn" onClick={() => handleDeleteCampaign(campaign.id)}><IoTrashBin /></button>
                      </div>

                    </td>
                  </tr>
                ))
              ) : (
                currentCampaigns.map((campaign, index) => (
                  <tr key={campaign.id}>
                    <td>{(currentPage - 1) * 6 + index + 1}</td>
                    <td >
                      <div className="image-container"><img src={campaign.image} alt={campaign.title} className="campaign-image" /></div>

                    </td>
                    <td>{campaign.title.substring(0, 25)}...</td>
                    <td>
                      {campaign.description && campaign.description.trim() !== ""
                        ? `${campaign.description.substring(0, 40)}...`
                        : <span className='desc-none'>Başlıq yoxdur</span>}
                    </td>

                    <td>{campaign.startDate.slice(0, 10)}</td>
                    <td>{campaign.endDate.slice(0, 10)}</td>
                    <td>{getStatus(campaign.startDate, campaign.endDate, campaign.status)}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/administrative/campaigns/editcampaign/${slugify(campaign.title, { lower: true })}`} className="edit-btn"><FiEdit /></Link>
                        <button className="delete-btn" onClick={() => handleDeleteCampaign(campaign.id)}><IoTrashBin /></button>
                      </div>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>))}
      {totalPages > 1 && filteredCampaigns.length !== 0 && (
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

export default AdminCampaigns