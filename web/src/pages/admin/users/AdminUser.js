import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import AdminLayout from '../layouts/AdminLayout'
import Loading from '../../../components/Loading'
import { DeleteUserAction, UsersAction } from '../../../redux/actions/UserAction'
import { DELETE_USER_RESET } from '../../../redux/constants/UserConstant'
import { toast } from 'react-toastify'

const AdminUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(UsersAction());
    }, [dispatch])

    const { loading, users, message, status } = useSelector((state) => state.user);


    const DeletePost = async (id) => {
        await dispatch(DeleteUserAction(id));
    }
    useEffect(() => {
        if (status && status === 2020) {
            toast.success(message, { theme: "colored" })
            dispatch(UsersAction());
            dispatch({ type: DELETE_USER_RESET })
        }
    }, [dispatch, status, message])

    return (
        loading ? <Loading /> :
            <AdminLayout>
                <MetaData title='Admin - Users' />
                <div class="fancy-feature-thirtyOne p-4">
                    <a href={'/admin/dashboard'} className='btn btn-primary float-right my-3'><i className='fa fa-arrow-left'></i> Back</a>
                    <br clear="all" />
                    <div class="card">
                        <div class="card-header bg-light mb-1">
                            <h4>Users</h4>
                        </div>
                        <div class="card-body">
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>City</th>
                                        <th>Country</th>
                                        <th>Followers</th>
                                        <th>Following</th>
                                        <th className=' text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users?.map((user) => (
                                            <tr key={user?._id}>
                                                <td>
                                                    {
                                                        user?.image?.url ? (
                                                            <img style={{ height: 40, width: 40, borderRadius: 10 }} src={user?.image?.url} alt="" />
                                                        ) : (
                                                            <img style={{ height: 40, width: 40, borderRadius: 10 }} src="/assets/images/placeholder.jpg" alt="" />

                                                        )
                                                    }
                                                </td>
                                                <td>{user?.first_name}</td>
                                                <td>{user?.last_name}</td>
                                                <td>{user?.city}</td>
                                                <td>{user?.country}</td>
                                                <td>{user?.followers?.length}</td>
                                                <td>{user?.following?.length}</td>
                                                <td className='text-center'>
                                                    <div className='btn-group'>
                                                        <Link onClick={() => { if (window.confirm('Are you sure to Delete ?')) { DeletePost(user?._id) }; }} className='btn btn-danger' to='#'><i className='fa fa-trash'></i></Link>
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

export default AdminUser