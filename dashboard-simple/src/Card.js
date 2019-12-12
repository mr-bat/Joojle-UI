import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/ThumbDown';
import MaybeIcon from '@material-ui/icons/SentimentSatisfied';
import MessageIcon from '@material-ui/icons/SmsOutlined';
import Icon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import 'number-to-text/converters/en-us';
import {createNotification, summarizeIfLong} from "./utils";
import {Avatar} from "@material-ui/core";
import axios from "axios";
import {baseUrl} from "./config";

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit,
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class Card extends Component {
  constructor(props) {
    super(props);
    this.state={
      invitee: null,
      invitations: [],
      yes: 0,
      no: 0,
      maybe: 0,
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  respondToInvitation = message => {
    axios.put(`${baseUrl}/invitations/${this.props.invitationId}`, null, { params: {
      "invitation[response]": message,
    }}).then(this.fetchInvitees);
  };
  inviteUser = () => {
    axios.post(`${baseUrl}/events/${this.props.eventId}/invitations`, null, { params: {
      "invitation[user_id]": this.state.invitee,
    }}).then(() => {
      this.setState({ invitee: null });
      createNotification('success', 'User added');
      this.fetchInvitees();
    });
  };
  fetchInvitees = () => {
    axios.get(`${baseUrl}/events/${this.props.eventId}/invitations`).then(({data}) => {
      const { invitations, users } = data;
      const newInvitations = invitations.map(invitation =>
          ({ ...invitation, user: users.find(({id}) => id === invitation.user_id )}));
      const yes = invitations.filter(({ response }) => response === 'yes').length;
      const no = invitations.filter(({ response }) => response === 'no').length;
      const maybe = invitations.filter(({ response }) => response === 'maybe').length;

      this.setState({ invitations: newInvitations, yes, no, maybe });
    });
  };
  deleteInvitation = id => {
    axios.delete(`${baseUrl}/invitations/${id}`).then(() => {
      const { invitations } = this.state;
      this.setState({ invitations: invitations.filter(invitation => id !== invitation.id)});
    });
  };
  onExpandationChange = (event, expanded) => {
    if (expanded)
      this.fetchInvitees();
  };
  renderOptions = (isFinal) => (
    <div className={classNames(this.props.classes.column, this.props.classes.helper)}>
      <Button
        variant="contained"
        color="secondary"
        className={this.props.classes.button}
        onClick={() => this.respondToInvitation('no')}
        disabled={isFinal}
      >
        {this.state.no}
        <DeleteIcon className={this.props.classes.rightIcon} />
      </Button>
      <Button
        variant="contained"
        className={this.props.classes.button}
        onClick={() => this.respondToInvitation('maybe')}
        disabled={isFinal}
      >
        {this.state.maybe}
        <MaybeIcon className={this.props.classes.rightIcon} />
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={this.props.classes.button}
        onClick={() => this.respondToInvitation('yes')}
        disabled={isFinal}
      >
        {this.state.yes}
        <Icon className={this.props.classes.rightIcon}>send</Icon>
      </Button>
      <IconButton onClick={() => this.props.openChat(this.props.eventId)} color="primary" className={this.props.classes.button} aria-label="Add to shopping cart">
        <MessageIcon className={this.props.classes.rightIcon} />
      </IconButton>
    </div>
  );
  renderFinalCard = () => (
    <ExpansionPanelDetails className={this.props.classes.details}>
      <div className={this.props.classes.column}>
        <Typography className={this.props.classes.secondaryHeading}>by {this.props.creator}</Typography>
        <Typography className={this.props.classes.secondaryHeading}>{this.props.description}</Typography>
      </div>
      <div className={this.props.classes.column}>
        <TextField
          disabled
          label="Begins at"
          type="datetime-local"
          defaultValue={this.props.startDate.substring(0, 16)}
          className={this.props.classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        /><TextField
          disabled
          label="Until"
          type="datetime-local"
          defaultValue={this.props.endDate.substring(0, 16)}
          className={this.props.classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      {this.renderOptions(!this.props.invitationId)}
    </ExpansionPanelDetails>
  );
  render() {
    const { classes, location, title } = this.props;
    const { invitations } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel onChange={this.onExpandationChange}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{title}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{summarizeIfLong(location)}</Typography>
            </div>
          </ExpansionPanelSummary>
          {this.renderFinalCard()}
          <Divider/>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography className={classes.secondaryHeading}>Invitees:</Typography>
            </ExpansionPanelSummary>
            <div className={classes.chipContainer}>
              {invitations.map(({user, id}) =>
                  (!!this.props.invitationId)?
                  <Chip
                      disabled={!!this.props.invitationId}
                      avatar={<Avatar>{user.name[0] || '!'}</Avatar>}
                      label={user.name}
                      className={classes.chip}
                  /> :
                  <Chip
                      disabled={!!this.props.invitationId}
                      avatar={<Avatar>{user.name[0] || '!'}</Avatar>}
                      label={user.name}
                      onDelete={() => this.deleteInvitation(id)}
                      className={classes.chip}
                  />
              )}
            </div>
            {!this.props.invitationId && <ExpansionPanelActions>
              <TextField
                  id="standard-name"
                  placeholder="User Id"
                  className={classes.textField}
                  value={this.state.invitee}
                  onChange={this.handleChange('invitee')}
                  margin="normal"
              />
              <Button onClick={this.inviteUser} size="small" color="primary">
                invite
              </Button>
            </ExpansionPanelActions>}
          </ExpansionPanel>
        </ExpansionPanel>
      </div>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
  setVote: PropTypes.func.isRequired,
  invitationId: PropTypes.number.isRequired,
};

export default withStyles(styles)(Card);
