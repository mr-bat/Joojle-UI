import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from './Card';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
    marginRight: 50,
  },
  input: {
    display: 'none',
  },
});

class Dashboard extends Component {
  constructor() {
    super();
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="contained" color="primary" className={classes.button}>
          Create
        </Button>
        <div style={{ paddingTop: 100, marginRight: 100, marginLeft: 100 }} >
          <Card
            title="Let's gather"
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer eget aliquet nibh praesent. Faucibus ornare suspendisse sed nisi lacus. Habitant morbi tristique senectus et netus. Pellentesque massa placerat duis ultricies lacus sed.'
            notFinal
            Upvote={2}
            Downvote={1}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
