import axios from 'axios';

export function getSongs() {
  return function(dispatch) {
    var _this = this;
    axios
      .get(`${window.server}/songs`)
      .then(result => {
        dispatch({ type: 'GET_ALL_SONGS', payload: result.data });
        return result.data[0];
      })
      .then(currentSong => {
        _this.setState({ currentSong: currentSong });
      });
  };
}
