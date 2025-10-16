import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import CampaignCard from '../components/CampaignCard';
import { useSelector } from 'react-redux';
import PreLoader from '../components/PreLoader';
import { fetchCampaigns } from '../tools/request/fetchCampaigns';
import ErrorPage from '../components/ErrorPage';

const Campaigns = () => {
    const { campaigns, loading, error } = useSelector((state) => state.campaigns);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    if (loading) return <PreLoader />;
    if (error) return <p><ErrorPage error={ error } /></p>;

    const currentDate = new Date();
    
    const activeCampaigns = campaigns.filter((campaign) => {
        const endDate = new Date(campaign.endDate);
        return endDate >= currentDate && campaign.status === true;
    });
    
    const expiredCampaigns = campaigns.filter((campaign) => {
        const endDate = new Date(campaign.endDate);
        return endDate < currentDate;
    });

    const sortedActiveCampaigns = [...activeCampaigns].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    
    const sortedExpiredCampaigns = [...expiredCampaigns].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

    const topCampaign = sortedActiveCampaigns[0];

    const otherCampaigns = [
        ...sortedActiveCampaigns.slice(1),
        ...sortedExpiredCampaigns
    ];

    return (
        <div className='campaigns-page'>
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Kampaniyalar</span></div>
            <h2 className='page-title'><Link onClick={() => window.history.back()}><FaArrowLeft /></Link>Kampaniyalar</h2>
            <div className='top-campaign'>
                {topCampaign && <CampaignCard campaign={topCampaign} />}
            </div>
            <div className='other-campaigns'>
                {otherCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
        </div>
    );
};

export default Campaigns;
