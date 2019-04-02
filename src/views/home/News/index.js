import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getNews } from '../../../core/services/news/news.actions';

import NewsItem from './NewsItem';

import './news.css';

class News extends PureComponent {

	componentDidMount() {
		this.props.getNews();
	}

	render() {
		const { news } = this.props;

		return (
			<div className="home__content">
				<div className="home__content-label-wrapper">
					<div className="home__content-label">Izmjene u prometu</div>
				</div>
				<div className="news">
					{!news.length &&
						<>
							<NewsItem isLoading={true} />
							<NewsItem isLoading={true} />
							<NewsItem isLoading={true} />
							<NewsItem isLoading={true} />
							<NewsItem isLoading={true} />
						</>
					}
					{news.map((newsItem, index) => (
						<NewsItem
							{...newsItem}
							key={index}
						/>
					))}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ news }) {
	return { news: news.news };
}

export default connect(mapStateToProps, { getNews })(News);
