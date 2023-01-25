import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import AdminLayout from '../layouts/AdminLayout'
import Loading from '../../../components/Loading'
import { toast } from 'react-toastify'
import { BadgesAction, CreateBadgeAction, DeleteBadgeAction } from '../../../redux/actions/BadgeAction'
import { CREATE_BADGE_RESET, DELETE_BADGE_RESET } from '../../../redux/constants/BadgeConstant'

import dateFormat from 'dateformat';

const AdminBadge = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(BadgesAction());
    }, [dispatch])

    const { loading, badges, message, status } = useSelector((state) => state.badge);


    const DeleteBadge = async (id) => {
        await dispatch(DeleteBadgeAction(id));
    }


    const [badge, setBadge] = useState({
        name: "",
        icon: ""
    })

    const inpChnage = (event) => {
        setBadge({ ...badge, [event.target.name]: event.target.value })
    }

    const CreateBadgeFunction = async (event) => {
        event.preventDefault();
        await dispatch(CreateBadgeAction(badge.name, badge.icon));
    }

    useEffect(() => {
        if (status && status === 2020) {
            toast.success(message, { theme: "colored" })
            dispatch(BadgesAction());
            dispatch({ type: DELETE_BADGE_RESET })
        }

        if (status && status === 201) {
            toast.success(message, { theme: "colored" })
            dispatch(BadgesAction());
            dispatch({ type: CREATE_BADGE_RESET })
            window.location.reload(false);

        }

    }, [dispatch, navigate, status, message])

    return (
        loading ? <Loading /> :
            <AdminLayout>
                <MetaData title='Admin - Badges' />
                <div className="fancy-feature-thirtyOne p-4">
                    <span className='w-100'>
                        <a href={'/admin/dashboard'} className='btn btn-primary my-3'><i className='fa fa-arrow-left'></i> Back</a>
                        <Link to='#' className='btn btn-primary my-3 float-right' data-toggle="modal" data-target="#CreateBadge"><i className='fa fa-plus'></i> Create</Link>


                        <div className="modal fade" id="CreateBadge">
                            <form onSubmit={CreateBadgeFunction}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Create Badge</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label>Name</label>
                                                    <input type="text" name='name' className='form-control' autoFocus onChange={inpChnage} value={badge.name} required />
                                                </div>
                                                <div className="col-12">
                                                    <label>Icon</label>
                                                    <input type="text" name='icon' className='form-control' autoFocus onChange={inpChnage} value={badge.icon} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Create</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </span>
                    <br clear="all" />
                    <div className="card">
                        <div className="card-header bg-light mb-1">
                            <h4>Badges</h4>
                        </div>
                        <div className="card-body">
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Icon</th>
                                        <th>Name</th>
                                        <th>CreateAt</th>
                                        <th className=' text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        badges?.map((badge) => (
                                            <tr key={badge?._id}>

                                                <td>
                                                    <button className='btn btn-light rounded-circle'><i class={`fa fa-${badge?.icon}`} style={{ fontSize: 20 }}></i></button>
                                                </td>
                                                <td>{badge?.name}</td>
                                                <td>{dateFormat(badge?.createAt, "dd mmmm yyyy, h:MM:ss TT")}</td>
                                                <td className='text-center'>
                                                    <div className='btn-group'>
                                                        <Link onClick={() => { if (window.confirm('Are you sure to Delete ?')) { DeleteBadge(badge?._id) }; }} className='btn btn-danger' to='#'><i className='fa fa-trash'></i></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>

            </AdminLayout >
    )
}

export default AdminBadge