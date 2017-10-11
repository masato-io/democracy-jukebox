import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Banner from './Bling/Banner.jsx';
import Navbar from './Navbar.jsx';
import Container from './Container.jsx';
// styled-components
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import {SetSpotifyAccessTokens} from '../actions/credentialActions'

import { connect } from 'react-redux';
@connect((store) => {
  return {
    access_token: store.AccountsReducer.access_token,
    refresh_token: store.AccountsReducer.refresh_token
  }
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { location } = this.props;
    if (location.hash) {
      var access_start = location.hash.indexOf('access_token=') + 13;
      var access_end = location.hash.indexOf('&');
      var access_token = location.hash.substring(access_start, access_end);
      var refresh_start = location.hash.indexOf('refresh_token=') + 14;
      var refresh_token = location.hash.substring(refresh_start);
      this.props.dispatch(SetSpotifyAccessTokens(access_token, refresh_token));
    }
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
          <Banner />
          <MuiThemeProvider>
            <Navbar location={location}/>
          </MuiThemeProvider>
          <Container />
        </AppWrap>
      </AppBackground>
    );
  }
}

export default App;
