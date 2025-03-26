//react-error-boundary?

class ErrorBoundaryWithNotification extends React.Component {
  state = { errorMessage null };

  static getDerivedStateFromError(error) {
    return { errorMessage error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.log(Error, error, Info, errorInfo);
  }

  render() {
    if (this.state.errorMessage) {
      return (
        div style={{ background red, color white, padding 10px }}
          Error {this.state.errorMessage}
        div
      );
    }
    return this.props.children;
  }
}