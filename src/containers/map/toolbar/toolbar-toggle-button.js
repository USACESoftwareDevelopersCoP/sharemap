import React from 'react';
import ToolbarButton from './toolbar-button';

class ToggleButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isConfirming: false
    }
    this.toggleIsConfirming = this.toggleIsConfirming.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  toggleIsConfirming(){
    this.setState({
      isConfirming: !this.state.isConfirming
    })
  }

  confirm(){
    const { onClick } = this.props;
    this.setState({
      isConfirming: false
    }, () => {
      if(onClick && typeof onClick === 'function') onClick();
    })
  }

  render(){
    const { isConfirming } = this.state;
    const { iconClass, text } = this.props;

    if(isConfirming){
      return (
        <div className="btn-group">
          <button 
            className="btn btn-secondary"
            onClick={ this.toggleIsConfirming }
          >
            <i className="ms ms-minus" /> { text ? 'Cancel' : ''}
          </button>
          <button 
            className="btn btn-danger"
            onClick={ this.confirm }
          >
            <i className="ms ms-plus" /> { text ? 'Confirm' : ''}
          </button>
        </div>
      )
    }else{
      return (
        <ToolbarButton 
          onClick={ this.toggleIsConfirming }
          iconClass={ iconClass }
          text={ text }
        />
      )
    }
  }
}

export default ToggleButton;