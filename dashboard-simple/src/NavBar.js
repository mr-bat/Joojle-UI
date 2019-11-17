import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import NewEvent from "./NewEvent";
import deepPurple from "@material-ui/core/colors/deepPurple";
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import axios from "axios";
import {baseUrl} from "./config";
import {createNotification} from "./utils";
import {Link} from "react-router-dom";

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
    normalizeEvent = event => {
        const { beginsAt, until } = event.pollItems[0];
        console.log(beginsAt, until);

        return ({
            'event[name]': event.title,
            'event[description]': event.description,
            'event[location]': event.location,
            'event[start_time(1i)]': beginsAt.getFullYear(),
            'event[start_time(2i)]': beginsAt.getMonth(),
            'event[start_time(3i)]': beginsAt.getDate(),
            'event[start_time(4i)]': beginsAt.getHours(),
            'event[start_time(5i)]': beginsAt.getMinutes(),
            'event[end_time(1i)]': until.getFullYear(),
            'event[end_time(2i)]': until.getMonth(),
            'event[end_time(3i)]': until.getDate(),
            'event[end_time(4i)]': until.getHours(),
            'event[end_time(5i)]': until.getMinutes(),
            'event[user_id]': this.props.userId,
        });
    };
    createEvent = event => {
        this.setState({ dialogOpen: false });
        console.log(event);
        const finalEvent = this.normalizeEvent(event);
        axios.post(`${baseUrl}/users/${this.props.userId}/events`, null,{
            params: {
                ...finalEvent
            }
        }).then(this.props.onUpdate).then(createNotification);
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
                <Link to='/invitations' >
                    <Button variant="contained" color="primary" className={[classes.button, classes.customColor]}>
                        Invitations
                    </Button>
                </Link>
                <Link to='/' >
                    <Button variant="contained" color="primary" className={[classes.button, classes.customColor]}>
                        My Events
                    </Button>
                </Link>
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
    userId: PropTypes.number.isRequired,
};

NavBar.defaultProps = {
    onUpdate: null,
};

export default withStyles(styles)(NavBar);
