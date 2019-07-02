import React from 'react';

export default class Counter extends React.Component {
  constructor(props) {
    console.log('Constructor in Counter');
    super(props);
  }

  componentDidMount() {
    console.log('Component did mount in Counter');
  }

  componentWillUnmount() {
    console.log('Component will unmount in Counter');
  }

  render() {
    console.log('Render in Counter');
    return(<div>
      <h1>Counter component is rendered.</h1>
    </div>);
  }
}