import React from 'react';

const Player = props => {
  return (
    <div>
      <iframe
        src={
          'https://open.spotify.com/embed?uri=spotify:track:' + props.trackId
        }
        width="100%"
        height="250"
        frameBorder="0"
        allowTransparency="true"
      />
    </div>
  );
};

export default Player;
