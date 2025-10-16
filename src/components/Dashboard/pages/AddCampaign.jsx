import React from 'react'
import { Link } from 'react-router-dom'
import { addNews } from '../../../tools/actions/newsActions';
import CampaignForm from '../elements/CampaignForm';

const AddCampaign = () => {

  const handleAddCampaign = (campaignData) => {
    addNews(campaignData);
  };
    return (
        <div className='add-campaign'>
            <div className='page-head'>
                <h3>Kampaniya əlavə et</h3>
                <Link to="/administrative/campaigns">Kampaniyalara bax</Link>
            </div>
            <CampaignForm isEditMode={false} onSubmit={handleAddCampaign} />
        </div>
    )
}

export default AddCampaign