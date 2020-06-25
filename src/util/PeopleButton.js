import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../actions/userActions';


const PeopleButton = (props) => {

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
                ''
            ): (
                <button className="follow" 
                 onClick={() => dispatch(followUser(props.handle))}
                 >
                  Follow
                </button>
            ))

    return Button;

}

export default PeopleButton;