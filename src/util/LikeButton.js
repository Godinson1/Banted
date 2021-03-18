import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeBanter, unlikeBanter } from '../actions/banterActions';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './css/like.css';


const LikeButton = (props) => {

    const state = useSelector(state => state.users)
    const dispatch = useDispatch();


    const isLiked = () => {
        if(state && state.likes
           && state.likes.find((like) => like.banterId === props.banterId)
          ) return true;
         else return false;
    }

    const Button = isLiked() ? (
                <button className="like-button" 
                onClick={() => dispatch(unlikeBanter(props.banterId))}>
                <HeartFilled className="like-icon"/>
                </button>
            ): (
                <button className="like-button"
                onClick={() => dispatch(likeBanter(props.banterId))}>
                <HeartOutlined/>
                </button>
            )

    return Button;

}

export default LikeButton;