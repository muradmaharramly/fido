import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabaseClient';
import Swal from 'sweetalert2';
import { IoText } from 'react-icons/io5';
import { LuLink } from 'react-icons/lu';
import { BiDollar } from 'react-icons/bi';
import { TbDiscount, TbGridDots } from 'react-icons/tb';
import { RiStockLine } from 'react-icons/ri';
import { FaRegStar } from 'react-icons/fa';

const categories = ["Parfum", "Aksesuar", "Case", "Çanta"];

const ProductForm = ({ existingProduct, isEditMode }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');
    const [rating, setRating] = useState('');
    const [image1, setImage1Link] = useState('');
    const [image2, setImage2Link] = useState('');
    const [image3, setImage3Link] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [count, setStock] = useState('');
    const [composition, setComposition] = useState('');
    const [packaging, setPackaging] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [packagingError, setPackagingError] = useState('');
    const [ratingError, setRatingError] = useState('');
    const [imageError, setImageError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [discountError, setDiscountError] = useState('');
    const [countError, setCountError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && existingProduct) {
            setTitle(existingProduct.title);
            setDescription(existingProduct.description);
            setCategory(existingProduct.category);
            setGender(existingProduct.gender);
            setComposition(existingProduct.composition);
            setPackaging(existingProduct.packaging);
            setRating(existingProduct.rating);
            setImage1Link(existingProduct.image1);
            setImage2Link(existingProduct.image2);
            setImage3Link(existingProduct.image3);
            setPrice(existingProduct.price);
            setDiscount(existingProduct.discount);
            setStock(existingProduct.count);
        }
    }, [isEditMode, existingProduct]);

    const validateForm = async () => {
        let isValid = true;
        setTitleError('');
        setDescriptionError('');
        setRatingError('');
        setImageError('');
        setPriceError('');
        setDiscountError('');
        setCountError('');
        setCategoryError('');
        setPackagingError('');

        if (!isEditMode) {
            const { data: existingTitle, error } = await supabase
                .from('products')
                .select('title')
                .eq('title', title);

            if (existingTitle && existingTitle.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Xəta!',
                    text: 'Bu məhsul artıq mövcuddur!',
                    customClass: {
                        popup: "custom-swal-popup",
                        title: "custom-swal-title",
                        content: "custom-swal-text"
                    }
                });
                return false;
            }
        }

        if (!title.trim()) {
            setTitleError('Başlıq boş ola bilməz');
            isValid = false;
        }
        if (!description.trim()) {
            setDescriptionError('Açıqlama boş ola bilməz');
            isValid = false;
        }

        if (!category) {
            setCategoryError('Kateqoriya seçin');
            isValid = false;
        }

        if (!packaging) {
            setPackagingError('Cavab seçin');
            isValid = false;
        }

        if (rating === "" || rating === null || rating === undefined) {
            setRatingError("Reytinq boş ola bilməz");
            isValid = false;
        } else {
            const numericRating = parseFloat(rating);
            if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
                setRatingError("Reytinq 0-5 aralığında və yalnız bir onluq rəqəmlə ola bilər (məsələn: 3, 4.5)");
                isValid = false;
            } else {
                setRatingError("");
            }
        }



        if (image1 && !/^https?:\/\//.test(image1)) {
            setImageError('Şəkil linki "http" və ya "https" ilə başlamalıdır');
            isValid = false;
        } else if (!image1.trim()) {
            setImageError('Şəkil linki boş ola bilməz');
            isValid = false;
        }
        if (image2 && !/^https?:\/\//.test(image2)) {
            setImageError('Şəkil linki "http" və ya "https" ilə başlamalıdır');
            isValid = false;
        } else if (!image2.trim()) {
            setImageError('Şəkil linki boş ola bilməz');
            isValid = false;
        }
        if (image3 && !/^https?:\/\//.test(image3)) {
            setImageError('Şəkil linki "http" və ya "https" ilə başlamalıdır');
            isValid = false;
        } else if (!image3.trim()) {
            setImageError('Şəkil linki boş ola bilməz');
            isValid = false;
        }

        if (price && (isNaN(price) || parseFloat(price) <= 0)) {
            setPriceError('Qiymət müsbət bir rəqəm olmalıdır');
            isValid = false;
        } else if (!existingProduct && !price.trim()) {
            setPriceError('Qiymət boş ola bilməz');
            isValid = false;
        }

        if (discount && (isNaN(discount) || parseFloat(discount) < 0 || parseFloat(discount) > 100)) {
            setDiscountError('Endirim 0 ilə 100 arasında olmalıdır');
            isValid = false;
        } else if (!existingProduct && !discount.trim()) {
            setDiscountError('Endirim boş ola bilməz');
            isValid = false;
        }

        if (count && isNaN(count)) {
            setCountError('Stok sayı yalnız rəqəm olmalıdır');
            isValid = false;
        } else if (!existingProduct && !count.trim()) {
            setCountError('Stok sayı boş ola bilməz');
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) return;

        const productData = { title, category, rating, image1, image2, image3, price, discount, count, gender, composition, packaging, description };

        let result;
        if (isEditMode) {
            const { error } = await supabase
                .from('products')
                .update(productData)
                .eq('id', existingProduct.id);
            result = error ? { success: false, message: error.message } : { success: true };
        } else {
            const { error } = await supabase.from('products').insert([productData]);
            result = error ? { success: false, message: error.message } : { success: true };
        }

        if (result.success) {
            Swal.fire({
                title: isEditMode ? 'Məhsul yeniləndi!' : 'Məhsul əlavə olundu!',
                text: 'Əməliyyat uğurla başa çatdı.',
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: "custom-swal-popup",
                    title: "custom-swal-title",
                    content: "custom-swal-text"
                }
            }).then(() => {
                navigate('/administrative/products');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Xəta!',
                text: result.message,
                customClass: {
                    popup: "custom-swal-popup",
                    title: "custom-swal-title",
                    content: "custom-swal-text"
                }
            });
        }
    };

    const handleCancel = () => {
        navigate('/administrative/products');
    };

    return (
        <div className="product-form">
            <form onSubmit={handleSubmit}>
                <div className='form-double'>
                    <div className="form-group">
                        <label>Başlıq</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {titleError && <span className="error-message">{titleError}</span>}
                        <IoText />
                    </div>
                    <div className="form-group">
                        <label>Açıqlama</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        {descriptionError && <span className="error-message">{descriptionError}</span>}
                        <IoText />
                    </div>
                </div>
                <div className="form-triple">
                    <div className="form-group">
                        <label>1-ci şəkil linki</label>
                        <input type="text" value={image1} onChange={(e) => setImage1Link(e.target.value)} />
                        {imageError && <span className="error-message">{imageError}</span>}
                        <LuLink />
                    </div>
                    <div className="form-group">
                        <label>2-ci şəkil linki</label>
                        <input type="text" value={image2} onChange={(e) => setImage2Link(e.target.value)} />
                        {imageError && <span className="error-message">{imageError}</span>}
                        <LuLink />
                    </div>
                    <div className="form-group">
                        <label>3-cü şəkil linki</label>
                        <input type="text" value={image3} onChange={(e) => setImage3Link(e.target.value)} />
                        {imageError && <span className="error-message">{imageError}</span>}
                        <LuLink />
                    </div>
                </div>
                <div className="form-quater">
                    <div className="form-group">
                        <label>Reytinq</label>
                        <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
                        {ratingError && <span className="error-message">{ratingError}</span>}
                        <FaRegStar />
                    </div>
                    <div className="form-group">
                        <label>Qiymət <span>(Endirimsiz)</span></label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                        {priceError && <span className="error-message">{priceError}</span>}
                        <BiDollar />
                    </div>
                    <div className="form-group">
                        <label>Endirim faizi</label>
                        <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                        {discountError && <span className="error-message">{discountError}</span>}
                        <TbDiscount />
                    </div>
                    <div className="form-group">
                        <label>Stok sayı</label>
                        <input type="text" value={count} onChange={(e) => setStock(e.target.value)} />
                        {countError && <span className="error-message">{countError}</span>}
                        <RiStockLine />
                    </div>
                </div>
                <div className="form-triple">
                    <div className="form-group">
                        <label>Kateqoriya</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Kateqoriya seçin</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {categoryError && <span className="error-message">{categoryError}</span>}
                    </div>
                    <div className="form-group">
                        <label>Cins</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Cins seçin</option>
                            <option value="male">Kişi</option>
                            <option value="female">Qadın</option>
                            <option value="unisex">Unisex</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Material/Tərkib</label>
                        <input type="text" value={composition} onChange={(e) => setComposition(e.target.value)} />
                        <TbGridDots />
                    </div>
                    <div className="form-group">
                        <label>Paketləmə</label>
                        <select value={packaging} onChange={(e) => setPackaging(e.target.value)}>
                            <option value="">Cavab seçin</option>
                            <option value="TRUE">Var</option>
                            <option value="FALSE">Yoxdur</option>
                        </select>
                        {packagingError && <span className="error-message">{packagingError}</span>}
                    </div>
                </div>
                <div className="btns">
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Ləğv et</button>
                    <button type="submit" className="submit-btn">{isEditMode ? 'Yenilə' : 'Göndər'}</button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;