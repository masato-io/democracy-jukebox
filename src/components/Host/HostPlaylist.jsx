// react & redux
import React from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../../actions/playlistActions';
// ajax
import axios from 'axios';
// components
import HostPlaylistEntry from './HostPlaylistEntry.jsx';
import HostPlayer from './HostPlayer.jsx';
// spotify
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
// styled-components
import styled from 'styled-components';

@connect((store) => {
  return {
    access_token: store.AccountsReducer.access_token,
    refresh_token: store.AccountsReducer.refresh_token,
    player_id: store.AccountsReducer.player_id,
    currentSong: store.songsReducer.currentSong
  }
})


class HostPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: '',
      currentUser: 'annonymous'
    }
  }

  componentDidMount() {
    this.props.dispatch(getSongs().bind(this));
  }

  removeSong(songId) {
    axios
      .delete(`${window.server}/song`, { params: { id: songId } })
      .then(function(response) {
        this.props.dispatch(getSongs().bind(this));
      }.bind(this))
      .catch(err => {
        console.log(err);
      });
  }

  clearPlaylist() {
    var proceed = confirm ('Are you sure you want to break all the records, Fonz?');

    if (proceed) {
      axios
        .delete(`${window.server}/collection`)
        .then(function(response){
          setTimeout(this.props.dispatch(getSongs().bind(this)), 1000).bind(this);
        }.bind(this))
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const {currentSong} = this.props;

    if (currentSong) {
      var render_Player = (
        <HostPlayer trackId={currentSong.link.split('track/')[1]} />
      )
    }

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

    return (
      <PlaylistComponentWrap>
        <div>
          <a href='#' onClick={this.clearPlaylist}>Clear Playlist</a>
        </div>
        <div style={playListStyle}>
          {this.props.songs &&
            this.props.songs.map((song, i) => {
              return (
                <HostPlaylistEntry
                  index={i + 1}
                  downVote={this.downVote}
                  handlePlay={this.handlePlayButtonClick}
                  upVote={this.upVote}
                  Song={song}
                  key={i}
                  deleteSong={()=>{this.removeSong(song._id)}}
                />
              );
            })}
        </div>

        <PlayerWrap>
          {render_Player}
        </PlayerWrap>
      </PlaylistComponentWrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songsReducer.songs
  };
};

export default connect(mapStateToProps, null)(HostPlaylist);
