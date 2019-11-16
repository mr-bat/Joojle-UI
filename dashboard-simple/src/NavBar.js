import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import NewEvent from "./NewEvent";
import deepPurple from "@material-ui/core/colors/deepPurple";
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import axios from "axios";
import {baseUrl} from "./config";
import {createNotification} from "./App";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        float: 'right',
    },
    input: {
        display: 'none',
    },
    customColor: {
        color: theme.palette.getContrastText(deepPurple[ 400 ]),
        backgroundColor: deepPurple[ 400 ],
        '&:hover': {
            backgroundColor: deepPurple[ 600 ],
        },
    }
});

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
        }
    }
    normalizeEvent = event => event;
    createEvent = event => {
        this.closeDialog();
        console.log(event);
        const finalEvent = this.normalizeEvent(event);
        axios.post(`${baseUrl}/event`, {
            ...finalEvent,
        }, {
            headers: {
                Authorization: 'Bearer ' + document.cookie.substring(6),
            },
        }).then(createNotification).then(this.props.onUpdate);
    };
    render() {
        const { classes } = this.props;
        const { dialogOpen } = this.state;

        return (
            <div style={{marginRight: 50}} >
                <Button variant="contained" color="primary" className={[classes.button, classes.customColor]} onClick={() => this.setState({ dialogOpen: true })}>
                    Create
                </Button>
                <Button variant="contained" color="primary" className={[classes.button, classes.customColor]}>
                    Logout
                </Button>
                <NewEvent
                    open={dialogOpen}
                    handleClose={() => this.setState({ dialogOpen: false })}
                    createEvent={this.createEvent}
                />
            </div>
        );
    }
}

NavBar.propTypes = {
    onUpdate: PropTypes.func,
};

NavBar.defaultProps = {
    onUpdate: null,
};

export default withStyles(styles)(NavBar);
