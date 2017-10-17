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
// styled-components
import styled from 'styled-components';

@connect((store) => {
  return {
    access_token: store.AccountsReducer.access_token,
    refresh_token: store.AccountsReducer.refresh_token,
    currentSong: store.songsReducer.currentSong
  }
})


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
    const {access_token, refresh_token} = this.props;
    if (access_token && refresh_token) {
      this.getSpotifyToken();
    }
    this.props.dispatch(getSongs().bind(this));
  }

  upVote(song) {
    song.vote = 1;
    axios
      .put(`${window.server}/songvote`, song)
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
      .put(`${window.server}/songvote`, song)
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

    spotifyApi.setAccessToken(this.props.access_token);
    return access_token;
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
    // baseStyles();
    const {access_token, currentSong} = this.props;

    const playListStyle = {
      display: 'inline-block',
      width: '90%',
      float: 'right'
    };
    const playButtonStyle = {
      width: '100%',
      margin: '16px',
      textAlign: 'center'
    };

    // define custom css
    const PlaylistComponentWrap = styled.div`
      background: #1c2137;
      height: 100vh;
      width: 100%;
      overflow-y: scroll;
      margin: 0 0 80px 0;
    `;

    const PlayerWrap = styled.div`
      background: #1c2137;
      height: 80px;
      width: 900px;
      position: fixed;
      z-index: 100;
      bottom: 0;
      left: calc(-50vw + 50%);
      right: calc(-50vw + 50%);
      margin-left: auto;
      margin-right: auto;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    `;
    if (currentSong){
      var renderPlayer = (
        <div>
          <Player trackId={currentSong.link.substring(currentSong.link.lastIndexOf('/')+1)} />
        </div>
      )
    }

    if (access_token) {
      var renderPlaylist = (
        <PlaylistComponentWrap>
          {/* PLAYLIST */}
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

          {/* PLAYER */}
          <PlayerWrap>
            {renderPlayer}
          </PlayerWrap>
        </PlaylistComponentWrap>
      )
    } else {
      var renderPlaylist = (
        <h4>Hey Fonz!  Go get Al or Arnold to Log In</h4>
      )
    }

    return (
      <div>
      {renderPlaylist}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songsReducer.songs
  };
};

export default connect(mapStateToProps, null)(Playlist);
