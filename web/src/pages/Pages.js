import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import MetaData from '../components/MetaData'
import { SinglePageByNameAction } from '../redux/actions/PageAction';
import App from './layoust/App'

const Pages = () => {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(SinglePageByNameAction(params.slug));
    }, [dispatch, params])

    const { loading, page: data } = useSelector((state) => state.page);

    return (
        loading ? <Loading /> :
            <App>
                <MetaData title={data?.name} />

                <div className='container' style={{ marginTop: 200 }}>
                    <h2>{data?.name}</h2>
                    <br />
                    <div
                        dangerouslySetInnerHTML={{ __html: data?.description }}
                    />
                </div>



            </App >
    )
}

export default Pages