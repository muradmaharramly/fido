import { Link, useParams } from "react-router-dom";
import { fetchCampaigns } from "../tools/request/fetchCampaigns";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PreLoader from "../components/PreLoader";
import slugify from "slugify";
import { FaArrowLeft } from "react-icons/fa6";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import Products from "./Products";
import { CgDanger } from "react-icons/cg";

const CampaignDetails = () => {
    const { slug } = useParams();
    const { campaigns, loading } = useSelector((state) => state.campaigns);
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        if (campaigns.length === 0) {
            fetchCampaigns();
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
    if (!campaign) return <div className="item-not-found">
            <div className="empty-icon"><CgDanger /></div>
            <p>Kampaniya tapılmadı</p>
            <span className="desc">Digər kampaniyalara baxmaq üçün kampaniyalar səhifəsinə keçid edə bilərsiniz.</span>
            <Link to="/" className="back-home">Ana səhifə</Link>
        </div>;

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

    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);

    const startDay = startDate.getDate();
    const startMonth = aylar[startDate.getMonth()];

    const endDay = endDate.getDate();
    const endMonth = aylar[endDate.getMonth()];

    return (
        <div className='campaign-details'>
            <h2 className='page-title'><Link onClick={() => window.history.back()}><FaArrowLeft /></Link>Kampaniyalar</h2>
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><Link to="/campaigns">Kampaniyalar</Link><RiArrowRightDoubleFill /><span>{campaign.title}</span></div>
            <div className='details-container'>
                <div className='img-div'>
                    <img src={campaign.image} alt={campaign.title} />
                </div>
                <span>{startDay} {startMonth} - {endDay} {endMonth}</span>
                <h1>{campaign.title}</h1>
                <p>{campaign.description}</p>
            </div>
            <Products />
        </div>
    )
}

export default CampaignDetails;
