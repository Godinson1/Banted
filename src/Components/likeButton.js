import React from "react";
import { likeBanter, unlikeBanter } from "../actions/banterActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const LikeButton = (props) => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const likedBanter = () => {
    if (
      user.likes &&
      user.likes.find((like) => like.banterId === props.banterId)
    )
      return true;
    else return false;
  };

  const { authenticated } = user;
  const Like = !authenticated ? (
    <Link to="/login">
      <HeartOutlined />
    </Link>
  ) : likedBanter() && props.likeCount > 0 ? (
    <div className="icon-action-like">
      <HeartFilled
        style={{ color: "#E0245E" }}
        onClick={() => dispatch(unlikeBanter(props.banterId))}
      />
    </div>
  ) : (
    <div className="icon-action-like">
      <HeartOutlined onClick={() => dispatch(likeBanter(props.banterId))} />
    </div>
  );
  return Like;
};

export default LikeButton;
