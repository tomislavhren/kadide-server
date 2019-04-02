import * as ActionTypes from './news.actionTypes';

export function GET_NEWS(payload) {
	return {
		type: ActionTypes.GET_NEWS,
		payload
	};
}