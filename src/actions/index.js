import axios from 'axios';

export function getSongs(songs) {
  return function(dispatch) {
    axios.get(`${window.server}/songs`).then(result => {
      dispatch({ type: 'GET_ALL_SONGS', payload: result.data });
    });
  };
}
