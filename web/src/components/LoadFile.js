import React from 'react'
import { Helmet } from 'react-helmet'

const LoadFile = () => {
    return (

        <Helmet>
            <script src="/assets/vendor/jquery.min.js" type="text/javascript" />
            <script src="/assets/vendor/popper.js/popper.min.js" type="text/javascript" />
            <script src="/assets/vendor/bootstrap/js/bootstrap.min.js" type="text/javascript" />
            <script src="/assets/vendor/mega-menu/assets/js/custom.js" type="text/javascript" />
            <script src="/assets/vendor/aos-next/dist/aos.js" type="text/javascript" />
            <script src="/assets/vendor/jquery.appear.js" type="text/javascript" />
            <script src="/assets/vendor/jquery.countTo.js" type="text/javascript" />
            <script src="/assets/vendor/slick/slick.min.js" type="text/javascript" />
            <script src="/assets/vendor/fancybox/dist/jquery.fancybox.min.js" type="text/javascript" />
            <script src="/assets/vendor/validator.js" type="text/javascript" />
            <script src="/assets/vendor/mixitup-3/mixitup.min.js" type="text/javascript" />
            <script src="/assets/js/theme.js" type="text/javascript" />
        </Helmet>

    )
}

export default LoadFile