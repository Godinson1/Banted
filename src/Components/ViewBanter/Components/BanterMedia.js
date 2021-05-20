import React from "react";
import { Link } from "react-router-dom";
import { getClassMediaNames } from "../../../util";

const BanterMedia = ({ imageBant, imagelocation }) => {
  return (
    <div>
      <div className="display">
        {imageBant.banterImage.length !== 0 ? (
          <div className={getClassMediaNames(imageBant.banterImage)}>
            {imageBant.banterImage.map((image, index) => {
              return (
                <div key={index} className="media-container">
                  <Link
                    to={{
                      pathname: `/${imageBant.banterHandle}/status/${
                        imageBant._id
                      }/photo/${imageBant.banterImage.indexOf(image) + 1}`,
                      state: {
                        background: imagelocation,
                        banter: imageBant,
                      },
                    }}
                    className="link"
                  >
                    {<img src={image} alt="banter" />}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BanterMedia;
