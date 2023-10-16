import React, { useEffect } from "react";
import {connect, ConnectedProps} from "react-redux";
import {getYourRatings, logout} from "../../redux/authSlice";
import {faArrowRightFromBracket, faCommentDots, faBasketShopping, faUser, faAddressCard} from "@fortawesome/free-solid-svg-icons";
import NavbarItem from "./NavbarItem";
import {Route, Routes} from "react-router-dom";
import Reviews from "./Reviews";
import PersonalData from "./PersonalData";
import { RootState } from "../../redux/store";
import * as style from './User.module.scss'

const User: React.FC<UserPropsType> = (props) => {

    return (
        <div>
            <h2 className={style.userPageHeader}>USER PAGE</h2>
            {props.isAuth ? <div className={style.userPageContant}>
                <div className={style.userPageNav}>
                    <NavbarItem text='My reviews' icon={faCommentDots} redirectPath='/user/reviews'/>
                    <NavbarItem text='Your basket' icon={faBasketShopping} redirectPath='/basket'/>
                    <NavbarItem text='Personal data' icon={faUser} redirectPath='/user/personal-data'/>
                    <NavbarItem text='Contacts' icon={faAddressCard} logout={props.logout} redirectPath='/'/>
                    <NavbarItem text='Logout' icon={faArrowRightFromBracket} logout={props.logout} redirectPath='/'/>
                </div>
                <div className={style.userPageMain}>
                    <Routes>
                        <Route path="reviews" element={
                            <Reviews />}
                        />
                        <Route path="personal-data" element={
                            <PersonalData />
                        }
                        />
                    </Routes>
                </div>
            </div>: null}
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth
})

const connector = connect(mapStateToProps, {logout, getYourRatings})

type ReduxPropsType = ConnectedProps<typeof connector>
type UserPropsType = ReduxPropsType

export default connector(User)