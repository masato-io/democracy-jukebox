import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Playlist from '../containers/Playlist/Playlist.jsx';
import Signup from '../components/Accounts/Signup.jsx';
import Login from '../components/Accounts/Login.jsx';
import Search from '../containers/Search/Search.jsx';

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
          <Route exact path="/search" component={Search} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}
export default Container;
