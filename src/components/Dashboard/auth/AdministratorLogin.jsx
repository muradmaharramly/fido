import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import bcrypt from 'bcryptjs';
import { supabase } from '../../../services/supabaseClient';
import { loginAdminSuccess, loginAdminFail } from '../../../tools/actions/administratorActions';

const AdministratorLogin = () => {
    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleEmailFocus = () => setIsEmailFocused(true);
    const handleEmailBlur = () => { if (!email) setIsEmailFocused(false); };
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handlePasswordFocus = () => setIsPasswordFocused(true);
    const handlePasswordBlur = () => { if (!password) setIsPasswordFocused(false); };
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase
            .from('administrators')
            .select('password')
            .eq('email', email)
            .single();

        if (error || !data) {
            setError('Email və ya şifrə səhvdir');
            return dispatch(loginAdminFail());
        }

        const isMatch = bcrypt.compareSync(password, data.password);
        if (!isMatch) {
            setError('Email və ya şifrə səhvdir');
            return dispatch(loginAdminFail());
        }

        dispatch(loginAdminSuccess(email));
        localStorage.setItem('administratorEmail', email);
        navigate('/administrative/dashboard');
    };

    return (
        <div className='admin-login'>
            {error && <div className="error-popup">{error}</div>}
            <div className='form-area'>
                <h1>Administrator Girişi</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            value={email}
                            onChange={handleEmailChange}
                            onFocus={handleEmailFocus}
                            onBlur={handleEmailBlur}
                            className='form-control'
                            required
                        />
                        <label className={isEmailFocused || email ? 'clicked' : ''}>Email</label>
                        <MdOutlineEmail />
                    </div>
                    <div className='form-group'>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                            className='form-control'
                            required
                        />
                        <label className={isPasswordFocused || password ? 'clicked' : ''}>Şifrə</label>
                        <button className='pass-hider' type='button' onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    <button className='submit-btn' type='submit'>Daxil ol</button>
                </form>
            </div>
        </div>
    );
};

export default AdministratorLogin;
