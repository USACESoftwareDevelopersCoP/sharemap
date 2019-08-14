import React from 'react';
import { connect } from 'redux-bundler-react';

class OlMap extends React.Component {
  componentDidMount(){
    const { doMapInitialize } = this.props;
    doMapInitialize(this.el);
  }

  render(){
    return (
      <div className="map" ref={(el) => { this.el = el }}></div>
    )
  }
}

export default connect(
  'doMapInitialize',
  OlMap
)