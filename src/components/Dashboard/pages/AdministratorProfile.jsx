import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, logoutAdmin } from "../../../tools/actions/administratorActions";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash, FaRegUser, FaUsersViewfinder } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings, MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const AdministratorProfile = () => {
    const dispatch = useDispatch();
    const { administrators } = useSelector((state) => state.administrators);
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        fin: "",
        phoneNumber: "",
        password: ""
    });

    useEffect(() => {
        const administratorEmail = localStorage.getItem("administratorEmail");
        const administrator = administrators.find(admin => admin.email === administratorEmail);

        if (administrator) {
            setFormData({
                firstName: administrator.firstName,
                lastName: administrator.lastName,
                role: administrator.role,
                email: administrator.email,
                fin: administrator.fin,
                phoneNumber: administrator.phoneNumber,
                password: ""
            });
        }
    }, [administrators]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        dispatch(updateUserProfile(formData));
        setIsEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("administratorEmail");
        dispatch(logoutAdmin());
        window.location.href = "/administrative/auth/login";
    };

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <div className="administrator-profile">
            <div className="page-head"><h3>Administrator Profil</h3><button className="logout-btn" onClick={handleLogout}>Çıxış et <IoLogOutOutline /></button></div>
            <div className="profile-info">
                <div className="form-triple">
                    <div className="form-group">
                        <label>Ad</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} readOnly={!isEditing} />
                        <FaRegUser />
                    </div>
                    <div className="form-group">
                        <label>Soyad</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} readOnly={!isEditing} />
                        <FaRegUser />
                    </div>
                    {!isEditing && (
                        <div className="form-group">
                            <label>Rol</label>
                            <input type="text" name="role" value={formData.role} readOnly />
                            <MdOutlineAdminPanelSettings />
                        </div>
                    )}
                </div>
                <div className="form-quater">
                    {!isEditing && (
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} readOnly />
                            <MdOutlineEmail />
                        </div>
                    )}
                    {!isEditing && (
                        <div className="form-group">
                            <label>FIN</label>
                            <input type="text" name="fin" value={formData.fin} readOnly />
                            <FaUsersViewfinder />
                        </div>
                    )}

                    {isEditing && (
                        <div className="form-group">
                            <label>Şifrə</label>
                            <input type={isPasswordVisible ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} />
                            <button className='pass-hider' type='button' onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    )}
                    <div className="form-group">
                        <label>Tel</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} readOnly={!isEditing} />
                        <FiPhone />
                    </div>

                </div>
            </div>

            <div className="profile-actions">
                {isEditing ? (
                    <button className="save-btn" onClick={handleSave}>Yadda saxla</button>
                ) : (
                    <button className="edit-btn" onClick={handleEdit}>Redaktə et</button>
                )}
                {isEditing &&
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Ləğv et</button>}
            </div>
        </div>
    );
};

export default AdministratorProfile;
