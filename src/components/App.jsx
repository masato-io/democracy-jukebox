import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Banner from './Bling/Banner.jsx';
import Navbar from './Navbar.jsx';
import axios from 'axios';
import Container from './Container.jsx';
// styled-components
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import {
	SetSpotifyAccessTokens,
	SetSpotifyPlayerId
} from '../actions/credentialActions';

import Promise from 'bluebird';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

import { connect } from 'react-redux';
@connect(store => {
	return {
		access_token: store.AccountsReducer.access_token,
		refresh_token: store.AccountsReducer.refresh_token,
		player_id: store.AccountsReducer.player_id
	};
})
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { location } = this.props;
		axios
			.get(`${window.server}/get_access_token`)
			.then(function(response) {
				return new Promise(function(resolve, reject) {
					if (response.status === 200) {
						resolve(response.data);
					} else {
						reject();
					}
				});
			})
			.then(
				function(access_token) {
					console.log('Logged In with: ', access_token);
					this.props.dispatch(
						SetSpotifyAccessTokens(access_token, 'refresh_token')
					);
					new Promise(function(resolve, reject) {
						spotifyApi.setAccessToken(access_token);
						resolve('done');
					}).then(
						function(response, err) {
							spotifyApi.getMyDevices().then(
								function(data) {
									if (data.devices) {
										if (data.devices.length > 0) {
											this.props.dispatch(
												SetSpotifyPlayerId(data.devices[0].id)
											);
										}
									}
								}.bind(this),
								err => {
									console.error(err);
								}
							);
						}.bind(this)
					);
				}.bind(this)
			)
			.catch(function(error) {
				if (location.hash.indexOf('access_token') > -1) {
					console.log(location.hash);
					var access_start = location.hash.indexOf('access_token=') + 13;
					var access_end = location.hash.indexOf('&');
					var access_token = location.hash.substring(access_start, access_end);
					var refresh_start = location.hash.indexOf('refresh_token=') + 14;
					var refresh_token = location.hash.substring(refresh_start);
					this.props.dispatch(
						SetSpotifyAccessTokens(access_token, refresh_token)
					);

					new Promise(function(resolve, reject) {
						spotifyApi.setAccessToken(access_token);
						resolve('done');
					}).then(
						function(response, err) {
							spotifyApi.getMyDevices().then(
								function(data) {
									if (data.devices) {
										if (data.devices.length > 0) {
											this.props.dispatch(
												SetSpotifyPlayerId(data.devices[0].id)
											);
										}
									}
								}.bind(this),
								err => {
									console.error(err);
								}
							);
						}.bind(this)
					);
				}
			});
	}

	render() {
		const { location } = this.props;

		injectGlobal`
      @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800');

      body {
        font-family: 'Nunito Sans', sans-serif;
        margin: 0;
        background: #252D47;
      }
    `;

		const AppBackground = styled.div`
			background: #ededed;
			height: calc(100vh);
			width: 100%;
			display: flex;
			flex-direction: column;
			overflow: hidden;
		`;
		const AppWrap = styled.div`
			background: #ffffff;
			height: 100%;
			width: 900px;
			display: flex;
			flex-direction: column;
			margin: 0 auto;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
			overflow: scroll;
		`;
		return (
			<AppBackground>
				<AppWrap>
					<MuiThemeProvider>
						<Navbar location={location} />
					</MuiThemeProvider>
					<Container />
				</AppWrap>
			</AppBackground>
		);
	}
}

export default App;
