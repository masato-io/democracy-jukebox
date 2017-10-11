export default function(state = { query: '' }, action) {
  switch (action.type) {
    case 'SEARCH_SONGS':
      return { ...state, results: [...action.payload] };
    case 'UPDATE_QUERY':
      return { ...state, query: action.payload };
    case 'CLEAR_QUERY':
      return { ...state, query: action.payload };
  }
  return state;
}
