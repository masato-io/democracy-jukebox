// react & redux
import React from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../../actions/playlistActions';
import { bindActionCreators } from 'redux';
// ajax
import axios from 'axios';
// components
import PlaylistEntry from '../../components/Playlist/PlaylistEntry.jsx';
import Player from '../../components/Playlist/Player.jsx';
// spotify
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
// material-ui
import FlatButton from 'material-ui/FlatButton';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: '',
      deviceId: '',
      currentUser: 'annonymous'
    };
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  componentDidMount() {
    this.getSpotifyToken();
    this.getDeviceId();
    this.props.dispatch(getSongs().bind(this));
  }

  upVote(song) {
    song.vote = 1;
    axios
      .put(`${window.server}/song`, song)
      .then(response => {
        this.props.dispatch(getSongs().bind(this));
      })
      .catch(err => {
        console.log(err);
      });
  }

  downVote(song) {
    song.vote = -1;
    axios
      .put(`${window.server}/song`, song)
      .then(response => {
        this.props.dispatch(getSongs().bind(this));
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSpotifyToken() {
    const getHashParams = () => {
      let hashParams = {};
      let e,
        r = /([^&;=]+)=?([^&;]*)/g;
      let q = window.location.hash.substring(1);
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    };

    const params = getHashParams();
    const access_token = params.access_token;
    const refresh_token = params.refresh_token;

    spotifyApi.setAccessToken(access_token);
    return access_token;
  }

  //get the active device for the host user who is signed in to Spotify
  getDeviceId() {
    spotifyApi.getMyDevices().then(
      data => {
        if (data.devices) {
          if (data.devices.length > 0) {
            this.setState({ deviceId: data.devices[0].id });
          }
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  playCurrentSong(deviceId, trackId) {
    spotifyApi.play({
      device_id: deviceId,
      uris: ['spotify:track:' + trackId]
    });
  }

  removeSong(songId) {
    axios
      .delete(`${window.server}/song`, { params: { id: songId } })
      .then(response => {
        this.props.dispatch(getSongs().bind(this));
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const playerStyle = {
      display: 'inline-block',
      width: '50%',
      verticalAlign: 'top',
      textAlign: 'center',
      position: 'fixed'
    };
    const playListStyle = {
      display: 'inline-block',
      width: '50%',
      float: 'right'
    };
    const playButtonStyle = {
      width: '100%',
      margin: '16px',
      textAlign: 'center'
    };

    return (
      <div>
        {/* PLAYER */}
        <div>
          <div style={playerStyle}>
            {this.state.currentSong && (
              <Player
                trackId={this.state.currentSong.link.split('track/')[1]}
              />
            )}
          </div>

          {/* PLAY LIST */}
          <div style={playListStyle}>
            {this.props.songs &&
              this.props.songs.map((song, i) => {
                return (
                  <PlaylistEntry
                    index={i + 1}
                    downVote={this.downVote}
                    handlePlay={this.handlePlayButtonClick}
                    upVote={this.upVote}
                    Song={song}
                    key={i}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songsReducer.songs
  };
};

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       getSongs: getSongs
//     },
//     dispatch
//   );
// };

export default connect(mapStateToProps, null)(Playlist);
