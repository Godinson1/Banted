const getClassMediaNames = (data) => {
  return data.length === 1
    ? "media-full"
    : data.length === 2
    ? "media-two"
    : data.length === 3
    ? "media-three"
    : "media-two";
};

export { getClassMediaNames };
