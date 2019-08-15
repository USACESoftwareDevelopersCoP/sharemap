import React from 'react';
import { connect } from 'redux-bundler-react';
import ToolbarButton from './toolbar-button';
import ToggleButton from './toolbar-toggle-button';

class Toolbar extends React.Component{
  render(){

    const { 
      goHomeFn,
      drawPoints,
      drawLines,
      drawPolygons,
      drawActiveInteraction,
      drawSelectInteraction,
      doDrawAddInteraction,
      doDrawRemoveInteraction,
      doDrawDeleteSelected
    } = this.props;

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
            iconClass="mdi mdi-home mr-1"
            onClick={ goHomeFn }
            text="Go Home"
          />
        </div>

        <ToolbarButton 
          active={ drawActiveInteraction === drawSelectInteraction }
          iconClass="ms ms-select-arrow"
          onClick={ () => { 
            if(drawActiveInteraction === drawSelectInteraction){
              doDrawRemoveInteraction();
            }else{
              doDrawAddInteraction(drawSelectInteraction);
            }
          }}
        />

        <ToolbarButton 
          active={ drawActiveInteraction === drawPoints }
          iconClass="ms ms-points"
          onClick={ () => { 
            if(drawActiveInteraction === drawPoints){
              doDrawRemoveInteraction();
            }else{
              doDrawAddInteraction(drawPoints);
            }
          }}
        />

        <ToolbarButton 
          active={ drawActiveInteraction === drawLines }
          iconClass="ms ms-line"
          onClick={ () => { 
            if(drawActiveInteraction === drawLines){
              doDrawRemoveInteraction();
            }else{
              doDrawAddInteraction(drawLines);
            }
          }}
        />

        <ToolbarButton 
          active={ drawActiveInteraction === drawPolygons }
          iconClass="ms ms-polygon"
          onClick={ () => { 
            if(drawActiveInteraction === drawPolygons){
              doDrawRemoveInteraction();
            }else{
              doDrawAddInteraction(drawPolygons);
            }
          }}
        />

        <ToggleButton 
          iconClass="mdi mdi-trash-can"
          onClick={ doDrawDeleteSelected }
        />
      </div>
    )
  }
}

export default connect(
  'selectDrawSelectInteraction',
  'selectDrawPoints',
  'selectDrawLines',
  'selectDrawPolygons',
  'selectDrawActiveInteraction',
  'doDrawAddInteraction',
  'doDrawRemoveInteraction',
  'doDrawDeleteSelected',
  Toolbar
);