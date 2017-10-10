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

  handleChangeSelect(event, index, value) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
    // function(value: any, menuItem: any) => void
    // handleChange = (event, index, value) => this.setState({value});
  }

  handleChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
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
      <div>
        <SignupBackground>
        <h4>Pick a name from Happy Days</h4>
        <SelectField
          floatingLabelText="Username"
          onChange={this.handleChangeSelect}
          value={this.state.username}
          hintText="Username"
        >
          <MenuItem value={1} primaryText='Richie' />
          <MenuItem value={2} primaryText='Potsie' />
          <MenuItem value={3} primaryText='Joanie' />
        </SelectField>
        <br />
        <h4>or use your name ...</h4>
        <TextField
          onChange={this.handleChange}
          name="username"
          value={this.state.username}
          hintText="Username"
        />
        <br />
        <br />
        <FlatButton onClick={this.signUp} label="Sign Up" />
        </SignupBackground>
      </div>
    );
  }
}

export default Signup;
