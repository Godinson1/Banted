import React from 'react'
import { likeBanter, unlikeBanter } from '../actions/banterActions';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import MyButton from '../util/myButton';
  

const LikeButton = (props) => {
   const user = useSelector(state => state.users);
   const dispatch = useDispatch();

   const likedBanter = () => {
        if (user.likes 
            && user.likes.find(
            (like) => like.banterId === props.banterId))
        return true;
        else return false;
    }

    const { authenticated } = user;
    const Like = !authenticated ? (
        <Link to='/login'>
            <MyButton tip='like'>
                <Icon type="heart" />
            </MyButton>
        </Link>
    ) : likedBanter() ? (
        <MyButton tip='unlike' onClick={() => dispatch(unlikeBanter(props.banterId))}>
            <Icon type="heart" theme='filled'/>
        </MyButton>
    ) : (
        <MyButton tip='like' onClick={() => dispatch(likeBanter(props.banterId))}>
            <Icon type="heart" />
        </MyButton>
    );
    return Like;
}

export default LikeButton