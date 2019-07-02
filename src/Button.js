import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  
  handleButtonClick(text) {
    this.props.buttonClickHandler(text);
  }

  render() {
    return (
      <button 
        className="action-buttons"
        onClick={() => this.handleButtonClick(this.props.buttonText)}
      >{this.props.buttonText}</button>
    );
  }
}