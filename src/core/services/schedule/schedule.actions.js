import * as http from '../http/http.actions';

import * as ScheduleActionCreators from './schedule.actionCreators';

export function getSchedule(routeId) {
	return async (dispatch) => {
		try {
			http.startAction('getSchedule');
			dispatch(ScheduleActionCreators.SET_SCHEDULE([]));
			const { data: schedule } = await http.get(`/route/${routeId}`);
			const recent = JSON.parse(localStorage.getItem('recent')) || {};
			if (routeId) {
				recent[routeId] = schedule;
				localStorage.setItem('recent', JSON.stringify(recent));
			}
			dispatch(ScheduleActionCreators.SET_SCHEDULE(schedule));
			dispatch(ScheduleActionCreators.SET_ROUTE_TYPE(routeId));

			http.endAction('getSchedule');
		} catch (error) {
			http.endAction('getSchedule');
			console.log(error);
		}
	}
}

export function getRecent() {
	return async (dispatch) => {
		try {
			const recent = JSON.parse(localStorage.getItem('recent'));
			dispatch(ScheduleActionCreators.GET_RECENT(recent));
		} catch (error) {
			console.log(error);
		}
	}
}

export function setActiveTab(routeId) {
	return async (dispatch) => {
		try {
			const recent = JSON.parse(localStorage.getItem('recent')) || {};
			recent[routeId].unshift(recent[routeId].pop())
			localStorage.setItem('recent', JSON.stringify(recent));
			dispatch(ScheduleActionCreators.GET_RECENT(recent));
		} catch (error) {
			console.log(error);
		}
	}
}

export function setScheduleActiveTab(activeTab) {
	return async dispatch => {
		dispatch(ScheduleActionCreators.SET_ACTIVE_TAB(activeTab));
	};
}

export function clearActiveSchedule() {
	return async dispatch => {
		dispatch(ScheduleActionCreators.SET_SCHEDULE([]));
	};
}