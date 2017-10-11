export function SetSpotifyAccessTokens(access_token, refresh_token) {
  return ({
    type: 'SET_TOKENS',
    payload: {
      access_token: access_token,
      refresh_token: refresh_token
    }
  });
}
