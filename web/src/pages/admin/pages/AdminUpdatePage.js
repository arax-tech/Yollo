import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import AdminLayout from '../layouts/AdminLayout'
import Loading from '../../../components/Loading'
import { toast } from 'react-toastify'

import { SinglePageAction, UpdatePageAction } from '../../../redux/actions/PageAction'
import { UPDATE_PAGE_RESET } from '../../../redux/constants/PageConstant'



import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AdminUpdatePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        dispatch(SinglePageAction(params.id));
    }, [dispatch, params])

    const { loading, message, page: data, isUpdated } = useSelector((state) => state.page);


    let editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
            convertFromHTML(data?.description)
        ));

    // let editorState = EditorState.createEmpty();

    const [description, setDescription] = useState(editorState);

    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }

    const [page, setPage] = useState({
        name: data?.name,
        slug: data?.slug,
        description: data?.description,
    });

    const inpChnage = (event) => {
        setPage({ ...page, [event.target.name]: event.target.value })
    }

    const UpdatePageFunction = async (event) => {
        event.preventDefault();
        await dispatch(UpdatePageAction(params.id, page.name, page.slug, page.description.value));
    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: UPDATE_PAGE_RESET })
            navigate('/admin/pages')
        }

    }, [dispatch, navigate, isUpdated, message])




    return (
        loading ? <Loading /> :
            <AdminLayout>
                <MetaData title='Admin - Update Page' />
                <div className="fancy-feature-thirtyOne p-4">
                    <Link to={'/admin/dashboard'} className='btn btn-primary my-3 float-right'><i className='fa fa-arrow-left'></i> Back</Link>
                    <br clear="all" />
                    <div className="card">
                        <div className="card-header bg-light mb-1">
                            <h4>Update Page</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={UpdatePageFunction}>
                                <div className="row">
                                    <div className="col-6">
                                        <label>Name</label>
                                        <input type="text" name='name' className='form-control' autoFocus onChange={inpChnage} value={page.name} required />
                                    </div>
                                    <div className="col-6">
                                        <label>Slug</label>
                                        <input type="text" name='slug' className='form-control' autoFocus onChange={inpChnage} value={page.slug} required />
                                    </div>

                                    <div className="col-12">
                                        <label>Description</label>
                                        <Editor
                                            editorState={description}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            onEditorStateChange={onEditorStateChange}
                                        />
                                        <textarea style={{ display: 'none' }} disabled ref={(val) => page.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent()))} />
                                        {/* <textarea name='description' className='form-control' autoFocus onChange={inpChnage} value={page.description} required></textarea> */}
                                    </div>

                                    <div className="col-12 mt-3">
                                        <input type="submit" value={'Update'} className='btn btn-primary' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>

            </AdminLayout >
    )
}

export default AdminUpdatePage