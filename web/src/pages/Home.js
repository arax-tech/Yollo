import React from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../components/MetaData'
import Reviews from '../components/Reviews'
import App from './layoust/App'

const Home = () => {
    return (
        <App>
            <MetaData title="Home" />
            {/* Hero Banner */}

            <div className="hero-banner-ten">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 col-lg-11 col-md-8 m-auto">
                            <h1 className="hero-heading">Yello social media app</h1>
                            <p className="hero-sub-heading">Lorem ipsum is a placeholder text commonly used to...</p>
                        </div>
                    </div>
                    <div className="d-sm-flex align-items-center justify-content-center button-group">
                        <Link to={'/'} className="d-flex align-items-center ios-button">
                            <img src="/assets/images/icon/apple.svg" alt="" className="icon" />
                            <div>
                                <span>Download on the</span>
                                <strong>App store</strong>
                            </div>
                        </Link>
                        <Link to={'/'} className="d-flex align-items-center windows-button">
                            <img src="/assets/images/icon/playstore.svg" alt="" className="icon" />
                            <div>
                                <span>Get it on</span>
                                <strong>Google play</strong>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="icon-box-one"><img src="/assets/images/logo/logo-39.png" alt="" /></div>
                <div className="icon-box-two"><img src="/assets/images/logo/logo-40.png" alt="" /></div>
                <div className="icon-box-three"><img src="/assets/images/logo/logo-41.png" alt="" /></div>
                <div className="icon-box-four"><img src="/assets/images/logo/logo-42.png" alt="" /></div>
                <div className="icon-box-five"><img src="/assets/images/logo/logo-43.png" alt="" /></div>
                <div className="icon-box-six"><img src="/assets/images/logo/logo-44.png" alt="" /></div>
                <div className="icon-box-seven"><img src="/assets/images/logo/logo-45.png" alt="" /></div>
                <div className="icon-box-eight"><img src="/assets/images/logo/logo-46.png" alt="" /></div>
            </div>

            <div className="app-screen-preview-one">
                <div className="container">
                    <div className="app-preview-slider-one">
                        <div className="item">
                            <div className="img-holder"><img src="/assets/images/assets/screen/home.png" alt="" /></div>
                        </div>
                        <div className="item">
                            <div className="img-holder"><img src="/assets/images/assets/screen/profile.png" alt="" /></div>
                        </div>
                        <div className="item">
                            <div className="img-holder"><img src="/assets/images/assets/screen/search.png" alt="" /></div>
                        </div>
                        <div className="item">
                            <div className="img-holder"><img src="/assets/images/assets/screen/memories.png" alt="" /></div>
                        </div>
                    </div>
                </div>
                <img src="/assets/images/shape/bg5.svg" alt="" className="shapes round-bg" />
                <img src="/assets/images/shape/216.svg" alt="" className="shapes shape-one" />
                <img src="/assets/images/shape/217.svg" alt="" className="shapes shape-two" />
                <img src="/assets/images/shape/218.svg" alt="" className="shapes shape-three" />
                <img src="/assets/images/shape/219.svg" alt="" className="shapes shape-four" />
            </div>




            <div className="fancy-feature-twentyFive lg-container mt-200 md-mt-100" id="feature">
                <div className="container">


                    <div className="block-style-twentyFive mt-200 md-mt-120">
                        <div className="row align-items-center">
                            <div className="col-xl-7 col-lg-6 col-md-10 m-auto text-center text-lg-right order-lg-last" data-aos="fade-left" data-aos-duration="1200">
                                <div className="screen-container">
                                    <img src="/assets/images/shape/bg6.svg" alt="" className="ml-auto bg-round-shape" />
                                    <div className="block-content">
                                        <div className="row align-items-center">
                                            <div className="col-sm-6">
                                                <div className="feature-meta">
                                                    <div className="icon d-flex align-items-end"><img src="/assets/images/icon/136.svg" alt="" /></div>
                                                    <h4>Friendly <br /> user interface</h4>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div className="feature-meta">
                                                    <div className="icon d-flex align-items-end"><img src="/assets/images/icon/137.svg" alt="" /></div>
                                                    <h4>Rewards System</h4>
                                                </div>
                                                <div className="feature-meta">
                                                    <div className="icon d-flex align-items-end"><img src="/assets/images/icon/138.svg" alt="" /></div>
                                                    <h4>Quality & fast <br />support</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-6" data-aos="fade-right" data-aos-duration="1200">
                                <div className="text-wrapper order-lg-first">
                                    <h3 className="title">Why you choose Yello app?</h3>
                                    <p>Things go wrong have We’ve understand.</p>
                                    <ul>
                                        <li>Amazing communication.</li>
                                        <li>Best feeds experience.</li>
                                        <li>Live chating & calls.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Reviews />

            <div className="fancy-short-banner-twelve">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 col-lg-11 m-auto" data-aos="fade-up" data-aos-duration="1200">
                            <div className="title-style-ten text-center">
                                <h2>Love our Yello application? Download now!</h2>
                                <p className="pt-25 pb-45">Try it risk free — we don’t charge any cancellation fees</p>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1200" data-aos-delay="150">
                        <div className="d-sm-flex align-items-center justify-content-center button-group">
                            <Link to={'/'} className="d-flex align-items-center ios-button">
                                <img src="/assets/images/icon/apple-black.svg" alt="" className="icon" />
                                <div>
                                    <span>Download on the</span>
                                    <strong>App store</strong>
                                </div>
                            </Link>
                            <Link to={'/'} className="d-flex align-items-center windows-button">
                                <img src="/assets/images/icon/playstore.svg" alt="" className="icon" />
                                <div>
                                    <span>Get it on</span>
                                    <strong>Google play</strong>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <img src="/assets/images/shape/220.svg" alt="" className="shapes shape-one" />
                <img src="/assets/images/shape/221.svg" alt="" className="shapes shape-two" />
            </div>



        </App >
    )
}

export default Home