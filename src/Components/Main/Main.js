import React from "react";
import { HeaderCompose } from "../Header";
import { BanterCheck } from "./Components/Timeline/Components";
import Layout from "../Layout";

const Main = () => {
  return (
    <div>
      <Layout>
        <div className="s">
          <HeaderCompose />
          <BanterCheck />
        </div>
      </Layout>
    </div>
  );
};

export default Main;
