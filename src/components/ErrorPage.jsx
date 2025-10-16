import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({error}) => {
  return (
    <div className='error-page'>
    <div className='container'>
        <h1>Xəta</h1>
        <h2>{error}</h2>
        <div className='btns'>
            <Link onClick={() => window.history.back()}>Geriyə</Link>
            <Link to="/">Ana səhifə</Link>
        </div>
    </div>

    </div>
  )
}

export default ErrorPage