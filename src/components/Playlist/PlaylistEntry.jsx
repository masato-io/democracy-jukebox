import React from 'react';

// styled-components
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';

const PlaylistEntry = props => {
  const handleUpVote = () => {
    props.upVote(props.Song);
  };

  const handleDownVote = () => {
    props.downVote(props.Song);
  };

  const handlePlayButtonClick = () => {
    props.handlePlay(props.Song);
  };



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

  const UpThumb = styled.div`
    padding: 15px;
    position: absolute;
    left: 75%;
  `;

  const DownThumb = styled.div`
    padding: 15px;
    position: absolute;
    left: 85%;
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
        {props.Song.name}
      </SongName>
      <AddedBy>
        {props.Song.username}
      </AddedBy>
      <SongArtist>
        {props.Song.artist}
      </SongArtist>
      <UpThumb>
        <img src="../../assets/thmb-up.png" alt="" />
      </UpThumb>
      <UpVote onClick={handleUpVote} mini={true}>
        +{props.Song.upVoteCount}
      </UpVote>
      <DownThumb>
        <img src="../../assets/thmb-dwn.png" alt="" />
      </DownThumb>
      <DownVote  onClick={handleDownVote} mini={true} secondary={true}>
        -{props.Song.downVoteCount}
      </DownVote>
    </PlaylistItem>
    </div>
  );
};

export default PlaylistEntry;
