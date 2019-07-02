import React from 'react';

export default class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h4 className="error-message">{this.props.message}</h4>
    );
  }
}