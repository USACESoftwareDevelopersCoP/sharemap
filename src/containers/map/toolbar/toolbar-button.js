import React from 'react';
import classnames from 'classnames';

class ToolbarButton extends React.Component {
  constructor(props){
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent(){
    const { iconClass, text } = this.props;
    if(!iconClass){
      return text;
    }
    return (
      <>
        <i className={iconClass}></i> { text }
      </>
    )
  }

  render(){
    const { active, onClick } = this.props;

    const btnClass = classnames({
      'btn': true,
      'btn-primary': true,
      'active': active,
      'mr-1': true
    })

    return (
      <button 
        onClick={ onClick }
        className={ btnClass }
      >
        {
          this.renderContent()
        }
      </button>
    )
  }
}

export default ToolbarButton;