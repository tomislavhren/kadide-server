import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';

import * as serviceWorker from './serviceWorker';

import './index.css';

import App from './App';

import store from './core/store';

// you can add sessionStorage.setItem('disableWhyDiDYouUpdate', true) to pause logs 
if (process.env.NODE_ENV === 'development' && !sessionStorage.getItem('disableWhyDiDYouUpdate')) {
	// tslint:disable-next-line:no-var-requires
	const { whyDidYouUpdate } = require('why-did-you-update');
	whyDidYouUpdate(React);
}

const lastActivity = localStorage.getItem('lastActivity');
if (moment().get('date') - moment(lastActivity).get('date') > 0) {
	localStorage.removeItem('recent');
}
localStorage.setItem('lastActivity', new Date());

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
