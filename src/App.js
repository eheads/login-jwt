
import './App.css';
import React, { Component } from 'react';

import { withRouter } from 'react-router';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from "./components/HomeComponent";
import Login from "./components/LoginComponent";
import Register from "./components/SignupComponent";

class App extends Component {
  render(){
    return (
      <div>
        <header className="container">
           <Router>          
            <Switch>
               <Route path="/" exact ><Login/></Route>
               <Route path="/home" exact ><Home/></Route>
               <Route path="/signup"><Register/></Route>
             </Switch>
           </Router>
        </header>
            
        
     </div>
    );
  }
}
export default withRouter(App);