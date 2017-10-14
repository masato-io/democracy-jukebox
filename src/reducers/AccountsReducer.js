export default function reducer(state = {
  access_token: null,
  refresh_token: null,
  player_id: null
}, action) {
  switch (action.type) {
    case 'SET_DASHBOARD_VIEW': {
      return {
        ...state
      };
    }
  }
  switch (action.type) {
    case 'SET_TOKENS': {
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token
      };
    }
  }
  switch (action.type) {
    case 'SET_PLAYER_ID': {
      return {
        ...state,
        player_id: action.payload.player_id
      };
    }
  }
  return state;
}
