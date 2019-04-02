import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getDiffInMinutes } from '../../core/services/schedule/schedule.helpers';

import './schedule.css';

moment.locale('hr-HR')

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

class Schedule extends PureComponent {

	state = {
		isBusRoute: false
	}

	_scheduleListRef = null;

	constructor(props) {
		super(props);
		this._scheduleListRef = React.createRef();
	}

	getDiffInMinutes = (time) => {
		const minutes = getDiffInMinutes(time);

		let departureTimeClassName = 'departure-in-future';
		if (minutes === 0) {
			departureTimeClassName = 'departure-left';
		} else if (minutes < 10) {
			departureTimeClassName = 'departure-soon';
		}
		return (
			<span className={departureTimeClassName}>
				<i className={`material-icons`}>track_changes</i>
				<span>
					<big>{minutes || ''}</big>
					<small>{minutes > 0 ? ' min' : 'otišao'}</small>
				</span>
			</span>
		)
	}

	render() {
		const { isLoading, schedule, activeTab, isBusRoute } = this.props;

		let direction1 = schedule[activeTab] || EMPTY_OBJECT;

		return (
			<main className={`schedule`}>
				{isLoading && (
					<div className="loader-wrapper">
						<div className="loader" />
					</div>
				)}
				<ul className="schedule__list" ref={this._scheduleListRef}>
					{(direction1.schedule || EMPTY_ARRAY).map(d => (
						<li key={d.time} className="schedule__list-item-container">
							<div className="schedule__list-item mdl-shadow--2dp">
								<div className="departure-time">
									<i className="material-icons">{isBusRoute ? 'directions_bus' : 'tram'}</i>
									<span className="time">Polazak u {moment(d.time).format('HH:mm')}</span>
								</div>
								<div className="departure-info">
									<span className="direction">
										<span className="origin">
											<i className={`material-icons`}>trip_origin</i>
											{d.departure}
										</span>
										<i className={`material-icons`}>more_vert</i>
										<span className="destination">
											<i className={`material-icons`}>place</i>
											{d.arrival}
										</span>
									</span>
									<span className="time-info">
										{this.getDiffInMinutes(d.time)}
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			</main>
		);
	}
}

function mapStateToProps({ http: { activeActions }, schedule: { schedule, activeTab, isBusRoute } }) {
	return {
		schedule,
		activeTab,
		isBusRoute,
		isLoading: activeActions.includes('getSchedule')
	};
}

export default connect(mapStateToProps)(Schedule);
