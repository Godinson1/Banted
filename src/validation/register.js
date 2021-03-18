import { isEmpty, isEmail, notValidPassword } from "./index";
const validateRegistration = ({ password, name, email, handle }) => {
  let error = "";

  if (isEmpty(password)) error = "Password cannot not be empty";
  else if (notValidPassword(password))
    error = "Password must be atleast 6 characters..";

  if (!isEmail(email)) error = "Must be a valid email address";

  if (isEmpty(handle)) error = "Handle must not be empty";

  if (isEmpty(name)) error = "Name must not be empty";

  return {
    error,
    valid: error === "" ? true : false,
  };
};

export { validateRegistration };
