import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Banner from './Bling/Banner.jsx';
import Navbar from './Navbar.jsx';
import Container from './Container.jsx';
// styled-components
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { location } = this.props;
    if (!location.hash) {
      window.location = window.server + '/hostLogin';
    }
  }

  render() {
    injectGlobal`
      @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800');

      body {
        font-family: 'Nunito Sans', sans-serif;
        margin: 0;
        background: #252D47;
      }
    `;

    const AppBackground = styled.div`
      background: #252d47;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `;
    const AppWrap = styled.div`
      background: #1c2137;
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
            <Navbar />
          </MuiThemeProvider>
          <Container />
        </AppWrap>
      </AppBackground>
    );
  }
}

export default App;
