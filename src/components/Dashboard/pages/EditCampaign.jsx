import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import PreLoader from '../../PreLoader';
import slugify from 'slugify';
import { fetchNews } from '../../../tools/request/fetchNews';
import { editCampaign } from '../../../tools/actions/campaignActions';
import CampaignForm from '../elements/CampaignForm';

const EditCampaign = () => {
    const { slug } = useParams();  
    const [campaign, setCampaign] = useState(null); 
    const { campaigns, loading, error } = useSelector((state) => state.campaigns);
    const dispatch = useDispatch();

    useEffect(() => {
        if (campaigns.length === 0) {
            fetchNews(); 
        }
    }, [campaigns.length]);

    useEffect(() => {
        if (campaigns.length > 0) {
            const foundCampaign = campaigns.find(
                (p) => slugify(p.title, { lower: true }) === slug
            );
            setCampaign(foundCampaign || null); 
        }
    }, [slug, campaigns]);  

    if (loading) return <PreLoader />;
    if (error) return <p>Xəta: {error}</p>;

    if (!campaign) {
        return <div>Kampaniya tapılmadı</div>; 
    }

    const handleEditCampaign = (updatedCampaign) => {
        editCampaign(updatedCampaign); 
    };

    return (
        <div className='edit-campaign'>
            <div className='page-head'>
                <h3>Kampaniya redaktə et</h3>
                <Link to="/administrative/campaigns"> Kampaniyalara bax</Link>
            </div>
            <CampaignForm 
                isEditMode={true}  
                existingCampaign={campaign} 
                onSubmit={handleEditCampaign}  
            />
        </div>
    );
}

export default EditCampaign;
