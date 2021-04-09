import React, { useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  StarOutlined,
  CloseOutlined,
  HomeFilled,
  BellOutlined,
  PlusOutlined,
  SearchOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { message } from "antd";
//import Picker from "emoji-picker-react";
import NewBanter from "./NewBanter";
import { getClassMediaNames, readURI } from "../util";
import { postBanter } from "../actions/banterActions";
import "../Pages/styles/main/main.scss";
import BanterBase from "./BanterBase";
import { useViewport } from "../util";

const Main = ({ nav, setNav, location }) => {
  const user = useSelector((state) => state.users.credentials);
  const banters = useSelector((state) => state.banters);
  const [images, setImages] = useState([]);
  const [banter, setBanter] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const { width } = useViewport();

  const dispatch = useDispatch();
  const textRef = createRef();

  const handleImage = (e) => {
    setImageFiles(e.target.files);
    if (e.target.files.length > 4) {
      message.error({
        content: "You can only upload one Gif or maximum of 4 Images",
      });
    } else {
      readURI(e, setImages);
    }
  };

  const submitBanter = () => {
    const data = new FormData();
    for (const key of Object.keys(imageFiles)) {
      data.append("banterImage", imageFiles[key]);
    }
    const emptyText = () =>
      (document.getElementsByClassName("banter-input-container")[0].innerHTML =
        "");
    data.append("banter", banter);
    dispatch(postBanter(data, setImages, emptyText));
    setImageFiles([]);
  };

  const removeImage = (value, index) => {
    setImages(images.filter((image) => image !== value));
    const newArray = Array.from(imageFiles);
    setImageFiles(newArray.filter((image) => image !== newArray[index]));
  };

  return (
    <div>
      <div className="s">
        <div className="banter-header">
          <div className="flex">
            <div className="menuicon">
              <div onClick={() => setNav(!nav)} className="avatar-banter-menu">
                {user && user.credentials && user.credentials[0].userImage && (
                  <img src={user.credentials[0].userImage} alt="user" />
                )}
              </div>
            </div>
            &nbsp;
            <div>Home</div>
          </div>

          <div>
            <StarOutlined className="secondary-color" />
          </div>
        </div>
        <div className="banter-container">
          <div className="create-banter-container">
            {width < 620 ? (
              ""
            ) : (
              <div className="flex-start-banter">
                <div className="avatar-banter">
                  {user &&
                    user.credentials &&
                    user.credentials[0].userImage && (
                      <img src={user.credentials[0].userImage} alt="user" />
                    )}
                </div>
                <div className="flex-between">
                  <div className="nameHandle-container-banter">
                    <div
                      placeholder="What's happening?"
                      className="banter-input-container"
                      contentEditable
                      ref={textRef}
                      onInput={(e) => setBanter(e.currentTarget.textContent)}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {images.length !== 0 ? (
              <div
                style={{
                  height: "290px",
                  width: "500px",
                  backgroundColor: "red",
                  marginLeft: "60px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div className={getClassMediaNames(images)}>
                  {images.map((image, index) => {
                    return (
                      <div className="media-container" key={index}>
                        <div
                          className="close-image"
                          onClick={() =>
                            removeImage(image, images.indexOf(image))
                          }
                        >
                          <CloseOutlined />
                        </div>
                        {<img src={image} alt="banter" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            {width < 620 ? (
              ""
            ) : (
              <BanterBase
                handleImage={handleImage}
                banter={banter}
                banters={banters}
                submitBanter={submitBanter}
                gifId={"gif-file"}
                file={"file"}
              />
            )}
          </div>
          <div className="banter-spacer"></div>
          <NewBanter />
        </div>
        <div className="banter-fas">
          <Link
            to={{
              pathname: `/compose/banter`,
              state: {
                background: location,
                banter: null,
              },
            }}
            className="link"
          >
            <div className="fab">
              <PlusOutlined />
            </div>
          </Link>
        </div>
        <div className="banter-footer">
          <div>
            <NavLink className="link" to="/home" activeClassName="selected">
              <HomeFilled />
            </NavLink>
          </div>
          <div>
            <NavLink className="link" to="/explore" activeClassName="selected">
              <SearchOutlined />
            </NavLink>
          </div>
          <div>
            <NavLink
              className="link"
              to="/notifications"
              activeClassName="selected"
            >
              <BellOutlined />
            </NavLink>
          </div>
          <div>
            <NavLink className="link" to="/messages" activeClassName="selected">
              <MailOutlined />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
