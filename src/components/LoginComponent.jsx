import React, { Component } from 'react';
import Logo from '../logo.svg';

import { Link, useHistory } from 'react-router-dom';
import Alert from 'react-s-alert';

import LoginService from '../service/LoginService';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


class LoginComponent extends Component {
    componentDidMount() {
        
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
        const loginRequest = Object.assign({}, this.state);
      
        console.log('loginRequest.username: '+loginRequest.username);
        console.log('loginRequest.password: '+loginRequest.password);

        this.setState({
          message: "",
          loading: true
        });
    
        LoginService.authenticate(loginRequest)
             .then(response => {
                console.log('response jwt: '+response.data.token);
                 
                sessionStorage.setItem("token", response.data.token);
                return this.handleWelcomePage(response.data.token);

             }).catch(error => {
                 console.log('Oops! Something went wrong. Please try again! '+error);
                 Alert.error('Oops! Something went wrong. Please try again!', {
                    effect: 'genie'});
        });
    }

    handleWelcomePage(token){
        //let history = useHistory();
        LoginService.welcome(token)
        .then(response => {
            console.log('Accessing /welcome api..');
            window.location.href = "/home";
            //useHistory.push("/home");
            
        }).catch(error =>{
            LoginService.signOut();
            console.log('Oops! Something went wrong. Please try again! '+error);
        })

        
    }
    
    render() {
        return (
            <div>
                <img src={Logo} className="App-logo" alt="logo" />
                <div>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                      
                      {/* <div >
                          <input type="email" name="email" 
                               placeholder="Email"
                              value={this.state.email} onChange={this.handleInputChange} required/>
                      </div> */}
                      
                      <div><Alert /></div>
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
                          <button type="submit">Login</button>
                      </div>
                      <span >New user? <Link to="/signup">Sign up now</Link></span>
                  </form>
                  <div >
                  </div>
                  
                </div>
            </div>
            
        );
    }
}

export default LoginComponent