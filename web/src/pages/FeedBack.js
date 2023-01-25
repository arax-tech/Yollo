import React from 'react'
import MetaData from '../components/MetaData'
import Reviews from '../components/Reviews'
import App from './layoust/App'

const FeedBack = () => {
    return (
        <App>
            <MetaData title='Feed Back' />
            <Reviews />
        </App >
    )
}

export default FeedBack
