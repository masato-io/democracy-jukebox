import axios from 'axios';

export function onSearch(e) {
	return function(dispatch) {
		let query = this.input.value;
		dispatch({ type: 'UPDATE_QUERY', payload: query });
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
