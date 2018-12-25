import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import deepPurple from '@material-ui/core/colors/deepPurple';
import NewEvent from './NewEvent';
import Card from './Card';

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
    axios.get('http://localhost:3000/event', {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      }
    }).then(({data}) => {
      this.setState({events: data.events});
      console.log('axios: ', data);
    });
  };
  normalizeEvent = ({participants, beginsAt, until, ...rest}) => ({
    beginsAt: beginsAt && beginsAt.toString(),
    until: until && until.toString(),
    participantEmails: participants && participants.split(','),
    ...rest,
  });
  createEvent = event => {
    console.log(event);
    const finalEvent = this.normalizeEvent(event);
    console.log(finalEvent);
    event.participants =
    axios.post('http://localhost:3000/event', {
      ...finalEvent,
    }, {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then((data) => console.log('axiosPost ', data)).then(this.getEvents);
  };

  componentDidMount() {
    this.getEvents();
  }
  render() {
    const { classes } = this.props;
    const { dialogOpen } = this.state;

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
        <NewEvent open={dialogOpen} handleClose={() => this.setState({ dialogOpen: false })} createEvent={this.createEvent} />
        <div style={{ paddingTop: 100, marginRight: 100, marginLeft: 100, marginBottom: 100, height: window.innerHeight }} >
          <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
            {this.state.events.map(e => <Card title={e.title} description={e.description} />)}
            <Card
              title="Let's gather"
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer eget aliquet nibh praesent. Faucibus ornare suspendisse sed nisi lacus. Habitant morbi tristique senectus et netus. Pellentesque massa placerat duis ultricies lacus sed.'
              notFinal
              Upvote={2}
              Downvote={1}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
