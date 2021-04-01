import React, { useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StarOutlined, CloseOutlined } from "@ant-design/icons";
import { message } from "antd";
//import Picker from "emoji-picker-react";
import NewBanter from "./NewBanter";
import { getClassMediaNames, readURI } from "../util";
import { postBanter } from "../actions/banterActions";
import "../Pages/styles/main/main.scss";
import BanterBase from "./BanterBase";

const Main = () => {
  const user = useSelector((state) => state.users.credentials);
  const banters = useSelector((state) => state.banters);
  const [images, setImages] = useState([]);
  const [banter, setBanter] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

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
          <div>Home</div>
          <div>
            <StarOutlined className="secondary-color" />
          </div>
        </div>
        <div className="banter-container">
          <div className="create-banter-container">
            <div className="flex-start-banter">
              <div className="avatar-banter">
                {user && user.credentials && user.credentials[0].userImage ? (
                  <img
                    src={
                      "/BantedImages/profileImages/" +
                      user.credentials[0].userImage
                    }
                    alt="user"
                  />
                ) : (
                  <img src="/images/noimg.png" alt="user" />
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
            <BanterBase
              handleImage={handleImage}
              banter={banter}
              banters={banters}
              submitBanter={submitBanter}
            />
          </div>
          <div className="banter-spacer"></div>
          <NewBanter />
        </div>
      </div>
    </div>
  );
};

export default Main;
