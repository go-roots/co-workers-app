import React from 'react';
import avatar1 from "../../assets/img/avatars/avatar1.jpeg";
import avatar2 from "../../assets/img/avatars/avatar2.jpeg";
import avatar3 from "../../assets/img/avatars/avatar3.jpeg";
import avatar4 from "../../assets/img/avatars/avatar4.jpeg";
import avatar5 from "../../assets/img/avatars/avatar5.jpeg";


const UsersDashboard = () => {
    return (
        <div className="container-fluid">
            <h3 className="text-dark mb-4">Users</h3>
            <div className="card shadow">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 text-nowrap">
                            <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label>Show&nbsp;<select className="form-control form-control-sm custom-select custom-select-sm"><option value="10" selected="">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>&nbsp;</label>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex flex-row justify-content-end align-items-baseline">
                            <div className="text-md-right" id="dataTable_search"><label><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" /></label>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                        <table className="table my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th className="text-truncate align-items-baseline">Name&nbsp;<button className="btn" type="button"><i className="far fa-arrow-alt-circle-down"></i></button></th>
                                    <th className="text-truncate align-items-baseline">Activity&nbsp;<button className="btn" type="button"><i className="far fa-arrow-alt-circle-down"></i></button></th>
                                    <th className="text-truncate align-items-baseline">Last visited&nbsp;<button className="btn" type="button"><i className="far fa-arrow-alt-circle-down"></i></button></th>
                                    <th className="text-truncate">Subscription&nbsp;<button className="btn" type="button"><i className="far fa-arrow-alt-circle-down"></i></button></th>
                                    <th className="text-truncate">Start date&nbsp;<button className="btn" type="button"><i className="far fa-arrow-alt-circle-down"></i></button></th>
                                    <th className="text-truncate">Asked help&nbsp;<button className="btn" type="button"><i className="far fa-arrow-alt-circle-down"></i></button></th>
                                    <th className="text-truncate">Provided help&nbsp;<button className="btn" type="button"><i className="far fa-arrow-alt-circle-down"></i></button></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar1} />Ilja</td>
                                    <td>some field</td>
                                    <td>2 days ago</td>
                                    <td>Standard</td>
                                    <td>2018/11/28</td>
                                    <td>18</td>
                                    <td>18</td>
                                    <td><button className="btn btn-primary" type="button">Edit</button></td>
                                </tr>
                                <tr>
                                    <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar2} />Laurent</td>
                                    <td>some field</td>
                                    <td>yesterday<br /></td>
                                    <td>Premium</td>
                                    <td>2019/10/09<br /></td>
                                    <td>0<br /></td>
                                    <td>0<br /></td>
                                    <td><button className="btn btn-primary" type="button">Edit</button></td>
                                </tr>
                                <tr>
                                    <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar3} />Nicolas Cage</td>
                                    <td>some field</td>
                                    <td>1 week ago<br /></td>
                                    <td>Premium</td>
                                    <td>2019/01/12<br /></td>
                                    <td>17<br /></td>
                                    <td>17<br /></td>
                                    <td><button className="btn btn-primary" type="button">Edit</button></td>
                                </tr>
                                <tr>
                                    <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar4} />Shradda</td>
                                    <td>some field</td>
                                    <td>2 weeks ago<br /></td>
                                    <td>Standard</td>
                                    <td>2020/10/13<br /></td>
                                    <td>5<br /></td>
                                    <td>5<br /></td>
                                    <td><button className="btn btn-primary" type="button">Edit</button></td>
                                </tr>
                                <tr>
                                    <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar5} />Lonely Panda</td>
                                    <td>some field</td>
                                    <td>Inside<br /></td>
                                    <td>Standard</td>
                                    <td>2020/06/07</td>
                                    <td>0<br /></td>
                                    <td>0<br /></td>
                                    <td><button className="btn btn-primary" type="button">Edit</button></td>
                                </tr>
                                <tr>
                                    <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar1} />Jorgo Titis</td>
                                    <td>some field</td>
                                    <td>Inside<br /></td>
                                    <td>Standard</td>
                                    <td>2020/12/02<br /></td>
                                    <td>10<br /></td>
                                    <td>10<br /></td>
                                    <td><button className="btn btn-primary" type="button">Edit</button></td>
                                </tr>
                                <tr>
                                    <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar2} />Polar Bear</td>
                                    <td>some field</td>
                                    <td>Inside<br /></td>
                                    <td>Premium</td>
                                    <td>2020/05/03<br /></td>
                                    <td>20<br /></td>
                                    <td>20<br /></td>
                                    <td><button className="btn btn-primary" type="button">Edit</button></td>
                                </tr>
                                <tr>
                                    <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar3} />Happy Dear</td>
                                    <td>some field</td>
                                    <td>Inside<br /></td>
                                    <td>Standard</td>
                                    <td>1<br /></td>
                                    <td>9<br /></td>
                                    <td>9<br /></td>
                                    <td><button className="btn btn-primary" type="button">Edit</button></td>
                                </tr>
                                <tr>
                                    <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar4} />Worried Wolf</td>
                                    <td>some field</td>
                                    <td>5 hours ago<br /></td>
                                    <td>Standard</td>
                                    <td>117<br /></td>
                                    <td>342</td>
                                    <td>342</td>
                                    <td><button className="btn btn-primary" type="button">Edit</button></td>
                                </tr>
                                <tr>
                                    <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar5} />Crazy Monkey</td>
                                    <td>some field</td>
                                    <td>3 days ago<br /></td>
                                    <td>Standard</td>
                                    <td>1<br /></td>
                                    <td>1<br /></td>
                                    <td>1<br /></td>
                                    <td><button className="btn btn-primary" type="button">Edit</button></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td><strong>Name</strong></td>
                                    <td><strong>Last Visited</strong></td>
                                    <td><strong>Subscription</strong></td>
                                    <td><strong>Start date</strong></td>
                                    <td><strong>Asked help</strong></td>
                                    <td><strong>Provided help</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-md-6 align-self-center">
                            <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
                        </div>
                        <div className="col-md-6">
                            <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                <ul className="pagination">
                                    <li className="page-item disabled"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersDashboard
