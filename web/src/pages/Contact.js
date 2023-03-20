import React from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../components/MetaData'
import App from './layoust/App'

const Contact = () => {
    return (
        <App>
            <MetaData title='Contact' />
            <div className="fancy-hero-four space-fix">
                <div className="shapes shape-one"></div>
                <div className="shapes shape-two"></div>
                <div className="shapes shape-three"></div>
                <div className="shapes shape-four"></div>
                <div className="shapes shape-five"></div>
                <div className="shapes shape-six"></div>
                <div className="bg-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-11 col-md-10 m-auto">
                                <h2>Feel free to contact us !</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-style-two">
                <div className="container">
                    <div className="contact-info-wrapper">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-sm-6 d-lg-flex">
                                <div className="address-info">
                                    <div className="icon d-flex align-items-end"><i class="fa fa-map-marker contact-icon"></i></div>
                                    <div className="title">Location</div>
                                    <p className="font-rubik">10 Highfield <br /> WEST LONDON NW11</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 d-lg-flex">
                                <div className="address-info">
                                    <div className="icon d-flex align-items-end"><i class="fa fa-envelope-o contact-icon"></i></div>
                                    <div className="title">Contact</div>
                                    <p className="font-rubik">info@yello.com <br />(779) 564-1593</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 d-lg-flex">
                                <div className="address-info">
                                    <div className="icon d-flex align-items-end"><i class="fa fa-share-alt contact-icon"></i></div>
                                    <div className="title">Social Media</div>
                                    <p className="font-rubik">Find on social media</p>
                                    <ul className="d-flex justify-content-center">
                                        <li><Link to={'/'}><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                        <li><Link to={'/'}><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                        <li><Link to={'/'}><i className="fa fa-pinterest" aria-hidden="true"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <img src="images/shape/64.svg" alt="" className="shapes shape-one" />
                        <img src="images/shape/65.svg" alt="" className="shapes shape-two" />
                    </div>

                    <div className="form-style-classic mt-200 md-mt-80">
                        <form action="#" id="contact-form" data-toggle="validator">
                            <div className="messages"></div>
                            <div className="row controls">
                                <div className="col-md-6" data-aos="fade-right" data-aos-duration="1200">
                                    <div className="input-group-meta form-group mb-60">
                                        <label>First Name</label>
                                        <input type="text" placeholder="Michel" name="Fname" required="required" data-error="Name is required." />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-md-6" data-aos="fade-left" data-aos-duration="1200">
                                    <div className="input-group-meta form-group mb-60">
                                        <label>Last Name</label>
                                        <input type="text" placeholder="Hawkins" name="Lname" required="required" data-error="Name is required." />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-12" data-aos="fade-up" data-aos-duration="1200">
                                    <div className="input-group-meta form-group mb-60">
                                        <label>Email Address</label>
                                        <input type="email" placeholder="saeslal@zouj.co.uk" name="email" required="required" data-error="Valid email is required." />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-12" data-aos="fade-up" data-aos-duration="1200">
                                    <div className="input-group-meta form-group lg mb-40">
                                        <label>Your Message</label>
                                        <textarea placeholder="your message here.." name="message" required="required" data-error="Please,leave us a message."></textarea>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-12" data-aos="fade-up" data-aos-duration="1200"><button className="theme-btn-two">Send Message</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </App >
    )
}

export default Contact
