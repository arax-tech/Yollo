import React from 'react'
import Footer from '../include/Footer';
import Header from '../include/Header';
import LoadFile from '../../components/LoadFile'
const App = ({ children }) => {

    return (
        <React.Fragment>
            <Header />
            {children}
            <Footer />
            <LoadFile />
            <button className="scroll-top">
                <i className="fa fa-angle-up" aria-hidden="true"></i>
            </button><></>
        </React.Fragment >
    )
}

export default App
