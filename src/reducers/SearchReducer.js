export default function(state = {}, action) {
  switch (action.type) {
    case 'SEARCH_SONGS':
      return { ...state, results: [...action.payload] };
  }
  return state;
}
