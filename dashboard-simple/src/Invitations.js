import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import PropTypes from "prop-types";
import Chat from './Chat';
import Card from './Card';
import {baseUrl} from './config';
import NavBar from "./NavBar";
import {createNotification} from "./utils";

const styles = theme => ({
});

class Invitations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollItemId: null,
            chatOpen: false,
            events: [],
            comments: [],
        };
    }

    getEvents = () => {
        axios.get(`${baseUrl}/users/${this.props.userId}/invitations`, ).then(({data}) => {
            console.log(data);
            const newEvents = data.events.map(event => ({
                ...event,
                invitation_id: data.invitations.find(({ event_id}) => event.id === event_id).id
            }));
            this.setState({ events: newEvents });
        });
    };

    openChat = (eventId) => {
        this.setState({ chatOpen: true, eventId }, () => this.getComments(eventId));
    };

    handleSendComment = (text) => {
        axios.post(`${baseUrl}/events/${this.state.eventId}/comments`, null, { params: {
            "comment[user_id]": this.props.userId,
            "comment[body]": text,
        }}).then(this.getComments).then(createNotification);
    };

    getComments = () => {
        axios.get(`${baseUrl}/events/${this.state.eventId}/comments`)
            .then(({data}) => this.setState({ comments: data.map(({ body, user_id }) => `${user_id}: ${body}`) }));
    };

    componentDidMount() {
        this.getEvents();
    }
    closeDialog = () => {
        this.setState({ chatOpen: false });
    };
    render() {
        const { chatOpen, events } = this.state;
        const { userId } = this.props;

        return (
            <div>
                <NavBar onUpdate={this.getEvents} userId={userId} />
                <Chat open={chatOpen} handleClose={this.closeDialog} onSend={this.handleSendComment} comments={this.state.comments} />
                <div style={{ paddingTop: 100, marginRight: 100, marginLeft: 100, marginBottom: 100, height: window.innerHeight }} >
                    <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
                        {events.map(e =>
                            <Card
                                openChat={this.openChat}
                                startDate={e.start_time}
                                endDate={e.end_time}
                                eventId={e.id}
                                creator={e.user_id}
                                title={e.name}
                                location={e.location}
                                description={e.description}
                                invitationId={e.invitation_id}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Invitations.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default withStyles(styles)(Invitations);
