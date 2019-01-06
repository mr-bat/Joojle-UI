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
  handleSend = () => {
    const {text} = this.state;

    this.setState({ text: '' });
    this.props.onSend(text);
  };
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Comments</DialogTitle>
        <DialogContent>
          {(this.props.comments || []).map(({text}) => <TextField
            disabled
            autoFocus
            defaultValue={text}
            margin="dense"
            fullWidth
          />)}
          <TextField
            style={{ paddingTop: 20, width: '75%', paddingRight: 8 }}
            onChange={e => this.setState({text: e.target.value})}
            // onChange={this.handleChange('participants')}
            autoFocus
            margin="dense"

          />
          <Button onClick={this.handleSend} color="primary" style={{ verticalAlign: 'bottom'}}>
            Send!
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(FormDialog);
