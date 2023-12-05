exports.generateRandomId = (base, length) => {
  const timestamp = Date.now().toString();
  // Adjust the length as needed, Exclude "0." and select characters based on length
  const randomString = Math.random().toString(base).substr(2, length);
  const randomId = timestamp + randomString;

  return randomId;
};
