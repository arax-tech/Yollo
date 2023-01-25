import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';

const Header = () => {
    const { loading, isAuthenticated } = useSelector((state) => state.auth);

    return (
        loading ? <Loading /> :
            <div className="theme-main-menu sticky-menu theme-menu-five">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="logo" style={{ width: 180 }}><Link to={'/'}><img src="/assets/images/logo/logo.png" alt="" /></Link></div>

                    <nav id="mega-menu-holder" className="navbar navbar-expand-lg">
                        <div className="nav-container">
                            <button className="navbar-toggler">
                                <span></span>
                            </button>
                            <div className="navbar-collapse collapse" id="navbarSupportedContent">
                                <div className="d-lg-flex justify-content-between align-items-center">
                                    <ul className="navbar-nav main-side-nav font-gordita" id="one-page-nav">

                                        <li className="nav-item">
                                            {/* <NavLink to={'/'} className="nav-link">Home</NavLink> */}
                                            <a href={'/'} className="nav-link">Home</a>
                                        </li>

                                        <li className="nav-item">
                                            <a href={'/page/about'} className="nav-link">About</a>
                                        </li>

                                        <li className="nav-item">
                                            <a href={'/page/futures'} className="nav-link">Futures</a>
                                        </li>

                                        <li className="nav-item">
                                            <a href={'/feedback'} className="nav-link">Feedback</a>
                                        </li>

                                        <li className="nav-item">
                                            <a href={'/contact'} className="nav-link">Contact</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="right-widget">
                        <ul className="d-flex align-items-center">
                            <li>
                                <div className="dropdown download-btn style-two">

                                    {
                                        isAuthenticated && isAuthenticated === true ?
                                            <>
                                                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Hi, Admin
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a href={'/admin/dashboard'} className="dropdown-item d-flex align-items-center" >
                                                        <span>Dashboard</span>
                                                    </a>
                                                </div>

                                            </>

                                            :
                                            <>
                                                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Download
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <Link to={'/'} className="dropdown-item d-flex align-items-center" >
                                                        <img src="/assets/images/icon/103.svg" alt="" />
                                                        <span>App Store</span>
                                                    </Link>
                                                    <Link to={'/'} className="dropdown-item d-flex align-items-center" >
                                                        <img src="/assets/images/icon/103.svg" alt="" />
                                                        <span>Play Store</span>
                                                    </Link>
                                                </div>
                                            </>
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}

export default Header