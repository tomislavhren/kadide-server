import * as ActionTypes from './http.actionTypes';

const initialState = {
	activeActions: []
};
export default function ScheduleReducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.ACTION_START:
			return {
				...state,
				activeActions: Array.isArray(action.payload) ? [...state.activeActions, ...action.payload] : [...state.activeActions, action.payload]
			};
		case ActionTypes.ACTION_END:
			return {
				...state,
				activeActions: Array.isArray(action.payload) ?
					state.activeActions.filter(key => !action.payload.includes(key)) :
					state.activeActions.filter(key => key !== action.payload)
			};
		default:
			return state;
	}
}