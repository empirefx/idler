import React from 'react';
import './../../../styles/components/CircularProgressTimer.css';

class CircularProgressTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: props.time || 0,
      enemyId: props.enemyId
    };
    this.interval = null;
  }

  componentDidMount() {
    if (this.props.isRunning) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps) {
    const { time, isRunning, enemyId } = this.props;
    const { currentTime } = this.state;

    // Reset timer for new enemy
    if (prevProps.enemyId !== enemyId) {
      this.stopTimer();
      this.setState({ currentTime: time || 0, enemyId });
      if (isRunning && time > 0) {
        this.startTimer();
      }
      return;
    }

    // Reset timer when new time is provided (enemy attack completed)
    if (time !== undefined && time !== prevProps.time && time !== currentTime) {
      this.stopTimer();
      this.setState({ currentTime: time });
      if (isRunning && time > 0) {
        this.startTimer();
      }
      return;
    }

    // Handle timer start/stop
    if (prevProps.isRunning !== isRunning) {
      if (isRunning && currentTime > 0) {
        this.startTimer();
      } else {
        this.stopTimer(); // Stop but keep current time display
      }
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.stopTimer(); // Clear any existing interval
    
    this.interval = setInterval(() => {
      this.setState(prevState => {
        const newTime = Math.max(0, prevState.currentTime);

        if (newTime === 0 && this.props.onComplete) {
          this.props.onComplete();
        }

        return { currentTime: newTime };
      });
    }, 100);
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  render() {
    const {
      size = 30,
      primaryColor = '#5081FF',
      secondaryColor = '#eee',
      isRunning = false
    } = this.props;

    const { currentTime } = this.state;

    const isActive = isRunning && currentTime > 0;
    const opacity = isActive ? 1 : 0.3;
    const currentPrimaryColor = isActive ? primaryColor : '#eee';

    return (
      <div className="circular-progress-timer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          className="timer-static"
          style={{
            "--size": size,
            "--fill-percentage": isActive ? ((2000 - currentTime) / 20) : 100,
            "--primary-color": currentPrimaryColor,
            "--secondary-color": secondaryColor,
            opacity
          }}
        >
        </div>
        <div style={{
          fontSize: '10px',
          color: '#999',
          marginTop: '2px',
          textAlign: 'center'
        }}>
          {Math.round(currentTime)}ms
        </div>
      </div>
    );
  }
}

export default CircularProgressTimer;