import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const brands = [
    { "id": 1, "name": "Tognana", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Ftognana.jpg&w=1920&q=75" },
    { "id": 2, "name": "Samsung", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FSamsung.jpg&w=1920&q=75" },
    { "id": 3, "name": "Apple", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fappleourtrust.png&w=1920&q=75" },
    { "id": 4, "name": "Divanev", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fdivanev.jpg&w=1920&q=75" },
    { "id": 5, "name": "Koopman International", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Flogo_b9z7ZVM.jpg&w=1920&q=75" },
    { "id": 6, "name": "HP", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FHP.jpg&w=1920&q=75" },
    { "id": 7, "name": "Cotton Box", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fcottonbox.jpg&w=1920&q=75" },
    { "id": 8, "name": "Xiaomi", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FXIAOMI.png&w=1920&q=75" },
    { "id": 9, "name": "Bosch", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fbosch.jpg&w=1920&q=75" },
    { "id": 10, "name": "Liqui Moly", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FLiqui_Moly.png&w=1920&q=75" },
    { "id": 11, "name": "Tefal", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Ftefal_nQ6dUE6.png&w=1920&q=75" },
    { "id": 12, "name": "Philips", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FPhilips.png&w=1920&q=75" },
    { "id": 13, "name": "NEVA", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Forig.jpg&w=1920&q=75" },
    { "id": 14, "name": "LG", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FLG.jpg&w=1920&q=75" },
    { "id": 15, "name": "Asus", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fasus.jpg&w=1920&q=75" },
    { "id": 16, "name": "WMF", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fwmf.jpg&w=1920&q=75" },
    { "id": 17, "name": "Panasonic", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FPanasonic_pXuIRVB.png&w=1920&q=75" },
    { "id": 18, "name": "Chicco", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fchicco.jpg&w=1920&q=75" },
    { "id": 19, "name": "Istanbul home collection", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Flogo_NA8S1kA.jpg&w=1920&q=75" },
    { "id": 20, "name": "Braun", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FBRAUN.png&w=1920&q=75" },
    { "id": 21, "name": "Joyroom", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FJoyroom.jpg&w=1920&q=75" },
    { "id": 22, "name": "Lenovo", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Flenovo.png&w=1920&q=75" },
    { "id": 23, "name": "Huawei", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FHUAWEI.jpg&w=1920&q=75" },
    { "id": 24, "name": "Zwiling", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FZwilling.jpeg&w=1920&q=75" },
    { "id": 25, "name": "Sony", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FSony.jpg&w=1920&q=75" },
    { "id": 26, "name": "Haier", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FHAIER.jpg&w=1920&q=75" },
    { "id": 27, "name": "Logitech", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FLOGITECH.png&w=1920&q=75" },
    { "id": 28, "name": "Nuovacer", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FNuovacer-Logo-2020.jpg&w=1920&q=75" },
    { "id": 29, "name": "Fakir", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FFakir-Logo.jpg&w=1920&q=75" },
    { "id": 30, "name": "Midea", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fmidea.jpg&w=1920&q=75" },
    { "id": 31, "name": "Gorenje", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FGorenje.jpg&w=1920&q=75" },
    { "id": 32, "name": "Trust", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FTrust.png&w=1920&q=75" }
];

const Brands = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const brandsPerPage = 16;

    const totalPages = Math.ceil(brands.length / brandsPerPage);

    const indexOfLastBrand = currentPage * brandsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
    const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

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
        <div className="brands-page">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Brendlər</span></div>
            <h2>Brendlər</h2>
            <div className="brands">
                {currentBrands.map((brand) => (
                    <div className="brand-card" key={brand.id}>
                        <img src={brand.logo} alt={brand.name} />
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
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
};

export default Brands;
