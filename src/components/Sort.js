import React, { Component } from 'react';

class Sort extends Component {
    render() {
        return (
            <div>
                <div className="dropdown open">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Sắp xếp
                    </button>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                        <button className="dropdown-item" >Tên A - Z</button>
                        <button className="dropdown-item " >Tên Z - A</button>
                        <button className="dropdown-item" >Trạng thái kích hoạt</button>
                        <button className="dropdown-item" >Trạng thái ẩn</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sort;