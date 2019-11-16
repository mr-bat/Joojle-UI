import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import Chat from './Chat';
import Card from './Card';
import {baseUrl} from './config';
import NavBar from "./NavBar";
import {createNotification} from "./App";

const styles = theme => ({
});

class Dashboard extends Component {
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
    axios.get(`${baseUrl}/event`, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      }
    }).then(({data}) => {
      this.setState({events: data.result.map(({event, poll, pollItems}) => ({
          ...event,
          notFinal: (event.state === 'Open'),
          pollItems,
        }))});
    });
  };

  setVote = ({ verdict, pollItemId }) => {
    axios.post(`${baseUrl}/poll/vote`, {
      verdict,
      pollItemId,
    }, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then(createNotification).then(this.getEvents);
  };

  closeEvent = ({eventId, select: pollItemId}) => {
    axios.put(`${baseUrl}/event/close`, {
      eventId, pollItemId,
    }, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then(createNotification).then(this.getEvents);
  };

  openEvent = ({eventId}) => {
    axios.put(`${baseUrl}/event/open`, {
      eventId,
    }, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then(createNotification).then(this.getEvents);
  };

  openChat = (pollItemId) => {
    this.setState({pollItemId, chatOpen: true}, this.getComments);
  };

  handleSendComment = (text) => {
    const {pollItemId} = this.state;
    axios.post(`${baseUrl}/poll_item/comment`, {
      text,
      pollItemId,
    }, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then(createNotification).then(this.getComments);
  };

  getComments = () => {
    const {pollItemId} = this.state;
    axios.post(`${baseUrl}/poll_item/comment/fetch`, {
      pollItemId,
    }, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then(({data}) => this.setState({comments: data.comments.comments}));
  };

  componentDidMount() {
    this.getEvents();
  }
  closeDialog = () => {
    this.setState({ chatOpen: false });
  };
  render() {
    const { chatOpen, events } = this.state;

    return (
      <div>
        <NavBar onUpdate={this.getEvents} />
        <Chat open={chatOpen} handleClose={this.closeDialog} onSend={this.handleSendComment} comments={this.state.comments} />
        <div style={{ paddingTop: 100, marginRight: 100, marginLeft: 100, marginBottom: 100, height: window.innerHeight }} >
          <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
            {events.map(e =>
              <Card
                openChat={this.openChat}
                startDate={e.startDate}
                endDate={e.endDate}
                eventId={e._id}
                creator={e.owner.username}
                title={e.title}
                pollItems={e.pollItems}
                description={e.description || ''}
                notFinal={e.notFinal}
                setVote={this.setVote}
                onClose={this.closeEvent}
                onOpen={this.openEvent}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
