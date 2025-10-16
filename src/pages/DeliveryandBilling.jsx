import React, { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const DeliveryandBilling = () => {
    const [activeTab, setActiveTab] = useState("delivery");

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="delivery-billing-container">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Çatdırılma və ödəniş</span></div>
            <h1>Çatdırılma və ödəniş</h1>
            <div className="tabs">
                <button
                    className={activeTab === "delivery" ? "active" : ""}
                    onClick={() => setActiveTab("delivery")}
                >
                    ÇATDIRILMA
                </button>
                <button
                    className={activeTab === "billing" ? "active" : ""}
                    onClick={() => setActiveTab("billing")}
                >
                    ÖDƏNİŞ
                </button>
            </div>
            <div className="content-box">
                {activeTab === "delivery" ? (
                    <div className="items-div">
                        <div className="info-box">
                            <div className="text">
                                <h1>Mağazadan götür</h1>
                                <p>
                                    Sifarişinizi eyni gündə pərakəndə satış mağazalarımızdan əldə edə bilərsiniz.
                                    Unutmayın ki, məhsulun mağaza anbarında olub-olmaması operator tərəfindən təsdiqlənməlidir.
                                    Sifariş üçün veb-saytımız, sosial media səhifələrimiz və ya 143 qısa nömrəmiz aktivdir.
                                </p>
                                <a href="#">Mağazaları xəritədə baxın</a>
                            </div>
                            <div className="image-box">
                                <img src="https://img.b-e.az/media/delivery_and_payment_items/Ma%C4%9Fazadan_g%C3%B6t%C3%BCr.jpg" alt="Store Delivery" />
                            </div>
                        </div>
                        <div className="info-box">
                            <div className="image-box">
                                <img src="https://img.b-e.az/media/delivery_and_payment_items/%C3%9Cnvana_%C3%A7atd%C4%B1r%C4%B1lma_WCy1Wbt.jpg" alt="Store Delivery" />
                            </div>
                            <div className="text">
                                <h1>Ünvana çatdırılma</h1>
                                <p>
                                    Bakı, Sumqayıt, Xırdalan şəhərləri üçün <strong>kiçik ölçülü malların</strong> çatdırılması həftəiçi və həftəsonu saat 11:00-dan – 22:00-dək həyata keçirilir. Məhsulun dəyəri 50 AZN-dən çoxdursa, çatdırılma ödənişsizdir.
                                </p>
                                <p>Məhsul anbarda mövcud olduğu zaman və sifariş 13:00-dək edildikdə çatdırılma həmin gün həyata keçirilir. Əgər sifariş saat 13:00-dan sonra verilərsə, məhsul növbəti gün çatdırılır.

                                    Bakı, Sumqayıt, Xırdalan, Gəncə və Şəki şəhərləri üçün böyük ölçülü məhsulların çatdırılması həftəiçi və həftəsonu saat 12:00-dan – 22:00-dək həyata keçirilir. Məhsulun dəyə</p>
                                {isExpanded && (
                                    <div className="expanded-content">
                                        <div className="section">
                                            <p className="h6">Divanev məhsullarının çatdırılma qaydası:</p>
                                            <p>
                                                Çatdırılmaya Bakı, Sumqayıt, Xırdalan, Abşeron əraziləri daxildir, ÖDƏNİŞSİZdir.

                                                Çatdırılma məhsulun alındığı gündən etibarən 3 gün ərzində həyata keçirilir.

                                                Məhsular gün ərzində quraşdırılır.
                                            </p>
                                            <p className="h6">Bakı, Sumqayıt, Xırdalan</p>
                                            <p>
                                                Çatdırılma vaxtıKiçik ölçülü malların çatdırılması 11:00-dan 22:00-dək.
                                                Böyük ölçülü malların çatdırılması 12:00-dan 18:00-dək.
                                            </p>
                                            <p className="h6">Vacib məlumat!</p>
                                            <p>
                                                Bayramlar və ya böyük kampaniyalar zamanı çatdırılma müddəti dəyişə bilər.
                                                Çatdırılma vaxtını şirkət nümayəndəsi ilə dəqiqləşdirməyinizi tövsiyə edirik..

                                                Qiymәt <strong>50 yuxarı qiymətli mallar üçün - ödənişsiz
                                                    50 aşağı qiymətli mallar üçün - ödənişli, 3 azn</strong>
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <span className="toggle-text" onClick={toggleContent}>
                                    {isExpanded ? "Daha az oxu" : "Daha çox oxu"}
                                </span>
                            </div>
                        </div>
                        <div className="info-box">
                            <div className="text">
                                <h1>Təcili çatdırılma</h1>
                                <p>
                                    Bu xidməti mümkün qədər tez istifadəyə vermək üçün çalışırıq!
                                </p>
                            </div>
                            <div className="image-box">
                                <img src="https://img.b-e.az/media/delivery_and_payment_items/T%C9%99cili_%C3%A7atd%C4%B1r%C4%B1lma.jpg" alt="Store Delivery" />
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className="items-div">
                        <div className="info-box">
                            <div className="text">
                                <h1>Mağazadan götür</h1>
                                <p className="h6">Kuryer ilə çatdırılma</p>
                                <p>
                                    Kuryerlə çatdırılma zamanı həm onlayn, həm də bank terminalları vasitəsi ilə ödəniş edə, həmçinin kredit sənədləşməsi yolu ilə məhsulu əldə edə bilərsiniz.
                                    Ödəniş yalnız milli valyuta ilə qəbul edilir.
                                    ƏDV məhsulun və çatdırılma xidmətinin qiymətinə daxildir.
                                </p>
                                {isExpanded && (
                                    <div className="expanded-content">
                                        <div className="section">
                                            <p className="h6">Mağazadan təslim alma</p>
                                            <p>
                                                Kuryerlə çatdırılma zamanı həm onlayn, həm də bank terminalları vasitəsi ilə ödəniş edə, həmçinin kredit sənədləşməsi yolu ilə məhsulu əldə edə bilərsiniz.
                                                Ödəniş yalnız milli valyuta ilə qəbul edilir.
                                                ƏDV məhsulun və çatdırılma
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <span className="toggle-text" onClick={toggleContent}>
                                    {isExpanded ? "Daha az oxu" : "Daha çox oxu"}
                                </span>
                            </div>
                            <div className="image-box">
                                <img src="https://img.b-e.az/media/delivery_and_payment_items/%C3%87atd%C4%B1r%C4%B1lma_zaman%C4%B1_%C3%B6d%C9%99ni%C5%9F.jpg" alt="Store Delivery" />
                            </div>
                        </div>
                        <div className="info-box">
                            <div className="image-box">
                                <img src="https://img.b-e.az/media/delivery_and_payment_items/Hiss%C9%99-hiss%C9%99_%C3%B6d%C9%99ni%C5%9F.jpeg" alt="Store Delivery" />
                            </div>
                            <div className="text">
                                <h1>Hissə-hissə ödəniş</h1>
                                <p>
                                    Qiyməti 60 AZN-dən çox olan məhsulları hissə-hissə alışla əldə edə bilərsiniz. Məhsulları online saytımızdan sifariş edərək, 143 qısa nömrəmizə zəng edərək  və mağazalarımıza yaxınlaşaraq əldə edə bilərsiniz.
                                </p>
                                <p className="note">Sifarişin rəsmiləşdirilməsi zamanı xidmət haqqı əlavə oluna bilər.</p>
                                <p className="note">Qeyd: Şəxsiyyət vəsiqənizin üzərinizdə olmağı mütləqdir!</p>
                                <Link to="/loan-purchase">Nisyə alışın şərtləri</Link>
                            </div>
                        </div>
                        <div className="info-box">
                            <div className="text">
                                <h1>Onlayn ödəniş</h1>
                                <p>
                                    Onlayn ödəniş üçün Visa və MasterCard ödəniş kartlarından istifadə edə bilərsiniz.
                                    Sifariş verərkən mövcud ödəniş üsullarına daxil olun, <strong>“Bank kartları ilə ödəniş”</strong> bölməsini seçin və sifarişinizi təsdiqləyin.
                                </p>
                            </div>
                            <div className="image-box">
                                <img src="https://img.b-e.az/media/delivery_and_payment_items/%C3%87atd%C4%B1r%C4%B1lma_zaman%C4%B1_%C3%B6d%C9%99ni%C5%9F.jpg" alt="Store Delivery" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeliveryandBilling;