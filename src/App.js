import React, { Component } from 'react';
import './App.css'
import Control from './components/Control';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        name: '',
        status: -1,
      },

    }
    this.toggleTaskList = this.toggleTaskList.bind(this)
    this.receiveClose = this.receiveClose.bind(this)
    // this.receiveData = this.receiveData.bind(this)
    // this.onFilter = this.onFilter.bind(this)
  }
  toggleTaskList() {
    // var { isActive, taskEditing } = this.state;
    // if (isActive && taskEditing !== null) {
    //   this.setState({
    //     isActive: true,
    //     taskEditing: null
    //   })
    // } else {
    //   this.setState({
    //     isActive: !this.state.isActive,
    //     taskEditing: null
    //   })
    // }
    this.clearForm()
    console.log(typeof(this.props.taskEditing));
    this.props.onToggleForm();  
    
  }
  clearForm(){
    if(typeof(this.props.taskEditing) === undefined || typeof(this.props.taskEditing) === 'object') {
      this.props.taskEditing.id = '';
      this.props.taskEditing.txtName = '';
      this.props.taskEditing.status = true;
    }
  }
  receiveClose(params) {
    // this.setState({
    //   isActive: params
    // })
  }


  // receiveData(data) {
  //   console.log(data);
  //   var { tasks } = this.state;
  //   if (data.id === '') {
  //     data.id = Math.floor(Math.random() * 100) + 1;
  //     tasks.push(data);
  //   } else {
  //     var index = this.findIndex(data.id);
  //     tasks[index] = data;
  //   }
  //   this.setState({
  //     tasks: tasks,
  //     taskEditing: null
  //   })
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  //   console.log(this.state.tasks);
  // }
  // onUpdateStatus = (param) => {
  //   var { tasks } = this.state;
  //   tasks.forEach((task, index) => {
  //     if (param === task.id) {
  //       task.status = !task.status;
  //       this.setState({
  //         tasks: tasks
  //       });
  //     }
  //     console.log(task.id + " " + task.status + " " + param);
  //   });

  // }
  // onDelete = (param) => {
  //   var { tasks } = this.state;
  //   var index = this.findIndex(param);
  //   tasks.splice(index, 1);
  //   console.log("xóa" + param + "index" + index);
  //   this.setState({
  //     tasks: tasks
  //   })
  //   localStorage.setItem('tasks', JSON.stringify(tasks));

  // }
  onUpdate = (param) => {
    var { tasks } = this.state;
    var index = this.findIndex(param);
    var taskEditing = tasks[index];
    this.setState({
      isActive: true,
      taskEditing: taskEditing,
    })
    console.log("task edit" + taskEditing.txtName);
    localStorage.setItem('tasks', JSON.stringify(tasks));

  }
  // onFilter(filterName, filterStatus) {
  //   console.log(filterName + " " + filterStatus);
  //   filterStatus = parseInt(filterStatus)
  //   filterName = filterName.toLowerCase();
  //   this.setState({
  //     filter: {
  //       name: filterName,
  //       status: filterStatus,
  //     }
  //   })
  // }
  findIndex(param) {
    var { tasks } = this.state;
    var index2;
    tasks.forEach((task, index) => {
      if (task.id === param) {
        index2 = index;
      }
    })
    return index2;
  }

  render() {
    // let element;
    // if(this.state.isActive){
    //   element = <TaskList onReceiveClose={this.receiveClose}></TaskList>
    // } else {
    //   element = ''
    // }
    var {isDisplayForm, filter, tasks} = this.props;
    // var { isActive, taskEditing, filter } = this.state;//task = this.state.task
    let element = isDisplayForm === true ? <TaskList onReceiveClose={this.receiveClose}
        /> : '';
    // if(filter.name!==""){
    //   if(filter.name){
    //     tasks = tasks.filter((task) => {          
    //        return task.txtName.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
    //     });
    //   }
    //   console.log(tasks);
    //   tasks = tasks.filter((task)=>{
    //     if(filter.status===-1) return task;
    //     else return task.status === (filter.status === 1 ? true : false)
    //   })

    // }
    console.log(filter);

    return (
      <div>
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="panel panel-warning">
                {element}
              </div>
            </div>
            <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
              <button type="button" className="btn btn-primary" onClick={this.toggleTaskList}>
                <span className="fa fa-plus" /> Thêm Công Việc
              </button>
              <Control></Control>
              <TaskForm 
                 onUpdate={this.onUpdate} ></TaskForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.itemEditing.task,
    
    tasks: state.tasks
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm : () => {
      dispatch(actions.toggleForm())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);