import React from 'react';
import { Link } from 'react-router-dom';
// material-ui
import { grey50 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AddSongs from '../containers/Search/AddSong.jsx';
// styled-components
import styled from 'styled-components';

const Header = styled.div`
  background: #252d47;
  height: 64px;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
`;

const Left = styled.div`
  background: #252d47;
  height: 64px;
  color: #fff;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  > h1 {
    font-size: 16px;
    margin: 0 0 0 12px;
  }
`;
const Right = styled.div``;

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedItem: ''
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const navbarStyle = {
      zIndex: '1',
      backgroundColor: '#181C2F'
    };
    return (
      <div>
        <Header>
          <Left>
            <NavigationMenu color={grey50} onClick={this.handleToggle} />
            <h1>JukeBox</h1>
          </Left>
          <Right>
            <AddSongs />
          </Right>
        </Header>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem onClick={this.handleClose}>
            <Link to="/">Playlist</Link>
          </MenuItem>
          {/* <MenuItem onClick={this.handleClose}>
            <Link to="/search">Search</Link>
          </MenuItem> */}
          <MenuItem onClick={this.handleClose}>
            <Link to="/signup">Sign Up</Link>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Navbar;
