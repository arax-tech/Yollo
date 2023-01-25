import React from 'react'
import MetaData from './MetaData'



const Loading = () => {
    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <MetaData title="Loading..." />
            <img style={{ width: 200 }} src="/assets/images/loading.gif" alt="" />
        </div>
    )
}

export default Loading
