export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_ALL_SONGS':
      return { ...state, songs: [...action.payload] };
  }
  return state;
}
