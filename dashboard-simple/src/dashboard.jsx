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
    }).then((data) => console.log('axios: ', data));
  };
  createEvent = event => {
    axios.post('http://localhost:3000/event', {
      headers: {
        Authorization: 'Bearer ' + document.cookie.substring(6),
      },
    }).then((data) => console.log('axiosPost ', data));
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
        <NewEvent open={dialogOpen} handleClose={() => this.setState({ dialogOpen: false })}/>
        <div style={{ paddingTop: 100, marginRight: 100, marginLeft: 100, marginBottom: 100, height: window.innerHeight }} >
          <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
            {this.state.events.map(e => <Card />)}
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
