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

export { getClassMediaNames, readURI, getDataUrl, checkHashtag };
