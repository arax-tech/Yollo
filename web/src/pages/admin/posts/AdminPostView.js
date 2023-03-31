import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../../components/Loading'
import MetaData from '../../../components/MetaData'
import { SinglePostAction } from '../../../redux/actions/PostAction'
import AdminLayout from '../layouts/AdminLayout'
import dateFormat from 'dateformat';
const AdminPostView = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(SinglePostAction(id));
        setMainImage(null)
    }, [dispatch, id])

    const { loading, post } = useSelector((state) => state.post);
    const [mainImage, setMainImage] = useState(post?.images[0]?.url)
    return (
        loading ? <Loading /> :
            <AdminLayout>
                <MetaData title='Admin - Post Details' />
                <div className="blog-page-bg">
                    <div className="container">
                        <Link to={'/admin/posts'} className='btn btn-primary my-3'><i className='fa fa-arrow-left'></i> Back</Link>
                        <br clear="all" />
                        <div className="row">
                            <div className="col-lg-8 feature-blog-one width-lg blog-details-post-v1">
                                <div className="post-meta">
                                    <img src={mainImage || post?.images[0].url} alt="" className="image-meta" />
                                    <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>

                                        {
                                            post?.images.map((image) => (
                                                <a href='javascript::' onClick={() => setMainImage(image?.url)}>
                                                    <img style={{ height: 100, width: 100, borderRadius: 10, marginRight: 10 }} src={image?.url} alt="" />
                                                </a>

                                            ))
                                        }
                                    </div>
                                    <div className="tag">{dateFormat(post?.createAt, "dd mmmm yyyy, h:MM:ss TT")}</div>
                                    <p>{post?.caption}</p> <br />

                                </div>

                                <div className="comment-area">
                                    <h3 className="title">{post?.comments.length} Comments</h3>
                                    {
                                        post?.comments.map((comment) => (
                                            <div key={comment?._id} className="single-comment">
                                                <div className="d-flex">
                                                    {
                                                        comment?.user.image?.url ? (
                                                            <img src={comment?.user.image?.url} alt="" className="user-img" />
                                                        ) : (
                                                            <img src="/assets/images/placeholder.jpg" alt="" className="user-img" />
                                                        )
                                                    }

                                                    <div className="comment">
                                                        <h6 className="name">{comment?.user.first_name} {comment?.user.last_name}</h6>
                                                        <div className="time">{dateFormat(comment?.createAt, "dd mmmm yyyy, h:MM:ss TT")}</div>
                                                        <p>{comment?.comment} </p>
                                                        <button className="reply float-right"><i className='fa fa-heart'></i> {comment?.likes.length}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="blog-sidebar-one">

                                    <div className="sidebar-categories mb-85">
                                        <h4 className="sidebar-title">Other Info</h4>
                                        <ul>
                                            <li><Link to="#">Likes <span>({post?.likes.length})</span></Link></li>
                                            <li><Link to="#">Comments <span>({post?.comments.length})</span></Link></li>
                                            <li><Link to="#">Share <span>({post?.shares.length})</span></Link></li>
                                            <li><Link to="#">Post Diamonds<span>({post?.post_diamonds.toFixed(0)})</span></Link></li>
                                            <li><Link to="#">Tranding For<span>({post?.tranding_diamonds.toFixed(0)})</span></Link></li>
                                            <li><Link to="#">User Diamonds <span>({post?.user_diamonds})</span></Link></li>
                                            <li><Link to="#">Who Can See <span>({post?.who_can_see})</span></Link></li>
                                            <li><Link to="#">Allow Comments <span>({post?.allow_comments === true ? 'true' : 'false'})</span></Link></li>
                                            <li><Link to="#">Allow Reactions <span>({post?.allow_reactions === true ? 'true' : 'false'})</span></Link></li>
                                            <li><Link to="#">High Quality Upload <span>({post?.allow_high_quality === true ? 'true' : 'false'})</span></Link></li>
                                            <li><Link to="#">Status <span>({post?.status})</span></Link></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </AdminLayout >
    )
}

export default AdminPostView