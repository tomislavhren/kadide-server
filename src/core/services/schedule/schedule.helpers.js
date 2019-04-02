import moment from 'moment';

export const getDiffInMinutes = (time) => {
	const departureTime = moment(time);
	const now = moment();
	let minutes = departureTime.diff(now, 'minutes');
	return minutes > 0 ? minutes : 0;
}

export const isBusRoute = (routeId) => +routeId >= 100;

export const findNextDeparture = (schedule, activeTab = 0) => {
	return schedule[activeTab].schedule.find(s => getDiffInMinutes(s.time) > 0);
}