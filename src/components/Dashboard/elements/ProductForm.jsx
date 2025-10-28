import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, uploadImage } from '../../../services/supabaseClient';
import Swal from 'sweetalert2';
import { IoText } from 'react-icons/io5';
import { BiDollar } from 'react-icons/bi';
import { TbDiscount, TbGridDots } from 'react-icons/tb';
import { RiStockLine } from 'react-icons/ri';
import { FaRegStar } from 'react-icons/fa';
import { CgSize } from 'react-icons/cg';

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
    const [count, setStock] = useState('');
    const [composition, setComposition] = useState('');
    const [packaging, setPackaging] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [packagingError, setPackagingError] = useState('');
    const [ratingError, setRatingError] = useState('');
    const [imageError, setImageError] = useState('');
    const [countError, setCountError] = useState('');
    const [variants, setVariants] = useState([{ size: '', price: '', discount: '' }]);
    const navigate = useNavigate();

    const handleImageUpload = async (file, setImage) => {
            try {
                const url = await uploadImage(file, "products");
                setImage(url);
                Swal.fire({
                    icon: "success",
                    title: "Şəkil yükləndi!",
                    timer: 1200,
                    showConfirmButton: false,
                    customClass: { popup: "custom-swal-popup", title: "custom-swal-title", content: "custom-swal-text" }
                });
            } catch (error) {
                console.error("Image upload error:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Xəta!",
                    text: error.message || "Şəkil yüklənmədi!",
                });
            }
        };

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
            setStock(existingProduct.count);
            setVariants(existingProduct.variants || [{ size: '', price: 0, discount: 0 }]);
        }
    }, [isEditMode, existingProduct]);

    const handleVariantChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = value;
        setVariants(updated);
    };

    const addVariant = () => setVariants([...variants, { size: "", price: "", discount: "" }]);
    const removeVariant = (index) => setVariants(variants.filter((_, i) => i !== index));

    const validateForm = async () => {
        let isValid = true;
        setTitleError('');
        setDescriptionError('');
        setRatingError('');
        setImageError('');
        setCountError('');
        setCategoryError('');
        setPackagingError('');

        if (!title.trim()) { setTitleError('Başlıq boş ola bilməz'); isValid = false; }
        if (!description.trim()) { setDescriptionError('Açıqlama boş ola bilməz'); isValid = false; }
        if (!category) { setCategoryError('Kateqoriya seçin'); isValid = false; }
        if (!packaging) { setPackagingError('Cavab seçin'); isValid = false; }
        if (!rating) { setRatingError("Reytinq boş ola bilməz"); isValid = false; }
        if (count && isNaN(count)) { setCountError('Stok sayı yalnız rəqəm olmalıdır'); isValid = false; }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (!isValid) return;

        const productData = { title, category, rating, image1, image2, image3, count, gender, composition, packaging, description, variants };

        let result;
        if (isEditMode) {
            const { error } = await supabase.from('products').update(productData).eq('id', existingProduct.id);
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
                customClass: { popup: "custom-swal-popup", title: "custom-swal-title", content: "custom-swal-text" }
            }).then(() => navigate('/administrative/products'));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Xəta!',
                text: result.message,
                customClass: { popup: "custom-swal-popup", title: "custom-swal-title", content: "custom-swal-text" }
            });
        }
    };

    const handleCancel = () => navigate('/administrative/products');

    return (
        <div className="product-form">
            <form onSubmit={handleSubmit}>
                <div className="form-triple">
                    <div className="form-group">
                        <label>1-ci şəkli yüklə</label>
                        <div className="custom-file-upload">
                            <input
                                type="file"
                                id="file1"
                                onChange={(e) => handleImageUpload(e.target.files[0], setImage1Link)}
                            />
                            <label htmlFor="file1">
                                {image1 ? (
                                    <img src={image1} alt="preview" className="preview-img" />
                                ) : (
                                    <span>Şəkil yüklə</span>
                                )}
                            </label>
                        </div>

                    </div>
                    <div className="form-group">
                        <label>2-ci şəkli yüklə</label>
                        <div className="custom-file-upload">
                            <input
                                type="file"
                                id="file2"
                                onChange={(e) => handleImageUpload(e.target.files[0], setImage2Link)}
                            />
                            <label htmlFor="file2">
                                {image2 ? (
                                    <img src={image2} alt="preview" className="preview-img" />
                                ) : (
                                    <span>Şəkil yüklə</span>
                                )}
                            </label>
                        </div>

                    </div>
                    <div className="form-group">
                        <label>3-cü şəkli yüklə</label>
                        <div className="custom-file-upload">
                            <input
                                type="file"
                                id="file3"
                                onChange={(e) => handleImageUpload(e.target.files[0], setImage3Link)}
                            />
                            <label htmlFor="file3">
                                {image3 ? (
                                    <img src={image3} alt="preview" className="preview-img" />
                                ) : (
                                    <span>Şəkil yüklə</span>
                                )}
                            </label>
                        </div>

                    </div>
                </div>
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
                    <div className="form-group">
                        <label>Reytinq</label>
                        <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
                        {ratingError && <span className="error-message">{ratingError}</span>}
                        <FaRegStar />
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

                {variants.map((v, i) => (
                    <div key={i} className='form-triple'>
                        <div className='form-group'>
                            <label>Ölçü</label>
                            <input
                                type="text"
                                value={v.size}
                                onChange={(e) => handleVariantChange(i, 'size', e.target.value)}
                            />
                            <CgSize />
                        </div>

                        <div className='form-group'>
                            <label>Qiymət</label>
                            <input
                                type="text"
                                value={v.price}
                                onChange={(e) => handleVariantChange(i, 'price', e.target.value)}
                            />
                            <BiDollar />
                        </div>

                        <div className='form-group'>
                            <label>Endirim (%)</label>
                            <input
                                type="text"
                                value={v.discount}
                                onChange={(e) => handleVariantChange(i, 'discount', e.target.value)}
                            />
                            <TbDiscount />
                        </div>

                        <button
                            type="button"
                            className="remove-variant"
                            onClick={() => removeVariant(i)}
                        >
                            Sil
                        </button>
                    </div>
                ))}

                <button type="button" className="add-variant" onClick={addVariant}>
                    Variant əlavə et
                </button>



                <div className="btns">
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Ləğv et</button>
                    <button type="submit" className="submit-btn">{isEditMode ? 'Yenilə' : 'Göndər'}</button>
                </div>
                ...
            </form>
        </div>
    );
};

export default ProductForm;
