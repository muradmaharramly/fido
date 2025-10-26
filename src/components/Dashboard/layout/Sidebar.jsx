import React, { useEffect, useState } from 'react'
import { FaBoxesStacked, FaUsers } from 'react-icons/fa6'
import { HiNewspaper, HiViewGrid } from 'react-icons/hi'
import { IoIosArrowForward } from 'react-icons/io'
import { MdCampaign } from 'react-icons/md'
import { RiAdminFill, RiDashboard2Fill } from 'react-icons/ri'
import { TiThList } from 'react-icons/ti'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchAdministrators } from '../../../tools/request/fetchAdministrators'

const Sidebar = () => {
    const { administrators, loading, error } = useSelector((state) => state.administrators);
    const [currentUser, setCurrentUser] = useState(null);
    const [isGrid, setIsGrid] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleGrid = () => {
        setIsGrid(!isGrid);
    };
    const handleVisibility = () => {
        setIsVisible(!isVisible);
        setIsGrid(!isGrid);
    };
    const handleTab = () => {
        setIsVisible(!isVisible);
    };

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

    return (
        <div className={`admin-sidebar ${isGrid ? "list" : "grid"} ${isVisible ? "visible" : ""}`}>
            <button className='mobile-arrow' onClick={handleVisibility}><ion-icon name={isVisible ? "close-outline" : "menu-outline"}></ion-icon></button>
            <Link className='admin-logo' to="/administrative/dashboard">
                <h5>Fido Parfum & Accessories</h5>
            </Link>
            <div className='sidebar-list'>
                <button onClick={handleGrid}>{isGrid ? <HiViewGrid /> : <TiThList />}</button>
                <NavLink onClick={handleTab} to="/administrative/dashboard">
                    <div className='icon'><RiDashboard2Fill /></div><span>İdarə paneli</span><div className='arrow'><IoIosArrowForward /></div>
                </NavLink>
                <NavLink onClick={handleTab} to="/administrative/products">
                    <div className='icon'><FaBoxesStacked /></div><span>Məhsullar</span><div className='arrow'><IoIosArrowForward /></div>
                </NavLink>
                <NavLink onClick={handleTab} to="/administrative/news">
                    <div className='icon'><HiNewspaper /></div><span>Xəbərlər</span><div className='arrow'><IoIosArrowForward /></div>
                </NavLink>
                <NavLink onClick={handleTab} to="/administrative/campaigns">
                    <div className='icon'><MdCampaign /></div><span>Kampaniyalar</span><div className='arrow'><IoIosArrowForward /></div>
                </NavLink>
                {currentUser && currentUser.role !== "Moderator" && (
                    <Link onClick={handleTab} to="/administrative/administrators">
                        <div className='icon'><RiAdminFill /></div><span>Administrasiya</span><div className='arrow'><IoIosArrowForward /></div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
