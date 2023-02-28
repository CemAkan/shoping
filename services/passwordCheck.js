module.exports = (password) => {
  if (!password.match(/[a-z]/)) {
    return 1;
  }

  if (!password.match(/[A-Z]/)) {
    return 2;
  }

  if (!password.match(/[0-9]/)) {
    return 3;
  }

  if (!password.match(/[^\w\s]/)) {
    return 4;
  }
};
