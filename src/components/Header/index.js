import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './header.css';

import { getSchedule, setScheduleActiveTab, clearActiveSchedule } from '../../core/services/schedule/schedule.actions';

moment.locale('hr-HR')

class Header extends PureComponent {

	state = {
		routeId: '',
		isRotated: false
	}

	getSchedule = async (e) => {
		e.preventDefault();

		const { getSchedule } = this.props;
		const { routeId } = this.state;

		await getSchedule(routeId);

		this.props.history.push(`/schedule/${routeId}`);
	}

	onRouteChange = (e) => {
		const routeId = e.target.value;
		if (/^\d?\d?\d$/.test(routeId)) {
			this.setState({ routeId });
		}
	}

	switchRoute = async () => {
		const { setScheduleActiveTab, activeTab } = this.props;
		await setScheduleActiveTab((activeTab + 1) % 2);
		this.setState({
			isRotated: !this.state.isRotated
		});
	}

	goBack = async () => {
		this.props.history.push(`/`);
		await this.props.clearActiveSchedule();
	}

	render() {
		const { routeId, isRotated } = this.state;
		const { direction1Title, direction2Title, hasSchedule } = this.props;

		return (
			<header className="header">
				<form onSubmit={this.getSchedule}>
					<div className="header__container">
						{/* <div className="header__title">
							<Link to="/">
								<img src="/assets/kadide.svg" alt="Kad ide logo" />
							</Link>
						</div> */}
						<div className="header__input-wrapper">
							<div className="header__input-container">
								<div className="header__input-icon">
									{!hasSchedule ?
										<i className="material-icons">search</i> :
										<i onClick={this.goBack} className="material-icons">arrow_back</i>
									}
								</div>
								<input placeholder="Broj busa ili tramvaja" type="number" maxLength={3} pattern="\d{0,3}" value={routeId} onChange={this.onRouteChange} />
							</div>
						</div>
						{hasSchedule ?
							<div className="header__direction-switcher-container">
								<div className="header__direction-label">
									<span>{direction1Title}</span>
								</div>
								<div onClick={this.switchRoute} className="header__direction-switcher ripple">
									<i className={`material-icons ${isRotated ? '--rotated' : ''}`}>swap_horiz</i>
								</div>
								<div className="header__direction-label">
									<span>{direction2Title}</span>
								</div>
							</div> :
							<div className="header__tabs-wrapper">
								<div className="header__tabs-container">
									<div className="header__tab header__tab--active">Naslovnica</div>
									<div className="header__tab">Favoriti</div>
									<div className="header__tab">Karta</div>
								</div>
							</div>
						}
					</div>
				</form>
			</header>
		);
	}
}

const EMPTY_OBJECT = {};

function mapStateToProps(state) {
	const { schedule, activeTab } = state.schedule;
	const { title: direction1Title } = schedule[activeTab] || EMPTY_OBJECT;
	const { title: direction2Title } = schedule[(activeTab + 1) % 2] || EMPTY_OBJECT;

	return {
		direction1Title,
		direction2Title,
		activeTab,
		hasSchedule: !!schedule.length
	}
}

export default connect(mapStateToProps, { getSchedule, setScheduleActiveTab, clearActiveSchedule })(Header);
