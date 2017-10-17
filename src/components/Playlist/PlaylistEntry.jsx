import React from 'react';

// styled-components
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';

//thumbs
import thumbsUp from '../../assets/thmb-up.png';
import thumbsDown from '../../assets/thmb-dwn.png';
import thumbsUpFill from '../../assets/thmb-up-fill.png';
import thumbsDownFill from '../../assets/thmb-dwn-fill.png';

class PlaylistEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUpThumb: thumbsUp,
      currDownThumb: thumbsDown,
      song_title: null,
      song_artist: null
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.trimLargeNames = this.trimLargeNames.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  componentDidMount(){
    this.trimLargeNames();
  }

  handleMouseEnter(thumbType) {
    if (thumbType === 'currUpThumb') {
      this.setState({currUpThumb: thumbsUpFill})
    } else {
      this.setState({currDownThumb: thumbsDownFill})
    }
  }

  handleMouseLeave(thumbType) {
    if (thumbType === 'currUpThumb') {
      this.setState({currUpThumb: thumbsUp})
    } else {
      this.setState({currDownThumb: thumbsDown})
    }
  }


  handleUpVote() {
    this.props.upVote(this.props.Song);
  };

  handleDownVote() {
    this.props.downVote(this.props.Song);
  };

  handlePlayButtonClick() {
    this.props.handlePlay(this.props.Song);
  };

  trimLargeNames() {
    var obj = {
      song_title: this.props.Song.name,
      song_artist: this.props.Song.artist
    }
    if (this.props.Song.name.length > 14) {
      obj.song_title = this.props.Song.name.slice(0, 14) + '...'
    }
    if (this.props.Song.artist.length > 14) {
      obj.song_artist = this.props.Song.artist.slice(0, 14) + '...'
    }
    this.setState(obj);
  }


  render() {

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
          {this.props.index}
        </IndexItem>
        <SongImg>
          <img style={imgFix} src={this.props.Song.image} alt="" />
        </SongImg>
        <SongName>
          {this.state.song_title}
        </SongName>
        <AddedBy>
          {this.props.Song.username}
        </AddedBy>
        <SongArtist>
          {this.state.song_artist}
        </SongArtist>
        <UpThumb onClick={this.handleUpVote}
                 src={this.state.currUpThumb}
                 onMouseEnter={() => this.handleMouseEnter('currUpThumb')}
                 onMouseLeave={() => this.handleMouseLeave('currUpThumb')}
                 mini={true}
                 ></UpThumb>
        <UpVote onClick={this.handleUpVote}
                mini={true}
                onMouseEnter={() => this.handleMouseEnter('currUpThumb')}
                onMouseLeave={() => this.handleMouseLeave('currUpThumb')}>
          +{this.props.Song.upVoteCount}
        </UpVote>
        <DownThumb onClick={this.handleDownVote}
                   src={this.state.currDownThumb}
                   onMouseEnter={() => this.handleMouseEnter()}
                   onMouseLeave={() => this.handleMouseLeave()}
                   mini={true}
                   ></DownThumb>
        <DownVote  onClick={this.handleDownVote}
                   mini={true}
                   secondary={true}
                   onMouseEnter={() => this.handleMouseEnter()}
                   onMouseLeave={() => this.handleMouseLeave()}>
          -{this.props.Song.downVoteCount}
        </DownVote>
      </PlaylistItem>
      </div>
    );
  }
};

export default PlaylistEntry;
