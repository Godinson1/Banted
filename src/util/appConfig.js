import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { LIKE } from "../actions/types";
import { LIKE_EVENT } from "./constants";

const STREAM_URL = "http://localhost:5000/stream";
const ssEvents = new EventSource(STREAM_URL);
const AppContext = React.createContext({});

const AppProvider = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    ssEvents.addEventListener("message", () => {});

    ssEvents.addEventListener(LIKE_EVENT, (e) => {
      const data = JSON.parse(e.data);
      const alertMessage = `@${data.like.userHandle} liked your banter`;
      message.success({ content: alertMessage });
      dispatch({ type: LIKE, payload: data });
    });

    ssEvents.onopen = (e) => {
      console.log("open", e);
    };

    ssEvents.onerror = (e) => {
      console.log("error", e);
    };

    return () => {
      ssEvents.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppContext.Provider value={null}>{props.children}</AppContext.Provider>;
};

export default AppProvider;
