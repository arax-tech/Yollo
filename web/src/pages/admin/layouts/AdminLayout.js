import React from 'react'
import App from '../../layoust/App'

const AdminLayout = ({ children }) => {
    return (
        <App>
            <div style={{ marginTop: 150 }}>
                {children}
            </div>
        </App>
    )
}

export default AdminLayout