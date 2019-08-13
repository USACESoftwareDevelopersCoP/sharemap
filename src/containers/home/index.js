import React from 'react';
import { connect } from 'redux-bundler-react';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.renderActions = this.renderActions.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(){
    const {
      authIsLoggedIn,
      authUsername
    } = this.props;

    if(authIsLoggedIn){
      return `Welcome ${authUsername}!`
    }else{
      return `Click "Login" to get started!`
    }
  }

  renderActions(){
    const { 
      authIsLoggedIn, 
      doAuthLogin,
      doAuthLogout
    } = this.props;

    if(authIsLoggedIn){
      return (
        <button 
          onClick={ doAuthLogout } 
          className="btn btn-primary"
        >Logout</button>
      )
    }else{
      return (
        <button 
          onClick={ doAuthLogin } 
          className="btn btn-success"
        >Login</button>
      )
    }
  }

  render(){
    return (
      <div className="container">
        <div className="card bg-light m-5">
          <div className="card-body">
            <h2>Welcome to Sharemap</h2>
            <div className="float-right">
              {
                this.renderActions()
              }
            </div>
            <div>
              {
                this.renderMessage()
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  'doAuthLogin',
  'doAuthLogout',
  'selectAuthIsLoggedIn',
  'selectAuthUsername',
  Home
);