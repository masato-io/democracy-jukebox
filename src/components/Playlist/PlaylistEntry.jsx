import React from 'react';

// styled-components
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';

//thumbs
import thumbsUp from '../../assets/thmb-up.png';
import thumbsDown from '../../assets/thmb-dwn.png';

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

  console.log('JUST PROPS', props)
  // console.log('THIS DOT PROPS', this.props)
  console.log('THIS AND ONLY THIS', this)

  const PlaylistItem = styled.div`
    width: 90%;
    background-color: #181c2f;
    color: white;
    margin: 15px;
    vertical-align: middle;
    position: relative;
    height: 50px;
  `;

  const IndexItem = styled.div`
    padding: 16px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  const UpThumb = styled.img`
    padding: 15px 10px 15px 15px;
    position: absolute;
    left: 75%;
    max-width: 20px;
  `;

  const DownThumb = styled.img`
    padding: 20px 25px 15px 25px;
    position: absolute;
    left: 85%;
    max-width: 20px;
  `;

  const imgFix = {
    width: '50px'
  };

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
      <UpThumb onClick={handleUpVote} mini={true} src= {thumbsUp}></UpThumb>
      <UpVote onClick={handleUpVote} mini={true}>
        +{props.Song.upVoteCount}
      </UpVote>
      <DownThumb onClick={handleDownVote} mini={true} src= {thumbsDown}></DownThumb>
      <DownVote  onClick={handleDownVote} mini={true} secondary={true}>
        -{props.Song.downVoteCount}
      </DownVote>
    </PlaylistItem>

    </div>
  );
};

export default PlaylistEntry;
