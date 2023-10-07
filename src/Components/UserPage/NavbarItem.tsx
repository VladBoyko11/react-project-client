import React from "react";
import style from "./User.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const NavbarItem: React.FC<NavbarItemPropsType> = (props) => {
    const navigate = useNavigate()
    const redirectToSomePage = (redirectPath: string) =>{
        navigate(redirectPath, {replace: true})
    }
    return <button className={`${style.btnLogout} w-100 mb-2 d-flex`} onClick={() => {
        if(props.logout) {
            props.logout()
        }
        redirectToSomePage(props.redirectPath)
    }}>
        <div className={`justify-content-center align-items-center d-flex rounded-circle ${style.logoutIcon}`}>
            <FontAwesomeIcon icon={props.icon as IconProp} fontSize={'1.3rem'}/></div>
        <div className={`${style.navbarLogoutText} justify-content-center align-items-center d-flex`}>{props.text}</div>
    </button>
}

type NavbarItemPropsType = {
    text: string,
    icon: IconDefinition,
    redirectPath: string,
    logout?(): void 
}

export default NavbarItem