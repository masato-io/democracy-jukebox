import axios from 'axios';

export function onAdd(song) {
  return function(dispatch) {
    dispatch({ type: 'CLEAR_QUERY', payload: '' });
    this.input.value = '';
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
    var _this = this;
    axios
      .post(`${window.server}/songs`, newSong)
      .then(response => {
        axios.get(`${window.server}/songs`).then(result => {
          dispatch({ type: 'GET_ALL_SONGS', payload: result.data });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
