import React from "react";
import style from './NotificationContainer.module.scss'
import {connect, ConnectedProps} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../redux/store";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const NotificationContainer: React.FC<NotificationContainerPropsType> = (props) => {
    return (
        <div className={style.notification}>
            <FontAwesomeIcon icon={faExclamation as IconProp} />
            {props.message}
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    message: state.notificationPage.message,
    toggleNotification: state.notificationPage.toggleNotification,
})

const connector = connect(mapStateToProps, {})
type ReduxPropsType = ConnectedProps<typeof connector>
type NotificationContainerPropsType = ReduxPropsType 

export default connector(NotificationContainer)