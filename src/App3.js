import React, { PureComponent } from 'react';
import moment from 'moment';
import { BrowserRouter } from 'react-router-dom';
import './styles/header.css';
import './styles/main.css';
import axios from 'axios';

moment.locale('hr-HR')

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

class App extends PureComponent {

	state = {
		routeId: '',
		schedule: EMPTY_ARRAY,
		activeTab: 0,
		isBusRoute: false,
		isRotated: undefined,
		soonestDepartureIndex: undefined,
		isLoading: false
	}

	componentDidMount() {
		this.getNews();
	}

	static getDerivedStateFromProps(props, oldState) {
		if (!oldState.schedule.length) {
			return null;
		}
		const now = moment();
		const soonestDepartureIndex = oldState.schedule[oldState.activeTab].schedule.findIndex(s => moment(s.time).isSameOrAfter(now));
		return { soonestDepartureIndex };
	}

	getNews = async () => {
		const { data: news } = await axios.get(`/news`);
		this.setState({ news });
	}

	getSchedule = async (e) => {
		e.preventDefault();

		const { routeId } = this.state;
		this.setState({ isLoading: true }, async () => {
			const { data: schedule } = await axios.get(`/route/${routeId}`);
			this.setState({ isLoading: false, schedule, isBusRoute: +routeId >= 100 });
		})
	}

	getDiffInMinutes = (time) => {
		const departureTime = moment(time);
		const now = moment();
		let minutes = departureTime.diff(now, 'minutes');
		minutes = minutes > 0 ? minutes : 0;
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

	onRouteChange = (e) => {
		const routeId = e.target.value;
		this.setState({ routeId });
	}

	switchRoute = () => {
		this.setState({
			activeTab: (this.state.activeTab + 1) % 2,
			isRotated: !this.state.isRotated
		});
	}

	render() {
		const { schedule, routeId, activeTab, isBusRoute, isRotated, soonestDepartureIndex, isLoading } = this.state;

		const direction1 = schedule[activeTab] || EMPTY_OBJECT;
		const direction2 = schedule[(activeTab + 1) % 2] || EMPTY_OBJECT;
		return (
			<form onSubmit={this.getSchedule} className="App">
				<header className="header">
					<div className="header__container">
						<div className="header__input-wrapper">
							<div className="header__input-icon">
								<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
							</div>
							<div className="header__input-container">
								<input placeholder="Broj busa ili tramvaja" type="number" value={routeId} onChange={this.onRouteChange} />
							</div>
						</div>
					</div>
					{direction1.schedule &&
						<>
							<div className="header__info">
								<div className="header__info-image">
									<i className="material-icons">{isBusRoute ? 'directions_bus' : 'tram'}</i>
								</div>
								<div className="header__info-content">
									<div className="header__info-content-text"><strong>{moment(direction1.schedule[soonestDepartureIndex].time).format('HH:mm')}</strong> <span>{direction1.schedule[soonestDepartureIndex].departure} - {direction1.schedule[soonestDepartureIndex].arrival}</span></div>
									<div className="header__info-content-text"><strong>{moment(direction1.schedule[(soonestDepartureIndex + 1) % direction1.schedule.length].time).format('HH:mm')}</strong> <span>{direction1.schedule[(soonestDepartureIndex + 1) % direction1.schedule.length].departure} - {direction1.schedule[(soonestDepartureIndex + 1) % direction1.schedule.length].arrival}</span></div>
									<div className="header__info-content-text"><strong>{moment(direction1.schedule[(soonestDepartureIndex + 2) % direction1.schedule.length].time).format('HH:mm')}</strong> <span>{direction1.schedule[(soonestDepartureIndex + 2) % direction1.schedule.length].departure} - {direction1.schedule[(soonestDepartureIndex + 2) % direction1.schedule.length].arrival}</span></div>
								</div>
							</div>
							<div className="header__direction-switcher-container">
								<div className="header__direction-label">
									<span>{direction1.title}</span>
								</div>
								<div onClick={this.switchRoute} className="header__direction-switcher ripple">
									<i className={`material-icons ${isRotated ? '--rotated' : ''}`}>swap_horiz</i>
								</div>
								<div className="header__direction-label">
									<span>{direction2.title}</span>
								</div>
							</div>
						</>
					}
				</header>
				<main className="schedule">
					<div className={`schedule-loading ${isLoading ? 'is-active' : ''}`}>
						<div className={`mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active`} />
					</div>
					<ul className="schedule__list">
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
			</form>
		);
	}
}

export default App;
