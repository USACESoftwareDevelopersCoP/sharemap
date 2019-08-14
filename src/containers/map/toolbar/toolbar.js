import React from 'react';
import ToolbarButton from './toolbar-button';
import ToggleButton from './toolbar-toggle-button';

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
            iconClass="ms ms-postgis mr-1"
            onClick={ goHomeFn }
            text="Go Home"
          />
        </div>

        <ToolbarButton 
          iconClass="ms ms-select-arrow"
          onClick={ () => { } }
        />

        <ToolbarButton 
          iconClass="ms ms-points"
          onClick={ () => { } }
        />

        <ToolbarButton 
          iconClass="ms ms-line"
          onClick={ () => { } }
        />

        <ToolbarButton 
          iconClass="ms ms-polygon"
          onClick={ () => { } }
        />

        <ToggleButton 
          iconClass="ms ms-transform"
          onClick={() => { window.alert('gonna crush it')}}
        />
      </div>
    )
  }
}

export default Toolbar;