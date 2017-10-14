import React from 'react';
import HostPlaylist from './HostPlaylist.jsx';

class Dashboard extends React.Component {
  constructor (props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <HostPlaylist />
      </div>
    )
  }
}

export default Dashboard;