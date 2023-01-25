import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="theme-footer-seven mt-120 md-mt-100">
            <div className="lg-container">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-2 mb-40" data-aos="fade-up" data-aos-duration="1200">
                            <div className="logo"><Link to={'/'} ><img style={{ width: 130 }} src="/assets/images/logo/logo.png" alt="" /></Link></div>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-40" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
                            <h5 className="title">Links</h5>
                            <ul className="footer-list">
                                <li><a href={'/'}>Home</a></li>
                                <li><a href={'/page/about'}>About us</a></li>
                                <li><a href={'/page/futures'}>Features</a></li>
                                <li><a href={'/feedback'}>Feedback</a></li>
                                <li><a href={'/contact'}>Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-40" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="150">
                            <h5 className="title">Legal</h5>
                            <ul className="footer-list">
                                <li><a href={'/page/term-of-use'}>Terms of Use</a></li>
                                <li><a href={'/page/terms-and-conditions'}>Terms & conditions</a></li>
                                <li><a href={'/page/privacy-policy'}>Privacy policy</a></li>
                                <li><a href={'/page/cookie-policy'}>Cookie policy</a></li>
                            </ul>
                        </div>
                        <div className="col-xl-4 col-lg-5 mb-40" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
                            <div className="newsletter">
                                <h5 className="title">Newslettert</h5>
                                <p>Join over <span>68,000</span> people getting our emails</p>
                                <form action="#">
                                    <input type="email" placeholder="Enter your email" />
                                    <button className="dark-btn">Sign Up</button>
                                </form>
                                <div className="info">We only send interesting and relevant emails.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="bottom-footer">
                        <div className="row">
                            <div className="col-lg-4 order-lg-1 mb-20">
                                <ul className="d-flex justify-content-center justify-content-lg-start footer-nav">
                                    <li><Link to={'/privacy-policy'}>Privacy & Terms.</Link></li>
                                    <li><Link to={'/contact'}>Contact Us</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-4 order-lg-3 mb-20">
                                <ul className="d-flex justify-content-center justify-content-lg-end social-icon">
                                    <li><Link to={'/'}><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                    <li><Link to={'/'}><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                    <li><Link to={'/'}><i className="fa fa-linkedin" aria-hidden="true"></i></Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-4 order-lg-2 mb-20">
                                <p className="copyright text-center">Copyright @2023 Yello</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer