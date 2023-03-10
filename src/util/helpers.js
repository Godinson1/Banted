import JwtDecode from "jwt-decode";
import axios from "axios";
import { SET_AUTHENTICATED } from "../actions/types";
import { logoutUser, getUserData, getUsers } from "../actions/userActions";
import { getBanters } from "../actions/banterActions";

const getClassMediaNames = (data) => {
  return data.length === 1
    ? "media-full"
    : data.length === 2
    ? "media-two"
    : data.length === 3
    ? "media-three"
    : "media-two";
};

const readURI = (e, setImages) => {
  if (e.target.files) {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", (ev) => {
            resolve(ev.target.result);
          });
          reader.addEventListener("error", reject);
          reader.readAsDataURL(file);
        });
      })
    ).then(
      (images) => {
        setImages(images);
      },
      (error) => {
        console.error(error);
      }
    );
  }
};

const getDataUrl = (file, setImages) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", (ev) => {
      resolve(ev.target.result);
    });
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  }).then(
    (images) => {
      setImages(images);
    },
    (error) => {
      console.error(error);
    }
  );
};

const checkHashtag = (text) => {
  let repl = text.replace(
    /#(\w+)/g,
    "<span className='bantext' style='color: #1da1f2;  white-space: pre-line;'><b>#$1</b></span>"
  );
  return repl;
};

const checkUserAuthentication = (store) => {
  const token = localStorage.BToken;
  if (token) {
    const decoded = JwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
      window.location.href = "/";
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["banted-token"] = token;
      store.dispatch(getUserData());
      store.dispatch(getBanters());
      store.dispatch(getUsers());
    }
  }
};

export { getClassMediaNames, readURI, getDataUrl, checkHashtag, checkUserAuthentication };
