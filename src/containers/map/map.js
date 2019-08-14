import React from 'react';
import { connect } from 'redux-bundler-react';
import OlMap from './ol-map';
import Toolbar from './toolbar/toolbar';

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
        <OlMap />
        <Toolbar goHomeFn={ this.goHome }/>
      </div>
    )
  }
}

export default connect(
  'doUpdateUrl',
  'selectAuthIsLoggedIn',
  Map
);