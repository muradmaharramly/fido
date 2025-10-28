import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabaseClient';
import Swal from 'sweetalert2';
import { IoText } from 'react-icons/io5';
import { LuLetterText, LuLink } from 'react-icons/lu';
import { uploadImage } from "../../../services/supabaseClient";
import { FiUploadCloud } from 'react-icons/fi';

const CampaignForm = ({ existingCampaign, isEditMode }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [image, setImageLink] = useState('');
    const [status, setStatus] = useState(true);
    const [titleError, setTitleError] = useState('');
    const [imageError, setImageError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && existingCampaign) {
            setTitle(existingCampaign.title);
            setDescription(existingCampaign.description);
            setImageLink(existingCampaign.image);
            setStartDate(existingCampaign.startDate ? existingCampaign.startDate.split('T')[0] : '');
            setEndDate(existingCampaign.endDate ? existingCampaign.endDate.split('T')[0] : '');
            setStatus(existingCampaign.status);
        }
    }, [isEditMode, existingCampaign]);




    const handleImageUpload = async (file, setImage) => {
        try {
            const url = await uploadImage(file, "campaigns");
            setImage(url);
        } catch (error) {
            console.error("Image upload error:", error.message);
        }
    };


    const validateForm = async () => {
        let isValid = true;
        setTitleError('');
        setImageError('');
        setStatusError('');
        setStartDateError('');
        setEndDateError('');

        if (!isEditMode) {
            const { data: existingCampaigns } = await supabase
                .from('campaigns')
                .select('title')
                .eq('title', title);

            if (existingCampaigns && existingCampaigns.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Xəta!',
                    text: 'Bu kampaniya artıq mövcuddur!',
                    customClass: { popup: "custom-swal-popup", title: "custom-swal-title", content: "custom-swal-text" }
                });
                return false;
            }
        }

        if (!title.trim()) {
            setTitleError('Başlıq boş ola bilməz');
            isValid = false;
        }

        if (!image.trim()) {
            setImageError('Şəkil boş ola bilməz');
            isValid = false;
        }

        if (!startDate.trim()) {
            setStartDateError('Başlama tarixi boş ola bilməz');
            isValid = false;
        }

        if (!endDate.trim()) {
            setEndDateError('Bitmə tarixi boş ola bilməz');
            isValid = false;
        }

        const currentDate = new Date().toISOString().split('T')[0];
        if (status === 'TRUE' && endDate < currentDate) {
            setStatusError('Aktiv status üçün bitmə tarixi gələcək olmalıdır');
            isValid = false;
        }

        if (startDate && endDate && startDate > endDate) {
            setStatusError('Başlama tarixi bitmə tarixindən əvvəl olmalıdır');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = await validateForm();
        if (!valid) return;

        const campaignData = { title, description, image, status, startDate, endDate };

        let result;
        if (isEditMode) {
            const { error } = await supabase
                .from('campaigns')
                .update(campaignData)
                .eq('id', existingCampaign.id);
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
                showConfirmButton: false,
                customClass: { popup: "custom-swal-popup", title: "custom-swal-title", content: "custom-swal-text" }
            }).then(() => navigate('/administrative/campaigns'));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Xəta!',
                text: result.message,
                customClass: { popup: "custom-swal-popup", title: "custom-swal-title", content: "custom-swal-text" }
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
                        {titleError && <span className="error-message">{titleError}</span>}
                        <IoText />
                    </div>

                    <div className="form-group">
                        <label>Şəkil yüklə</label>
                        <div className="custom-file-upload">
                            <input
                                type="file"
                                id="file3"
                                onChange={(e) => handleImageUpload(e.target.files[0], setImageLink)}
                            />
                            <label htmlFor="file3">
                                {image ? (
                                    <img src={image} alt="preview" className="preview-img" />
                                ) : (
                                    <span><FiUploadCloud /></span>
                                )}
                            </label>
                        </div>
                        {imageError && <span className="error-message">{imageError}</span>}
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
                        {startDateError && <span className="error-message">{startDateError}</span>}
                    </div>
                    <div className="form-group">
                        <label>Bitmə tarixi</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        {endDateError && <span className="error-message">{endDateError}</span>}
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select value={status ? "TRUE" : "FALSE"} onChange={(e) => setStatus(e.target.value === "TRUE")}>
                            <option value="TRUE">Aktiv</option>
                            <option value="FALSE">Deaktiv</option>
                        </select>
                        {statusError && <span className="error-message">{statusError}</span>}
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
