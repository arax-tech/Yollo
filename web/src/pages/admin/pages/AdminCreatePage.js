import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import AdminLayout from '../layouts/AdminLayout'
import Loading from '../../../components/Loading'
import { toast } from 'react-toastify'

import { CreatePageAction } from '../../../redux/actions/PageAction'
import { CREATE_PAGE_RESET } from '../../../redux/constants/PageConstant'



import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AdminCreatePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { loading, message, isCreated } = useSelector((state) => state.page);


    let editorState = EditorState.createEmpty();
    const [description, setDescription] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }

    const [page, setPage] = useState({
        name: "",
        slug: "",
        description: "",
    });
    console.log(page)

    const inpChnage = (event) => {
        setPage({ ...page, [event.target.name]: event.target.value })
    }

    const CreatePageFunction = async (event) => {
        event.preventDefault();
        await dispatch(CreatePageAction(page.name, page.slug, page.description.value));

    }

    useEffect(() => {
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: CREATE_PAGE_RESET })
            navigate('/admin/pages')
        }

    }, [dispatch, navigate, isCreated, message])




    return (
        loading ? <Loading /> :
            <AdminLayout>
                <MetaData title='Admin - Create Page' />
                <div className="fancy-feature-thirtyOne p-4">
                    <Link to={'/admin/pages'} className='btn btn-primary my-3 float-right'><i className='fa fa-arrow-left'></i> Back</Link>
                    <br clear="all" />
                    <div className="card">
                        <div className="card-header bg-light mb-1">
                            <h4>Create Page</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={CreatePageFunction}>
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
                                        <input type="submit" value={'Create'} className='btn btn-primary' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>

            </AdminLayout >
    )
}

export default AdminCreatePage