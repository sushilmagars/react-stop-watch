import React from 'react';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
const BUTTONS = require('./constants').actionButtons;

export default class DisplayTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      start: false,
      stop: false,
      reset: false
    };

    this.interval = null;
    this.updateTime = this.updateTime.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.createButtons = this.createButtons.bind(this);
    this.takeAction = this.takeAction.bind(this);
    this.triggerStopWatch = this.triggerStopWatch.bind(this);
    this.stopStopWatch = this.stopStopWatch.bind(this);
    this.resetStopWatch = this.resetStopWatch.bind(this);
  }

  triggerStopWatch() {
    if (this.state.start) {
      this.setState({
        errorMessage: 'Cannot start again since there is already a stop watch running...'
      });

      return;
    }
    
    this.interval = setInterval(this.updateTime, 1000);
    this.setState({start: true, stop: false, reset: false, errorMessage: ''});
  }

  stopStopWatch() {
    if (!this.interval || this.state.stop) {
      this.setState({
        errorMessage: 'Cannot stop since stop watch is not running...',
      });

      return;
    }

    clearInterval(this.interval);
    this.setState({start: false, stop: true, reset: false, errorMessage: ''});
  }

  resetStopWatch() {
    if (!this.interval || this.state.reset) {
      this.setState({
        errorMessage: 'Stop watch is neither running nor stopped'
      });

      return
    }

    clearInterval(this.interval);
    this.setState({start: false, stop: false, reset: true, hours: 0, minutes: 0, seconds: 0, errorMessage: ''});
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

  formatTime() {
    const formattedHours = this.state.hours < 10 ? `0${this.state.hours}` : this.state.hours;
    const formattedMinutes = this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes;
    const formattedSeconds = this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  takeAction(action) {
    switch(action) {
      case 'Start': 
        this.triggerStopWatch();
        break;
      case 'Stop': 
        this.stopStopWatch();
        break;
      case 'Reset': 
        this.resetStopWatch();
        break;
      default:
    }
  }

  createButtons() {
    return BUTTONS
      .map(button => <Button 
        key={button.id} 
        buttonText={button.text}
        buttonClickHandler={this.takeAction}
      />);
  }

  render() {
    return (<div>
      <div className="actions">
        {this.createButtons()}
      </div>
      <ErrorMessage message={this.state.errorMessage} />
      <h1>{this.formatTime()}</h1>
    </div>);
  }
}