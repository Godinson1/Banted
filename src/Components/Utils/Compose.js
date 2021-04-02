import React, { useEffect, useState, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Markup } from "interweave";
import { getClassMediaNames, readURI } from "../../util";
import { postBanter } from "../../actions/banterActions";
import { checkHashtag } from "../../util";
import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
//import Picker from "emoji-picker-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BanterBase from "../BanterBase";
import "../../Pages/styles/main/main.scss";

const Compose = () => {
  const banters = useSelector((state) => state.banters);
  const [imagesCompose, setImagesCompose] = useState([]);
  const [banterCompose, setBanterCompose] = useState("");
  const [imageFilesCompose, setImageFilesCompose] = useState([]);

  const location = useLocation();
  const textRef = createRef();
  const dispatch = useDispatch();

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
    dispatch(postBanter(data, setImagesCompose, emptyText, history));
    setImageFilesCompose([]);
  };

  const history = useHistory();
  dayjs.extend(relativeTime);

  useEffect(() => {
    const setFocus = () =>
      document.getElementsByClassName("banter-input-container").focus;
    setFocus();
  }, []);

  const bant = location.state.banter;

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
      <div id="show-modal-compose">
        <div className="picture-view">
          <div ref={wrapperRef} className="compose">
            <div className="close">
              <span onClick={() => history.goBack()}>X</span>
            </div>
            {bant !== null && (
              <div className="main-compose">
                <div className="flex-start-banter">
                  <div className="avatar-banter">
                    <img src="/images/noimg.png" alt="no-profile" />
                  </div>
                  <div className="flex-between">
                    <div className="nameHandle-container-banter">
                      <div>
                        <span id="name">
                          {bant.name} {""}
                          <span id="handle">
                            {" "}
                            @{bant.banterHandle} -{" "}
                            {dayjs(bant.createdAt).fromNow()}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="banter-text">
                  <p className="bantext">
                    {<Markup content={checkHashtag(bant.banter)} />}
                  </p>
                  <div className="reply-to">
                    <span id="reply-to">Replying to </span>
                    {""}
                    <span id="reply-handle">@godinson</span>
                  </div>
                </div>
              </div>
            )}
            <div className="main-compose">
              <div className="flex-start-banter">
                <div className="avatar-banter">
                  <img src="/images/noimg.png" alt="no-profile" />
                </div>
                <div className="flex-between">
                  <div className="nameHandle-container-banter">
                    <div
                      id="compose-edit"
                      placeholder={
                        bant === null ? "What's happening?" : "Tweet Reply"
                      }
                      className="banter-input-container"
                      contentEditable
                      ref={textRef}
                      onInput={(e) =>
                        setBanterCompose(e.currentTarget.textContent)
                      }
                    ></div>
                  </div>
                </div>
              </div>
              {imagesCompose.length !== 0 ? (
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
                  <div className={getClassMediaNames(imagesCompose)}>
                    {imagesCompose.map((image, index) => {
                      return (
                        <div className="media-container" key={index}>
                          <div
                            className="close-image"
                            onClick={() =>
                              removeImage(image, imagesCompose.indexOf(image))
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
              <div style={{ marginTop: "50px" }}>
                <BanterBase
                  handleImage={handleImage}
                  banter={banterCompose}
                  banters={banters}
                  submitBanter={submitBanterCompose}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
