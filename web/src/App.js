import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Contact from './pages/Contact'
import FeedBack from './pages/FeedBack'
import Home from './pages/Home'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'

import AdminDashboard from './pages/admin/AdminDashboard'

import { AuthUser } from './redux/actions/AuthAction'
import Store from './redux/Store'
import Auth from './middlewares/Auth'
import AdminPost from './pages/admin/posts/AdminPost'
import AdminPostView from './pages/admin/posts/AdminPostView'
import AdminUser from './pages/admin/users/AdminUser'
import AdminBadge from './pages/admin/badges/AdminBadger'
import AdminPage from './pages/admin/pages/AdminPage'
import AdminCreatePage from './pages/admin/pages/AdminCreatePage'
import AdminUpdatePage from './pages/admin/pages/AdminUpdatePage'
import Pages from './pages/Pages'
import AdminSupport from './pages/admin/supports/AdminSupport'

const App = () => {
    useEffect(() => {
        Store.dispatch(AuthUser());
    }, []);
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/feedback' element={<FeedBack />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/page/:slug' element={<Pages />} />

            <Route path='/admin/dashboard' element={<Auth children={<AdminDashboard />} />} />

            <Route path='/admin/posts' element={<Auth children={<AdminPost />} />} />
            <Route path='/admin/post/:id' element={<Auth children={<AdminPostView />} />} />

            <Route path='/admin/users' element={<Auth children={<AdminUser />} />} />

            <Route path='/admin/badges' element={<Auth children={<AdminBadge />} />} />

            <Route path='/admin/pages' element={<Auth children={<AdminPage />} />} />
            <Route path='/admin/page/create' element={<Auth children={<AdminCreatePage />} />} />
            <Route path='/admin/page/edit/:id' element={<Auth children={<AdminUpdatePage />} />} />

            <Route path='/admin/help-and-support' element={<Auth children={<AdminSupport />} />} />

            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default App