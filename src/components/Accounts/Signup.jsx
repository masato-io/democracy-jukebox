import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  // handleChangeSelect(event, index, value) => this.setState({username});
  handleChangeSelect(event, index, value) {
    this.setState({username: value});
  }

  handleChange(e) {
    // let newState = {};
    // newState[e.target.name] = e.target.value;
    // this.setState(newState);
    this.setState({username: e.target.value})
  }

  signUp(e) {
    let newUser = {};
    newUser.username = this.state.username;
    axios.post(`${window.server}/signup`, newUser).then(response => {
      this.props.history.push('/');
    });
  }

  render() {
    const SignupBackground = styled.div`
      background: #ffffff;
    `;
    return (
        <SignupBackground>
          <h4>Enter your name or ...</h4>
          <TextField
            onChange={this.handleChange}
            value={this.state.username}
            name='username'
            hintText='Username'
            disabled={false}
            floatingLabelText="Enter a fun username"
          />

          <br />

          <h4>Pick a name from Happy Days</h4>
          <SelectField
            floatingLabelText="Username"
            onChange={this.handleChangeSelect}
            value={this.state.username}
            hintText="Username"
          >
            <MenuItem value='Richie' primaryText='Richie' />
            <MenuItem value='Potsie' primaryText='Potsie' />
            <MenuItem value='Joanie' primaryText='Joanie' />
          </SelectField>
          <br />

          <br />
          <br />
          <FlatButton onClick={this.signUp} label="Sign Up" />
        </SignupBackground>
    );
  }
}

export default Signup;
