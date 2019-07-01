import React from 'react';

export default class DisplayTime extends React.Component {
  constructor() {
    super();
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    this.interval = null;
    this.updateTime = this.updateTime.bind(this);
  }
  
  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  updateTime() {
    let {hours, minutes, seconds} = this.state;
    let newHours, newMinutes;
    let newSeconds = Number(seconds) + 1;

    if (newSeconds >= 60) {
      newMinutes = minutes + 1;

      if (newMinutes >= 60) {
        newHours = hours + 1;

        if (newHours >= 24) {
          newHours = hours + 1;
        }
      } else {
        newHours = hours >= 0 ? hours : 0;
      }
    } else {
      newHours = hours >= 0 ? hours : 0;
      newMinutes = minutes >= 0 ? minutes : 0;
    }

    this.setState({
      hours: newHours >= 24 ? 0 : newHours,
      minutes: newMinutes >= 60 ? 0 : newMinutes,
      seconds: newSeconds >= 60 ? 0 : newSeconds,
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</h1>
    );
  }
}