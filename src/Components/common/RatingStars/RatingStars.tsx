import React from "react";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as style from './RatingStars.module.scss'
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const RatingStars = (props: {rating: number}) => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div>
            {array.map(value => {
                if(value <= props.rating) {
                    return <FontAwesomeIcon className={style.star} icon={faStar as IconProp} key={value}/>
                } else {
                    return <FontAwesomeIcon className={style.toggleStar} icon={faStar as IconProp} key={value}/>
                }
            })}
        </div>
    )
}

export default RatingStars