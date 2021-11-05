import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './../actions/index';
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1,
        }
    }
    onUpdateStatus = (id) => {
        this.props.onUpdateStatusTask(id);
    }
    onDelete = (id) => {
        this.props.onDeleteTask(id);
        this.props.onCloseForm();

    }
    onUpdate = (task) => {
        this.props.onOpenForm();
        this.props.onEditTask(task);

    }
    onHandleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        // this.props.onFilter(
        //     name === 'filterName' ? value : this.state.filterName,
        //     name === 'filterStatus' ? value : this.state.filterStatus,
        // );

        this.setState({
            [name]: value
        })
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus,
        }
        this.props.onFilter(filter)
    }
    clearForm() {
        this.setState({
            id: '',
            txtName: '',
            status: true
        })
    }
    render() {
        var { filter, tasks,keyword, sort } = this.props;
        console.log(keyword);
        if(keyword){
            tasks = tasks.filter((task) => {
                return task.txtName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            });
        }
        if (filter.name) {
            tasks = tasks.filter((task) => {
                return task.txtName.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
            });
            console.log(tasks);
        }
        tasks = tasks.filter((task) => {
            if (filter.status === -1) return task;
            else return task.status === (filter.status === 1 ? true : false)
        })
        if(sort.by === 'name') {
            tasks.sort((a,b) => {
                if(a.txtName < b.txtName) return -sort.value;
                else return sort.value;
            }); 
        } else {
            tasks.sort((a,b) => {
                if(a.status < b.status) {return sort.value}
                else return -sort.value;
            })
        }
        let elementTask = tasks.map((task, index) => {
            let result = <tr key={index}>
                <td>{task.id}</td>
                <td>{task.txtName}</td>
                <td className="text-center">
                    {task.status === true ?
                        <span className="label label-success statusActive" onClick={() => this.onUpdateStatus(task.id)}>Kích hoạt</span> :
                        <span className="label label-success status" onClick={() => this.onUpdateStatus(task.id)}>Ẩn</span>}
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={() => this.onUpdate(task)}>
                        <span className="fa fa-pencil" /> Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => this.onDelete(task.id)}>
                        <span className="fa fa-trash" /> Xóa
                    </button>
                </td>
            </tr>
            return result;
        });
        return (

            <div>
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Tên</th>
                                    <th className="text-center">Trạng Thái</th>
                                    <th className="text-center">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td />
                                    <td>
                                        <input type="text" className="form-control" name="filterName" value={this.state.filterName} onChange={this.onHandleChange} />
                                    </td>
                                    <td>
                                        <select className="form-control" name="filterStatus" value={this.state.filterStatus} onChange={this.onHandleChange}>
                                            <option value={-1}>Tất Cả</option>
                                            <option value={0}>Ẩn</option>
                                            <option value={1}>Kích Hoạt</option>
                                        </select>
                                    </td>
                                    <td />
                                </tr>
                                {elementTask}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filter: state.filterTable,
        keyword: state.search.keyword,
        sort: state.sort,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatusTask: (id) => {
            dispatch(actions.updateStatusTask(id))
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
        onOpenForm: () => {
            dispatch(actions.openForm())
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task))
        },
        onFilter: (filter) => {
            dispatch(actions.filterTable(filter))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);