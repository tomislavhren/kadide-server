import { combineReducers } from 'redux';

import news from '../services/news/news.reducer';
import schedule from '../services/schedule/schedule.reducer';
import http from '../services/http/http.reducer';

export default combineReducers({
	news,
	schedule,
	http
});
