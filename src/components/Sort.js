import React, { Component } from 'react';
import * as actions from './../actions/index';
import {connect} from 'react-redux'
class Sort extends Component {
    onClick(sortBy, sortValue) {
        var sort = {
            by: sortBy,
            value: sortValue
        }
        this.props.onSort(sort);
    }
    render() {
        var {sort} = this.props;
        return (
            <div>
                <div className="dropdown open">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Sắp xếp
                    </button>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                        <button className={sort.by==='name' && sort.value === 1 ? "activeSort dropdown-item": "dropdown-item"} onClick={() => this.onClick('name', 1)} >Tên A - Z</button>
                        <button className={sort.by==='name' && sort.value === -1 ? "activeSort dropdown-item": "dropdown-item"} onClick={() => this.onClick('name', -1)}>Tên Z - A</button>
                        <button className={sort.by==='status' && sort.value === 1 ? "activeSort dropdown-item": "dropdown-item"} onClick={() => this.onClick('status', 1)}>Trạng thái kích hoạt</button>
                        <button className={sort.by==='status' && sort.value === -1 ? "activeSort dropdown-item": "dropdown-item"} onClick={() => this.onClick('status', -1)}>Trạng thái ẩn</button>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        sort: state.sort
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort : (sort) => {
            dispatch(actions.sort(sort))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sort);