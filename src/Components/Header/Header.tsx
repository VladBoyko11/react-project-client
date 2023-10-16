import React, { useEffect } from "react";
import * as style from './Header.module.scss'
import { NavLink, useNavigate } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { auth } from "../../redux/authSlice";

import { faBars, faCircleRight, faHouse, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTypesThunk } from "../../redux/deviceSlice";
import { setBasketThunk } from "../../redux/basketSlice";
import { RootState } from "../../redux/store";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Type } from "../../redux/types";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Header: React.FC<HeaderPropsType> = (props) => {

    const navigate = useNavigate()
    // const token = sessionStorage.getItem('token')
    const redirectToSomePage = (redirectPath: string) => {
        navigate(redirectPath, { replace: true })
    }
    useEffect(() => {
        if (!props.isAuth) {
            // navigate('/auth', {replace: true})
            props.auth();
        } else {
            console.log(`Token expired`)
        }
    }, [props.isAuth])
    useEffect(() => {
        if (props.id) {
            props.setBasketThunk({ userId: props.id });
        }
    }, [props.id])
    useEffect(() => {
        props.getTypesThunk({ typeName: undefined })
    }, [])

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#ffc107',
            },
        },
    });

    return (
        <header>
            <ThemeProvider theme={theme}>
                <div>
                    <Button variant="contained" id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} ><FontAwesomeIcon icon={faBars as IconProp} fontSize='30px' /></Button>
                    <Menu id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <NavLink className={style.menuItem} to={'/devices'}><MenuItem ><FontAwesomeIcon icon={faCircleRight as IconProp} /> DEVICE PAGE</MenuItem></NavLink>
                        {props.types.map((type: Type, id: number) => {
                            return <NavLink key={id} className={style.menuItem} to={`/devices/${type.name}`}><MenuItem><FontAwesomeIcon icon={faCircleRight as IconProp} /> {type.name}</MenuItem></NavLink>
                        })}
                    </Menu>
                </div>
                {props.isAuth ? <div className={style.isAuthButtons}>
                    <Button variant="contained" className={style.userPageIcon} onClick={() => {
                        redirectToSomePage('/user')
                    }}>
                        <FontAwesomeIcon className={style.loggedInUser} icon={faHouse as IconProp} fontSize='1.8rem' />
                    </Button>
                    <Button variant="contained" className={style.userPageIcon} onClick={() => {
                        redirectToSomePage('/basket')
                    }}>
                        <FontAwesomeIcon className={style.loggedInUser} icon={faBasketShopping as IconProp} fontSize='1.8rem' />
                    </Button>
                    {props.role === 'ADMIN' ? <Button variant="contained" className={style.btnAdminPage} onClick={() => { redirectToSomePage('/admin-page') }}>Admin Page</Button> : null}
                </div>
                    : <Button variant="contained" onClick={() => { redirectToSomePage('/auth') }}>Authorization</Button>}
            </ThemeProvider>
        </header>
    )
}

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    role: state.auth.role,
    types: state.devicesPage.types,
    id: state.auth.id
})

const connector = connect(mapStateToProps, { auth, getTypesThunk, setBasketThunk })
type ReduxPropsType = ConnectedProps<typeof connector>
type HeaderPropsType = ReduxPropsType

export default connector(Header)