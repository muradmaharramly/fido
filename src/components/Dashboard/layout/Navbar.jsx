import React, { useContext, useEffect, useState } from 'react';
import { FiSun } from 'react-icons/fi';
import { HiOutlineMoon } from 'react-icons/hi';
import { ThemeContext } from '../../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { IoLogOutOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdministrators } from '../../../tools/request/fetchAdministrators';
import { logoutAdmin } from '../../../tools/actions/administratorActions';

const Navbar = () => {
    const [theme, setTheme] = useContext(ThemeContext);
    const { administrators, loading, error } = useSelector((state) => state.administrators);
    const [currentUser, setCurrentUser] = useState(null);
    const dispatch = useDispatch();

    const changeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        const mainBody = document.querySelector("body");
        if (theme === "dark") {
            mainBody.classList.add("dark");
            mainBody.classList.remove("light");
        } else {
            mainBody.classList.add("light");
            mainBody.classList.remove("dark");
        }
    }, [theme]);

    useEffect(() => {
        fetchAdministrators();
    }, []);

    useEffect(() => {
        const adminEmail = localStorage.getItem('administratorEmail');
        if (administrators && adminEmail) {
            const user = administrators.find(admin => admin.email === adminEmail);
            setCurrentUser(user);
        }
    }, [administrators]);


    if (error) return <p>Xəta baş verdi: {error}</p>;

    const handleLogout = () => {
        localStorage.removeItem("administratorEmail");
        dispatch(logoutAdmin());
        window.location.href = "/administrative/auth/login";
    };

    return (
        <div className='admin-navbar'>
            <div className='left'>
                {currentUser ? (
                    <>
                        <h5>{currentUser.firstName} {currentUser.lastName}</h5>
                        <span className={`role ${currentUser.role.toLowerCase()}`}>{currentUser.role}</span>
                    </>
                ) : (
                    <p>Administrator tapılmadı!</p>
                )}
            </div>
            <div className='right'>
                <div className="mode-toggle" onClick={changeTheme}>
                    <div className={`toggle-round ${theme === "dark" ? "right" : "left"}`}></div>
                    <span role="button"><HiOutlineMoon /><FiSun /></span>
                </div>

                <Link to="/administrative/profile" className='user-icon'>
                    <FaUser />
                </Link>
                <button className='logout' onClick={handleLogout}><IoLogOutOutline /></button>
            </div>
        </div>
    );
}

export default Navbar;
