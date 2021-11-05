import React, { Component } from 'react';

import {connect} from 'react-redux';
import * as actions from './../actions/index'
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
    }
    onHandleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        })
        
    }
    onSearch(event){
        event.preventDefault();
        this.props.onSearch(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.onSearch(event)}>
                <div className="input-group">
                    <input type="text" className="form-control" name = 'keyword' placeholder="Nhập từ khóa..." value ={this.state.keyword} onChange={this.onHandleChange}/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" type="submit">
                            <span className="fa fa-search" /> Tìm
                        </button>
                    </span>
                </div>
                </form>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch : (keyword) => {
            dispatch(actions.search(keyword))
        }
    }
}
export default connect(null, mapDispatchToProps)(Search);