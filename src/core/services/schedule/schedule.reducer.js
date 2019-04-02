import * as ActionTypes from './schedule.actionTypes';

const initialState = {
	schedule: [],
	isBusRoute: true,
	activeTab: 0,
	recent: null
};
export default function ScheduleReducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_SCHEDULE:
			return { ...state, schedule: action.payload };
		case ActionTypes.SET_ROUTE_TYPE:
			return { ...state, isBusRoute: action.payload >= 100 };
		case ActionTypes.SET_ACTIVE_TAB:
			return { ...state, activeTab: action.payload };
		case ActionTypes.GET_RECENT:
			return { ...state, recent: action.payload };
		default:
			return state;
	}
}