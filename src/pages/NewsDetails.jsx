import React, { useEffect, useState } from 'react';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { useSelector } from 'react-redux';
import { fetchNews } from "../tools/request/fetchNews";
import PreLoader from '../components/PreLoader';
import slugify from 'slugify';

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
            setSingleNews(foundSingleNews);
        }
    }, [slug, news]);

    if (loading) {
        return <PreLoader />;
    }

    if (!singlenews) {
        return <p>Xəbər tapılmadı</p>;
    }
    return (
        <div className='news-details-page'>
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Xəbərlər və bloqlar</span></div>
            <div className='page-head'>
                <span>{singlenews.date.slice(0, 10)}</span>
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
                    <div className='most-viewed'>
                        {news.some(item => item.id !== singlenews.id && item.viewCount > 200) ? (
                            <>
                                <p>Ən çox baxılanlar</p>
                                <div className='items'>
                                    {news
                                        .filter(item => item.id !== singlenews.id && item.viewCount > 200)
                                        .map((item) => (
                                            <div className='item' key={item.id}>
                                                <div className='little-img'>
                                                    <img src={item.image} alt={item.title} />
                                                </div>
                                                <div className='text'>
                                                    <p>{item.title.substring(0, 25)}...</p>
                                                    <span>{item.date.slice(0, 10)}</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Digər xəbərlər</p>
                                <div className='items'>
                                    {news
                                        .filter(item => item.id !== singlenews.id)
                                        .map((item) => (
                                            <div className='item' key={item.id}>
                                                <div className='little-img'>
                                                    <img src={item.image} alt={item.title} />
                                                </div>
                                                <div className='text'>
                                                    <p>{item.title.substring(0, 25)}...</p>
                                                    <span>{item.date.slice(0, 10)}</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
            <div className='news-list-con'>
                <div className='area-head'>
                    <p>Xəbərlər</p>
                    <h3>Ən son yeniliklər</h3>
                </div>
                <div className='news-list'>
                    {news
                        .filter(item => item.id !== singlenews.id)
                        .slice(0, 6)
                        .map((singlenews) => (
                            <NewsCard key={singlenews.id} singlenews={singlenews} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default NewsDetails