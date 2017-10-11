export default function reducer(state = {
  access_token: null,
  refresh_token: null
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
  return state;
}
