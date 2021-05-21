import React from "react";
import {
  PictureOutlined,
  SmileOutlined,
  GifOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import "./styles.scss";

const Base = ({ handleImage, banters, banter, submitBanter, gifId, file }) => {
  return (
    <div>
      <div className="compose-header-base">
        <div className="flex-base-icons">
          <div className="tooltips">
            <form encType="multipart/form-data">
              <label className="label-icon" htmlFor={file}>
                <PictureOutlined />
                <input
                  type="file"
                  id={file}
                  className="input-icon"
                  name="image"
                  accept="image/jpeg,image/jpg,image/png"
                  multiple
                  data-original-title="upload photos"
                  onChange={handleImage}
                />
              </label>
            </form>
            <span id="desc" className="tooltiptext">
              image
            </span>
          </div>
          <div className="tooltips">
            <form encType="multipart/form-data">
              <label className="label-icon" htmlFor={gifId}>
                <GifOutlined />
                <input
                  type="file"
                  id={gifId}
                  className="input-icon"
                  name="gif-image"
                  accept="image/gif"
                  data-original-title="upload Gif"
                  onChange={handleImage}
                />
              </label>
            </form>
            <span id="desc" className="tooltiptext">
              gif
            </span>
          </div>
          <div className="tooltips">
            <PicCenterOutlined />
            <span id="desc" className="tooltiptext">
              poll
            </span>
          </div>
          <div className="tooltips">
            <SmileOutlined />
            <span id="desc" className="tooltiptext">
              emoji
            </span>
          </div>
        </div>
        <div>
          <button
            disabled={
              banter === "" ||
              (banters && (banters.loading_banter || banters.loading))
                ? true
                : false
            }
            onClick={submitBanter}
            className="custom-btn"
          >
            {banters && (banters.loading_banter || banters.loading)
              ? "Loading.."
              : "Banter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Base;
