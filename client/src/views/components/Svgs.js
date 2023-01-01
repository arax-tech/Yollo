
import React from 'react'

import Share from "../../assets/images/icons/svg/share.svg";
import Home from "../../assets/images/icons/svg/home.svg";
import Notification from "../../assets/images/icons/svg/notification.svg";
import PostSuccess from "../../assets/images/icons/svg/post-success.svg";

const SVGShare = ({ color, style }) => {
    return <Share color={color} style={style} />
}

const SVGHome = ({ color, style }) => {
    return <Home color={color} style={style} />
}

const SVGNotification = ({ color, style }) => {
    return <Notification color={color} style={style} />
}
const SVGPostSuccess = ({ color, style }) => {
    return <PostSuccess color={color} style={style} />
}



export { SVGShare, SVGHome, SVGNotification, SVGPostSuccess }
