import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Playlist from '../containers/Playlist/Playlist.jsx';
import AddSong from '../containers/Search/AddSong.jsx';
import Signup from './Accounts/Signup.jsx';
import Login from './Accounts/Login.jsx';
import Dashboard from './Host/Dashboard.jsx';

class Container extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<MuiThemeProvider>
				<Switch>
					<Route exact path="/" component={Playlist} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/search" component={AddSong} />
					<Route exact path="/host" component={Dashboard} />
				</Switch>
			</MuiThemeProvider>
		);
	}
}
export default Container;
