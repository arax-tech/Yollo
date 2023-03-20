import React from 'react'
import { Link } from 'react-router-dom'
import App from './layoust/App'

const PageNotFound = () => {
    return (
        <App>
            <div className="hero-banner-ten">
                <h2>Page Not Found...</h2>
                <Link to="/" class="btn btn-dark mt-2 align-items-center justify-content-center">
                    <span><i className='fa fa-arrow-left'></i> Back to Home</span>
                </Link>
            </div>
        </App>
    )
}

export default PageNotFound