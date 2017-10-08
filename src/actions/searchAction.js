import axios from 'axios';

export function onSearch(query) {
  return function(dispatch) {
    axios
      .get(`${window.server}/songs/search`, {
        params: {
          query: query
        }
      })
      .then(response => {
        dispatch({ type: 'SEARCH_SONGS', payload: response.data.tracks.items });
      })
      .catch(err => {
        console.error.bind(err);
      });
  };
}
