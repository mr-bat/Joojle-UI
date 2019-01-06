import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import xrange from 'xrange';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/ThumbDown';
import Icon from '@material-ui/icons/ThumbUp';
import Select from '@material-ui/core/Select';
import { convertToText } from 'number-to-text';
import 'number-to-text/converters/en-us';

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit,
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

class DetailedExpansionPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      vote: 0,
    };
  }
  fixDescription = description => {
    return description.length < 35 ? description : description.substring(0, 30)+'...';
  };
  renderOptions = (Upvote, Downvote, isFinal, pollItemId) => (
    <div className={classNames(this.props.classes.column, this.props.classes.helper)}>
      <Button
        variant="contained"
        color="secondary"
        className={this.props.classes.button}
        onClick={() => this.props.setVote({ verdict: 'decline', pollItemId })}
        disabled={isFinal}
      >
        {Downvote}
        <DeleteIcon className={this.props.classes.rightIcon} />
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={this.props.classes.button}
        onClick={() => this.props.setVote({ verdict: 'accept', pollItemId })}
        disabled={isFinal}
      >
        {Upvote}
        <Icon className={this.props.classes.rightIcon}>send</Icon>
      </Button>
    </div>
  );
  renderNotFinalCard = () => (
    <div style={{ height: 'auto' }} >
      <ExpansionPanelDetails className={this.props.classes.details}>
        <div className={this.props.classes.column}>
          <Typography className={this.props.classes.secondaryHeading}>{this.props.description}</Typography>
        </div>
        <div className={this.props.classes.column}>
          <Typography className={this.props.classes.heading}>{this.props.creator}</Typography>
        </div>
        <div className={this.props.classes.column}>
          <Select
            value={this.state.select}
            onChange={e => this.setState({ select: e.target.value })}
          >
            {xrange(this.props.pollItems.length).map(idx =>
              <MenuItem value={idx}>{convertToText(idx + 1)}</MenuItem>
            )}
          </Select>
        </div>
      </ExpansionPanelDetails>
      {this.props.pollItems.map(({startDate, endDate, acceptCount, declineCount, _id: poll}, idx) => (
        <ExpansionPanelDetails className={this.props.classes.details}>
          <Typography className={this.props.classes.heading}>{idx + 1}:</Typography>
          <div className={this.props.classes.column}>
            <TextField
              disabled
              label="Begins at"
              type="datetime-local"
              defaultValue={startDate.substring(0, 16)}
              className={this.props.classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={this.props.classes.column}>
            <TextField
              disabled
              label="Until"
              type="datetime-local"
              defaultValue={endDate.substring(0, 16)}
              className={this.props.classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          {this.renderOptions(acceptCount, declineCount, false, poll)}
        </ExpansionPanelDetails>
      ))}
    </div>
  );
  renderFinalCard = () => (
    <ExpansionPanelDetails className={this.props.classes.details}>
      <div className={this.props.classes.column}>
        <Typography className={this.props.classes.secondaryHeading}>{this.props.description}</Typography>
      </div>
      <div className={this.props.classes.column}>
        <TextField
          disabled
          label="Begins at"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          className={this.props.classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        /><TextField
        disabled
        label="Until"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={this.props.classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>
      {this.renderOptions(this.props.upvote, this.props.downvote, true, this.props.pollItemId)}
    </ExpansionPanelDetails>
  );
  render() {
    const {classes, title, description, notFinal} = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{title}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{this.fixDescription(description)}</Typography>
            </div>
          </ExpansionPanelSummary>
          {notFinal ? this.renderNotFinalCard(): this.renderFinalCard()}
          <Divider/>
          {notFinal ? <ExpansionPanelActions style={{ height: 'auto' }} >
            <Button size="small" color="primary">
              Finailize
            </Button>
          </ExpansionPanelActions> :
          <ExpansionPanelActions>
            <Button size="small" color="primary">
              Change Schedule
            </Button>
          </ExpansionPanelActions>}
        </ExpansionPanel>
      </div>
    );
  }
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  setVote: PropTypes.func.isRequired,
};

export default withStyles(styles)(DetailedExpansionPanel);
