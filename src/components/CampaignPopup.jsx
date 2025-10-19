import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchCampaigns } from "../tools/request/fetchCampaigns";
import PreLoader from "./PreLoader";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

const CampaignPopup = () => {
    const { campaigns, loading, error } = useSelector((state) => state.campaigns);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("hasSeenPromoPopup");
        const lastSeenTime = localStorage.getItem("promoPopupLastSeen");
        const currentTime = new Date().getTime();

        if (!hasSeenPopup || (lastSeenTime && currentTime - lastSeenTime > 24 * 60 * 60 * 1000)) {
            setIsVisible(true);
            localStorage.setItem("hasSeenPromoPopup", "true");
            localStorage.setItem("promoPopupLastSeen", currentTime.toString());
        }
    }, []);


    useEffect(() => {
        fetchCampaigns();
    }, []);

    if (error) return <p><ErrorPage error={error} /></p>;

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

    const topCampaign = sortedActiveCampaigns.length > 0 ? sortedActiveCampaigns[0] : null;

    if (!topCampaign) return null;


    const aylar = [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "İyun",
        "İyul",
        "Avqust",
        "Sentyabr",
        "Oktyabr",
        "Noyabr",
        "Dekabr"
    ];

    const startDate = new Date(topCampaign.startDate);
    const endDate = new Date(topCampaign.endDate);

    const startDay = startDate.getDate();
    const startMonth = aylar[startDate.getMonth()];

    const endDay = endDate.getDate();
    const endMonth = aylar[endDate.getMonth()];

    return (
        isVisible && (
            <div className="promo-popup">
                <div className="popup-content">
                    <button className="close-btn" onClick={() => setIsVisible(false)}>
                        <IoClose />
                    </button>
                    <div className="promo-image">
                        <img src={topCampaign.image} alt={topCampaign.title} />
                    </div>
                    <div className="promo-text">
                        <div><p className="date">{startDay} {startMonth} - {endDay} {endMonth}</p>
                            <h2>
                                {topCampaign.title.length > 30
                                    ? `${topCampaign.title.substring(0, 30)}...`
                                    : topCampaign.title}
                            </h2></div>
                        <Link to={`/campaigns/${slugify(topCampaign.title, { lower: true })}`} onClick={() => setIsVisible(false)} className="details-btn">Daha ətraflı<IoIosArrowForward />
                        </Link>
                    </div>
                </div>
            </div>
        )
    );
};

export default CampaignPopup;
