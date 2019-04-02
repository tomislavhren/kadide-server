import React, { PureComponent } from 'react';

import './home.css';
import News from './News';
import Recent from './Recent';

class Home extends PureComponent {

	render() {
		return (
			<main className="home">
				<Recent />
				<News />
			</main>
		);
	}
}

export default Home;
