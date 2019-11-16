import React, { Component } from 'react';
import NavBar from "./NavBar";

class Users extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div style={{ paddingTop: 100, marginRight: 100, marginLeft: 100, marginBottom: 100, height: window.innerHeight }} >
                    <h1>Hi!</h1>
                </div>
            </div>
        );
    }
}

export default Users;
