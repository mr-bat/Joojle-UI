import React, {Component} from 'react';
import Dashboard from './MyEvents';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {NotificationContainer} from "react-notifications";
import Invitations from "./Invitations";
import SignIn from "./SignIn";

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          userId: null,
      };
  }

  render() {
    const { userId } = this.state;
    return (
          <div style={{ position: 'fixed', top: 0, left: 0}}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%'}}>
                {
                    userId ?
                        <Router>
                            <Switch>
                                <Route path="/invitations">
                                    <Invitations userId={userId} />
                                </Route>
                                <Route path="/my-events">
                                    <Dashboard userId={userId} />
                                </Route>
                                <Route path="/my-events">
                                    <Dashboard userId={userId} />
                                </Route>
                                <Route path="/sign-up">
                                    <Dashboard userId={userId} />
                                </Route>
                                <Route path="/">
                                    <Dashboard userId={userId} />
                                </Route>
                            </Switch>
                        </Router> :
                        <SignIn onSend={userId => this.setState({ userId })} />
                }
            </div>
            <NotificationContainer />
          </div>
    );
  }
}

export default App;
