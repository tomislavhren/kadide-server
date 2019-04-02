import axios from 'axios';

import * as NewsActionCreators from './news.actionCreators';

export function getNews() {
	return async (dispatch) => {
		try {
			const { data: news } = await axios.get('/news');
			dispatch(NewsActionCreators.GET_NEWS(news));
		} catch (error) {
			console.log(error);
		}
	}
}