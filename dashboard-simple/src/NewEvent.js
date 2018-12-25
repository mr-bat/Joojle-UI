import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      beginsAt: null,
      until: null,
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
  render() {
    const {beginsAt, until} = this.state;
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
          <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ marginTop: 30 }} >
            <DateTimePicker value={beginsAt} label="Begins at" style={{ width: '33.33%', marginRight: 10, marginTop: 10 }} onChange={d => this.setState({beginsAt: d})} />
            <DateTimePicker value={until} label="Until" style={{ width: '33.33%', marginTop: 10 }} onChange={d => this.setState({until: d})} />
          </MuiPickersUtilsProvider>
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
