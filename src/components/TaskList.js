import React, { Component } from 'react';

class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            txtName: '',
            status: true
        }
        this.closeTaskList = this.closeTaskList.bind(this)
        this.onHandleChange = this.onHandleChange.bind(this)
        this.deleteData = this.deleteData.bind(this)
    }
    componentWillMount() {
        if (this.props.taskEditing) {
            this.setState({
                id: this.props.taskEditing.id,
                txtName: this.props.taskEditing.txtName,
                status: this.props.taskEditing.status,
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.taskEditing) {
            this.setState({
                id: nextProps.taskEditing.id,
                txtName: nextProps.taskEditing.txtName,
                status: nextProps.taskEditing.status,
            })
        } else if (!nextProps.taskEditing) {
            console.log("sửa -> thêm");
            this.setState({
                id: '',
                txtName: '',
                status: true
            })
        }//taskediting null
    }

    onHandleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        })
        // console.log(this.state);
    }
    closeTaskList() {
        this.props.onReceiveClose(false)
    }
    onAddJob(event) {
        this.setState({
            id: '',
            txtName: '',
            status: true,

        })
        event.preventDefault();
        this.props.onReceiveData(this.state)
    }
    deleteData() {
        this.setState({
            txtName: '',
            status: true
        })
    }

    render() {
        var id = this.state.id;
        return (
            <div>
                <div className="panel-heading addjob">
                    <i aria-hidden="true" style={{ fontSize: '28px', cursor: 'pointer', float: 'right' }} className="fa fa-times-circle " onClick={this.closeTaskList}></i>
                    <h3 className="panel-title">{id === '' ? "Thêm Công Việc" : "Cập nhật công việc"}</h3>

                </div>
                <div className="panel-body">
                    <form onSubmit={(event) => this.onAddJob(event)}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" name='txtName' value={this.state.txtName} onChange={this.onHandleChange} />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" required="required" name='status' onChange={this.onHandleChange} value={this.state.status}>
                            <option value={true} onClick={this.onUpdateStatus}>Kích Hoạt</option>
                            <option value={false} onClick={this.onUpdateStatus}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning"><i className="fa fa-plus" aria-hidden="true"></i> Thêm</button>&nbsp;
                            <button type="reset" className="btn btn-danger" onClick={this.deleteData}><i className="fa fa-rocket" aria-hidden="true"></i> Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskList;