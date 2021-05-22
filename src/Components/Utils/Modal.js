import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useRouteMatch, Link } from "react-router-dom";
import {
  DoubleRightOutlined,
  UploadOutlined,
  RetweetOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  DoubleLeftOutlined,
  MessageOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "../likeButton";
import Reply from "../Reply";

const Modals = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(true);
  const [showBanter, setShowBanter] = useState(true);
  const [imageIndex, setImageIndex] = useState(
    parseInt(location.pathname.substr(-1)) - 1
  );
  const history = useHistory();
  dayjs.extend(relativeTime);
  const match = useRouteMatch();

  console.log(setShowModal);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const viewNextImage = () => {
    setImageIndex(imageIndex + 1);
    match.params.id = imageIndex;
  };

  const viewPreviousImage = () => {
    setImageIndex(imageIndex - 1);
  };

  const bant = location.state.banter;

  const closeModal = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div>
      {showModal && (
        <div id="show-modal-picture">
          <div className="modal-container">
            <div className="flex">
              <div
                style={{ width: showBanter ? "75vw" : "100vw" }}
                className="picture-view"
              >
                <div className="picture-container">
                  <div className="flex-between">
                    <div className="cancel " onClick={(e) => closeModal(e)}>
                      <h1 style={{ color: "white" }}>X</h1>
                    </div>
                    <div
                      onClick={() => setShowBanter(!showBanter)}
                      className="right-icon icon-action"
                    >
                      {showBanter ? (
                        <DoubleRightOutlined />
                      ) : (
                        <DoubleLeftOutlined />
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: "220px" }} className="flex-between">
                    <div
                      style={{
                        visibility: imageIndex === 0 ? "hidden" : "visible",
                      }}
                      className="right-icon icon-action"
                      onClick={() => viewPreviousImage()}
                    >
                      <ArrowLeftOutlined />
                    </div>
                    {imageIndex !== bant.banterImage.length - 1 && (
                      <div
                        onClick={() => viewNextImage()}
                        className="right-icon icon-action"
                      >
                        <ArrowRightOutlined />
                      </div>
                    )}
                  </div>
                </div>
                <div className="image-cnt">
                  <img src={bant.banterImage[imageIndex]} alt="shows" />
                  <div className="flex">
                    <div>
                      <Link
                        to={{
                          pathname: `/compose/banter`,
                          state: {
                            background: location,
                            banter: bant,
                          },
                        }}
                        className="link"
                      >
                        <div className="action-flex">
                          <div className="icon-action ">
                            <MessageOutlined /> &nbsp; &nbsp;{" "}
                            <span className="count">{bant.commentCount}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div>
                      <div className="action-flex">
                        <div className="icon-action-rebant">
                          <RetweetOutlined /> &nbsp; &nbsp;{" "}
                          <span className="count">{bant.rebantCount}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="action-flex">
                        <div className="icon-action-rebant ">
                          <HeartOutlined />
                          &nbsp; &nbsp;{" "}
                          <span className="count">{bant.likeCount}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <UploadOutlined />
                    </div>
                  </div>
                </div>
              </div>
              {showBanter && (
                <div className="banter-view">
                  <div className="flex-start-account">
                    <div className="avatar">
                      <img src={bant.userImage} alt="user" />
                    </div>
                    <div className="nameHandle-container">
                      <div>
                        <span id="name">{bant.name}</span>
                      </div>
                      <div className="handle-container">
                        <span id="handle">@{bant.banterHandle}</span>
                      </div>
                    </div>
                    <div className="dots">...</div>
                  </div>
                  <div className="banter-text">
                    <p className="bantext">{bant.banter}</p>
                  </div>
                  <div className="base-info">
                    {dayjs(bant.createdAt).format("h:mm A")} ·{" "}
                    {dayjs(bant.createdAt).format("MMMM D, YYYY")} - Banted Web
                    App
                  </div>
                  <div className="base-info">
                    <span style={{ color: "white", fontWeight: 500 }}>
                      {bant.rebantCount}{" "}
                    </span>
                    Rebanters &nbsp; &nbsp;
                    <span style={{ color: "white", fontWeight: 500 }}>0 </span>
                    Quote Rebanters
                  </div>
                  <div className="base-info">
                    <span style={{ color: "white", fontWeight: 500 }}>
                      {bant.likeCount}
                    </span>{" "}
                    Likes
                  </div>
                  <div className="flex">
                    <div>
                      <MessageOutlined />
                    </div>
                    <div>
                      <RetweetOutlined />
                    </div>
                    <div>
                      <LikeButton banterId={bant._id} />
                    </div>
                    <div>
                      <UploadOutlined />
                    </div>
                  </div>
                  <Reply bant={bant} location={location} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modals;
