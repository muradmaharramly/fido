import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import PreLoader from '../../PreLoader';
import slugify from 'slugify';
import { fetchAdministrators } from '../../../tools/request/fetchAdministrators';
import { editAdministrator } from '../../../tools/actions/administratorActions';
import AdministratorForm from '../elements/AdministratorForm';

const EditAdministrator = () => {
    const { slug } = useParams();  
    const [admin, setAdmin] = useState(null); 
    const { administrators, loading, error } = useSelector((state) => state.administrators);
    const dispatch = useDispatch();

    useEffect(() => {
        if (administrators.length === 0) {
            fetchAdministrators(); 
        }
    }, [administrators.length]);

    useEffect(() => {
        if (administrators.length > 0) {
            const foundAdmin = administrators.find(
                (p) => slugify(p.email, { lower: true }) === slug
            );
            setAdmin(foundAdmin || null); 
        }
    }, [slug, administrators]);  

    if (loading) return <PreLoader />;
    if (error) return <p>Xəta: {error}</p>;

    if (!admin) {
        return <div>Administrator tapılmadı</div>; 
    }

    const handleEditAdministrator = (updatedAdministrator) => {
        editAdministrator(updatedAdministrator); 
    };

    return (
        <div className='edit-administrator'>
            <div className='page-head'>
                <h3>Administrator redaktə et</h3>
                <Link to="/administrative/administrators"> Administratorlara bax</Link>
            </div>
            <AdministratorForm 
                isEditMode={true}  
                existingAdmin={admin} 
                onSubmit={handleEditAdministrator}  
            />
        </div>
    );
}

export default EditAdministrator;
