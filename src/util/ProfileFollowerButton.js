import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unFollowUser } from '../actions/userActions';
import {Spin} from 'antd';

const ProfileFollowerButton = (props) => {

    const state = useSelector(state => state.users)
    const dispatch = useDispatch();


    const isFollowed = () => {
        if(state && state.following
           && state.following.find((follow) => follow.handle === props.handle)
          ) return true;
         else return false;
    }

    const Button = state.credentials && state.credentials.credentials && 
    state.credentials.credentials[0].handle === props.handle ?
            (
                ''
            ) : (isFollowed() ? (
                <button className="following" onClick={() => dispatch(unFollowUser(props.handle))}
                disabled={state && state.users && state.users.loading_fol}
                >
                    {state && state.users && state.users.loading_fol ? 
                     <span id="log-reg">Unfollowing..<Spin size="small" /></span> : '   Following'}  
                </button>
            ): (
                <button className="follow" 
                 onClick={() => dispatch(followUser(props.handle))}
                 disabled={state && state.users && state.users.loading_fol}
                 >
                     {state && state.users && state.users.loading_fol ? 
                     <span id="log-reg">Following..<Spin size="small" /></span> : '  Follow'} 
                </button>
            ))

    return Button;

}

export default ProfileFollowerButton;