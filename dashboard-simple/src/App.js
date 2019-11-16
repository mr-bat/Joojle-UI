import React, {Component} from 'react';
import Dashboard from './dashboard';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {NotificationContainer, NotificationManager} from "react-notifications";
import Users from "./Users";

export const createNotification = ({data}) => {
    const {message} = data;
    const status = data.status || (data.success ? 'success' : 'error');
    console.log('notift: ', data);
    console.log('st: ', status);

    switch (status) {
        case 'info':
            NotificationManager.info(message);
            break;
        case 'success':
            NotificationManager.success(message);
            break;
        case 'warning':
            NotificationManager.warning(message, '', 3000);
            break;
        case 'error':
            NotificationManager.error(message, 'Click me!', 5000, () => {
                alert('callback');
            });
            break;
    }
};

class App extends Component {
  render() {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0}}>
        {/*<div style={{ position: 'fixed', top: 10, right: 120, display: 'flex', flexDirection: 'row', fontFamily: 'Arial' }}>*/}
          {/*<h2 style={{ flex: '1 0 100px' }}>*/}
            {/*<a href="" style={{ borderBottom: 0 }}>Logout</a>*/}
          {/*</h2>*/}
        {/*</div>*/}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%'}}>
            <Router>
                <Switch>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Dashboard />
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
