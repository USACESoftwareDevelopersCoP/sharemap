import React from 'react';
import ToolbarButton from './toolbar-button';

class Toolbar extends React.Component{
  render(){
    const { goHomeFn } = this.props;
    return (
      <div
        style={{
          position:'absolute',
          top: 20,
          left: 20,
          right: 20
        }}
      >

        <div className="float-right">
          <ToolbarButton 
            onClick={ goHomeFn }
            text="Go Home"
          />
        </div>

      </div>
    )
  }
}

export default Toolbar;