import React, {Component} from "react";
import { Redirect , useHistory} from 'react-router-dom';
import HomeService from "../service/HomeService";

class HomeComponent extends Component{
    constructor(props){
      super(props);
      this.state = {
          isAuthenticated: HomeService.isAuthenticated()
      };
    }

    render(){
        const{isAuthenticated} = this.state;
        console.log('isAuthenticated: '+isAuthenticated);

        if(!isAuthenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }
        return(
            <div>
                <p>Hi there! Welcome! </p>
            </div>
        ); 
    }   
}

export default HomeComponent