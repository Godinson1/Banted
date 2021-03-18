import { isEmpty, isEmail, notValidPassword } from "./index";

const checkData = (data) => {
  if (data.indexOf("@") > -1) {
    return "email";
  }
  return "handle";
};

const validateLogin = ({ data, password }) => {
  let error = "";

  if (isEmpty(password)) error = "Password cannot not be empty";
  else if (notValidPassword(password))
    error = "Password must be atleast 6 characters..";

  if (checkData(data) === "email") {
    if (!isEmail(data)) error = "Must be a valid email address";
  }

  if (checkData(data) === "handle") {
    if (isEmpty(data)) error = "Handle must not be empty";
  }

  return {
    error,
    valid: error === "" ? true : false,
  };
};

export { validateLogin, checkData };
