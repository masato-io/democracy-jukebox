export default function(state = null, action) {
  switch (action.type) {
    case 'GET_ALL_SONGS':
      return [...action.payload];
  }
  return state;
}
