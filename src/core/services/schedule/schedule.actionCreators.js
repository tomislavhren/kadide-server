import * as ActionTypes from './schedule.actionTypes';

export function SET_SCHEDULE(payload) {
	return {
		type: ActionTypes.SET_SCHEDULE,
		payload
	};
}

export function SET_ROUTE_TYPE(routeId) {
	return {
		type: ActionTypes.SET_ROUTE_TYPE,
		payload: routeId
	};
}

export function SET_ACTIVE_TAB(payload) {
	return {
		type: ActionTypes.SET_ACTIVE_TAB,
		payload
	};
}

export function GET_RECENT(payload) {
	return {
		type: ActionTypes.GET_RECENT,
		payload
	};
}