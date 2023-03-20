import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../components/MetaData'
import { useDispatch } from 'react-redux';
import AdminLayout from './layouts/AdminLayout'
import { AuthLogoutAction } from '../../redux/actions/AuthAction';

import { toast } from 'react-toastify'

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutFunction = () => {
        dispatch(AuthLogoutAction())
        navigate("/login")
        toast.success("Logout Successfully...", { theme: "colored" })
    }


    return (
        <AdminLayout>
            <MetaData title='Admin - Dashboard' />
            <div class="fancy-feature-thirtyOne pb-60">
                <div class="container">

                    <div class="row">
                        <div class="col-md-4" data-aos="fade-up">
                            <Link to='/admin/posts' style={{ width: "100%" }}>
                                <div class="block-style-thirtyTwo d-flex">
                                    <div class="icon d-flex align-items-center justify-content-center" style={{ background: "#f7edff" }}><i className='fa fa-pencil' style={{ color: "#bc50ff", fontSize: 30 }}></i></div>
                                    <div class="text">
                                        <h4>Posts</h4>
                                        <p style={{ marginTop: -10 }}>Manage posts...</p>
                                        <span class="tran3s"><img src="/assets/images/icon/182.svg" alt='' /></span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-md-4" data-aos="fade-up">
                            <Link to='/admin/users' style={{ width: "100%" }}>
                                <div class="block-style-thirtyTwo d-flex">
                                    <div class="icon d-flex align-items-center justify-content-center" style={{ background: "#d8fff1" }}><i className='fa fa-users' style={{ color: "#19caaa", fontSize: 30 }}></i></div>
                                    <div class="text">
                                        <h4>Users</h4>
                                        <p style={{ marginTop: -10 }}>Manage users...</p>
                                        <span class="tran3s"><img src="/assets/images/icon/182.svg" alt='' /></span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-md-4" data-aos="fade-up">
                            <Link to='/admin/badges' style={{ width: "100%" }}>
                                <div class="block-style-thirtyTwo d-flex">
                                    <div class="icon d-flex align-items-center justify-content-center" style={{ background: "#ffedfe" }}><i className='fa fa-tag' style={{ color: "#fb41ff", fontSize: 30 }}></i></div>
                                    <div class="text">
                                        <h4>Badges</h4>
                                        <p style={{ marginTop: -10 }}>Manage badges...</p>
                                        <span class="tran3s"><img src="/assets/images/icon/182.svg" alt='' /></span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-md-4" data-aos="fade-up">
                            <Link to='/admin/pages' style={{ width: "100%" }}>
                                <div class="block-style-thirtyTwo d-flex">
                                    <div class="icon d-flex align-items-center justify-content-center" style={{ background: "#e6fbff" }}><i className='fa fa-list' style={{ color: "#08cbfc", fontSize: 30 }}></i></div>
                                    <div class="text">
                                        <h4>Pages</h4>
                                        <p style={{ marginTop: -10 }}>Manage pages...</p>
                                        <span class="tran3s"><img src="/assets/images/icon/182.svg" alt='' /></span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-md-4" data-aos="fade-up">
                            <Link to='/admin/help-and-support' style={{ width: "100%" }}>
                                <div class="block-style-thirtyTwo d-flex">
                                    <div class="icon d-flex align-items-center justify-content-center" style={{ background: "#ff5c423b" }}><i className='fa fa-question' style={{ color: "#ff5c42", fontSize: 30 }}></i></div>
                                    <div class="text">
                                        <h4>Help & Support</h4>
                                        <p style={{ marginTop: -10 }}>Manage Help & Support...</p>
                                        <span class="tran3s"><img src="/assets/images/icon/182.svg" alt='' /></span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-md-4" data-aos="fade-up">
                            <Link to='#' onClick={() => logoutFunction()} style={{ width: "100%" }}>
                                <div class="block-style-thirtyTwo d-flex">
                                    <div class="icon d-flex align-items-center justify-content-center" style={{ background: "#6f55ff45" }}><i className='fa fa-sign-out' style={{ color: "#6F55FF", fontSize: 30 }}></i></div>

                                    <div class="text">
                                        <h4>Logout</h4>
                                        <p style={{ marginTop: -10 }}>Logout...</p>
                                        <span class="tran3s"><img src="/assets/images/icon/182.svg" alt='' /></span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminDashboard