import * as ActionTypes from './http.actionTypes';

export function ACTION_START(routeId) {
	return {
		type: ActionTypes.ACTION_START,
		payload: routeId
	};
}

export function ACTION_END(payload) {
	return {
		type: ActionTypes.ACTION_END,
		payload
	};
}