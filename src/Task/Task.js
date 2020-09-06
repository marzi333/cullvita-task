import React from 'react';
import './Task.css';
import Button from '@material-ui/core/Button';


const task = (props) => {
    return (
        <div className = "Task">
            <h1>Title: {props.title}</h1>
            <p>Description: {props.description}</p>
            <Button variant="contained" color="secondary" onClick={props.delete}>Delete</Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="outlined" color="primary" onClick={props.edit}>Edit</Button>
        </div>
    )
};

export default task;