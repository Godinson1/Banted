import React, { useState, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Base from "./Base";
import { postBanter } from "../../../actions/banterActions";
import { getClassMediaNames, readURI } from "../../../util";
import "./styles.scss";

const HeaderCompose = () => {
  const [banter, setBanter] = useState("");
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const banters = useSelector((state) => state.banters);
  const user = useSelector((state) => state.users.credentials);
  const dispatch = useDispatch();

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
    const emptyText = () => (document.getElementsByClassName("input-container")[0].innerHTML = "");
    data.append("banter", banter);
    dispatch(postBanter(data, setImages, emptyText));
    setImageFiles([]);
  };

  const removeImage = (value, index) => {
    setImages(images.filter((image) => image !== value));
    const newArray = Array.from(imageFiles);
    setImageFiles(newArray.filter((image) => image !== newArray[index]));
  };

  const textRef = createRef();
  return (
    <div>
      <div className='compose-header'>
        <div className='user-avatar'>
          {user && user.credentials && user.credentials[0].userImage && (
            <img src={user.credentials[0].userImage} alt='user' />
          )}
        </div>
        <div>
          <div>
            <div
              placeholder="What's happening?"
              className='input-container'
              contentEditable
              ref={textRef}
              onInput={(e) => setBanter(e.currentTarget.textContent)}
            ></div>
            {images.length !== 0 ? (
              <div className='media-header'>
                <div className={getClassMediaNames(images)}>
                  {images.map((image, index) => {
                    return (
                      <div className='media-container' key={index}>
                        <div className='close-image' onClick={() => removeImage(image, images.indexOf(image))}>
                          <CloseOutlined />
                        </div>
                        {<img src={image} alt='banter' />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            <Base
              handleImage={handleImage}
              banter={banter}
              banters={banters}
              submitBanter={submitBanter}
              gifId={"gif-file"}
              file={"file"}
            />
          </div>
        </div>
      </div>
      <div className='banter-spacer'></div>
    </div>
  );
};

export default HeaderCompose;
