import React, { useEffect, useState, useRef, createRef } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Markup } from "interweave";
import { postBanter, commentOnBanter } from "../../../../actions/banterActions";
import { checkHashtag, getClassMediaNames, readURI } from "../../../../util";
import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./styles.scss";
import Base from "./Base";
import dayjs from "dayjs";
import dayjsTwitter from "dayjs-twitter";

const ComposeBanter = () => {
  const banters = useSelector((state) => state.banters);
  const user = useSelector((state) => state.users.credentials);
  const [imagesCompose, setImagesCompose] = useState([]);
  const [banterCompose, setBanterCompose] = useState("");
  const [imageFilesCompose, setImageFilesCompose] = useState([]);

  const location = useLocation();
  const textRef = createRef();
  const dispatch = useDispatch();
  const bant = location.state.banter;
  dayjs.extend(dayjsTwitter);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleImage = (e) => {
    setImageFilesCompose(e.target.files);
    if (e.target.files.length > 4) {
      message.error({
        content: "You can only upload one Gif or maximum of 4 Images",
      });
    } else {
      readURI(e, setImagesCompose);
    }
  };

  const removeImage = (value, index) => {
    setImagesCompose(imagesCompose.filter((image) => image !== value));
    const newArray = Array.from(imageFilesCompose);
    setImageFilesCompose(newArray.filter((image) => image !== newArray[index]));
  };

  const submitBanterCompose = () => {
    const data = new FormData();
    for (const key of Object.keys(imageFilesCompose)) {
      data.append("banterImage", imageFilesCompose[key]);
    }
    const emptyText = () =>
      (document.getElementsByClassName("banter-input-container")[0].innerHTML =
        "");
    data.append("banter", banterCompose);
    if (bant !== null) {
      dispatch(
        commentOnBanter(bant._id, data, setImagesCompose, emptyText, history)
      );
    } else {
      dispatch(postBanter(data, setImagesCompose, emptyText, history));
    }
    setImageFilesCompose([]);
  };

  const history = useHistory();

  useEffect(() => {
    const setFocus = () =>
      document.getElementsByClassName("banter-input-container").focus;
    setFocus();
  }, []);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          history.goBack();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div>
      <div id="left-modal-compose">
        <div className="picture-view">
          <div ref={wrapperRef} className="compose">
            <div className="close">
              <span onClick={() => history.goBack()}>X</span>
            </div>
            {bant !== null && (
              <div className="main-compose-banter">
                <div className="timeline-banter-container">
                  <div className="banter-container">
                    <div className="user-avatar">
                      <Link
                        to={{
                          pathname: `/${bant.banterHandle}`,
                          state: { banter: bant },
                        }}
                        className="link"
                      >
                        <img src={bant.userImage} alt="profile" />
                      </Link>
                    </div>
                    <div className="timeline-content-container">
                      <div className="header-between">
                        <div className="name-handle-time">
                          <div className="name">{bant.name}</div>
                          <div className="handle">@{bant.banterHandle}</div>
                          <div className="date">
                            - {dayjs(bant.createdAt).twitter()}
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="bantext">
                          {<Markup content={checkHashtag(bant.banter)} />}
                        </p>
                      </div>
                      <div className="reply-to">
                        Replying to
                        <span id="reply-handle"> @{bant.banterHandle}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="main-compose">
              <div className="compose-header">
                <div className="user-avatar">
                  {user &&
                    user.credentials &&
                    user.credentials[0].userImage && (
                      <img src={user.credentials[0].userImage} alt="user" />
                    )}
                </div>
                <div>
                  <div>
                    <div
                      placeholder={
                        bant !== null
                          ? `Reply to ${bant.banterHandle}`
                          : "What's happening?"
                      }
                      className="input-container"
                      contentEditable
                      ref={textRef}
                      onInput={(e) =>
                        setBanterCompose(e.currentTarget.textContent)
                      }
                    ></div>
                    <div className="image-compose-container">
                      {imagesCompose.length !== 0 ? (
                        <div className="media-header">
                          <div className={getClassMediaNames(imagesCompose)}>
                            {imagesCompose.map((image, index) => {
                              return (
                                <div className="media-container" key={index}>
                                  <div
                                    className="close-image"
                                    onClick={() =>
                                      removeImage(
                                        image,
                                        imagesCompose.indexOf(image)
                                      )
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
                    </div>
                    <Base
                      handleImage={handleImage}
                      banter={banterCompose}
                      banters={banters}
                      submitBanter={submitBanterCompose}
                      gifId={"gif-file-compose"}
                      file={"file-compose"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeBanter;
