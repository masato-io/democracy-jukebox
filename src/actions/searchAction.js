import axios from 'axios';

export function onSearch(e) {
  return function(dispatch) {
    // console.log('this', this.state);
    let query = e.target.value;
    this.setState({ query: query });
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
        // console.error.bind(err);
        alert('Hey Fonz! Go ask Arnold or Al to login');
      });
  };
}
