import React, { Component } from 'react';
import Dashboard from './dashboard';

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
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default App;
