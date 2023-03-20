import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import AdminLayout from '../layouts/AdminLayout'
import Loading from '../../../components/Loading'
import { toast } from 'react-toastify'

import dateFormat from 'dateformat';
import { DeleteSupportAction, SupportsAction } from '../../../redux/actions/SupportAction'
import { DELETE_SUPPORT_RESET } from '../../../redux/constants/SupportConstant'

const AdminSupport = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SupportsAction());
    }, [dispatch])

    const { loading, supports, message, IsDeleted } = useSelector((state) => state.support);


    const DeleteSupport = async (id) => {
        await dispatch(DeleteSupportAction(id));
    }


    useEffect(() => {
        if (IsDeleted && IsDeleted === true) {
            toast.success(message, { theme: "colored" })
            dispatch(SupportsAction());
            dispatch({ type: DELETE_SUPPORT_RESET })
        }

    }, [dispatch, IsDeleted, message])

    return (
        loading ? <Loading /> :
            <AdminLayout>
                <MetaData title='Admin - Help & Support' />
                <div className="fancy-feature-thirtyOne p-4">
                    <a href={'/admin/dashboard'} className='btn btn-primary float-right my-3'><i className='fa fa-arrow-left'></i> Back</a>
                    <br clear="all" />
                    <div className="card">
                        <div className="card-header bg-light mb-1">
                            <h4>Help & Support</h4>
                        </div>
                        <div className="card-body">
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>CreateAt</th>
                                        <th className=' text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        supports?.map((support) => (
                                            <tr key={support?._id}>
                                                <td>{support?.name}</td>
                                                <td>{support?.email}</td>
                                                <td>{support?.subject}</td>
                                                <td>{support?.message}</td>
                                                <td>{dateFormat(support?.createAt, "dd mmmm yyyy, h:MM:ss TT")}</td>
                                                <td className='text-center'>
                                                    <div className='btn-group'>
                                                        <Link onClick={() => { if (window.confirm('Are you sure to Delete ?')) { DeleteSupport(support?._id) }; }} className='btn btn-danger' to='#'><i className='fa fa-trash'></i></Link>
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

export default AdminSupport