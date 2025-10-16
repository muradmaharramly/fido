import React from 'react'
import { Link } from 'react-router-dom'
import { addNews } from '../../../tools/actions/newsActions';
import NewsForm from '../elements/NewsForm';

const AddNews = () => {

  const handleAddNews = (newsData) => {
    addNews(newsData);
  };
    return (
        <div className='add-news'>
            <div className='page-head'>
                <h3>Xəbər əlavə et</h3>
                <Link to="/administrative/news">Xəbərlərə bax</Link>
            </div>
            <NewsForm isEditMode={false} onSubmit={handleAddNews} />
        </div>
    )
}

export default AddNews