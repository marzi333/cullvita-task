import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class TaskDialog extends Component {
    state = {
        title: "",
        description: ""
    }

    editTaskHandler = (title, description) => {
        this.setState({title:title, description:description});
    }

    changeTitleHandler = (event) => {
        this.setState({title:event.target.value});
    }
    changeDescriptionHandler = (event) => {
        this.setState({description:event.target.value});
    }
    render(){
        return (
            <Dialog open = {this.props.showDialog} onClose = {this.props.close} fullWidth = {true}>
                <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    defaultValue = {this.state.title}
                    onChange = {(event) => this.changeTitleHandler(event)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Description"
                    defaultValue = {this.state.description}
                    onChange = {(event) => this.changeDescriptionHandler(event)}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                
                <Button onClick={() => this.props.submit(this.state.title, this.state.description)} color="primary">
                    Submit
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button onClick={this.props.close} color="primary">
                    Cancel
                </Button>

                </DialogActions>
            </Dialog>
        );
    }
};

export default TaskDialog;