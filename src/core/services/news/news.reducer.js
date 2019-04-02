import * as ActionTypes from './news.actionTypes';

const initialState = {
	news: []
};
export default function NewsReducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_NEWS:
			return { ...state, news: action.payload };
		default:
			return state;
	}
}