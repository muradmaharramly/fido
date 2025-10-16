import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import PreLoader from '../../PreLoader';
import slugify from 'slugify';
import { fetchNews } from '../../../tools/request/fetchNews';
import { editNews } from '../../../tools/actions/newsActions';
import NewsForm from '../elements/NewsForm';

const EditNews = () => {
    const { slug } = useParams();  
    const [singlenews, setSingleNews] = useState(null); 
    const { news, loading, error } = useSelector((state) => state.news);
    const dispatch = useDispatch();

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

    if (loading) return <PreLoader />;
    if (error) return <p>Xəta: {error}</p>;

    if (!singlenews) {
        return <div>Xəbər tapılmadı</div>; 
    }

    const handleEditNews = (updatedNews) => {
        editNews(updatedNews); 
    };

    return (
        <div className='edit-news'>
            <div className='page-head'>
                <h3>Xəbər redaktə et</h3>
                <Link to="/administrative/news"> Xəbərlərə bax</Link>
            </div>
            <NewsForm 
                isEditMode={true}  
                existingNews={singlenews} 
                onSubmit={handleEditNews}  
            />
        </div>
    );
}

export default EditNews;
