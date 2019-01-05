import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import Icon from '@material-ui/icons/ThumbUp';

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
    flexBasis: '33.33%',
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
  render() {
    const {classes, title, description, notFinal, Upvote, Downvote} = this.props;
    const {vote} = this.state;
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
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{description}</Typography>
            </div>
            <div className={classes.column}>
              <TextField
                disabled
                label="Begins at"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              /><TextField
              disabled
              label="Until"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            </div>
            <div className={classNames(classes.column, classes.helper)}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => this.props.setVote({ verdict: 'Yes', pollItemId: 'null' })}
                disabled={!notFinal}
              >
                {Upvote + (vote > 0 ? 1 : 0)}
                <DeleteIcon className={classes.rightIcon} />
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.props.setVote({ verdict: 'No', pollItemId: 'null' })}
                disabled={!notFinal}
              >
                {Downvote + (vote < 0 ? 1 : 0)}
                <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            </div>
          </ExpansionPanelDetails>
          <Divider/>
          {notFinal && <ExpansionPanelActions>
            <Button size="small" color="primary">
              Finailize
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
