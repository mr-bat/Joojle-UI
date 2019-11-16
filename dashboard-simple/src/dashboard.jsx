import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import deepPurple from '@material-ui/core/colors/deepPurple';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import NewEvent from './NewEvent';
import Chat from './Chat';
import Card from './Card';
import { baseUrl } from './config';

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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollItemId: null,
      dialogOpen: false,
      chatOpen: false,
      events: [],
      comments: [],
    };
  }
  createNotification = ({data}) => {
    const {message} = data;
    const status = data.status || (data.success ? 'success': 'error');
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
  normalizeEvent = ({participants, pollItems, ...rest}) => ({
    pollTimes: pollItems.map(({beginsAt, until}) => [beginsAt, until]),
    participantEmails: participants && participants.split(','),
    ...rest,
  });
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
    }).then(this.createNotification).then(this.getEvents);
  };
  setVote = ({ verdict, pollItemId }) => {
    axios.post(`${baseUrl}/poll/vote`, {
      verdict,
      pollItemId,
    }, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then(this.createNotification).then(this.getEvents);
  };
  closeEvent = ({eventId, select: pollItemId}) => {
    axios.put(`${baseUrl}/event/close`, {
      eventId, pollItemId,
    }, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then(this.createNotification).then(this.getEvents);
  };
  openEvent = ({eventId}) => {
    axios.put(`${baseUrl}/event/open`, {
      eventId,
    }, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then(this.createNotification).then(this.getEvents);
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
    }).then(this.createNotification).then(this.getComments);
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
    this.setState({ dialogOpen: false, chatOpen: false });
  };
  render() {
    const { classes } = this.props;
    const { dialogOpen, chatOpen, events } = this.state;

    return (
      <div>
        <div style={{marginRight: 50}} >
          <Button variant="contained" color="primary" className={[classes.button, classes.customColor]} onClick={() => this.setState({ dialogOpen: true })}>
            Create
          </Button>
          <Button variant="contained" color="primary" className={[classes.button, classes.customColor]}>
            Logout
          </Button>
        </div>
        <NewEvent open={dialogOpen} handleClose={this.closeDialog} createEvent={this.createEvent} />
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
        <NotificationContainer />
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
