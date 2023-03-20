import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { DeletePostAction, PostsAction } from '../../../redux/actions/PostAction'
import AdminLayout from '../layouts/AdminLayout'
import Loading from '../../../components/Loading'
import { toast } from 'react-toastify'
import { DELETE_POST_RESET } from '../../../redux/constants/PostConstant'
const AdminPost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(PostsAction());
    }, [dispatch])

    const { loading, posts, message, status } = useSelector((state) => state.post);

    const DeletePost = async (id) => {
        await dispatch(DeletePostAction(id));
    }
    useEffect(() => {
        if (status && status === 2020) {
            toast.success(message, { theme: "colored" })
            dispatch(PostsAction());
            dispatch({ type: DELETE_POST_RESET })
        }
    }, [dispatch, status, message])


    return (
        loading ? <Loading /> :
            <AdminLayout>
                <MetaData title='Admin - Posts' />
                <div class="fancy-feature-thirtyOne p-4">
                    {/* <Link to={'/admin/dashboard'} className='btn btn-primary float-right my-3'><i className='fa fa-arrow-left'></i> Back</Link> */}
                    <a href={'/admin/dashboard'} className='btn btn-primary float-right my-3'><i className='fa fa-arrow-left'></i> Back</a>
                    <br clear="all" />
                    <div class="card">
                        <div class="card-header bg-light mb-1">
                            <h4>Posts</h4>
                        </div>
                        <div class="card-body">
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Caption</th>
                                        <th>Likes</th>
                                        <th>Comments</th>
                                        <th>Shares</th>
                                        <th className=' text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts?.map((post) => (
                                            <tr key={post?._id}>
                                                <td>
                                                    <img style={{ height: 40, width: 40, borderRadius: 10 }} src={post?.image?.url} alt="" />
                                                </td>
                                                <td>{post?.caption.length > 40 ? post?.caption.substring(0, 40) + "..." : post?.caption}</td>
                                                <td>{post?.likes.length}</td>
                                                <td>{post?.comments.length}</td>
                                                <td>{post?.shares.length}</td>
                                                <td className='text-center'>
                                                    <div className='btn-group'>
                                                        <Link className='btn btn-primary' to={`/admin/post/${post?._id}`}><i className='fa fa-eye'></i></Link>
                                                        <Link onClick={() => { if (window.confirm('Are you sure to Delete ?')) { DeletePost(post?._id) }; }} className='btn btn-danger' to='#'><i className='fa fa-trash'></i></Link>
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

export default AdminPost