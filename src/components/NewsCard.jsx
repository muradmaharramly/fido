import React, { useState } from 'react'
import { MdArrowRightAlt } from 'react-icons/md'
import { Link } from 'react-router-dom'
import slugify from 'slugify'

const NewsCard = ({ singlenews }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - left) / width - 0.5) * 20; 
        const y = ((e.clientY - top) / height - 0.5) * 20; 

        const shadowX = (e.clientX - left - width / 2) / 10;
        const shadowY = (e.clientY - top - height / 2) / 10;

        setRotation({ x, y, shadowX, shadowY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0, shadowX: 0, shadowY: 0 });
    };
    return (
        <Link to={`/news/${slugify(singlenews.title, { lower: true })}`}>
            <div className='news-card' onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
          boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0 
            ? "0px 0px 5px rgba(0, 0, 0, 0.3)" 
            : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(0, 0, 0, 0.3)`,
        }}>
                <div className='img-div' onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
          boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0 
            ? "0px 0px 5px rgba(0, 0, 0, 0.3)" 
            : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(0, 0, 0, 0.3)`,
        }}>
                    <img src={singlenews.image} />
                </div>
                <h5>{singlenews.title.substring(0, 30)}...</h5>
                <p>{singlenews.category}</p>
                <div className='card-ending'>
                    <span>{singlenews.date.slice(0, 10)}</span>
                    <Link>Bax<MdArrowRightAlt /></Link>
                </div>
            </div>
        </Link>
    )
}

export default NewsCard