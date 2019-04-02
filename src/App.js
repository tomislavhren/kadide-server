import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './views/home';
import Schedule from './views/schedule';
import Header from './components/Header';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<>
					<Route component={Header} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/schedule/:routeId" component={Schedule} />
					</Switch>
				</>
			</BrowserRouter>
		);
	}

}

export default App;