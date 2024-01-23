// Check if role is valid
const isRoleValid = (role) => {
  const roles = ["House Renter", "House Owner"];
  return roles.includes(role);
};

// Check if phone number is valid
const isPhoneNumberValid = (phoneNumber) => {
  const phoneNumberRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
  return phoneNumberRegex.test(phoneNumber);
};

// Check if password is valid
const isPasswordValid = (password) => {
  const passwordRegex = password.length >= 6;
  return passwordRegex;
};

// Check if email is valid
const isEmailValid = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

module.exports = {
  isEmailValid,
  isPhoneNumberValid,
  isPasswordValid,
  isRoleValid,
};
