import React from 'react';
import axios from 'axios';

// styled-components
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';

const HostPlaylistEntry = props => {
  const handleUpVote = () => {
    props.upVote(props.Song);
  };

  const handleDownVote = () => {
    props.downVote(props.Song);
  };

  const handlePlayButtonClick = () => {
    props.handlePlay(props.Song);
  };

  const deleteSong = (songId) => {
    console.log('deleteSong', songId);
    props.deleteSong()
  }

  var obj = {
    song_title: props.Song.name,
    song_artist: props.Song.artist
  }
  if (props.Song.name.length > 14) {
    obj.song_title = props.Song.name.slice(0, 14) + '...'
  }
  if (props.Song.artist.length > 14) {
    obj.song_artist = props.Song.artist.slice(0, 14) + '...'
  }

  const PlaylistItem = styled.div`
    width: 90%;
    background-color: #181C2F;
    color: white;
    margin: 15px;
    vertical-align: middle;
    position: relative;
    height: 50px;
  `;

  const IndexItem = styled.div`
    padding: 15px;
    position: absolute;

  `;

  const SongImg = styled.div`
    position: absolute;
    left: 10%;
    top: 0;
    bottom: 0;
  `;

  const SongName = styled.div`
    padding: 15px;
    position: absolute;
    left: 20%;
    text-overflow: ellipsis;
  `;

  const AddedBy = styled.div`
    padding: 15px;
    position: absolute;
    left: 80%;
  `;

  const SongArtist = styled.div`
    padding: 15px;
    position: absolute;
    left: 40%;
    text-overflow: ellipsis;
  `;

  const UpVote = styled.div`
    padding: 15px;
    position: absolute;
    left: 80%;
  `;

  const DownVote = styled.div`
    padding: 15px;
    position: absolute;
    left: 90%;
  `;

  const Delete = styled.div`
    padding: 15px;
    position: absolute;
    left: 60%;
  `;

  const imgFix = {
    width: '50px'
  }



  return (
    <div>
    <PlaylistItem>
      <IndexItem>
        {props.index}
      </IndexItem>
      <SongImg>
        <img style={imgFix} src={props.Song.image} alt="" />
      </SongImg>
      <SongName>
        {obj.song_title}
      </SongName>
      <AddedBy>
        {props.Song.username}
      </AddedBy>
      <SongArtist>
        {obj.song_artist}
      </SongArtist>
      <Delete>
        <a href='#' onClick={()=>{deleteSong(props.Song._id)}}>Delete</a>
      </Delete>
      <UpVote onClick={handleUpVote} mini={true}>
        +{props.Song.upVoteCount}
      </UpVote>
      <DownVote  onClick={handleDownVote} mini={true} secondary={true}>
        -{props.Song.downVoteCount}
      </DownVote>
    </PlaylistItem>
    </div>
  );
};

export default HostPlaylistEntry;
