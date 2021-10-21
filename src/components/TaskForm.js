import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);
        console.log(this.props.tasks);
        this.state = {
            filterName:'',
            filterStatus: -1,
        }
    }
    onUpdateStatus = (id) =>{
        this.props.onUpdateStatus(id);
    }
    onDelete = (id) =>{
        this.props.onDelete(id);
    }
    onUpdate = (id) =>{
        this.props.onUpdate(id);
        console.log("on update"+id);
    }
    onHandleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.props.onFilter(
            name==='filterName'? value : this.state.filterName,
            name==='filterStatus'? value : this.state.filterStatus,

        );
        this.setState({
            [name]: value
        })
         console.log(this.state);
    }
    render() {
        var {tasks} = this.props;
        var {filterName, filterStatus} = this.state;
        let elementTask = tasks.map((task,index)=> {
            let result =   <tr key={index}>
            <td>{task.id}</td>
            <td>{task.txtName}</td>
            <td className="text-center">
            {task.status===true? 
                <span className="label label-success statusActive" onClick={() => this.onUpdateStatus(task.id)}>Kích hoạt</span>: 
                <span className="label label-success status" onClick={() => this.onUpdateStatus(task.id)}>Ẩn</span>}
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning"  onClick={() => this.onUpdate(task.id)}>
                    <span className="fa fa-pencil"/> Sửa
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
                                        <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onHandleChange}/>
                                    </td>
                                    <td>
                                        <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onHandleChange}>
                                            <option value={-1}>Tất Cả</option>
                                            <option value={0}>Ẩn</option>
                                            <option value={1}>Kích Hoạt</option>
                                        </select>
                                    </td>
                                    <td />
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Học lập trình</td>
                                    <td className="text-center">
                                        <span className="label label-success statusActive">
                                            Kích Hoạt
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button type="button" className="btn btn-warning">
                                            <span className="fa fa-pencil" /> Sửa
                                        </button>
                                        &nbsp;
                                        <button type="button" className="btn btn-danger">
                                            <span className="fa fa-trash" /> Xóa
                                        </button>
                                    </td>
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

export default TaskForm;