import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Spin, Avatar, Icon, Divider, Card, Carousel, Modal } from "antd";
import { useSelector } from "react-redux";
//import Carousel  from "react-images";
import { Link } from "react-router-dom";
import LikeButton from "../util/LikeButton";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banter = (props) => {
  const banters = useSelector((state) => state.banters);

  const [show, setShow] = useState(false);
  const [images, SetImages] = useState([]);
  const [modalIsOpen, setMoodalIsOpen] = useState(false);

  const toggleModal = (bant) => {
    SetImages(bant);
    setMoodalIsOpen(true);
  };

  dayjs.extend(relativeTime);
  const { Meta } = Card;

  return (
    <div>
      {banters && banters.banters ? (
        banters.banters.map((bant) => {
          return (
            <div key={bant._id}>
              <div id="doves">
                <div>
                  {!bant.userImage ? (
                    <Avatar size={70} src="/images/no-img.png" />
                  ) : (
                    <Avatar
                      size={70}
                      src={"/BantedImages/profileImages/" + bant.userImage}
                    />
                  )}
                </div>
                <div id="nn">
                  <Link to={`/profile?handle=${bant.banterHandle}`}>
                    <span id="on">
                      {bant.name}{" "}
                      <span id="os">
                        @{bant.banterHandle} - {dayjs(bant.createdAt).fromNow()}
                      </span>
                    </span>
                  </Link>{" "}
                  <br />
                  <span id="bant">{bant.banter}</span>
                  {bant.banterImage.length !== 0 ? (
                    <div className="imageContainer">
                      <Carousel autoplay dots>
                        {bant.banterImage.map((image, index) => {
                          return <div>{<img src={image} alt="image" />}</div>;
                        })}
                      </Carousel>
                    </div>
                  ) : (
                    ""
                  )}
                  <p>
                    <Icon id="comment" type="message" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="count">{bant.commentCount}</span>
                    <LikeButton banterId={bant._id} />
                    <span id="count">{bant.likeCount}</span>
                  </p>
                </div>
              </div>
              <Divider />
            </div>
          );
        })
      ) : (
        <div id="spin">
          <Spin size="large" />
        </div>
      )}
      <div>
        <Modal
          centered
          visible={modalIsOpen}
          onCancel={() => setMoodalIsOpen(false)}
          footer={null}
        >
          <Carousel views={images} />
        </Modal>
      </div>
    </div>
  );
};

export default Banter;
