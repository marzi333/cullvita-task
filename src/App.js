import React, { Component } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';
import Task from './Task/Task';
import TaskDialog from './Task/TaskDialog';

class App extends Component {
  constructor(props){
    super(props);
    this.taskDialogElem = React.createRef();
  }

  url = 'http://localhost:5000';

  state = {
    tasks: [],
    showTasks: false,
    showDialog: false,
    editTaskID: null
  }

  componentDidMount() {
    axios.get(this.url+'/tasks')
      .then(res => {
        this.setState({tasks:res.data})
      });
  }
  generateID = () => {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  showTasksHandler = () => { 
    this.setState({showTasks:!this.state.showTasks});
  };

  deleteTasksHandler = (index) => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({tasks:tasks});
  };

  addTaskHandler = () => {
    this.taskDialogElem.current.editTaskHandler("", "");
    this.setState({showDialog:true, editTaskID: null});
  }

  editTaskHandler = (id) => {
    const task = this.state.tasks.find(task => {
      return task.id === id;
    });
    this.taskDialogElem.current.editTaskHandler(task.title, task.description);
    this.setState({showDialog:true, editTaskID: id});
  }

  closeDialogHandler = () => {
    this.setState({showDialog:false, editTaskID: null});
  }

  submitInputHandler = (title, description) => {
    const tasks = [...this.state.tasks];
    if(this.state.editTaskID === null) //adding a task
    {
      let newTask = JSON.stringify({title: title, description: description});
      axios.post(this.url+'/tasks',newTask,{headers:{"Content-Type" : "application/json"}}).then(res => {
        tasks.push(res.data)
        this.setState({showDialog: false, editTaskID:null, tasks:tasks})
      });
    }
    else
    {
      let newTask = JSON.stringify({title: title, description: description});
      axios.patch(this.url+'/task/'+this.state.editTaskID, newTask,{headers:{"Content-Type" : "application/json"}}).then(res => {
        const taskIndex = this.state.tasks.findIndex(task => {
          return task.id === this.state.editTaskID;
        });
        const task = {...this.state.tasks[taskIndex]};
        task.title = res.data.title;
        task.description = res.data.description;
        tasks[taskIndex] = task;
        this.setState({showDialog: false, editTaskID:null, tasks:tasks});
      })
    }
  }

  searchHandler = (event) => {

  }

  render()
  {
    return (
      <div className="App">
        <h1>Task Management App</h1>
        <Button variant="contained" color="primary" onClick = {this.showTasksHandler}>
          {this.state.showTasks ? "Hide Tasks" : "Show Tasks"}
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick = {this.addTaskHandler}>
          Add Task
        </Button>

        {/* <Card variant="outlined">
          <CardContent>
            Search by:
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              defaultValue = {this.state.title}
              onChange = {(event) => this.searchHandler(event)}
              fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                label="Description"
                defaultValue = {this.state.description}
                onChange = {(event) => this.searchHandler(event)}
                fullWidth
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary">Search</Button>
          </CardActions>
        </Card> */}
        { this.state.showTasks ?
        <div>
          {this.state.tasks.map((task,index) => {
            return <Task 
            title = {task.title}
            description = {task.description}
            delete = {() => this.deleteTasksHandler(index)}
            edit = {() => this.editTaskHandler(task.id)}
            key = {task.id}
            />
          })}
        </div>  : null
        }
        
        <TaskDialog 
        ref={this.taskDialogElem}
        showDialog = {this.state.showDialog} 
        close={this.closeDialogHandler}
        submit = {this.submitInputHandler}/>

      </div>
    );
  }
  
}

export default App;
