import React, {Component} from 'react';
import Dashboard from './MyEvents';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {NotificationContainer} from "react-notifications";
import Invitations from "./Invitations";

class App extends Component {
  render() { //783 820
    return (
      <div style={{ position: 'fixed', top: 0, left: 0}}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%'}}>
            <Router>
                <Switch>
                    <Route path="/invitations">
                        <Invitations userId={820} />
                    </Route>
                    <Route path="/">
                        <Dashboard userId={820} />
                    </Route>
                </Switch>
            </Router>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
