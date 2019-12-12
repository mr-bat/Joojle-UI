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

class SignIn extends React.Component {
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

        this.setState({ text: null });
        document.getElementById("userId").value = "";
        this.props.onSend(text);
    };
    render() {
        return (
            <Dialog
                open
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">SignIn</DialogTitle>
                <DialogContent>
                    <TextField
                        id="userId"
                        style={{ paddingTop: 20, width: '68%', paddingRight: 24 }}
                        onChange={e => this.setState({text: e.target.value})}
                        // onChange={this.handleChange('participants')}
                        autoFocus
                        type="number"
                        margin="dense"
                        onKeyPress={(ev) => {
                            console.log(`Pressed keyCode ${ev.key}`);
                            if (ev.key === 'Enter') {
                                this.handleSend();
                                ev.preventDefault();
                            }
                        }}
                    />
                    <Button onClick={this.handleSend} color="primary" style={{ verticalAlign: 'bottom' }}>
                        Login
                    </Button>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(SignIn);
