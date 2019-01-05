import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import deepPurple from '@material-ui/core/colors/deepPurple';
import NewEvent from './NewEvent';
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
      dialogOpen: false,
      events: [],
    };
  }
  getEvents = () => {
    axios.get(`${baseUrl}/event`, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      }
    }).then(({data}) => {
      console.log('axiosGet events: ', data);
      this.setState({events: data.result.map(({event, poll, pollItems}) => ({
          ...event,
          notFinal: (poll.status === 'Open'),
          pollItems,
        }))});
    });
  };
  normalizeEvent = ({participants, beginsAt, until, ...rest}) => ({
    pollTimes: [[beginsAt, until]],
    participantEmails: participants && participants.split(','),
    ...rest,
  });
  createEvent = event => {
    this.closeDialog();
    const finalEvent = this.normalizeEvent(event);
    // event.participants =
    axios.post(`${baseUrl}/event`, {
      ...finalEvent,
    }, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then((data) => console.log('axiosPost create Events:', data)).then(this.getEvents);
  };
  setVote = ({ verdict, pollItemId }) => {
    axios.post(`${baseUrl}/poll/vote`, {verdict, pollItemId}).then(this.getEvents);
  };

  componentDidMount() {
    this.getEvents();
  }
  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };
  render() {
    const { classes } = this.props;
    const { dialogOpen, events } = this.state;
    // console.log('events: ', events);

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
        <div style={{ paddingTop: 100, marginRight: 100, marginLeft: 100, marginBottom: 100, height: window.innerHeight }} >
          <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
            {events.map(e =>
              <Card
                creator={e.owner.username}
                title={e.title}
                pollItems={e.pollItems}
                description={e.description}
                notFinal={e.notFinal}
                setVote={this.setVote}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
