import React from 'react';

const NewsItem = ({
	src,
	title,
	description,
	isLoading = false
}) => {
	return (
		<div className={`news-item ${isLoading ? 'news-item--loading' : ''}`}>
			<div className="news-item__image">
				<img src={src} alt={title} />
			</div>
			<div className="news-item__content">
				<div className="news-item__title">{title}</div>
				<div className="news-item__description">{description && `${description.slice(0, 56)}...`}</div>
			</div>
		</div>
	);
};

export default NewsItem;