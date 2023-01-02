
import React from 'react'

import Share from "../../assets/images/icons/svg/share.svg";
import Home from "../../assets/images/icons/svg/home.svg";
import Notification from "../../assets/images/icons/svg/notification.svg";
import PostSuccess from "../../assets/images/icons/svg/post-success.svg";
import DiamondPage from "../../assets/images/icons/svg/diamond-page.svg";
import MenuGridOutline from "../../assets/images/icons/svg/menu-grid-outline.svg";
import Favorite from "../../assets/images/icons/svg/favorite.svg";

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

const SVGDiamondPage = ({ color, style }) => {
    return <DiamondPage color={color} style={style} />
}

const SVGMenuGridOutline = ({ color, style }) => {
    return <MenuGridOutline color={color} style={style} />
}
const SVGFavorite = ({ color, style }) => {
    return <Favorite color={color} style={style} />
}



export { SVGShare, SVGHome, SVGNotification, SVGPostSuccess, SVGDiamondPage, SVGMenuGridOutline, SVGFavorite }
