import React from "react";
import {
  PictureOutlined,
  SmileOutlined,
  GifOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";

const BanterBase = ({ handleImage, banters, banter, submitBanter }) => {
  return (
    <div>
      <div className="create-banter-base">
        <div className="flex-between">
          <div className="flex">
            <div className="icon-action tooltip">
              <form method="post" action="" encType="multipart/form-data">
                <label style={{ fontSize: "1.5rem" }} htmlFor="file">
                  <PictureOutlined />
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
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
            <form method="post" action="" encType="multipart/form-data">
              <div className="icon-action tooltip">
                <label style={{ fontSize: "1.5rem" }} htmlFor="gif-file">
                  <GifOutlined />
                  <input
                    type="file"
                    id="gif-file"
                    style={{ display: "none" }}
                    name="gif-image"
                    accept="image/gif"
                    data-original-title="upload Gif"
                    onChange={handleImage}
                  />
                </label>
                <span id="desc" className="tooltiptext">
                  gif
                </span>
                {/*  <Picker onEmojiClick={() => alert("hello")} />*/}
              </div>
            </form>
            <div className="icon-action tooltip">
              <PicCenterOutlined />
              <span id="desc" className="tooltiptext">
                poll
              </span>
            </div>
            <div className="icon-action tooltip">
              <SmileOutlined />
              <span id="desc" className="tooltiptext">
                emoji
              </span>
            </div>
          </div>
          <div>
            <button
              style={{
                cursor: banter === "" ? "not-allowed" : "pointer",
              }}
              disabled={
                banter === "" || (banters && banters.loading_banter)
                  ? true
                  : false
              }
              onClick={submitBanter}
            >
              {banters && banters.loading_banter ? "Loading.." : "Banter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanterBase;
