import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './global-style.scss'
import routes from './routes'
import configureStore from './store/configureStore'
import * as serviceWorker from './serviceWorker'

let store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		{routes}
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
