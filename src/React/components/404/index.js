import React from 'react';
import { Redirect } from 'react-router-dom';
import Routes from 'config/routesConfig';


class Page404 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectingCountdown: props.timeToRedirect || 0,
    };
  }

  componentDidMount() {
    this.startRedirect(this.props.timeToRedirect);
  }

  startRedirect = (time = 10) => {
    const { redirectTo = Routes.index } = this.props;
    const { redirectingCountdown } = this.state;

    if (redirectingCountdown === 0) {
      return this.setState({ redirect: redirectTo });
    }

    if (redirectingCountdown) {
      return setTimeout(() => {
        this.setState({
          redirectingCountdown: redirectingCountdown - 1,
        }, this.startRedirect);
      }, 1000);
    }

    return this.setState({
      redirectingCountdown: time,
    }, this.startRedirect);
  }

  render() {
    if (this.state.redirect) {
      const { redirectTo, ...props } = this.props;
      return (<Redirect to={this.props.redirectTo} {...props} />);
    }

    return (
      <center style={{ marginTop: 30 }}>
        <h4>Will redirect you on homepage in <b>{this.state.redirectingCountdown}</b> seconds...</h4>
        <h1 style={{ fontSize: '140px', marginTop: 10 }}>404</h1>
      </center>
    )
  }
}

export default Page404;
