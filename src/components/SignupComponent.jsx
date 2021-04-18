import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert';

import SignupService from "../service/SignupService"

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class SignupComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      username:'',
      password:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;
  
    this.setState({
        [inputName] : inputValue
    });        
}

  handleSubmit(event) {
    event.preventDefault();
    const signupRequest = Object.assign({}, this.state);

    this.setState({
      message: "",
      loading: true
    });

    console.log('signupRequest.email: '+signupRequest.email);
    console.log('signupRequest.username: '+signupRequest.username);
    console.log('signupRequest.password: '+signupRequest.password);

    Alert.close();
    SignupService.register(signupRequest)
        .then(response => {
            console.log('Registration is successful!');
            Alert.success('Registration is successful!', {
              effect: 'genie'
            });
        }).catch(error => {
            console.log('Error signing up! '+error.response.data.message);
            Alert.error('Error signing up! '+error.response.data.message, {
                effect: 'genie'});
            
    });
  }
  
  render(){
    return (
      <div>
        <header>
        <h1>Signup</h1>
        <div><Alert id='signupAlert'/></div>
        <form onSubmit={this.handleSubmit}>
          <div >
            <input type="email" name="email" 
              placeholder="Email"
              value={this.state.email} onChange={this.handleInputChange} required/>
          </div>
          <div >
            <input type="username" name="username" 
              placeholder="Username"
              value={this.state.username} onChange={this.handleInputChange} required/>
          </div>
          <div >
            <input type="password" name="password" 
              placeholder="Password"
              value={this.state.password} onChange={this.handleInputChange} required/>
          </div>
          <div> 
            <button type="submit">Register</button>
          </div>
          <span >Already registered? <Link to="/">Login here</Link></span>
        </form>
        </header>
      </div>
    );
  }
}
export default SignupComponent