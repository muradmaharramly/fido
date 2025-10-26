import React from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    const events = [
        {
            year: "1994",
            title: "1994 başlanğıc",
            description:
                "Bakı şəhərində 200 kv.m sahədə 500-dən çox məhsulun satışının təşkil edildiyi ilk həyəcanımız, ilk mağazamız fəaliyyətə başladı.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2FMileston1.jpg&w=256&q=100",
        },
        {
            year: "1995",
            title: "1995 Samsung Electronics",
            description:
                "İlk mağazanın fəaliyyətə başlamasından 1 il sonra uğurlarımızın sayı artmağa başladı. 1-ci ilimizdə 'Samsung Electronics'-in Azərbaycanda rəsmi distribütoru olduq.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2FSamsung.logo.png&w=256&q=100",
        },
        {
            year: "2000",
            title: "2000 Siemens Distribütor",
            description:
                "Sıralarımıza “Siemens” kimi daha bir qlobal şirkət qoşuldu.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2Fsiemens_logo.png&w=256&q=100",
        },
        {
            year: "2001",
            title: "2001 Yeni brendlər",
            description:
                "Yorulmadan uğurlara davam dedik və məişət texnikası istehsal edən “Groupe SEB” şirkətlər qrupunun “Tefal”, “Moulinex”, “Rowenta”, “Krups” kimi şirkətlərini distribütor sıralarımıza daxil etdik.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2Fbakuelectronics_logo.jpg&w=256&q=100",
        },
        {
            year: "2003",
            title: "2003 Samsung Mobile",
            description:
                "Samsung Electronics”-lə davam edən uğurlu distribütor fəaliyyətinin ardından bu dəfə “Samsung Mobile”-ı distribütor sıralarımıza daxil etdik.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2FSamsung_mobile.png&w=256&q=100",
        },
        {
            year: "2007",
            title: "2007 Groupe SEB",
            description:
                "Groupe SEB” şirkətlər qrupu ilə uğurlu fəaliyyətin nəticəsi - tava və qazan istehsalı edən İtalyan brendi “Lagostina”-nın rəsmi distribütoru olduq.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2Flagostina_logo.png&w=256&q=100",
        },
        {
            year: "2009",
            title: "2009 Yeni brendlər",
            description:
                "“Pyrex”,“Siemens Gigaset”, “Hama”,“Valera”, “Microplane”, “Moneta”, “Whirpool”, “Magic”, “Termikel”, “Ema”, “Thomas”, ”Agfa”, ”Sonorous”, ”Ultimate”,”Beem” markalarını da distribütor sıralarımıza daxil etdik.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2Fbakuelectronics_logo.jpg&w=256&q=100",
        },
        {
            year: "2010",
            title: "2010 Yeni brendlər",
            description:
                "Mağaza vitrinlərimizi “Zwilling”, “Staub”, “BSF” , ”Alfi”, “Canon”, “Bosch”, “Olympus” və “Glen Dimplex” kimi şirkətlərin məhsulları bəzəməyə başladı.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2Fbakuelectronics_logo.jpg&w=256&q=100",
        },
        {
            year: "2018",
            title: "2018 Ən böyük mağaza",
            description:
                "Ölkəmizin və Qafqazın ən böyük elektronika və məişət texnikası mağazası adına iddialı ola biləcək mağazamızı istifadənizə verdik. Hipermarket deyə sinifləndirə biləcəyimiz bu mağazamızda sadəcə elektronika ilə kifayətlənməyərək alıcılara velosipedlər, fərdi nəqliyyat vasitələri, evini zövqlə bəzəmək istəyən xanımlar üçün isə tekstil, qab-qacaq və dekor əşyalarını təklif etdik.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2FBAKU_ELECTRONICS_N%C6%8FR%C4%B0MANOV_logo.png&w=256&q=100",
        },
        {
            year: "2019",
            title: "2019 Yeni mağaza",
            description:
                "Lənkəran şəhərində yerləşən, sayca 15-ci olan mağazamızın açılış qürurunu yaşadıq.Çox keçmədi və əhatə zəncirimizə bir həlqə daha əlavə etdik. Yeni mağazamız Xaçmazda fəaliyyətə başladı. Olduğunuz hər yeri əhatə etməli idik. Etdik! Paytaxtdan 370 km uzaqda Şəki şəhərində yeni mağazamız ilə sizin xidmətinizə gəldik.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2FBaku_electronics_l%25C9%2599nkaran.png&w=256&q=100",
        },
        {
            year: "2020",
            title: "2020 Yeni mağaza",
            description:
                "Sizlərə daha yaxın olmaq üçün Şəkidə 2-ci mağazamızı xidmətinizə verdik. Digər bölgələrimizdən uzaq qalmamaq üçün Bərdə və Qubada, paytaxtda isə 28 may və Əhməd Rəcəblidə mağazalarımız fəaliyyətə başladı.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2F%25C5%259E%25C9%2599kid%25C9%2599.png&w=256&q=100",
        },
        {
            year: "2021",
            title: "2021 Yeni mağaza",
            description:
                "Əhatə zəncirimizi daha da genişləndirərək Gəncə və Şəmkirdə yeni filiallarımızı xidmətinizə verdik. İstəkləri və yüksək tələbləri nəzərə alaraq Lənkəran və Sumqayıtda ikinci, paytaxtda isə Ukrayna dairəsindəki yeni mağazamızın açılışını reallaşdırdıq.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2Fukraina_dair%25C9%2599si.png&w=256&q=100",
        },
        {
            year: "2022",
            title: "2022 Yeni mağaza",
            description:
                "Sizə hər nöqtədə, daha da yaxın ola bilmək üçün Nizami rayonu və Sumqayıt şəhərində yeni mağazalarımızı sizin xidmətinizə verdik! Daha geniş əhatədə sizə xidmət etmək üçün Neftçilər, Bərdə və Yeni Günəşli mağazalarını açdıq. Yeni konseptsual mağazamız Motoverse ilə sizi həyatın kefini sürməyə dəvət etdik. Arzulanan endirimlər üçün ilk \"Qırmızı Şənbə\" kampaniyasını təşkil etdik.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2Fbaku-electronics-sumqayit-2_1.png&w=256&q=100",
        },
        {
            year: "2023",
            title: "2023 Yeni mağaza",
            description:
                "Gənclik mağazamızın açılışı ilə aramızdakı məsafəni azaltdıq. İsmayıllı mağazamızı yenilədik, daha böyük və daha yaxşı mağaza ilə xidmətinizə gəldik. İlin ilk \"Qırmızı Şənbə\" kampaniyasını reallaşdırdıq. İçərisində elektronika, ev əşyaları və Yataş Group-a məxsus “Divanev” brendinin yer aldığı Hökməli mağazamız ilə yeni rahatlığa imza atdıq.",
            image: "https://new.bakuelectronics.az/_next/image?url=%2Fabout%2Fbaku-electronics-sumqayit-2_1.png&w=256&q=100",
        },
    ];
    return (
        <div className='about-us'>
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Bizim Haqqımızda</span></div>
            <h2>Haqqımızda</h2>
            <div className='img-area'>
                <img src='https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fabout_web%2F103161151_4025312704176424_3051590390235423213_n_4KgKxmI.jpg&w=1920&q=100' alt='Baku Electronics'></img>
            </div>
            <p className='caption'>Biz ölkənin ilk, Qafqazın isə ən böyük elektronika şəbəkələrindən biriyik. 1994-cü ildə müasir dünyanı müştərilərimizə əlçatan etmək, onlara keyfiyyətli xidmət göstərmək və gözləntilərini aşmaq məqsədiylə yola çıxmışıq. Qazandığımız güvən sayəsində yolumuza 30-dan çox mağaza, ölkədə ən çox trafikə sahib veb-saytlardan biri və 60-dan çox brendin rəsmi distribütoru kimi davam edirik. 15.000-dən çox məhsul çeşidi ilə həyatınızın bir parçası olmaqdan qürur duyuruq.</p>
            <div className="timeline">
                <div className='line'></div>

                <div className='timeline-items'>
                    {events.map((event, index) => (
                        <div className="timeline-item" key={index}>
                            <span className='event-year' data-aos="zoom-in" data-aos-duration="300">{event.year}</span>
                            <div className="timeline-content" data-aos="fade-right" data-aos-duration="500">
                                <div className="timeline-image">
                                    <img src={event.image} alt={event.title} />
                                </div>
                                <div className="timeline-details">
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutUs