import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabaseClient';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';
import { FaRegEye, FaRegEyeSlash, FaRegUser, FaUsersViewfinder } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { MdOutlineEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';

const AdministratorForm = ({ existingAdmin, isEditMode }) => {
    const { administrators } = useSelector((state) => state.administrators);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fin, setFin] = useState('');
    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const loggedInEmail = localStorage.getItem("administratorEmail");
    const loggedInAdmin = administrators.find(admin => admin.email === loggedInEmail);
    const loggedInRole = loggedInAdmin ? loggedInAdmin.role : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && existingAdmin) {
            setFirstName(existingAdmin.firstName);
            setLastName(existingAdmin.lastName);
            setEmail(existingAdmin.email);
            setRole(existingAdmin.role);
            setPhoneNumber(existingAdmin.phoneNumber || '');
            setFin(existingAdmin.fin || '');
        }
    }, [isEditMode, existingAdmin]);

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!firstName.trim()) newErrors.firstName = 'Ad boş ola bilməz';
        if (!lastName.trim()) newErrors.lastName = 'Soyad boş ola bilməz';
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Düzgün email daxil edin';
        if (!isEditMode && (!password || password.length < 8)) newErrors.password = 'Şifrə minimum 8 simvol olmalıdır';
        if (!role.trim()) newErrors.role = 'Rol seçilməlidir';
        if (phoneNumber && !/^[0-9]+$/.test(phoneNumber)) newErrors.phoneNumber = 'Telefon yalnız rəqəmlərdən ibarət olmalıdır';
        if (!fin.trim()) newErrors.fin = 'FIN boş ola bilməz';
        if (fin.length !== 7) newErrors.fin = "FIN-i doğru yazın"

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        let hashedPassword = password ? await bcrypt.hash(password, 10) : null;
        const adminData = { firstName, lastName, email, role, phoneNumber, fin };
        if (!isEditMode) adminData.password = hashedPassword;

        let result;
        if (isEditMode) {
            const { error } = await supabase.from('administrators').update(adminData).eq('id', existingAdmin.id);
            result = error ? { success: false, message: error.message } : { success: true };
        } else {
            const { error } = await supabase.from('administrators').insert([adminData]);
            result = error ? { success: false, message: error.message } : { success: true };
        }

        if (result.success) {
            Swal.fire({
                title: isEditMode ? 'Administrator yeniləndi!' : 'Administrator əlavə olundu!',
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
                navigate('/administrative/administrators');
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
        navigate('/administrative/administrators');
    };

    return (
        <div className="admin-user-form">
            <form onSubmit={handleSubmit}>
                <div className='form-triple'>
                    <div className='form-group'>
                        <label>Ad</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                        <FaRegUser />
                    </div>
                    <div className='form-group'>
                        <label>Soyad</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                        <FaRegUser />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                        <MdOutlineEmail />
                    </div>
                </div>
                <div className='form-quater'>
                    <div className='form-group'>
                        <label>Şifrə</label>
                        <input type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                        <button type='button' className='pass-hider' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>
                    <div className='form-group'>
                        <label>Rol</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Rol seçin</option>
                            {loggedInRole === "Superadmin" && <option value="Superadmin">Superadmin</option>}
                            {loggedInRole === "Superadmin" && <option value="Admin">Admin</option>}
                            <option value="Moderator">Moderator</option>
                        </select>
                        {errors.role && <p className="error-message">{errors.role}</p>}
                    </div>
                    <div className='form-group'>
                        <label>Telefon</label>
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                        <FiPhone />
                    </div>
                    <div className='form-group'>
                        <label>FIN</label>
                        <input type="text" value={fin} onChange={(e) => setFin(e.target.value)} />
                        {errors.fin && <p className="error-message">{errors.fin}</p>}
                        <FaUsersViewfinder />
                    </div>
                </div>
                <div className="btns">
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Ləğv et</button>
                    <button type="submit" className="submit-btn">
                        {isEditMode ? 'Yenilə' : 'Göndər'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdministratorForm;
