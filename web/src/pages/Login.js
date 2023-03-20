import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../components/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { LoginAction } from '../redux/actions/AuthAction'
import { toast } from 'react-toastify'
import { LOGIN_RESET } from '../redux/constants/AuthConstant'
const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, status, message, isAuthenticated } = useSelector((state) => state.auth);


    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const inpChnage = (event) => {
        setLogin({ ...login, [event.target.name]: event.target.value })
    }

    const LoginFunction = (event) => {
        event.preventDefault();

        dispatch(LoginAction(login.email, login.password))
    }






    useEffect(() => {


        if (status && status === 200) {
            toast.success(message, { theme: "colored" })
            navigate("/admin/dashboard")
        }

        if (isAuthenticated === true) {
            navigate("/admin/dashboard")
        } else {
            navigate("/login")
        }
        if (status && status === 422) {
            toast.error(message, { theme: "colored" })
            dispatch({ type: LOGIN_RESET })
            navigate("/login")
        }


    }, [dispatch, navigate, status, isAuthenticated, message,])




    return (
        loading ? <Loading /> :
            <React.Fragment>
                <MetaData title='Login' />
                <div className="user-data-page clearfix d-lg-flex">
                    <div className="illustration-wrapper d-flex align-items-center justify-content-between flex-column">
                        <div className="illustration-holder">
                            <img src="/assets/images/assets/ils_08.svg" alt="" className="illustration" />
                            <img src="/assets/images/assets/ils_08.1.svg" alt="" className="shapes shape-one" />
                            <img src="/assets/images/assets/ils_08.2.svg" alt="" className="shapes shape-two" />
                        </div>
                    </div>

                    <div className="form-wrapper">
                        <div className="d-flex justify-content-between">
                            <div className="logo"><Link to='/'><img style={{ width: 130, marginTop: -20 }} src="/assets/images/logo/logo.png" alt="" /></Link></div>
                            <Link to='/' className="font-rubik go-back-button">Go to home</Link>
                        </div>
                        <form className="user-data-form mt-80 md-mt-40 " method='POST' onSubmit={LoginFunction}>
                            <h2>Welcome Back!</h2>
                            <br />

                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group-meta mb-80 sm-mb-70">
                                        <label>Email</label>
                                        <input type="email" name='email' autoFocus onChange={inpChnage} value={login.email} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="input-group-meta mb-15">
                                        <label>Password</label>
                                        <input type="password" name='password' className="pass_log_id" onChange={inpChnage} value={login.password} />
                                        <span className="placeholder_icon"><span className="passVicon"><img src="/assets/images/icon/view.svg" alt="" /></span></span>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                                        <div>
                                            <input type="checkbox" id="remember" />
                                            <label for="remember">Keep me logged in</label>
                                        </div>
                                        <Link to="#">Forget Password?</Link>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="theme-btn-one mt-50 mb-50">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
    )
}

export default Login