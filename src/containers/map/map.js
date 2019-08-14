import React from 'react';
import { connect } from 'redux-bundler-react';

class Map extends React.Component {
  constructor(props){
    super(props);
    this.goHome = this.goHome.bind(this);
    if(!props.authIsLoggedIn) this.goHome();
  }

  goHome(){
    const { doUpdateUrl } = this.props;
    doUpdateUrl('/');
  }

  render(){
    return (
      <div>
        <button onClick={ this.goHome } className="btn btn-secondary">
          Go Home
        </button>
      </div>
    )
  }
}

export default connect(
  'doUpdateUrl',
  'selectAuthIsLoggedIn',
  Map
);