import React from "react";
import { Carousel } from "antd";
import messi from "../messi.jpg";
import ronaldo from "../ronaldo.jpg";
import fans from "../fans.jpg";

const Welcome = () => {
  return (
    <Carousel effect="fade" autoplay>
      <div className>
        <h3>Have an Account yet? Start Banter Jare!</h3>
      </div>
      <div>
        <img alt="messi" src={messi} style={{ width: "100%" }} />
      </div>
      <div>
        <img alt="ronaldo" src={ronaldo} style={{ width: "100%" }} />
      </div>
      <div>
        <img alt="fans" src={fans} style={{ width: "100%" }} />
      </div>
    </Carousel>
  );
};

export default Welcome;
