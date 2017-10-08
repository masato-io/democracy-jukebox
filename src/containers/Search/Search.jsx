// react & redux
import React from 'react';
import { connect } from 'react-redux';
import { onSearch } from '../../actions/searchAction';
import { bindActionCreators } from 'redux';
// api
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Login from '../../components/Accounts/Login.jsx';
import SearchEntry from '../../components/Search/SearchEntry.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      users: [],
      currentUser: '',
      usersSongs: []
    };
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  componentDidMount() {
    this.getAllUsers();
  }

  onSearch(query) {
    axios
      .get(`${window.server}/songs/search`, {
        params: {
          query: this.state.query
        }
      })
      .then(response => {
        this.setState({ results: response.data.tracks.items });
      })
      .catch(err => {
        console.error.bind(err);
      });
  }

  onChange(e) {
    let query = e.target.value;
    this.setState({ query: query });
  }

  onAdd(song) {
    let newSong = {};
    newSong.name = song.name;
    newSong.image = song.album.images[1].url;
    newSong.link = song.external_urls.spotify;
    newSong.artist = song.artists[0].name;
    if (this.state.currentUser === '') {
      newSong.userName = 'anonymous';
    } else {
      newSong.userName = this.state.currentUser.name;
    }
    axios
      .post(`${window.server}/songs`, newSong)
      .then(response => {
        window.location.href = `${window.server}/hostLogin`;
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleUserChange(user) {
    this.setState({
      currentUser: user
    });
    if (user.addedSongs.length > 0) {
      this.setState({ usersSongs: user.addedSongs });
    }
  }

  getAllUsers() {
    axios
      .get(`${window.server}/users`)
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const styles = {
      inside: {
        width: '30%',
        display: 'inline-block'
      },
      textAlign: 'center',
      width: '100%',
      height: '100%'
    };
    return (
      <div style={styles}>
        <div style={styles.inside}>
          <Login
            onChange={this.handleUserChange}
            users={this.state.users}
            currentUser={this.state.currentUser}
          />
          <TextField name="selectUser" onChange={this.onChange} />
          <br />
          <br />
          <Link to="/signup">Don't see your name? Sign up here!</Link>
          <br />
          <br />
          <RaisedButton
            onClick={this.props.dispatch(onSearch(this.state.query).bind(this))}
            label="Search"
          />
          <div>
            {this.props.results &&
              this.props.results.map((result, i) => {
                return (
                  <SearchEntry key={i} onAdd={this.onAdd} Result={result} />
                );
              })}
          </div>
          <ul>
            {this.state.usersSongs &&
              this.state.usersSongs.map((song, i) => {
                return (
                  <li key={i}>
                    {song.name}, {song.artist}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.searchReducer.results
  };
};

export default connect(mapStateToProps, null)(Search);
