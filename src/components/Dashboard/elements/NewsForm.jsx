import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabaseClient';
import Swal from 'sweetalert2';
import { IoText } from 'react-icons/io5';
import { LuLetterText, LuLink } from 'react-icons/lu';
import { GrFormView } from 'react-icons/gr';

const categories = ["Xəbər", "Bloq", "Tanıtım"];

const NewsForm = ({ existingNews = null, isEditMode = false }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImageLink] = useState('');
    const [viewCount, setViewCount] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && existingNews) {
            setTitle(existingNews.title || '');
            setDescription(existingNews.description || '');
            setCategory(existingNews.category || '');
            setImageLink(existingNews.image || '');
            setViewCount(existingNews.viewCount?.toString() || '');
        }
    }, [isEditMode, existingNews]);

    const validateForm = async () => {
        const newErrors = {};
        let isValid = true;

        setErrors({});

        if (!title.trim()) {
            newErrors.title = 'Başlıq boş ola bilməz';
            isValid = false;
        } else if (!isEditMode) {
            const { data: existingTitle } = await supabase
                .from('news')
                .select('title')
                .eq('title', title);
            if (existingTitle && existingTitle.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Xəta!',
                    text: 'Bu xəbər artıq mövcuddur!',
                    customClass: {
                        popup: "custom-swal-popup",
                        title: "custom-swal-title",
                        content: "custom-swal-text"
                    }
                });
                isValid = false;
            }
        }

        if (!category) {
            newErrors.category = 'Kateqoriya seçin';
            isValid = false;
        }

        if (!image.trim()) {
            newErrors.image = 'Şəkil linki boş ola bilməz';
            isValid = false;
        } else if (!/^https?:\/\//.test(image)) {
            newErrors.image = 'Şəkil linki "http" və ya "https" ilə başlamalıdır';
            isValid = false;
        }

        const parsedViewCount = parseInt(viewCount, 10);
        if (!viewCount.trim()) {
            newErrors.viewCount = 'Baxış sayı boş ola bilməz';
            isValid = false;
        } else if (isNaN(parsedViewCount) || parsedViewCount <= 0) {
            newErrors.viewCount = 'Baxış sayı müsbət tam ədəd olmalıdır';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) return;

        const currentDate = new Date().toISOString();
        const newsData = {
            title,
            description,
            category,
            image,
            viewCount: parseInt(viewCount, 10),
            editDate: isEditMode ? currentDate : null,
        };

        let result;
        if (isEditMode) {
            const { error } = await supabase
                .from('news')
                .update(newsData)
                .eq('id', existingNews.id);
            result = error ? { success: false, message: error.message } : { success: true };
        } else {
            const { error } = await supabase.from('news').insert([newsData]);
            result = error ? { success: false, message: error.message } : { success: true };
        }

        if (result.success) {
            Swal.fire({
                title: isEditMode ? 'Xəbər yeniləndi!' : 'Xəbər əlavə olundu!',
                text: 'Əməliyyat uğurla başa çatdı.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                navigate('/administrative/news');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Xəta!',
                text: result.message || 'Naməlum xəta baş verdi',
            });
        }
    };

    const handleCancel = () => {
        navigate('/administrative/news');
    };

    return (
        <div className="news-form">
            <form onSubmit={handleSubmit}>
                <div className="form-double">
                    <div className="form-group">
                        <label>Başlıq</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                        <IoText />
                    </div>
                    <div className="form-group">
                        <label>Şəkil linki</label>
                        <input type="text" value={image} onChange={(e) => setImageLink(e.target.value)} />
                        {errors.image && <span className="error-message">{errors.image}</span>}
                        <LuLink />
                    </div>
                </div>
                <div className="form-double">
                    <div className="form-group">
                        <label>Kateqoriya</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Kateqoriya seçin</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <span className="error-message">{errors.category}</span>}
                    </div>
                    <div className="form-group">
                        <label>Baxış sayı</label>
                        <input
                            type="text"
                            value={viewCount}
                            onChange={(e) => setViewCount(e.target.value)}
                        />
                        {errors.viewCount && <span className="error-message">{errors.viewCount}</span>}
                        <GrFormView />
                    </div>
                </div>
                <div className="form-first">
                    <div className="form-group">
                        <label>Açıqlama</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        <LuLetterText />
                    </div>
                </div>
                <div className="btns">
                    <button type="button" className="cancel-btn" onClick={handleCancel}>
                        Ləğv et
                    </button>
                    <button type="submit" className="submit-btn">
                        {isEditMode ? 'Yenilə' : 'Göndər'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewsForm;
