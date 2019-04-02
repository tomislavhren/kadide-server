import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getRecent, setActiveTab } from '../../../core/services/schedule/schedule.actions';

import { findNextDeparture } from '../../../core/services/schedule/schedule.helpers';

import RecentItem from './RecentItem';

import './recent.css';

class Recent extends PureComponent {

	async componentDidMount() {
		this.props.getRecent();
	}

	changeActiveTab = (routeId) => {
		this.props.setActiveTab(routeId)
	}

	render() {
		const { recent } = this.props;

		return recent && (
			<div className="home__content">
				<div className="home__content-label-wrapper">
					<div className="home__content-label">Nedavni rasporedi</div>
				</div>
				<div className="recent">
					{Object.entries(recent).map(([routeId, schedule]) => (
						<RecentItem
							key={routeId}
							routeId={routeId}
							changeActiveTab={this.changeActiveTab}
							{...findNextDeparture(schedule)}
						/>
					))}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ schedule }) {
	return { recent: schedule.recent };
}

export default connect(mapStateToProps, { getRecent, setActiveTab })(Recent);
