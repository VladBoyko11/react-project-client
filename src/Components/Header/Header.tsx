import React, {useEffect} from "react";
import style from './Header.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {auth} from "../../redux/authSlice";

import { faBars, faCircleRight, faHouse, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {getTypesThunk} from "../../redux/deviceSlice";
import {setBasketThunk} from "../../redux/basketSlice";
import { RootState } from "../../redux/store";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Type } from "../../redux/types";

const Header: React.FC<HeaderPropsType> = (props) => {

    const navigate = useNavigate()
    const redirectToSomePage = (redirectPath: string) =>{
        navigate(redirectPath, {replace: true})
    }
    if(!props.isAuth) {
        props.auth({})
    }
    useEffect(()=>{
        if(props.isAuth && props.id){
            props.setBasketThunk({userId: props.id});
        }
    }, [props.isAuth])
    useEffect(() =>{
        props.getTypesThunk({typeName: undefined})
    }, [])

    return (
        <header>
            <div className={`dropdown`}>
                <button className={`btn btn-warning`} id='dropdownMenuButton' data-bs-toggle="dropdown"
                        aria-expanded="false"><FontAwesomeIcon icon={faBars as IconProp } fontSize='30px' /></button>
                <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton">
                    <div className='dropdown-item' style={{cursor: 'pointer'}} onClick={() => {
                        redirectToSomePage('/devices')}}
                    ><FontAwesomeIcon icon={faCircleRight as IconProp} /> DEVICE PAGE</div>
                    {props.types.map((type: Type, id: number) => {
                        // return <div key={type.id} className='dropdown-item' style={{cursor: 'pointer'}} onClick={() => {
                        //     redirectToSomePage(`/device/${type.name}`)}}
                        // ><FontAwesomeIcon icon={faCircleRight} /> {type.name}</div>
                        return <NavLink to={`/devices/${type.name}`} key={id} className='dropdown-item' style={{cursor: 'pointer'}}
                        ><FontAwesomeIcon icon={faCircleRight as IconProp} /> {type.name} </NavLink>
                    })}
                </div>
            </div>
            {props.isAuth ? <div className={'d-flex justify-content-between w-25'}>
                    <div className={`rounded-circle ${style.userPageIcon}`} onClick={() => {
                        redirectToSomePage('/user') }}>
                        <FontAwesomeIcon className={style.loggedInUser} icon={faHouse as IconProp} fontSize='1.8rem'/>
                    </div>
                    <div className={`rounded-circle ${style.userPageIcon}`} onClick={() => {
                        redirectToSomePage('/basket') }}>
                        <FontAwesomeIcon className={style.loggedInUser} icon={faBasketShopping as IconProp} fontSize='1.8rem'/>
                    </div>
                    {props.role === 'ADMIN' ? <button className={style.btnAdminPage} onClick={() => {redirectToSomePage('/admin-page')}}>Admin Page</button> : null}
                </div>
                : <button className={" bg-red-800 text-amber-700"} onClick={() => {redirectToSomePage('/auth')}}>Authorization</button>}
        </header>
    )
}

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    role: state.auth.role,
    types: state.devicesPage.types,
    id: state.auth.id
})

const connector = connect(mapStateToProps, {auth, getTypesThunk, setBasketThunk})
type ReduxPropsType = ConnectedProps<typeof connector>
type HeaderPropsType = ReduxPropsType

export default connector(Header)