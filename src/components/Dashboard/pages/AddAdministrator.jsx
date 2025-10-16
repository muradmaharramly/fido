import React from 'react'
import { Link } from 'react-router-dom'
import AdministratorForm from '../elements/AdministratorForm';
import { addAdministrator } from '../../../tools/actions/administratorActions';

const AddAdministrator = () => {

  const handleAddAdministrator = (adminData) => {
    addAdministrator(adminData);
  };
    return (
        <div className='add-administrator'>
            <div className='page-head'>
                <h3>Administrator əlavə et</h3>
                <Link to="/administrative/administrators">Administratorlara bax</Link>
            </div>
            <AdministratorForm isEditMode={false} onSubmit={handleAddAdministrator} />
        </div>
    )
}

export default AddAdministrator