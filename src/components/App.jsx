import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Banner from './Bling/Banner.jsx';
import Navbar from './Navbar.jsx';
import Container from './Container.jsx';

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
    return (
      <div>
        <Banner />
        <MuiThemeProvider>
          <Navbar />
        </MuiThemeProvider>
        <Container />
      </div>
    );
  }
}

export default App;
