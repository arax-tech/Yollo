import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import AdminLayout from '../layouts/AdminLayout'
import Loading from '../../../components/Loading'
import { toast } from 'react-toastify'

import dateFormat from 'dateformat';
import { DeletePageAction, PagesAction } from '../../../redux/actions/PageAction'
import { DELETE_PAGE_RESET } from '../../../redux/constants/PageConstant'

const AdminPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(PagesAction());
    }, [dispatch])

    const { loading, pages, message, status } = useSelector((state) => state.page);


    const DeletePage = async (id) => {
        await dispatch(DeletePageAction(id));
    }


    useEffect(() => {
        if (status && status === 2020) {
            toast.success(message, { theme: "colored" })
            dispatch(PagesAction());
            dispatch({ type: DELETE_PAGE_RESET })
        }

    }, [dispatch, status, message])

    return (
        loading ? <Loading /> :
            <AdminLayout>
                <MetaData title='Admin - Pages' />
                <div className="fancy-feature-thirtyOne p-4">
                    <span className='w-100'>
                        <a href={'/admin/dashboard'} className='btn btn-primary my-3'><i className='fa fa-arrow-left'></i> Back</a>
                        <Link to='/admin/page/create' className='btn btn-primary my-3 float-right'><i className='fa fa-plus'></i> Create</Link>
                    </span>
                    <br clear="all" />
                    <div className="card">
                        <div className="card-header bg-light mb-1">
                            <h4>Pages</h4>
                        </div>
                        <div className="card-body">
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>S#</th>
                                        <th>Name</th>
                                        <th>Slug</th>
                                        <th>CreateAt</th>
                                        <th className=' text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pages?.map((page, index) => (
                                            <tr key={page?._id}>
                                                <td>{index + 1}</td>
                                                <td>{page?.name}</td>
                                                <td>{page?.slug}</td>
                                                <td>{dateFormat(page?.createAt, "dd mmmm yyyy, h:MM:ss TT")}</td>
                                                <td className='text-center'>
                                                    <div className='btn-group'>
                                                        <Link to={`/page/${page?.slug}`} className='btn btn-primary'><i className='fa fa-eye'></i></Link>
                                                        <Link to={`/admin/page/edit/${page?._id}`} className='btn btn-success'><i className='fa fa-pencil'></i></Link>
                                                        <Link onClick={() => { if (window.confirm('Are you sure to Delete ?')) { DeletePage(page?._id) }; }} className='btn btn-danger' to='#'><i className='fa fa-trash'></i></Link>
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

export default AdminPage