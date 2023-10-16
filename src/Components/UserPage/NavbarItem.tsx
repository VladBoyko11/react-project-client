import React from "react";
import * as style from "./User.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "@mui/material";

const NavbarItem: React.FC<NavbarItemPropsType> = (props) => {
    const navigate = useNavigate()
    const redirectToSomePage = (redirectPath: string) => {
        navigate(redirectPath, { replace: true })
    }
    return <Button variant="contained" fullWidth sx={{ display: 'flex', justifyContent: 'space-between', marginY: '0.5rem' }} onClick={() => {
        if (props.logout) {
            props.logout()
        }
        redirectToSomePage(props.redirectPath)
    }}>
        <div className={`${style.logoutIcon}`}>
            <FontAwesomeIcon icon={props.icon as IconProp} fontSize={'1.3rem'} />
        </div>
        <div className={`${style.navbarLogoutText}`}>{props.text}</div>
    </Button>
}

type NavbarItemPropsType = {
    text: string,
    icon: IconDefinition,
    redirectPath: string,
    logout?(): void
}

export default NavbarItem