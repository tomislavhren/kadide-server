import React from 'react';
import moment from 'moment';

import { getDiffInMinutes } from '../../../core/services/schedule/schedule.helpers';

const RecentItem = ({
	arrival,
	departure,
	time,
	changeActiveTab,
	isBusRoute,
	routeId
}) => {
	if (!departure && !arrival) {
		return null;
	}

	const minutes = getDiffInMinutes(time);

	let dptTimeClassName = 'dpt-in-future';
	if (minutes === 0) {
		dptTimeClassName = 'dpt-left';
	} else if (minutes < 10) {
		dptTimeClassName = 'dpt-soon';
	}

	const diffInMin = <span className={dptTimeClassName}>
		<i className={`material-icons`}>track_changes</i>
		<span>
			<big>{minutes || ''}</big>
			<small>{minutes > 0 ? ' min' : 'otišao'}</small>
		</span>
	</span>

	return (
		<div onClick={changeActiveTab.bind(this, routeId)} className="recent-item">
			<div className="recent-item__container">
				<div className="recent-item__dpt-time">
					<i className="material-icons">{isBusRoute ? 'directions_bus' : 'tram'}</i>
					<span className="time">Polazak u {moment(time).format('HH:mm')}</span>
				</div>
				<div className="dpt-info">
					<span className="direction">
						<span className="origin">
							<i className={`material-icons`}>trip_origin</i>
							{departure}
						</span>
						<i className={`material-icons`}>more_vert</i>
						<span className="destination">
							<i className={`material-icons`}>place</i>
							{arrival}
						</span>
					</span>
					<span className="time-info">
						{diffInMin}
					</span>
				</div>
			</div>
		</div>
	);
};

export default RecentItem;