import React from 'react';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='not-found-page'>
    <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>404</span></div>
    <div className='container'>
        <h1>404</h1>
        <h2>OOPSS!!! SƏHİFƏ TAPILMADI</h2>
        <div className='btns'>
            <Link onClick={() => window.history.back()}>Geriyə</Link>
            <Link to="/">Ana səhifə</Link>
        </div>
    </div>

    </div>
  )
}

export default NotFoundPage