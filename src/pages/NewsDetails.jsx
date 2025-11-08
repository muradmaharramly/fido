import React, { useEffect, useState } from 'react';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { useSelector } from 'react-redux';
import { fetchNews } from "../tools/request/fetchNews";
import PreLoader from '../components/PreLoader';
import slugify from 'slugify';
import { CgDanger } from 'react-icons/cg';

const NewsDetails = () => {
    const { slug } = useParams();
    const [singlenews, setSingleNews] = useState(null);
    const { news, loading } = useSelector((state) => state.news);

    useEffect(() => {
        if (news.length === 0) {
            fetchNews();
        }
    }, [news.length]);

    useEffect(() => {
        if (news.length > 0) {
            const foundSingleNews = news.find(
                (p) => slugify(p.title, { lower: true }) === slug
            );
            setSingleNews(foundSingleNews || null);
        }
    }, [slug, news]);

    if (loading) {
        return <PreLoader />;
    }

    // ✅ Əgər xəbər tapılmayıbsa
    if (!singlenews) {
        return (
            <div className="item-not-found">
                <div className="empty-icon"><CgDanger /></div>
                <p>Xəbər tapılmadı</p>
                <span className="desc">
                    Digər xəbərlərə baxmaq üçün xəbərlər səhifəsinə keçid edə bilərsiniz.
                </span>
                <Link to="/news" className="back-home">Xəbərlər</Link>
            </div>
        );
    }

    return (
        <div className='news-details-page'>
            <div className="breadcrumb">
                <Link to="/">Ana səhifə</Link>
                <RiArrowRightDoubleFill />
                <span>Xəbərlər və bloqlar</span>
            </div>

            <div className='page-head'>
                <span>{singlenews?.date?.slice(0, 10) || "Tarix yoxdur"}</span>
                <h1>{singlenews.title}</h1>
            </div>

            <div className='news-container'>
                <div className='detailed-news'>
                    <div className='img-div'>
                        <img src={singlenews.image} alt={singlenews.title} />
                    </div>
                    <p className='desc'>{singlenews.description}</p>
                </div>

                <div className='right-content'>
                    {Array.isArray(news) && news.length > 1 && singlenews ? (
                        <div className='most-viewed'>
                            {(() => {
                                const mostViewed = news.filter(
                                    item => item.id !== singlenews.id && item.viewCount > 200
                                );
                                const otherNews = news.filter(item => item.id !== singlenews.id);

                                const listToShow =
                                    mostViewed.length > 0
                                        ? { title: "Ən çox baxılanlar", list: mostViewed }
                                        : { title: "Digər xəbərlər", list: otherNews };

                                return (
                                    <>
                                        <p>{listToShow.title}</p>
                                        <div className='items'>
                                            {listToShow.list.map(item => (
                                                <div className='item' key={item.id}>
                                                    <div className='little-img'>
                                                        <img
                                                            src={item.image || "/placeholder.jpg"}
                                                            alt={item.title || "Xəbər"}
                                                        />
                                                    </div>
                                                    <div className='text'>
                                                        <p>{item.title ? `${item.title.substring(0, 25)}...` : "—"}</p>
                                                        <span>
                                                            {item?.date && item.date !== "0"
                                                                ? item.date.slice(0, 10)
                                                                : ""}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    ) : null}
                </div>

            </div>

            {Array.isArray(news) && news.length > 1 && singlenews && (
                <div className='news-list-con'>
                    <div className='area-head'>
                        <p>Xəbərlər</p>
                        <h3>Ən son yeniliklər</h3>
                    </div>

                    <div className='news-list'>
                        {news
                            .filter(item => item.id !== singlenews.id)
                            .slice(0, 6)
                            .map(item => (
                                <NewsCard key={item.id} singlenews={item} />
                            ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default NewsDetails;
