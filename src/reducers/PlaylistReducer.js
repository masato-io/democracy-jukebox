export default function(state = {
  songs: null,
  currentSong: null
}, action) {
  switch (action.type) {
    case 'GET_ALL_SONGS':
      return { ...state,
        songs: [...action.payload],
        currentSong: action.payload[0]
      };
  }
  return state;
}
