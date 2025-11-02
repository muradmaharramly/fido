import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabaseClient';
import Swal from 'sweetalert2';
import { IoText } from 'react-icons/io5';
import { LuLetterText } from 'react-icons/lu';
import { uploadImage } from "../../../services/supabaseClient";
import { FiUploadCloud } from 'react-icons/fi';

const CampaignForm = ({ existingCampaign, isEditMode }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [image, setImageLink] = useState('');
    const [status, setStatus] = useState(true);
    const [errors, setErrors] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && existingCampaign) {
            setTitle(existingCampaign.title);
            setDescription(existingCampaign.description);
            setImageLink(existingCampaign.image);
            setStartDate(existingCampaign.startDate ? existingCampaign.startDate.split('T')[0] : '');
            setEndDate(existingCampaign.endDate ? existingCampaign.endDate.split('T')[0] : '');
            setStatus(existingCampaign.status);
            setImageLoaded(true); // edit rejimində şəkil dərhal görünür
        }
    }, [isEditMode, existingCampaign]);

    const handleImageUpload = async (file) => {
        try {
            setImageLink(null);
            setUploadProgress(0);
            setImageLoaded(false);

            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                setUploadProgress(progress);
                if (progress >= 100) clearInterval(interval);
            }, 30);

            const url = await uploadImage(file, "campaigns");
            setImageLink(url);

            const img = new Image();
            img.src = url;
            img.onload = () => {
                setImageLoaded(true);
            };
        } catch (error) {
            console.error("Image upload error:", error.message);
            setUploadProgress(0);
        }
    };

    const validateForm = async () => {
        let isValid = true;
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = 'Başlıq boş ola bilməz';
            isValid = false;
        }

        if (!image.trim()) {
            newErrors.image = 'Şəkil boş ola bilməz';
            isValid = false;
        }

        if (!startDate.trim()) {
            newErrors.startDate = 'Başlama tarixi boş ola bilməz';
            isValid = false;
        }

        if (!endDate.trim()) {
            newErrors.endDate = 'Bitmə tarixi boş ola bilməz';
            isValid = false;
        }

        const currentDate = new Date().toISOString().split('T')[0];
        if (status && endDate < currentDate) {
            newErrors.status = 'Aktiv status üçün bitmə tarixi gələcək olmalıdır';
            isValid = false;
        }

        if (startDate && endDate && startDate > endDate) {
            newErrors.status = 'Başlama tarixi bitmə tarixindən əvvəl olmalıdır';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = await validateForm();
        if (!valid) return;

        const campaignData = { title, description, image, status, startDate, endDate };
        let result;

        if (isEditMode) {
            const { error } = await supabase.from('campaigns').update(campaignData).eq('id', existingCampaign.id);
            result = error ? { success: false, message: error.message } : { success: true };
        } else {
            const { error } = await supabase.from('campaigns').insert([campaignData]);
            result = error ? { success: false, message: error.message } : { success: true };
        }

        if (result.success) {
            Swal.fire({
                title: isEditMode ? 'Kampaniya yeniləndi!' : 'Kampaniya əlavə olundu!',
                text: 'Əməliyyat uğurla başa çatdı.',
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => navigate('/administrative/campaigns'));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Xəta!',
                text: result.message,
            });
        }
    };

    const handleCancel = () => navigate('/administrative/campaigns');

    return (
        <div className="campaign-form">
            <form onSubmit={handleSubmit}>
                <div className="form-double">
                    <div className="form-group">
                        <label>Başlıq</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                        <IoText />
                    </div>

                    <div className="form-group">
                        <label>Şəkil yüklə</label>
                        <div className="custom-file-upload">
                            <input
                                type="file"
                                id="file-img"
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                            />
                            <label htmlFor="file-img">
                                {!imageLoaded && uploadProgress > 0 ? (
                                    <div className="progress-box">
                                        <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                ) : image ? (
                                    <img src={image} alt="preview" className="preview-img" />
                                ) : (
                                    <span><FiUploadCloud /></span>
                                )}
                            </label>
                        </div>
                        {errors.image && <span className="error-message">{errors.image}</span>}
                    </div>
                </div>

                <div className='form-first'>
                    <div className="form-group">
                        <label>Açıqlama</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        <LuLetterText />
                    </div>
                </div>

                <div className="form-triple">
                    <div className="form-group">
                        <label>Başlama tarixi</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        {errors.startDate && <span className="error-message">{errors.startDate}</span>}
                    </div>
                    <div className="form-group">
                        <label>Bitmə tarixi</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        {errors.endDate && <span className="error-message">{errors.endDate}</span>}
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select value={status ? "TRUE" : "FALSE"} onChange={(e) => setStatus(e.target.value === "TRUE")}>
                            <option value="TRUE">Aktiv</option>
                            <option value="FALSE">Deaktiv</option>
                        </select>
                        {errors.status && <span className="error-message">{errors.status}</span>}
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

export default CampaignForm;
