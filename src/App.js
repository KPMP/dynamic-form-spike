import React, { Component } from 'react';
import NavBar from './components/Nav/NavBar';
import loadedState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';

const cacheStore = window.sessionStorage.getItem("redux-store");
const initialState = cacheStore ?
	    JSON.parse(cacheStore) :
	    loadedState;
const store = applyMiddleware(thunk)(createStore)(appReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());	 
const saveState = () => {
    window.sessionStorage.setItem("redux-store", JSON.stringify(store.getState()));
};

// *** Get a new tracking Id and add it here *** //
const GA_TRACKING_ID = '';

ReactGA.initialize(GA_TRACKING_ID);
function logPageView(location, action) {
    ReactGA.set({ page: location.pathname + location.search });
    ReactGA.pageview(location.pathname + location.search);
}
const history = createHistory();
history.listen((location, action) => {
    logPageView(location, action);
});

store.subscribe(function () {
    console.log(store.getState())
});

store.subscribe(saveState); 


class App extends Component {
	componentWillMount() {
		logPageView(window.location, "");
	}	
	
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Container fluid>
						<NavBar/>
						<div id="main-page">
							<Row>
								<Col>
									<h2>Congrats on creating a new app for KPMP!</h2>
								</Col>
							</Row>
							<Row>
								<Col>
									<h3>Developer TODOs: </h3>
									<ul>
										<li> Create a new repository at http://gitlab.org/KPMP </li>
										<li> Create a new branch called 'develop'</li>
										<li> Create a Google Analytics tracking Id </li>
										<li> Update the Google Analytics tracking Id in App.js (search for 'const GA_TRACKING_ID')</li>
										<li> Change the title in public/index.html</li>
										<li> Ask for the application specific logo and replace the current logo</li>
										<li> Rename project in package.json name attribute and give it the correct version number</li>
										<li> Remove the carrots from package.json dependencies and devDependencies </li>
										<li> Check to see if the versions included in package.json are the latest versions we want to use.  If not, update them in package.json now and create a card to update them in our custom react-scripts.</li>
										<li> Add a new origin to this project where you created the new repository 'git remote add origin &lt;url to git repo&gt;'</li>
										<li> Push this code to github under the develop branch</li>
										<li> Set up the git repo at github:
											<ul>
												<li> Click on settings near the upper right and select 'Collaborators & teams'</li>
												<li> Add the appropriate collaborators (use Add collaborator button)</li>
												<li> Click on 'Branches' from the menu on the left </li>
												<li> Change the default branch to develop</li>
												<li> Add branch protection rules for develop and master (select Require pull request reviews...)</li>
											</ul>
										</li>
										<li> Set up CI
											<ul>
												<li> Go to https://travis-ci.org/organizations/KPMP/repositories </li>
												<li> Click the 'Sync account' button on the left</li>
												<li> Find your new repository and click the slider button to turn it on</li>
											</ul>
										</li>
										<li> Have a drink and celebrate, we have a new web project!</li>
									</ul>
								</Col>
							</Row>
						</div>
					</Container>
				</Router>
			</Provider>
		);
	}
}

export default App;
