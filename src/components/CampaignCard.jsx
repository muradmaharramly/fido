import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

const CampaignCard = ({ campaign }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
    });
    const [campaignStatus, setCampaignStatus] = useState(campaign.status);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const endDate = new Date(campaign.endDate);
            const now = new Date();
            const difference = endDate - now;

            if (difference <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                });
                if (campaignStatus !== false) {
                    updateCampaignStatus(campaign.id);
                }
                setCampaignStatus(false);
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

                setTimeLeft({
                    days,
                    hours,
                    minutes,
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 60000);

        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [campaign.endDate, campaignStatus]);

    const updateCampaignStatus = async (campaignId) => {
        try {
            const { data, error } = await supabase
                .from('campaigns')
                .update({ status: false })  
                .eq('id', campaignId); 

            if (error) throw error;
            console.log("Campaign status updated successfully:", data);
        } catch (error) {
            console.error("Error updating campaign status:", error.message);
        }
    };

    const formatTimeLeft = () => {
        const timeParts = [];

        if (timeLeft.days > 0) {
            timeParts.push(<p><span key="days">{timeLeft.days}</span> gün </p>);
        }
        if (timeLeft.hours > 0 || timeLeft.days > 0) {
            timeParts.push(<p><span key="hours">{timeLeft.hours}</span> saat</p>);
        }
        if (timeLeft.minutes > 0 || timeLeft.hours > 0 || timeLeft.days > 0) {
            timeParts.push(<p><span key="minutes">{timeLeft.minutes}</span> dəq</p>);
        }

        return timeParts;
    };

    return (
        <>
        {campaignStatus ? (
            <Link to={`/campaigns/${slugify(campaign.title, { lower: true })}`} className='campaign-card'>
                <div className='img-div'>
                    <div className="overlay">
                        <Link>
                            {formatTimeLeft()}
                        </Link>
                    </div>
                    <img src={campaign.image} alt={campaign.title} />
                </div>
                <h2>{campaign.title}</h2>
            </Link>
        ) : (
            <div className='campaign-card'>
                <div className='img-div'>
                    <div className="overlay">
                        <Link>
                           <span className='ended'>Müddəti bitib</span>
                        </Link>
                    </div>
                    <img src={campaign.image} alt={campaign.title} />
                </div>
                <h2>{campaign.title}</h2>
            </div>
        )}
        </>        
    );
};

export default CampaignCard;
