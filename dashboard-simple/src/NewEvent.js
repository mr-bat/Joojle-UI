import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import xrange from 'xrange';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  button: {
    margin: 2 * theme.spacing.unit,
    verticalAlign: 'bottom',
  },
  input: {
    display: 'none',
  },
});

class FormDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      pollItems: [{beginsAt: null, until: null}],
      title: null,
      description: null,
      participants: null,
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  deletePollItem = (idx) => {
    const {pollItems} = this.state;
    pollItems.splice(idx, 1);
    this.setState({pollItems});
  };
  addPollItem = () => {
    const {pollItems} = this.state;
    pollItems.push({beginsAt: null, until: null});
    this.setState({pollItems});
  };
  setVote = (beginsAt, until, idx) => {
    const {pollItems} = this.state;
    if (beginsAt)
      pollItems[idx].beginsAt = beginsAt;
    if (until)
      pollItems[idx].until = until;
    this.setState({pollItems});
  };
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Event</DialogTitle>
        <DialogContent>
          <TextField
            onChange={this.handleChange('title')}
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="title"
          />
          <TextField
            onChange={this.handleChange('description')}
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="description"
            fullWidth
          />
          {xrange(this.state.pollItems.length).map(idx =>
            <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ marginTop: 30 }} >
              <DateTimePicker value={this.state.pollItems[idx].beginsAt} label="Begins at" style={{ width: '33.33%', marginRight: 10, marginTop: 10 }} onChange={d => this.setVote(d, null, idx)} />
              <DateTimePicker value={this.state.pollItems[idx].until} label="Until" style={{ width: '33.33%', marginTop: 10 }} onChange={d => this.setVote(null, d, idx)} />
              <IconButton color="secondary" className={this.props.classes.button} style={{ align: 'center' }} aria-label="Add an alarm">
                {idx ? <DeleteOutlinedIcon onClick={() => this.deletePollItem(idx)}/>: <AddIcon onClick={() => this.addPollItem()}/>}
              </IconButton>
            </MuiPickersUtilsProvider>
          )}
          <TextField
            onChange={this.handleChange('participants')}
            autoFocus
            margin="dense"
            id="participant"
            label="Participants"
            type="participants"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.createEvent(this.state)} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(FormDialog);
