const isEmpty = (data) => {
  if (
    data.trim() === "" ||
    data.trim() === null ||
    data.trim() === undefined ||
    !data
  ) {
    return true;
  }
  return false;
};

const isEmail = (data) => {
  const regEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (data.match(regEx)) return true;
  else return false;
};

const isValidNumber = (data) => {
  if (data.trim().length === 11) return true;
  else return false;
};

const notValidPassword = (data) => {
  if (data.length < 6) return true;
  else return false;
};

export { isEmpty, isEmail, notValidPassword, isValidNumber };
